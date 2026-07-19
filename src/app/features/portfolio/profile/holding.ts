import { Currency } from '../portfolio/currency';

/** A user's position in one asset, as captured on the profile page. */
export interface Holding {
  /** Total amount held (BTC, grams of gold, …). */
  amount: number;
  /** Entry price paid per unit, expressed in {@link entryCurrency}. */
  entryPrice: number;
  /** Currency the entry price was entered in. */
  entryCurrency: Currency;
}

/** A blank holding used before the user has entered anything. */
export const EMPTY_HOLDING: Holding = {
  amount: 0,
  entryPrice: 0,
  entryCurrency: 'usd',
};
