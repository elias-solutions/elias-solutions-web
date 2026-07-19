import { AssetPrice, CURRENCIES } from '../portfolio/currency';
import { CoingeckoSpotPriceService } from './coingecko-spot-price.service';

/** One troy ounce in grams — tokenized metals are quoted per troy ounce. */
export const GRAMS_PER_TROY_OUNCE = 31.1034768;

/**
 * Base for precious-metal providers backed by a tokenized ounce (PAXG, KAG, …).
 * Converts the per-ounce quote into a per-gram price; subclasses set the coin id.
 */
export abstract class CoingeckoMetalPriceService extends CoingeckoSpotPriceService {
  protected override transform(perOunce: AssetPrice): AssetPrice {
    return CURRENCIES.reduce((perGram, currency) => {
      perGram[currency] = perOunce[currency] / GRAMS_PER_TROY_OUNCE;
      return perGram;
    }, {} as AssetPrice);
  }
}
