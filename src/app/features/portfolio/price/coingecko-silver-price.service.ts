import { Injectable } from '@angular/core';
import { CoingeckoMetalPriceService } from './coingecko-metal-price.service';

/**
 * Current silver price (per gram) from CoinGecko, using Kinesis Silver (KAG) as
 * a proxy for the spot price. KAG is backed 1:1 by one fine troy ounce.
 */
@Injectable({ providedIn: 'root' })
export class CoingeckoSilverPriceService extends CoingeckoMetalPriceService {
  protected readonly coinId = 'kinesis-silver';
}
