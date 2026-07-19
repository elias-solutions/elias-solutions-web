import { Injectable } from '@angular/core';
import { AssetPrice, CURRENCIES, Currency } from './currency';
import { CurrencyBreakdown, PortfolioInput, PortfolioResult } from './portfolio';

/**
 * Pure calculation of portfolio performance from a USD-denominated holding and
 * the asset's current price in every supported currency. The entry price is
 * converted into each currency using the current asset-implied FX rate.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioCalculator {
  calculate(input: PortfolioInput, price: AssetPrice): PortfolioResult {
    const usdPrice = price.usd;
    const profitPercent =
      input.costPerUnitUsd > 0 ? ((usdPrice - input.costPerUnitUsd) / input.costPerUnitUsd) * 100 : 0;

    const byCurrency = CURRENCIES.reduce(
      (acc, currency) => {
        acc[currency] = this.breakdown(input, price, currency);
        return acc;
      },
      {} as Record<Currency, CurrencyBreakdown>,
    );

    return { profitPercent, byCurrency };
  }

  private breakdown(
    input: PortfolioInput,
    price: AssetPrice,
    currency: Currency,
  ): CurrencyBreakdown {
    const currentPrice = price[currency];
    const fxFromUsd = price.usd > 0 ? currentPrice / price.usd : 0;
    const costPerUnit = input.costPerUnitUsd * fxFromUsd;
    const currentValue = input.amount * currentPrice;
    const profit = input.amount * (currentPrice - costPerUnit);

    return { costPerUnit, currentPrice, currentValue, profit };
  }
}
