export type GlobalSettings = {
  /**
   * The UID of the device. The UID is a 16 digit hexadecimal string that uniquely identifies this device on AVB networks.
   * @permission r
   * @since v0.0.0
   **/
  [key in `uid`]: string;
} & {
  /**
   * The version of the avb section. If this path is absent, the device does not have the paths in the avb section.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/caps/avb`]: `${number}.${number}.${number}`;
} & {
  /**
   * The version of the router section. If this path is absent, the device does not have the paths in the router section.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/caps/router`]: `${number}.${number}.${number}`;
} & {
  /**
   * The version of the mixer section. If this path is absent, the device does not have the paths in the mixer section.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/caps/mixer`]: `${number}.${number}.${number}`;
}

export type AVBSettings = {
  /**
   * A list of UIDs for AVB devices on the same network as this device.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/devs`]: string;
} & {
  /**
   * The vendor id of the connected AVB device.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/entity_model_id_h32`]: number;
} & {
  /**
   * The model id of the connected AVB device.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/entity_model_id_l32`]: number;
} & {
  /**
   * The human readable name of the connected AVB device. On MOTU devices, this may be changed by the
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/entity_name`]: string;
} & {
  /**
   * The human readable model name of the connected AVB device (e.g., "1248").
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/model_name`]: string;
} & {
  /**
   * The sanitized hostname assigned to this device. This is only valid for MOTU devices. This may be different from entity_name in that it won't have spaces or non-ascii characters (e.g., "My-1248").
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/hostname`]: string;
} & {
  /**
   * True if this device supports MOTU Master Clock. MOTU Master Clock is a set of special datastore keys in the avb section that allows one device to quickly become the clock source of many others.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/master_clock/capable`]: 0 | 1;
} & {
  /**
   * The UID of the device the master_clock stream is connected to, or the empty string if there is no connection. Only available for devices that are Master Clock capable (see master_clock/capable above).
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/master_clock/uid`]: string;
} & {
  /**
   * The human readable vendor name of the connected AVB device (e.g., "MOTU").
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/vendor_name`]: string;
} & {
  /**
   * The human readable firmware version number of the connected AVB device. For MOTU devices, this will be a semver.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/firmware_version`]: string;
} & {
  /**
   * The human readable serial number of the connected AVB device.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/serial_number`]: string;
} & {
  /**
   * True if this device should be ignored. If true, clients should not show this device in their UI.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/controller_ignore`]: 0 | 1;
} & {
  /**
   * The controller UID of the controller that acquired this box, or the empty string if no controller has acquired it. Acquisition is a part of the AVB standard that allows a controller to prevent other controllers from making changes on this device. You cannot initiate an acquisition from the datastore API, but you should avoid making changes on a device that has been acquired elsewhere.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/acquired_id`]: string;
} & {
  /**
   * The name of the device family for this device (e.g., "netiodevice"). This path is only valid for MOTU devices.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/motu.mdns.type`]: string;
} & {
  /**
   * The global datastore API version of the device. This path is only valid for MOTU devices.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/apiversion`]: `${number}.${number}.${number}`;
} & {
  /**
   * The canonical url of the device. This path is only valid for MOTU devices.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/url`]: string;
} & {
  /**
   * The index of the currently active device configuration. MOTU devices only have one configuration, index 0. Other devices may have multiple available configurations.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/current_configuration`]: number;
} & {
  /**
   * The name of the configuration with the given index.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/object_name`]: string;
} & {
  /**
   * True if the configuration is in identify mode. What identify mode means depends on the device. For MOTU devices, identify will flash the front panel backlight.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/identify`]: 0 | 1;
} & {
  /**
   * The sampling rate of the configuration with the given index.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/current_sampling_rate`]: number;
} & {
  /**
   * A list of allowed sample rates for the configuration with the given index.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/sample_rates`]: string;
} & {
  /**
   * The currently chosen clock source for the configuration with the given index.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/clock_source_index`]: number;
} & {
  /**
   * The number of available clock sources for the given configuration.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/clock_sources/num`]: number;
} & {
  /**
   * The name of the clock source with the given index.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/clock_sources/${number}/object_name`]: string;
} & {
  /**
   * The type of the clock source with the given index. The value will be one of "internal", "external", or "stream".
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/clock_sources/${number}/type`]: string;
} & {
  /**
   * If the type of the clock source is "stream", the id of the stream from which it derives its clock. This path is only valid if the clock is a stream.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/clock_sources/${number}/stream_id`]: number;
} & {
  /**
   * The number of available input or output AVB streams.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/${'input' | 'output'}_streams/num`]: number;
} & {
  /**
   * The name of the input or output stream with the given index
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/${'input' | 'output'}_streams/${number}/object_name`]: string;
} & {
  /**
   * The number of channels on the input or output stream.
   * @permission r
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/${'input' | 'output'}_streams/${number}/num_ch`]: number;
} & {
  /**
   * The talker for the given input stream. The first element of the pair is the device UID, the second element of the pair is the stream ID that this stream is connected to.
   * @permission rw
   * @since v0.0.0
   **/
  [key in `avb/${string}/cfg/${number}/input_streams/${number}/talker`]: string;
} & {
  /**
   * True if the clock is locked.
   * @permission r
   * @since v0.0.0
   **/
  [key in `ext/clockLocked`]: 0 | 1;
}

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
   * True if there are enough DSP resources to enable one more of the given effect.
   * @permission r
   * @since v1.0.0
   **/
  [key in `mix/ctrls/${'hpf' | 'gate' | 'eq' | 'comp' | 'leveler' | 'reverb'}/avail`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0
   * @max 4
   * @unit linear
   **/
  [key in `mix/chan/${number}/matrix/aux/${number}/send`]: number;
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
  [key in `mix/chan/${number}/matrix/aux/${number}/pan`]: number;
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
  [key in `mix/chan/${number}/hpf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/chan/${number}/hpf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/eq/highshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/chan/${number}/eq/highshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/chan/${number}/eq/highshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/chan/${number}/eq/highshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/chan/${number}/eq/highshelf/mode`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/eq/mid1/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/chan/${number}/eq/mid1/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/chan/${number}/eq/mid1/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/chan/${number}/eq/mid1/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/eq/mid2/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/chan/${number}/eq/mid2/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/chan/${number}/eq/mid2/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/chan/${number}/eq/mid2/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/chan/${number}/eq/lowshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/chan/${number}/eq/lowshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/chan/${number}/eq/lowshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/chan/${number}/eq/lowshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/chan/${number}/eq/lowshelf/mode`]: number;
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
  [key in `mix/chan/${number}/comp/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 10
   * @max 2000
   * @unit ms
   **/
  [key in `mix/chan/${number}/comp/release`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -40
   * @max 0
   * @unit dB
   **/
  [key in `mix/chan/${number}/comp/threshold`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 1
   * @max 10
   **/
  [key in `mix/chan/${number}/comp/ratio`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 10
   * @max 100
   * @unit ms
   **/
  [key in `mix/chan/${number}/comp/attack`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/chan/${number}/comp/trim`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum RMS=0,Peak=1
   **/
  [key in `mix/chan/${number}/comp/peak`]: number;
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
  [key in `mix/main/${number}/eq/highshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/main/${number}/eq/highshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/main/${number}/eq/highshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/main/${number}/eq/highshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/main/${number}/eq/highshelf/mode`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/eq/mid1/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/main/${number}/eq/mid1/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/main/${number}/eq/mid1/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/main/${number}/eq/mid1/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/eq/mid2/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/main/${number}/eq/mid2/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/main/${number}/eq/mid2/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/main/${number}/eq/mid2/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/main/${number}/eq/lowshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/main/${number}/eq/lowshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/main/${number}/eq/lowshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/main/${number}/eq/lowshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/main/${number}/eq/lowshelf/mode`]: number;
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
  [key in `mix/aux/${number}/eq/highshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/aux/${number}/eq/highshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/aux/${number}/eq/highshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/aux/${number}/eq/highshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/aux/${number}/eq/highshelf/mode`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/eq/mid1/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/aux/${number}/eq/mid1/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/aux/${number}/eq/mid1/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/aux/${number}/eq/mid1/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/eq/mid2/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/aux/${number}/eq/mid2/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/aux/${number}/eq/mid2/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/aux/${number}/eq/mid2/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/aux/${number}/eq/lowshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/aux/${number}/eq/lowshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/aux/${number}/eq/lowshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/aux/${number}/eq/lowshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/aux/${number}/eq/lowshelf/mode`]: number;
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
  [key in `mix/group/${number}/matrix/aux/${number}/send`]: number;
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
  [key in `mix/group/${number}/eq/highshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/group/${number}/eq/highshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/group/${number}/eq/highshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/group/${number}/eq/highshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/group/${number}/eq/highshelf/mode`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/eq/mid1/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/group/${number}/eq/mid1/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/group/${number}/eq/mid1/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/group/${number}/eq/mid1/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/eq/mid2/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/group/${number}/eq/mid2/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/group/${number}/eq/mid2/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/group/${number}/eq/mid2/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/group/${number}/eq/lowshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/group/${number}/eq/lowshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/group/${number}/eq/lowshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/group/${number}/eq/lowshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/group/${number}/eq/lowshelf/mode`]: number;
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
  [key in `mix/reverb/${number}/matrix/aux/${number}/send`]: number;
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
  [key in `mix/reverb/${number}/eq/highshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/reverb/${number}/eq/highshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/reverb/${number}/eq/highshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/reverb/${number}/eq/highshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/reverb/${number}/eq/highshelf/mode`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/eq/mid1/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/reverb/${number}/eq/mid1/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/reverb/${number}/eq/mid1/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/reverb/${number}/eq/mid1/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/eq/mid2/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/reverb/${number}/eq/mid2/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/reverb/${number}/eq/mid2/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/reverb/${number}/eq/mid2/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   **/
  [key in `mix/reverb/${number}/eq/lowshelf/enable`]: 0 | 1;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 20
   * @max 20000
   * @unit Hz
   **/
  [key in `mix/reverb/${number}/eq/lowshelf/freq`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min -20
   * @max 20
   * @unit dB
   **/
  [key in `mix/reverb/${number}/eq/lowshelf/gain`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @min 0.01
   * @max 3
   * @unit octaves
   **/
  [key in `mix/reverb/${number}/eq/lowshelf/bw`]: number;
} & {
  /**
   * @permission rw
   * @since v1.0.0
   * @enum Shelf=0,Para=1
   **/
  [key in `mix/reverb/${number}/eq/lowshelf/mode`]: number;
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

export type Datastore = GlobalSettings & AVBSettings & RoutingAndIOSettings & MixerSettings

type PossiblePaths<T extends string> = T extends infer K
  ? (
      K extends `${infer S}/${infer REST}`
        ? S | `${S}/${PossiblePaths<REST>}`
        : K
    )
  : never;

// export type DatastoreKey = PossiblePaths<keyof Datastore>
export type DatastoreKey = keyof Datastore;

export type ExtractDataStoreKey<T extends DatastoreKey> =
  keyof { [K in DatastoreKey as T extends K ? K : never]: unknown };
