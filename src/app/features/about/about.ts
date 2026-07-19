import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'es-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('nav.about') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('pages.about.title') }}</h1>
          <p class="note">{{ t('pages.about.lead') }}</p>
        </div>

        <div class="cols">
          <article>
            <h2>{{ t('pillars.dev.title') }}</h2>
            <p>{{ t('pillars.dev.text') }}</p>
          </article>
          <article>
            <h2>{{ t('pillars.ai.title') }}</h2>
            <p>{{ t('pillars.ai.text') }}</p>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 20px; }
    .cols h2 { font-size: var(--step-1); font-weight: 800; margin: 0 0 10px; }
    .cols p { margin: 0; color: var(--muted); max-width: 46ch; }
    @media (max-width: 720px) { .cols { grid-template-columns: 1fr; } }
  `,
})
export class About {}
