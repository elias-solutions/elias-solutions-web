import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'es-jobs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('jobs.label') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('jobs.title') }}</h1>
          <p class="note">{{ t('jobs.note') }}</p>
        </div>

        <div class="jobs">
          @for (role of t('jobs.roles'); track role.role) {
            <a class="job" routerLink="/contact">
              <div>
                <div class="role">{{ role.role }}</div>
                <div class="kind">{{ role.kind }}</div>
              </div>
              <span class="arrow" aria-hidden="true">→</span>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .jobs { display: grid; border-top: 1px solid var(--line-strong); margin-top: 8px; }
    .job {
      display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 18px;
      padding: 22px 4px; border-bottom: 1px solid var(--line); text-decoration: none; color: var(--ink);
      transition: padding 0.2s ease, background 0.2s ease;
    }
    .job:hover { padding-inline: 16px; background: var(--paper-2); }
    .role { font-size: var(--step-1); font-weight: 800; letter-spacing: -0.01em; }
    .kind { font-size: var(--step--1); color: var(--muted); font-weight: 600; margin-top: 4px; }
    .arrow { font-size: 1.4rem; color: var(--red); transition: transform 0.2s ease; }
    .job:hover .arrow { transform: translateX(6px); }
  `,
})
export class Jobs {}
