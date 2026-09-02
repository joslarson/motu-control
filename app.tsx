import React from 'react';
import { Midi } from '@react-ctrl/node';
import { OscProvider, OscTransport } from './osc';
import { Motu } from './motu-component';
import { MotuFaderPath } from './ultralite-mk4';

export type FaderDefinition = {
  label: string;
  controller: number;
  path: MotuFaderPath;
};

export function MotuFader({ label, controller, path }: FaderDefinition) {
  const [value, setValue] = React.useState<number>();

  return (
    <>
      <Midi
        label={`${label} fader`}
        pattern={{ status: 0xb0, data1: controller }}
        onInput={({ data2 }) => setValue(Math.pow(data2 / 127, 4))}
      />
      {value !== undefined && <Motu label={label} path={path} value={value} />}
    </>
  );
}

export function App({ oscTransport }: { oscTransport: OscTransport }) {
  return (
    <OscProvider transport={oscTransport}>
      <MotuFader label="MIC" controller={18} path="mix/chan/0/matrix/fader" />
      <MotuFader label="INST" controller={21} path="mix/chan/1/matrix/fader" />
      <MotuFader label="CAST" controller={22} path="mix/chan/2/matrix/fader" />
      <MotuFader label="AUX" controller={23} path="mix/chan/4/matrix/fader" />
      <MotuFader label="OS" controller={24} path="mix/chan/8/matrix/fader" />
      <MotuFader label="DAW" controller={25} path="mix/chan/10/matrix/fader" />
      <MotuFader label="PHONES" controller={26} path="mix/monitor/0/matrix/fader" />
      <MotuFader label="MAIN" controller={27} path="mix/main/0/matrix/fader" />
    </OscProvider>
  );
}
