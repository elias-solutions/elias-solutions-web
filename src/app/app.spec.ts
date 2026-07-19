import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';

import { App } from './app';
import { StaticTranslocoLoader } from './core/i18n/transloco.loader';
import { AVAILABLE_LANGS, DEFAULT_LANG } from './core/i18n/transloco.tokens';

function langButtons(fixture: { nativeElement: HTMLElement }): HTMLButtonElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('.lang button'));
}

describe('App shell', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideTransloco({
          config: {
            availableLangs: [...AVAILABLE_LANGS],
            defaultLang: DEFAULT_LANG,
            fallbackLang: DEFAULT_LANG,
            reRenderOnLangChange: true,
            prodMode: false,
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

  it('offers all four languages and defaults to German', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const buttons = langButtons(fixture);
    expect(buttons.map((b) => b.textContent?.trim())).toEqual(['DE', 'FR', 'IT', 'EN']);

    const de = buttons.find((b) => b.textContent?.trim() === 'DE');
    expect(de?.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('nav.main a')?.textContent).toContain('Start');
  });

  it('switches the UI language when another language is selected', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const fr = langButtons(fixture).find((b) => b.textContent?.trim() === 'FR');
    fr?.click();
    fixture.detectChanges();

    expect(fr?.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('nav.main a')?.textContent).toContain('Accueil');
  });
});
