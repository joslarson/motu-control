# MOTU Control

A server-side React application that maps an Akai MPK261’s MIDI faders to
MOTU mixer faders using OSC-addressed React components.

Each `MotuFader` owns controller state. MIDI input updates that state and React
renders an `Osc` component with the corresponding value. The OSC component only
sends when its rendered address or value changes. `Midi` and `Osc` are ordinary
components in the same server-side React tree.

`Motu` also accepts a parent path with a partial map of relative leaf paths.
The MOTU datastore transport sends the map in one request:

```tsx
<Motu
  path="mix/chan/0"
  value={{
    'matrix/fader': 0.75,
    'matrix/mute': 0,
    'matrix/pan': 0,
  }}
/>
```

## Setup

This project currently consumes the local React Ctrl workspace packages:

```sh
cd ../react-midi
npm run build
npm link -w @react-ctrl/node

cd ../motu-control
npm install
npm link @react-ctrl/node
```

## Run

```sh
npm run build
npm start
```

Configuration is available through environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `MIDI_INPUT` | `MPK261 Port A` | MIDI input port name |
| `MOTU_HTTP_ORIGIN` | `http://127.0.0.1:1280` | Local MOTU datastore service |
| `MOTU_DEVICE_ID` | first connected device | Optional MOTU UID |
| `MOTU_OSC_HOST` | unset | Direct UDP OSC host; enables UDP instead of the local service |
| `MOTU_OSC_PORT` | `9998` | Direct UDP OSC port |

By default the app discovers the first interface through the local MOTU service.
This works when the interface is connected over USB and has no resolvable
`.local` hostname. To use direct UDP OSC for a network-connected interface:

```sh
MOTU_OSC_HOST=192.168.1.50 npm start
```
