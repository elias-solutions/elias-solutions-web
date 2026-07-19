import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { COMPANY } from '../../core/company';

@Component({
  selector: 'es-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('nav.contact') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('pages.contact.title') }}</h1>
          <p class="note">{{ t('pages.contact.lead') }}</p>
        </div>

        <address class="card">
          <strong>{{ company.name }}</strong><br />
          {{ company.street }}<br />
          {{ company.postalCode }} {{ company.city }}<br />
          {{ t('footer.country') }}
          <div class="links">
            <a class="btn solid" [href]="'mailto:' + company.email">{{ company.email }}</a>
            <a class="btn" [href]="'https://' + company.domain">{{ company.domain }}</a>
          </div>
        </address>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .card { font-style: normal; line-height: 1.8; font-size: var(--step-1); }
    .card strong { font-weight: 800; }
    .links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
  `,
})
export class Contact {
  protected readonly company = COMPANY;
}
