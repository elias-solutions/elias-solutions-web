import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
  AssetPrice,
  CURRENCIES,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
} from '../portfolio/currency';
import { PortfolioCalculator } from '../portfolio/portfolio-calculator';
import { PricePollingService } from '../price/price-polling.service';
import { PriceState } from '../price/price-state';
import { EMPTY_HOLDING } from '../profile/holding';
import { ProfileService } from '../profile/profile.service';
import { AssetConfig } from './asset-config';

@Component({
  selector: 'app-asset-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './asset-dashboard.html',
  styleUrl: './asset-dashboard.scss',
})
export class AssetDashboard {
  readonly asset = input.required<AssetConfig>();

  private readonly poller = inject(PricePollingService);
  private readonly calculator = inject(PortfolioCalculator);
  private readonly profile = inject(ProfileService);

  protected readonly currencies = CURRENCIES;
  protected readonly currencyLabels = CURRENCY_LABELS;
  protected readonly currencySymbols = CURRENCY_SYMBOLS;

  protected readonly holding = computed(
    () => this.profile.holdings()[this.asset().id] ?? EMPTY_HOLDING,
  );
  protected readonly hasData = computed(() => {
    const holding = this.holding();
    return holding.amount > 0 || holding.entryPrice > 0;
  });

  private readonly priceState = toSignal(
    toObservable(this.asset).pipe(switchMap((asset) => this.poller.poll(asset.provider))),
    { initialValue: { status: 'loading' } as PriceState },
  );

  /** Last successfully fetched price, retained across failing polls. */
  private readonly price = signal<AssetPrice | null>(null);
  protected readonly updatedAt = signal<Date | null>(null);

  protected readonly loading = computed(
    () => this.priceState().status === 'loading' && this.price() === null,
  );
  protected readonly error = computed(() => {
    const state = this.priceState();
    return state.status === 'error' ? state.message : null;
  });

  protected readonly result = computed(() => {
    const price = this.price();
    if (price === null) {
      return null;
    }
    const holding = this.holding();
    const referencePrice = price[holding.entryCurrency];
    const costPerUnitUsd = referencePrice > 0 ? holding.entryPrice * (price.usd / referencePrice) : 0;

    return this.calculator.calculate({ amount: holding.amount, costPerUnitUsd }, price);
  });

  constructor() {
    effect(() => {
      const state = this.priceState();
      if (state.status === 'success') {
        this.price.set(state.price);
        this.updatedAt.set(state.updatedAt);
      }
    });
  }
}
