/** Non-translatable company facts — single source of truth. */
export const COMPANY = {
  name: 'Elias Solutions GmbH',
  owner: 'Jonas Elias',
  street: 'Solothurnerstrasse 2',
  postalCode: '4614',
  city: 'Hägendorf',
  domain: 'www.elias-solutions.ch',
  email: 'contact@elias-solutions.ch',
  uid: 'CHE-147.965.804',
  vat: 'CHE-147.965.804 MWST',
  phone: '',
} as const;

export type Company = typeof COMPANY;
