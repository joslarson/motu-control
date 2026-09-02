import { Motu, MotuValue } from './motu-component';

const faderValue: MotuValue<'mix/main/0/matrix/fader'> = 0.5;
<Motu path="mix/main/0/matrix/fader" value={faderValue} />;
<Motu path="mix/chan/0/matrix/mute" value={1} />;
<Motu path="ext/ibank/0/ch/0/48V" value={1} />;
<Motu path="ext/obank/0/ch/0/src" value="0:0" />;
<Motu
  path="mix/chan/0"
  value={{
    'matrix/fader': 0.5,
    'matrix/mute': 1,
    'matrix/pan': 0,
  }}
/>;

// @ts-expect-error Mixer faders accept numbers, not strings.
<Motu path="mix/main/0/matrix/fader" value="loud" />;

// @ts-expect-error Mute endpoints accept only 0 or 1.
<Motu path="mix/chan/0/matrix/mute" value={2} />;

// @ts-expect-error Unknown datastore paths are rejected.
<Motu path="mix/not-a-real-endpoint" value={0.5} />;

// @ts-expect-error The generic API permits this shape, but it is absent from this UltraLite mk4.
<Motu path="mix/main/99/matrix/fader" value={0.5} />;

// @ts-expect-error Global device settings are outside this controller's supported surface.
<Motu path="uid" value="0001f2fffe005603" />;

// @ts-expect-error AVB settings are outside this controller's supported surface.
<Motu path="avb/0001f2fffe005603/entity_name" value="UltraLite-mk4" />;

// @ts-expect-error High-pass filter controls are not part of this app's supported mixer surface.
<Motu path="mix/chan/0/hpf/enable" value={1} />;

// @ts-expect-error EQ controls are not part of this app's supported mixer surface.
<Motu path="mix/chan/0/eq/mid1/gain" value={0} />;

// @ts-expect-error Compressor controls are not part of this app's supported mixer surface.
<Motu path="mix/chan/0/comp/enable" value={1} />;

// @ts-expect-error Aux-send controls are not part of this app's supported mixer surface.
<Motu path="mix/chan/0/matrix/aux/0/send" value={0.5} />;

<Motu
  path="mix/chan/0"
  value={{
    // @ts-expect-error Subtree keys must be exact descendants of the rendered parent path.
    'matrix/not-real': 1,
  }}
/>;

<Motu
  path="mix/chan/0"
  value={{
    // @ts-expect-error Subtree values retain the leaf endpoint's value type.
    'matrix/mute': 2,
  }}
/>;
