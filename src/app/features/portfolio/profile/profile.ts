import { Holding } from './holding';

/** A named set of holdings the user can switch between. */
export interface Profile {
  /** Stable identifier. */
  id: string;
  /** Display name shown in the profile dropdown. */
  name: string;
  /** Holdings keyed by asset id. */
  holdings: Record<string, Holding>;
}
