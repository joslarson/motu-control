import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import React from 'react';
import { MidiAdapter, MidiMessage, ReactMidi } from '@react-ctrl/node';
import { App } from './app';
import { createMotuOscTransport, OscTransport, OscValue } from './osc';

let receiveMidi: ((port: number, message: MidiMessage) => void) | undefined;
const midiAdapter: MidiAdapter = {
  initialize() {},
  dispose() {},
  getInputPorts: () => [],
  getOutputPorts: () => [],
  getConfiguredPorts: () => [],
  sendMessage() {},
  onMessage(callback) {
    receiveMidi = callback;
  },
  isConnected: () => true,
  getPortState: () => 'connected',
  setPortMappings() {},
};

const sent: Array<{ address: string; value: OscValue }> = [];
const oscTransport: OscTransport = {
  async send(address, value) {
    sent.push({ address, value });
    return 'sent';
  },
  async close() {},
};

const renderer = ReactMidi.render(<App oscTransport={oscTransport} />, midiAdapter);
receiveMidi?.(0, { status: 0xb0, data1: 18, data2: 127 });

async function test() {
  await new Promise<void>(resolve => setImmediate(resolve));
  assert.deepEqual(sent, [{ address: '/mix/chan/0/matrix/fader', value: 1 }]);
  renderer.unmount();

  const posts: Array<{ url: string; body: string }> = [];
  const server = createServer((request, response) => {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', chunk => {
      body += chunk;
    });
    request.on('end', () => {
      if (request.url === '/connected_devices') {
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify([{ uid: 'device-1' }]));
      } else {
        posts.push({ url: request.url || '', body });
        if (posts.length === 1) {
          request.socket.destroy();
        } else {
          setTimeout(() => response.end('{}'), 10);
        }
      }
    });
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert(address && typeof address === 'object');

  const motuTransport = createMotuOscTransport({
    origin: `http://127.0.0.1:${address.port}`,
    clientId: 'test-client',
  });
  const results = await Promise.all(
    Array.from({ length: 20 }, (_, value) =>
      motuTransport.send('/mix/main/0/matrix/fader', value / 20)
    )
  );
  await motuTransport.send('/mix/chan/0', {
    'matrix/fader': 0.75,
    'matrix/mute': 1,
  });
  await motuTransport.close();
  await new Promise<void>(resolve => server.close(() => resolve()));

  assert(posts.length <= 3, `Expected coalescing, received ${posts.length} writes`);
  assert.equal(posts.at(-1)?.url, '/device-1/datastore/mix/chan/0?client=test-client');
  assert.match(posts.at(-1)?.body || '', /matrix\/fader/);
  assert.match(posts.at(-1)?.body || '', /matrix\/mute/);
  assert.match(posts.at(-1)?.body || '', /0\.75/);
  assert.equal(results.at(-1), 'sent');
  console.log('MIDI state rendered OSC and the MOTU transport posted it');
}

void test().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
