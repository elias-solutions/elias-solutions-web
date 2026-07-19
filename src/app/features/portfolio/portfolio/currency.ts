export const CURRENCIES = ['usd', 'eur', 'chf'] as const;

export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_LABELS: Record<Currency, string> = {
  eur: 'Euro (€)',
  chf: 'Schweizer Franken (CHF)',
  usd: 'US-Dollar ($)',
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  eur: '€',
  chf: 'CHF',
  usd: '$',
};

/** Current price of one unit of an asset, keyed by fiat currency. */
export type AssetPrice = Record<Currency, number>;
