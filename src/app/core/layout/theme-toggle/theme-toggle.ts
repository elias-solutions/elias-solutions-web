import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'es-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <button
      *transloco="let t"
      type="button"
      role="switch"
      class="toggle"
      [class.on]="isDark()"
      [attr.aria-checked]="isDark()"
      [attr.aria-label]="isDark() ? t('theme.toLight') : t('theme.toDark')"
      (click)="theme.toggle()"
    >
      <svg class="ic sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
        </g>
      </svg>
      <span class="knob"></span>
      <svg class="ic moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" fill="currentColor" />
      </svg>
    </button>
  `,
  styles: `
    :host { display: inline-flex; }
    .toggle {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      width: 58px;
      height: 26px;
      padding: 0 6px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 999px;
      background: transparent;
      cursor: pointer;
    }
    .ic { width: 14px; height: 14px; flex: none; }
    .sun { color: #ffd23f; }
    .moon { color: rgba(255, 255, 255, 0.7); }
    .knob {
      position: absolute;
      top: 50%;
      left: 3px;
      width: 18px;
      height: 18px;
      transform: translateY(-50%);
      background: #ffffff;
      border-radius: 50%;
      transition: left 0.2s ease;
    }
    .toggle.on .knob { left: 37px; }
    @media (prefers-reduced-motion: reduce) {
      .knob { transition: none; }
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly isDark = computed(() => this.theme.theme() === 'dark');
}
