export const AVAILABLE_LANGS = ['de', 'fr', 'it', 'en'] as const;

export type AppLang = (typeof AVAILABLE_LANGS)[number];

export const DEFAULT_LANG: AppLang = 'de';

export function isAppLang(value: string | null | undefined): value is AppLang {
  return !!value && (AVAILABLE_LANGS as readonly string[]).includes(value);
}
