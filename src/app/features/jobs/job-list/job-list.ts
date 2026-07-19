import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';

import { JobDialog } from '../job-dialog/job-dialog';

@Component({
  selector: 'es-job-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <div class="jobs" *transloco="let t">
      @for (role of t('jobs.roles'); track role.key; let i = $index) {
        <button type="button" class="job" (click)="open(i)">
          <span class="text">
            <span class="role">{{ role.role }}</span>
            <span class="kind">{{ role.kind }}</span>
          </span>
          <span class="arrow" aria-hidden="true">→</span>
        </button>
      }
    </div>
  `,
  styles: `
    .jobs { display: grid; border-top: 1px solid var(--line-strong); }
    .job {
      appearance: none; background: transparent; border: 0; width: 100%; text-align: left;
      cursor: pointer; color: var(--ink); font: inherit;
      display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 18px;
      padding: 22px 4px; border-bottom: 1px solid var(--line);
      transition: padding 0.2s ease, background 0.2s ease;
    }
    .job:hover { padding-inline: 16px; background: var(--paper-2); }
    .text { display: grid; }
    .role { font-size: var(--step-1); font-weight: 800; letter-spacing: -0.01em; }
    .kind { font-size: var(--step--1); color: var(--muted); font-weight: 600; margin-top: 4px; }
    .arrow { font-size: 1.4rem; color: var(--red); transition: transform 0.2s ease; }
    .job:hover .arrow { transform: translateX(6px); }
  `,
})
export class JobList {
  private readonly dialog = inject(MatDialog);

  open(index: number): void {
    this.dialog.open(JobDialog, {
      data: { index },
      panelClass: 'es-dialog-panel',
      width: 'min(720px, 94vw)',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    });
  }
}
