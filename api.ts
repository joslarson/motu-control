export type RoutingAndIOSettings = {
  /**
   * "1x" if the word clock out should always be a 1x rate or "follow" if it should always follow the system clock
   * @permission rw
   * @since v0.2.0
   **/
  [key in `ext/wordClockMode`]: string;
} & {
  /**
   * "thru" if the word clock output should be the same as the word clock input or "out" if it should be determined by the system clock
   * @permission rw
   * @since v0.2.0
   **/
  [key in `ext/wordClockThru`]: string;
} & {
  /**
   * True if each optical bank has its own SMUX setting
   * @permission r
   * @since v0.2.0
   **/
  [key in `ext/smuxPerBank`]: 0 | 1;
} & {
  /**
   * True if vLimit lookahead is enabled. vLimit lookahead provides better input limiting, at the cost of small amounts of extra latency. This path is only present on devices with access to vLimit.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/vlimit/lookahead`]: number;
} & {
  /**
   * True if the computer is allowed to control the volumes of computer-to-device streams.
   * @permission rw
   * @since v0.1.0
   **/
  [key in `ext/enableHostVolControls`]: 0 | 1;
} & {
  /**
   * Valid only when this device is connected to the computer via USB. This chooses the max number of channels/max sample rate tradeoff for the to/from computer input/output banks.
   * @permission rw
   * @since v0.1.0
   **/
  [key in `ext/maxUSBToHost`]: number;
} & {
  /**
   * The name of the input or output bank
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/name`]: string;
} & {
  /**
   * The maximum possible number of channels in the input or output bank.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/maxCh`]: number;
} & {
  /**
   * The number of channels available in this bank at its current sample rate.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/numCh`]: number;
} & {
  /**
   * The number of channels that the user has enabled for this bank.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/userCh`]: number;
} & {
  /**
   * The number of channels that are actually active. This is always the minimum of ext/${'ibank' | 'obank'}/${number}/userCh and ext/${'ibank' | 'obank'}/${number}/userCh.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/calcCh`]: number;
} & {
  /**
   * For Optical banks, either "toslink" or "adat"
   * @permission rw
   * @since v0.2.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/smux`]: string;
} & {
  /**
   * For MADI input banks, this is the 2x clock mode of the input stream-- "1x" for 48/44.1kHz frame clock, or "2x" for 88.2/96kHz frame clock
   * @permission r
   * @since v0.2.0
   **/
  [key in `ext/ibank/${number}/madiClock`]: string;
} & {
  /**
   * For MADI output banks, this is the 2x clock mode of the output stream-- "1x" for 48/44.1kHz frame clock, or "2x" for 88.2/96kHz frame clock
   * @permission rw
   * @since v0.2.0
   **/
  [key in `ext/obank/${number}/madiClock`]: string;
} & {
  /**
   * 56 or 64 representing 56 or 64 MADI channels at 1x, 28 or 32 channels at 2x, or 14 or 16 channels at 4x, respectively
   * @permission r
   * @since v0.2.0
   **/
  [key in `ext/ibank/${number}/madiFormat`]: number;
} & {
  /**
   * 56 or 64 representing 56 or 64 MADI channels at 1x, 28 or 32 channels at 2x, or 14 or 16 channels at 4x, respectively
   * @permission rw
   * @since v0.2.0
   **/
  [key in `ext/obank/${number}/madiFormat`]: number;
} & {
  /**
   * The channel's name.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/name`]: string;
} & {
  /**
   * If the output channel is connected to an input bank, a ":" separated pair in the form " : ", otherwise, if unrouted, an empty string.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/obank/${number}/ch/${number}/src`]: `${number}:${number}`;
} & {
  /**
   * True if the signal has its phase inverted. This is only applicable to some input or output channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/phase`]: number;
} & {
  /**
   * True if the 20 dB pad is engaged. This is only applicable to some input or output channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/pad`]: number;
} & {
  /**
   * True if the 48V phantom power is engaged. This is only applicable to some input channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/ibank/${number}/ch/${number}/48V`]: number;
} & {
  /**
   * True if the vLimit limiter is engaged. This is only applicable to some input channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/ibank/${number}/ch/${number}/vlLimit`]: number;
} & {
  /**
   * True if vLimit clip is engaged. This is only applicable to some input channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/ibank/${number}/ch/${number}/vlClip`]: number;
} & {
  /**
   * A dB-value for how much to trim this input or output channel. The range of this parameter is indicated by ext/${'ibank' | 'obank'}/${number}/ch/${number}/trimRange. Only available for certain input or output channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/trim`]: number;
} & {
  /**
   * A pair of the minimum followed by maximum values allowed for the trim parameter on the input or output channel.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/trimRange`]: `${number}:${number}`;
} & {
  /**
   * A dB-value for how much to trim this input or output channel. This stereo trim affect both this channel and the next one. The range of this parameter is indicated by ext/${'ibank' | 'obank'}/${number}/ch/${number}/stereoTrimRange. Only available for certain input or output channels.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/stereoTrim`]: number;
} & {
  /**
   * A pair of the minimum followed by maximum values allowed for the stereoTrim parameter on the input or output channel.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/stereoTrimRange`]: `${number}:${number}`;
} & {
  /**
   * True if the channel has a physical connector plugged in (e.g., an audio jack). This information may not be available for all banks or devices.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/${'ibank' | 'obank'}/${number}/ch/${number}/connection`]: number;
}

export type MixerSettings = {
  /**
   * The approximate percentage of DSP resources used for mixing and effects.
   * @permission r
   * @since v1.0.0
   **/
  [key in `mix/ctrls/dsp/usage`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/chan/${number}/matrix/group/${number}/send`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/chan/${number}/matrix/reverb/${number}/send`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -1
   * @max 1
   * @unit pan
   **/
  [key in `mix/chan/${number}/matrix/group/${number}/pan`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -1
   * @max 1
   * @unit pan
   **/
  [key in `mix/chan/${number}/matrix/reverb/${number}/pan`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/gate/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 50
   * @max 2000
   * @unit ms
   **/
  [key in `mix/chan/${number}/gate/release`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 1
   * @unit linear
   **/
  [key in `mix/chan/${number}/gate/threshold`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 10
   * @max 500
   * @unit ms
   **/
  [key in `mix/chan/${number}/gate/attack`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/matrix/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/matrix/solo`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/matrix/mute`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -1
   * @max 1
   * @unit pan
   **/
  [key in `mix/chan/${number}/matrix/pan`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/chan/${number}/matrix/fader`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/leveler/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/main/${number}/leveler/makeup`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/main/${number}/leveler/reduction`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/leveler/limit`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/matrix/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/matrix/mute`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/main/${number}/matrix/fader`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/matrix/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/matrix/prefader`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/matrix/panner`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/matrix/mute`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/aux/${number}/matrix/fader`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/group/${number}/matrix/reverb/${number}/send`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/leveler/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/group/${number}/leveler/makeup`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/group/${number}/leveler/reduction`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/leveler/limit`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/matrix/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/matrix/solo`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/matrix/prefader`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/matrix/panner`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/matrix/mute`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/group/${number}/matrix/fader`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/reverb/${number}/matrix/reverb/${number}/send`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/leveler/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/reverb/${number}/leveler/makeup`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/reverb/${number}/leveler/reduction`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/leveler/limit`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/matrix/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/matrix/solo`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/matrix/prefader`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/matrix/panner`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/matrix/mute`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/reverb/${number}/matrix/fader`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/reverb/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 100
   * @max 60000
   * @unit ms
   **/
  [key in `mix/reverb/${number}/reverb/reverbtime`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 500
   * @max 15000
   * @unit Hz
   **/
  [key in `mix/reverb/${number}/reverb/hf`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 500
   * @max 15000
   * @unit Hz
   **/
  [key in `mix/reverb/${number}/reverb/mf`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 500
   * @unit ms
   **/
  [key in `mix/reverb/${number}/reverb/predelay`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 1
   * @max 100
   * @unit %
   **/
  [key in `mix/reverb/${number}/reverb/mfratio`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 1
   * @max 100
   * @unit %
   **/
  [key in `mix/reverb/${number}/reverb/hfratio`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -100
   * @max 100
   * @unit %
   **/
  [key in `mix/reverb/${number}/reverb/tailspread`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 100
   * @unit %
   **/
  [key in `mix/reverb/${number}/reverb/mod`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/monitor/${number}/matrix/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/monitor/${number}/matrix/mute`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/monitor/${number}/matrix/fader`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -2
   * @max 4096
   **/
  [key in `mix/monitor/${number}/assign`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -1
   * @max 4096
   **/
  [key in `mix/monitor/${number}/override`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/monitor/${number}/auto`]: 0 | 1;
}

export type Datastore = RoutingAndIOSettings & MixerSettings;

type PossiblePaths<T extends string> = T extends infer K
  ? (
      K extends `${infer S}/${infer REST}`
        ? S | `${S}/${PossiblePaths<REST>}`
        : K
    )
  : never;

export type DatastoreKey = PossiblePaths<keyof Datastore>

export type ExtractDataStoreKey<T extends DatastoreKey> =
  keyof { [K in DatastoreKey as T extends K ? K : never]: unknown };
