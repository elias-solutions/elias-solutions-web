import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  const setActiveLang = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    setActiveLang.mockClear();
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslocoService, useValue: { setActiveLang, getActiveLang: () => 'de' } },
      ],
    });
  });

  it('defaults to German and activates it on Transloco', () => {
    const service = TestBed.inject(LanguageService);
    expect(service.active()).toBe('de');
    expect(setActiveLang).toHaveBeenCalledWith('de');
  });

  it('switches language, persists it and activates it on Transloco', () => {
    const service = TestBed.inject(LanguageService);

    service.use('fr');

    expect(service.active()).toBe('fr');
    expect(localStorage.getItem('es-lang')).toBe('fr');
    expect(setActiveLang).toHaveBeenLastCalledWith('fr');
    expect(document.documentElement.lang).toBe('fr');
  });

  it('restores a stored language on init', () => {
    localStorage.setItem('es-lang', 'it');
    const service = TestBed.inject(LanguageService);
    expect(service.active()).toBe('it');
    expect(setActiveLang).toHaveBeenCalledWith('it');
  });
});
