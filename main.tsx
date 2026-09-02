import React from 'react';
import {
  ReactMidi,
  createNodeMidiAdapter,
  createNodeOscTransport,
} from '@react-ctrl/node';
import { App } from './app';
import { createMotuOscTransport } from './osc';

async function main() {
  const midiInput = process.env.MIDI_INPUT || 'MPK261 Port A';
  const oscHost = process.env.MOTU_OSC_HOST;
  const oscPort = Number(process.env.MOTU_OSC_PORT || 9998);
  if (oscHost && (!Number.isInteger(oscPort) || oscPort < 1 || oscPort > 65535)) {
    throw new Error(`Invalid MOTU_OSC_PORT: ${process.env.MOTU_OSC_PORT}`);
  }

  const midiAdapter = createNodeMidiAdapter();
  midiAdapter.setPortMappings([[midiInput, undefined]]);
  await midiAdapter.initialize();

  const availableInputs = midiAdapter.getInputPorts().map(port => port.name);
  if (!availableInputs.includes(midiInput)) {
    midiAdapter.dispose();
    throw new Error(
      `MIDI input "${midiInput}" was not found. Available inputs: ${availableInputs.join(', ')}`
    );
  }

  const oscTransport = oscHost
    ? createNodeOscTransport({ host: oscHost, port: oscPort })
    : createMotuOscTransport({
        origin: process.env.MOTU_HTTP_ORIGIN,
        deviceId: process.env.MOTU_DEVICE_ID,
      });
  const renderer = ReactMidi.render(<App oscTransport={oscTransport} />, midiAdapter);
  const oscTarget = oscHost
    ? `UDP OSC ${oscHost}:${oscPort}`
    : `MOTU service ${process.env.MOTU_HTTP_ORIGIN || 'http://127.0.0.1:1280'}`;
  console.log(`Controlling ${oscTarget} from MIDI input "${midiInput}"`);

  let shuttingDown = false;
  const shutdown = async () => {
    if (shuttingDown) return;
    shuttingDown = true;
    renderer.unmount();
    midiAdapter.dispose();
    await oscTransport.close();
  };

  process.once('SIGINT', () => void shutdown().finally(() => process.exit(0)));
  process.once('SIGTERM', () => void shutdown().finally(() => process.exit(0)));
}

void main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
