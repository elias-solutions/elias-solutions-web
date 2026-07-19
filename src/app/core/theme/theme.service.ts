import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'es-theme';

/**
 * Manual light/dark theme, reflected on `<html data-theme>` (also set pre-paint
 * by an inline script in index.html). First-time visitors follow their OS
 * preference; the choice is only persisted once the user actively toggles.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly theme = signal<Theme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      const initial: Theme =
        stored === 'dark' || stored === 'light' ? stored : this.systemPreference();
      this.applyDom(initial);
    }
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.applyDom(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  private applyDom(theme: Theme): void {
    this.theme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  private systemPreference(): Theme {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
