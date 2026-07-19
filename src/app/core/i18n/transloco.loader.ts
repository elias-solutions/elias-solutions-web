import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { of } from 'rxjs';

import de from '../../i18n/de.json';
import en from '../../i18n/en.json';
import fr from '../../i18n/fr.json';
import it from '../../i18n/it.json';
import { AppLang, DEFAULT_LANG } from './transloco.tokens';

const TRANSLATIONS: Record<AppLang, Translation> = { de, fr, it, en };

/**
 * Translations are bundled and served synchronously. This keeps language
 * loading identical on the server (SSR / prerender) and in the browser — no
 * HTTP round-trip that could fail during static rendering.
 */
@Injectable({ providedIn: 'root' })
export class StaticTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of(TRANSLATIONS[lang as AppLang] ?? TRANSLATIONS[DEFAULT_LANG]);
  }
}
