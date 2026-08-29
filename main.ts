import midi from 'easymidi'
import { createMotuClient } from "./motu-client";


const client = createMotuClient({
  labels: {
    'mix/chan/0/matrix/fader': 'MIC',
    'mix/chan/1/matrix/fader': 'INST',
    'mix/chan/2/matrix/fader': 'CAST',
    'mix/chan/4/matrix/fader': 'AUX',
    'mix/chan/8/matrix/fader': 'OS',
    'mix/chan/10/matrix/fader': 'DAW',
    'mix/monitor/0/matrix/fader': 'PHONES',
    'mix/main/0/matrix/fader': 'MAIN',
  }
});

console.log('MIDI inputs:', midi.getInputs())
const FADER_CC_ARRAY = [18, 21, 22, 23, 24, 25, 26, 27];

const input = new midi.Input('MPK261 Port A');
input.on('cc', (msg) => {
  if (msg.controller === FADER_CC_ARRAY[0]) {
    // MIC
    client.set('mix/chan/0/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[1]) {
    // INST
    client.set('mix/chan/1/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[2]) {
    // CAST
    client.set('mix/chan/2/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[3]) {
    // AUX
    client.set('mix/chan/4/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[4]) {
    // OS
    client.set('mix/chan/8/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[5]) {
    // DAW
    client.set('mix/chan/10/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[6]) {
    // PHONES
    client.set('mix/monitor/0/matrix/fader', Math.pow(msg.value / 127, 4));
  } else if (msg.controller === FADER_CC_ARRAY[7]) {
    // MAIN
    client.set('mix/main/0/matrix/fader', Math.pow(msg.value / 127, 4));
  }
});

type TestStr = `test/foo/${number}/bar`

type Start<T extends string, S extends string = ''> = T extends `${infer CHAR}${infer REST}`
  ? REST extends `/${number}` | `/${number}/${string}`
    ? `${S}${CHAR}`
    : Start<REST, `${S}${CHAR}`>
  : never;

type Result = Start<TestStr>;