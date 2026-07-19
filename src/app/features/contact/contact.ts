import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { COMPANY } from '../../core/company';
import { ContactButton } from './contact-button/contact-button';

@Component({
  selector: 'es-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, ContactButton],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('nav.contact') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('pages.contact.title') }}</h1>
          <p class="note">{{ t('pages.contact.lead') }}</p>
        </div>

        <p class="body">{{ t('pages.contact.body') }}</p>

        <div class="layout">
          <div class="cta">
            <es-contact-button />
          </div>

          <address class="card">
            <strong>{{ company.name }}</strong><br />
            {{ company.street }}<br />
            {{ company.postalCode }} {{ company.city }}<br />
            {{ t('footer.country') }}<br /><br />
            {{ company.owner }}
          </address>
        </div>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .body { max-width: 68ch; font-size: var(--step-0); line-height: 1.65; margin: 0 0 40px; color: var(--ink); }
    .layout { display: flex; flex-direction: column; align-items: flex-start; gap: 40px; }
    .card { font-style: normal; line-height: 1.8; font-size: var(--step-1); }
    .card strong { font-weight: 800; }
  `,
})
export class Contact {
  protected readonly company = COMPANY;
}
