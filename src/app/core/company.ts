/** Non-translatable company facts — single source of truth. */
export const COMPANY = {
  name: 'Elias Solutions GmbH',
  owner: 'Jonas Elias',
  street: 'Solothurnerstrasse 2',
  postalCode: '4614',
  city: 'Hägendorf',
  domain: 'elias-solutions.ch',
  email: 'contact@elias-solutions.ch',
} as const;

export type Company = typeof COMPANY;
