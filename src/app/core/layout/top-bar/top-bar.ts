import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { LanguageService } from '../../i18n/language.service';
import { AppLang } from '../../i18n/transloco.tokens';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'es-top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe, ThemeToggle],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  protected readonly i18n = inject(LanguageService);

  protected select(lang: AppLang): void {
    this.i18n.use(lang);
  }
}
