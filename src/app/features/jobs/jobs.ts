import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { JobList } from './job-list/job-list';

@Component({
  selector: 'es-jobs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, JobList],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        <div class="section-head">
          <span class="label">{{ t('jobs.label') }}</span>
          <div class="rule-red"></div>
          <h1>{{ t('jobs.title') }}</h1>
          <p class="note">{{ t('jobs.note') }}</p>
        </div>

        <es-job-list />
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
  `,
})
export class Jobs {}
