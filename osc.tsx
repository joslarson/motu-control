import {
  OscSendResult,
  OscTransport,
  OscValue,
} from '@react-ctrl/node';

export {
  Osc,
  OscProvider,
  type OscProps,
  type OscSendResult,
  type OscTransport,
  type OscValue,
} from '@react-ctrl/node';

export type MotuOscTransportOptions = {
  origin?: string;
  deviceId?: string;
  clientId?: string;
};

export type MotuOscBatch = Record<string, OscValue>;

export interface MotuOscTransport extends Omit<OscTransport, 'send'> {
  send(
    address: string,
    value: OscValue | MotuOscBatch
  ): Promise<OscSendResult>;
}

/**
 * Sends OSC-addressed values through MOTU's local datastore service. This is
 * the default transport because it also works for USB-connected interfaces
 * that do not expose a resolvable network hostname.
 */
export function createMotuOscTransport({
  origin = 'http://127.0.0.1:1280',
  deviceId,
  clientId = `${Math.round(Math.random() * 10_000_000_000)}`,
}: MotuOscTransportOptions = {}): MotuOscTransport {
  type QueuedWrite = {
    address: string;
    value: OscValue | MotuOscBatch;
    resolve: (result: OscSendResult) => void;
    reject: (error: unknown) => void;
  };

  const resolvedDeviceId = deviceId
    ? Promise.resolve(deviceId)
    : fetch(`${origin}/connected_devices`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Unable to discover MOTU devices: HTTP ${response.status}`);
          }
          return response.json() as Promise<Array<{ uid: string }>>;
        })
        .then(devices => {
          if (!devices.length) {
            throw new Error('No MOTU devices found');
          }
          return devices[0].uid;
        });

  const queuedWrites = new Map<string, QueuedWrite>();
  let drainPromise: Promise<void> | null = null;
  let closed = false;

  const post = async ({ address, value }: QueuedWrite) => {
    const id = await resolvedDeviceId;
    const path = address.replace(/^\/+/, '');
    const isBatch = typeof value === 'object' && value !== null && !(value instanceof Uint8Array);
    const formData = new FormData();
    formData.append('json', JSON.stringify(isBatch ? value : { [path]: value }));
    const datastorePath = isBatch ? `/datastore/${path}` : '/datastore';
    const response = await fetch(`${origin}/${id}${datastorePath}?client=${clientId}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`MOTU datastore returned HTTP ${response.status}`);
    }
  };

  const drain = async () => {
    while (queuedWrites.size > 0) {
      const write = queuedWrites.values().next().value as QueuedWrite;
      queuedWrites.delete(write.address);

      let sent = false;
      for (let attempt = 0; attempt < 3 && !sent; attempt += 1) {
        try {
          await post(write);
          write.resolve('sent');
          sent = true;
        } catch (error) {
          // Do not retry a stale value when a newer value for this address is queued.
          if (queuedWrites.has(write.address)) {
            write.resolve('superseded');
            sent = true;
          } else if (attempt < 2) {
            await new Promise(resolve => setTimeout(resolve, 50 * 2 ** attempt));
          } else {
            write.reject(error);
          }
        }
      }
    }
  };

  const scheduleDrain = () => {
    if (drainPromise) return;
    drainPromise = drain().finally(() => {
      drainPromise = null;
      if (queuedWrites.size > 0) {
        scheduleDrain();
      }
    });
  };

  return {
    send(address, value) {
      if (closed) {
        return Promise.reject(new Error('OSC transport is closed'));
      }

      const existing = queuedWrites.get(address);
      existing?.resolve('superseded');

      const result = new Promise<OscSendResult>((resolve, reject) => {
        queuedWrites.set(address, { address, value, resolve, reject });
      });
      scheduleDrain();
      return result;
    },
    async close() {
      closed = true;
      await drainPromise;
    },
  };
}
