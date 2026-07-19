import { Injectable } from '@angular/core';
import { CoingeckoMetalPriceService } from './coingecko-metal-price.service';

/**
 * Current gold price (per gram) from CoinGecko, using PAX Gold (PAXG) as a
 * proxy for the spot price. PAXG is backed 1:1 by one fine troy ounce.
 */
@Injectable({ providedIn: 'root' })
export class CoingeckoGoldPriceService extends CoingeckoMetalPriceService {
  protected readonly coinId = 'pax-gold';
}
