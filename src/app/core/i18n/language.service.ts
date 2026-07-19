import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

import { AppLang, AVAILABLE_LANGS, DEFAULT_LANG, isAppLang } from './transloco.tokens';

const STORAGE_KEY = 'es-lang';

/**
 * Single source of truth for the active UI language. Wraps TranslocoService so
 * components depend on an intention-revealing abstraction, and keeps the
 * `<html lang>` attribute and persisted preference in sync — browser only.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly languages = AVAILABLE_LANGS;
  readonly active = signal<AppLang>(DEFAULT_LANG);

  constructor() {
    this.use(this.restorePreferred());
  }

  use(lang: AppLang): void {
    this.transloco.setActiveLang(lang);
    this.active.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }

  private restorePreferred(): AppLang {
    if (!isPlatformBrowser(this.platformId)) {
      return DEFAULT_LANG;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    return isAppLang(stored) ? stored : DEFAULT_LANG;
  }
}
