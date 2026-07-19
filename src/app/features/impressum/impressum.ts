import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { COMPANY } from '../../core/company';

@Component({
  selector: 'es-impressum',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('nav.legal') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('pages.legal.title') }}</h1>
          <p class="note">{{ t('pages.legal.lead') }}</p>
        </div>

        <dl class="legal">
          <dt>{{ company.name }}</dt>
          <dd>{{ company.street }}, {{ company.postalCode }} {{ company.city }}, {{ t('footer.country') }}</dd>
          <dd>{{ company.owner }}</dd>
          <dd><a [href]="'mailto:' + company.email">{{ company.email }}</a></dd>
          <dd><a [href]="'https://' + company.domain">{{ company.domain }}</a></dd>
        </dl>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .legal { line-height: 1.9; }
    .legal dt { font-weight: 800; font-size: var(--step-1); }
    .legal dd { margin: 0; color: var(--muted); }
    .legal a { color: var(--ink); text-decoration: none; }
    .legal a:hover { color: var(--red); }
  `,
})
export class Impressum {
  protected readonly company = COMPANY;
}
