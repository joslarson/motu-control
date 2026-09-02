import snapshot from './motu.json';
import { Datastore, DatastoreKey, ExtractDataStoreKey } from './api';

type UltraLiteMk4Snapshot = typeof snapshot;
type SupportedControlPath = `mix/${string}` | `ext/${string}`;

type ParentPaths<Path extends string> =
  Path extends `${infer Head}/${infer Tail}`
    ? Head | `${Head}/${ParentPaths<Tail>}`
    : Path;

/**
 * Exact writable leaves exposed by the UltraLite mk4 snapshot and supported
 * by this application.
 */
type MotuLeafPath = Extract<
  Extract<keyof UltraLiteMk4Snapshot, SupportedControlPath>,
  DatastoreKey
>;

export type MotuPath = ParentPaths<MotuLeafPath>;

type MotuLeafValue<Path extends MotuLeafPath> =
  ExtractDataStoreKey<Path> extends keyof Datastore
    ? Datastore[ExtractDataStoreKey<Path>]
    : never;

type GeneralizePath<Path extends string> =
  Path extends `${infer Head}/${infer Tail}`
    ? `${Head extends `${number}` ? `${number}` : Head}/${GeneralizePath<Tail>}`
    : Path extends `${number}`
      ? `${number}`
      : Path;

type MotuSubtreeValue<Path extends MotuPath> = Partial<{
  [Leaf in keyof Datastore as Leaf extends `${GeneralizePath<Path>}/${infer RelativePath}`
    ? RelativePath
    : never]: Datastore[Leaf];
}>;

/**
 * Leaves accept their scalar value. Parent paths accept a partial map of
 * slash-delimited descendant paths, matching MOTU's subtree update API.
 */
export type MotuValue<Path extends MotuPath> =
  Path extends MotuLeafPath ? MotuLeafValue<Path> : MotuSubtreeValue<Path>;

export type MotuFaderPath = Extract<
  MotuPath,
  `mix/${'chan' | 'main' | 'monitor'}/${number}/matrix/fader`
>;
