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

        <dl class="facts">
          <dt>{{ t('pages.legal.companyLabel') }}</dt>
          <dd>{{ company.name }}</dd>

          <dt>{{ t('pages.legal.legalFormLabel') }}</dt>
          <dd>{{ t('pages.legal.legalForm') }}</dd>

          <dt>{{ t('pages.legal.addressLabel') }}</dt>
          <dd>{{ company.street }}, {{ company.postalCode }} {{ company.city }}, {{ t('footer.country') }}</dd>

          <dt>{{ t('pages.legal.representedByLabel') }}</dt>
          <dd>{{ company.owner }}</dd>

          <dt>{{ t('pages.legal.registerLabel') }}</dt>
          <dd>{{ t('pages.legal.register') }}</dd>

          <dt>{{ t('pages.legal.uidLabel') }}</dt>
          <dd>{{ company.uid }}</dd>

          @if (company.vat) {
            <dt>{{ t('pages.legal.vatLabel') }}</dt>
            <dd>{{ company.vat }}</dd>
          }

          <dt>{{ t('pages.legal.contactLabel') }}</dt>
          <dd>
            @if (company.phone) {
              {{ t('pages.legal.phoneLabel') }}: {{ company.phone }}<br />
            }
            {{ t('pages.legal.emailLabel') }}:
            <a [href]="'mailto:' + company.email">{{ company.email }}</a><br />
            {{ t('pages.legal.webLabel') }}:
            <a [href]="'https://' + company.domain">{{ company.domain }}</a>
          </dd>
        </dl>

        <div class="prose">
          <h2>{{ t('pages.legal.disclaimerTitle') }}</h2>
          <p>{{ t('pages.legal.disclaimer') }}</p>

          <h2>{{ t('pages.legal.linksTitle') }}</h2>
          <p>{{ t('pages.legal.links') }}</p>

          <h2>{{ t('pages.legal.copyrightTitle') }}</h2>
          <p>{{ t('pages.legal.copyright') }}</p>

          <h2>{{ t('pages.legal.dataProtectionTitle') }}</h2>
          <p>{{ t('pages.legal.dataProtection') }}</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }

    .facts {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 12px 40px;
      margin: 0 0 56px;
      max-width: 820px;
    }
    .facts dt { font-weight: 800; }
    .facts dd { margin: 0; color: var(--muted); line-height: 1.6; }
    .facts a { color: var(--ink); text-decoration: none; }
    .facts a:hover { color: var(--red); }
    @media (max-width: 560px) {
      .facts { grid-template-columns: 1fr; gap: 4px 0; }
      .facts dd { margin-bottom: 14px; }
    }

    .prose { max-width: 72ch; display: grid; gap: 6px; }
    .prose h2 { font-size: var(--step-1); font-weight: 800; letter-spacing: -0.01em; margin: 28px 0 6px; }
    .prose p { margin: 0; color: var(--muted); line-height: 1.65; }
  `,
})
export class Impressum {
  protected readonly company = COMPANY;
}
