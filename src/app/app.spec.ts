import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';

import { App } from './app';
import { StaticTranslocoLoader } from './core/i18n/transloco.loader';
import { AVAILABLE_LANGS, DEFAULT_LANG } from './core/i18n/transloco.tokens';

describe('App shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideTransloco({
          config: {
            availableLangs: [...AVAILABLE_LANGS],
            defaultLang: DEFAULT_LANG,
            reRenderOnLangChange: true,
          },
          loader: StaticTranslocoLoader,
        }),
      ],
    }).compileComponents();
  });

  it('creates the shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
