import { Injectable } from '@angular/core';
import { CoingeckoSpotPriceService } from './coingecko-spot-price.service';

/** Current Bitcoin price (per BTC) from CoinGecko. */
@Injectable({ providedIn: 'root' })
export class CoingeckoPriceService extends CoingeckoSpotPriceService {
  protected readonly coinId = 'bitcoin';
}
