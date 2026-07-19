import { PriceProvider } from '../price/price-provider';

/** Everything the dashboard needs to render and price one asset. */
export interface AssetConfig {
  /** Stable key used to store and look up the user's holding, e.g. "btc". */
  id: string;
  /** Display name, e.g. "Bitcoin" or "Gold". */
  name: string;
  /** Small emblem shown next to the name, e.g. "₿" or "🪙". */
  emblem: string;
  /** Unit the amount is measured in, e.g. "BTC" or "Gramm". */
  unitLabel: string;
  /** Source of the asset's current price. */
  provider: PriceProvider;
}
