import { AssetPrice } from '../portfolio/currency';

/** Outcome of a single price poll, ready for the UI to render. */
export type PriceState =
  | { status: 'loading' }
  | { status: 'success'; price: AssetPrice; updatedAt: Date }
  | { status: 'error'; message: string };
