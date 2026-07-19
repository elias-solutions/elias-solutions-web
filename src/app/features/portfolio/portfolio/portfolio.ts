import { Currency } from './currency';

/** What the user holds and what they paid for it. The entry price is in USD. */
export interface PortfolioInput {
  /** Amount of the asset held (BTC, grams of gold, …). */
  amount: number;
  /** Purchase price paid per single unit, always expressed in USD. */
  costPerUnitUsd: number;
}

/** Portfolio figures for a single currency, at the current price. */
export interface CurrencyBreakdown {
  /** Entry price per unit converted to this currency at the current implied rate. */
  costPerUnit: number;
  /** Current market price of one unit in this currency. */
  currentPrice: number;
  /** Current market value of the held amount in this currency. */
  currentValue: number;
  /** Absolute profit (positive) or loss (negative) in this currency. */
  profit: number;
}

/** Computed performance of a portfolio, broken down per currency. */
export interface PortfolioResult {
  /** Profit/loss relative to the entry price, in percent (equal across currencies). */
  profitPercent: number;
  /** Figures keyed by currency. */
  byCurrency: Record<Currency, CurrencyBreakdown>;
}
