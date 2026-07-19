import { Observable } from 'rxjs';
import { AssetPrice } from '../portfolio/currency';

/**
 * Abstraction for a source of an asset's current price (per unit).
 *
 * Used as a base type so concrete data sources (e.g. CoinGecko for BTC or gold)
 * can be swapped — including a fake in tests — without touching consumers.
 */
export abstract class PriceProvider {
  /** Emits the current price of one unit in every supported currency. */
  abstract getAssetPrice(): Observable<AssetPrice>;
}
