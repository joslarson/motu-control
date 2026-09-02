import { Datastore, DatastoreKey, ExtractDataStoreKey } from "./api";

type Start<T extends string, S extends string = ''> = T extends `${infer CHAR}${infer REST}`
  ? REST extends `/${number}` | `/${number}/${string}`
    ? `${S}${CHAR}`
    : Start<REST, `${S}${CHAR}`>
  : never;


type DataStoreStart = Start<DatastoreKey>

const asyncSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type MotuClientOptions = {
  origin: string;
  clientId: string;
  deviceId: string;
  labels: Record<string, string>;
};

const fetchFirstDeviceId = async (origin: string) => {
  console.log(`${origin}/connected_devices`);
  const res = await fetch(`${origin}/connected_devices`);
  if (!res.ok) throw res;

  const deviceList = await res.json() as { uid: string; }[];
  if (!deviceList.length) throw new Error('No devices found');

  return deviceList[0].uid;
};

export const createMotuClient = (initOptions: Partial<MotuClientOptions> = {}) => {
  const origin = initOptions.origin || 'http://127.0.0.1:1280';
  const optionsPromise = new Promise<MotuClientOptions>(async (resolve) => {
    resolve({
      origin,
      clientId: initOptions.clientId || `${Math.round(Math.random() * 10000000000)}`,
      deviceId: initOptions.deviceId || await fetchFirstDeviceId(origin),
      labels: initOptions.labels || {},
    });
  });
  let etag: null | string = null;

  const fetchChanges = async (
    { origin, deviceId, clientId }: MotuClientOptions
  ) => {
    const res = await fetch(
      `${origin}/${deviceId}/datastore?client=${clientId}`,
      { headers: etag ? { 'if-none-match': etag } : {} }
    );

    if (!res.ok) {
      if (res.status !== 304) {
        console.log(res);
        await asyncSleep(2000);
      }
      return null;
    }

    etag = res.headers.get('etag') || null;

    try {
      return await res.json() as Datastore;
    } catch (e) {
      console.log(e);
      await asyncSleep(2000);
      return null;
    }
  };

  // init store
  let currentStore: Datastore | null = null;
  let nextStorePromise = optionsPromise.then(async (options) => {
    currentStore = await fetchChanges(options) as Datastore;
    return currentStore;
  });

  const getStore = async () => currentStore ?? await nextStorePromise;

  // poll for changes
  const pollChanges = async () => {
    nextStorePromise = new Promise<Datastore>(async (resolve) => {
      const options = await optionsPromise;
      const changeData = await fetchChanges(options);
      const prevStore = await getStore(); // wait until current store promise has been initialized/resolved to start/continue polling

      if (changeData !== null) {
        resolve(changeData === null ? prevStore : { ...prevStore, ...changeData });
      } else {
        resolve(prevStore);
      }
    }).catch(async () => await getStore());

    await nextStorePromise; // wait for nextStorePromise before polling again

    pollChanges();
  };

  // start polling
  pollChanges();

  const scheduledChanges: Record<string, (() => Promise<void>) | null> = {};
  const changePromises: Record<string, Promise<void> | null> = {};

  // return client
  return {
    sub<T extends DatastoreKey>() {

    },
    async get<T extends DatastoreKey>(path: T) {
      type ExtractedKey = ExtractDataStoreKey<T> extends string ? ExtractDataStoreKey<T> : never;
      const store = await getStore();
      const matchingKeys = Object.keys(store).filter(key => key.startsWith(path));

      const result = matchingKeys.reduce((acc, key) => {
        const subKey = key.split(path).slice(1).join('');
        if (subKey === key) {
          return store[key as keyof Datastore];
        } else {
          // @ts-ignore
          acc[subKey] = store[key];
        }

        return acc;
      }, {});

      return result as ExtractedKey extends keyof Datastore ? Datastore[ExtractedKey] : {
        [K in (keyof Datastore) as K extends `${ExtractedKey}/${infer REST}` ? REST : never]: Datastore[K];
      };
    },

    async set<T extends DatastoreKey>(
      path: T,
      value: ExtractDataStoreKey<T> extends keyof Datastore ? Datastore[ExtractDataStoreKey<T>] : never
    ) {
      scheduledChanges[path] = async () => {
        const { deviceId, clientId, labels } = await optionsPromise;
        const formData = new FormData();
        formData.append("json", JSON.stringify({ [path]: value }));
        console.log(`${labels[path]}:`, value);
        const res = await fetch(
          `${origin}/${deviceId}/datastore?client=${clientId}`,
          { method: 'POST', body: formData }
        );
      };

      await changePromises[path];

      if (scheduledChanges[path]) {
        changePromises[path] = scheduledChanges[path]?.() || null;
        scheduledChanges[path] = null;
      }
    },
  };
};
