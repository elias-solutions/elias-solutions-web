import { Injectable, inject } from '@angular/core';
import { CoingeckoGoldPriceService } from '../price/coingecko-gold-price.service';
import { CoingeckoPriceService } from '../price/coingecko-price.service';
import { CoingeckoSilverPriceService } from '../price/coingecko-silver-price.service';
import { AssetConfig } from './asset-config';

/** The set of assets the app tracks. Shared by the dashboard and profile pages. */
@Injectable({ providedIn: 'root' })
export class AssetRegistry {
  readonly assets: readonly AssetConfig[] = [
    {
      id: 'btc',
      name: 'Bitcoin',
      emblem: '₿',
      unitLabel: 'BTC',
      provider: inject(CoingeckoPriceService),
    },
    {
      id: 'gold',
      name: 'Gold',
      emblem: '🪙',
      unitLabel: 'Gramm',
      provider: inject(CoingeckoGoldPriceService),
    },
    {
      id: 'silver',
      name: 'Silber',
      emblem: '🥈',
      unitLabel: 'Gramm',
      provider: inject(CoingeckoSilverPriceService),
    },
  ];
}
