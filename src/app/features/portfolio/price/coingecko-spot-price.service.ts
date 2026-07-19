import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AssetPrice, CURRENCIES } from '../portfolio/currency';
import { PriceProvider } from './price-provider';

/**
 * Shared {@link PriceProvider} for CoinGecko's free public simple-price API.
 *
 * Subclasses name the CoinGecko coin id; they may override {@link transform} to
 * convert the coin's native quote into the desired unit (e.g. per gram).
 */
export abstract class CoingeckoSpotPriceService extends PriceProvider {
  /** CoinGecko coin id to quote, e.g. `bitcoin` or `pax-gold`. */
  protected abstract readonly coinId: string;

  protected readonly http = inject(HttpClient);

  getAssetPrice(): Observable<AssetPrice> {
    const url =
      `https://api.coingecko.com/api/v3/simple/price?ids=${this.coinId}` +
      `&vs_currencies=${CURRENCIES.join(',')}`;

    return this.http
      .get<Record<string, AssetPrice>>(url)
      .pipe(map((response) => this.transform(response[this.coinId])));
  }

  /** Converts the coin's quoted price into the price of one asset unit. */
  protected transform(price: AssetPrice): AssetPrice {
    return price;
  }
}
