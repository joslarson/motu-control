import { Osc } from './osc';
import { MotuPath, MotuValue } from './ultralite-mk4';

export type { MotuPath, MotuValue } from './ultralite-mk4';

type NoInferPath<Path> = [Path][Path extends unknown ? 0 : never];

export type MotuProps<Path extends MotuPath> = {
  path: Path;
  value: MotuValue<NoInferPath<Path>>;
  label?: string;
};

/**
 * Renders a MOTU datastore endpoint as an OSC-addressed value. The generated
 * Datastore type determines which paths are valid and the value each accepts.
 */
export function Motu<Path extends MotuPath>({ path, value, label }: MotuProps<Path>) {
  // Osc's portable value type is scalar; the MOTU transport additionally
  // understands subtree objects and posts them as one datastore operation.
  return <Osc address={`/${path}`} value={value as unknown as number | string} label={label} />;
}
