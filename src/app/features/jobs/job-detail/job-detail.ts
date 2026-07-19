import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { JobApplicationForm } from '../job-application-form/job-application-form';

interface Role {
  key: string;
  role: string;
  kind: string;
  tasks: string[];
  expectations: string[];
}

@Component({
  selector: 'es-job-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective, JobApplicationForm],
  template: `
    <section class="page" *transloco="let t">
      <div class="wrap">
        @let role = roleFor(t('jobs.roles'));

        @if (role) {
          <a class="back" routerLink="/jobs">← {{ t('jobs.label') }}</a>

          <div class="section-head">
            <div class="rule-red"></div>
            <h1>{{ role.role }}</h1>
            <p class="kind">{{ role.kind }}</p>
          </div>

          <div class="content">
            <div class="detail">
              <section class="block">
                <h2>{{ t('jobs.tasksTitle') }}</h2>
                <ul>
                  @for (item of role.tasks; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </section>

              <section class="block">
                <h2>{{ t('jobs.expectationsTitle') }}</h2>
                <ul>
                  @for (item of role.expectations; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </section>
            </div>

            <aside class="apply">
              <h2>{{ t('jobs.apply') }}</h2>
              <es-job-application-form [role]="role.role" [roleKey]="role.key" />
            </aside>
          </div>
        } @else {
          <div class="section-head">
            <div class="rule-red"></div>
            <h1>{{ t('jobs.title') }}</h1>
          </div>
          <a class="btn" routerLink="/jobs">← {{ t('jobs.label') }}</a>
        }
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 8vw, 96px); }
    .back {
      display: inline-block; margin-bottom: 24px; text-decoration: none;
      font-size: var(--step--1); font-weight: 700; letter-spacing: 0.02em; color: var(--muted);
    }
    .back:hover { color: var(--red); }
    .section-head { display: grid; gap: 16px; margin-bottom: 48px; max-width: 64ch; }
    h1 { font-size: var(--step-3); letter-spacing: -0.025em; font-weight: 800; margin: 0; line-height: 1; }
    .kind { margin: 0; font-size: var(--step-1); color: var(--muted); font-weight: 600; }

    .content { display: grid; grid-template-columns: 1.3fr 1fr; gap: 56px; align-items: start; }
    @media (max-width: 860px) { .content { grid-template-columns: 1fr; gap: 40px; } }

    .block { margin-bottom: 40px; }
    .block h2 {
      font-size: var(--step--1); text-transform: uppercase; letter-spacing: 0.14em;
      color: var(--muted); margin: 0 0 16px; font-weight: 700;
    }
    .block ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    .block li {
      display: grid; grid-template-columns: 14px 1fr; gap: 12px; align-items: start;
      font-size: var(--step-0); line-height: 1.5;
    }
    .block li::before { content: ''; width: 9px; height: 9px; margin-top: 8px; background: var(--red); }

    .apply {
      border-top: 3px solid var(--red);
      background: var(--paper-2);
      padding: clamp(24px, 3vw, 36px);
    }
    .apply h2 { font-size: var(--step-1); font-weight: 800; letter-spacing: -0.01em; margin: 0 0 20px; }
  `,
})
export class JobDetail {
  readonly key = input.required<string>();

  protected roleFor(roles: Role[]): Role | undefined {
    return roles.find((r) => r.key === this.key());
  }
}
