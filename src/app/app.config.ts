import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTransloco } from '@jsverse/transloco';

import { routes } from './app.routes';
import { StaticTranslocoLoader } from './core/i18n/transloco.loader';
import { AVAILABLE_LANGS, DEFAULT_LANG } from './core/i18n/transloco.tokens';
import { CONTACT_SENDER } from './core/contact/contact-sender';
import { EmailjsContactSender } from './core/contact/emailjs-contact-sender';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideTransloco({
      config: {
        availableLangs: [...AVAILABLE_LANGS],
        defaultLang: DEFAULT_LANG,
        fallbackLang: DEFAULT_LANG,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: StaticTranslocoLoader,
    }),
    { provide: CONTACT_SENDER, useClass: EmailjsContactSender },
  ],
};
