import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'es-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('nav.privacy') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('pages.privacy.title') }}</h1>
          <p class="note">{{ t('pages.privacy.lead') }}</p>
        </div>

        <div class="prose">
          @for (section of t('pages.privacy.sections'); track section.heading) {
            <section class="block">
              <h2>{{ section.heading }}</h2>
              <p>{{ section.body }}</p>
            </section>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .prose { max-width: 74ch; display: grid; gap: 4px; }
    .block { margin-top: 28px; }
    .block h2 { font-size: var(--step-1); font-weight: 800; letter-spacing: -0.01em; margin: 0 0 8px; }
    .block p { margin: 0; color: var(--muted); line-height: 1.65; }
  `,
})
export class Privacy {}
