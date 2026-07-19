import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';

import { JobApplicationForm } from '../job-application-form/job-application-form';

export interface JobDialogData {
  index: number;
}

@Component({
  selector: 'es-job-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, TranslocoDirective, JobApplicationForm],
  template: `
    <div class="dialog" *transloco="let t">
      @let role = t('jobs.roles')[data.index];
      <header class="dialog-head">
        <div>
          <h2 mat-dialog-title>{{ role.role }}</h2>
          <p class="kind">{{ role.kind }}</p>
        </div>
        <button type="button" class="close" (click)="close()" [attr.aria-label]="t('jobs.form.close')">
          &times;
        </button>
      </header>

      <mat-dialog-content>
        <section class="block">
          <h3>{{ t('jobs.tasksTitle') }}</h3>
          <ul>
            @for (item of role.tasks; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </section>

        <section class="block">
          <h3>{{ t('jobs.expectationsTitle') }}</h3>
          <ul>
            @for (item of role.expectations; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </section>

        <section class="block apply">
          <h3>{{ t('jobs.apply') }}</h3>
          <es-job-application-form [role]="role.role" [roleKey]="role.key" />
        </section>
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .dialog { background: var(--paper); color: var(--ink); }
    .dialog-head {
      display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
      padding: 24px 28px 4px;
    }
    h2 { margin: 0; font-size: var(--step-2); font-weight: 800; letter-spacing: -0.02em; font-family: var(--font); line-height: 1.05; }
    .kind { margin: 6px 0 0; font-size: var(--step--1); color: var(--muted); font-weight: 600; }
    .close {
      appearance: none; background: transparent; border: 0; cursor: pointer;
      font-size: 2rem; line-height: 1; color: var(--muted); padding: 0 4px;
    }
    .close:hover { color: var(--red); }
    mat-dialog-content { padding: 8px 28px 28px; max-height: 78vh; }
    .block { margin-top: 24px; }
    .block h3 {
      font-size: var(--step--1); text-transform: uppercase; letter-spacing: 0.14em;
      color: var(--muted); margin: 0 0 12px; font-weight: 700;
    }
    .block ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
    .block li {
      display: grid; grid-template-columns: 14px 1fr; gap: 10px; align-items: start;
      font-size: var(--step-0); line-height: 1.45;
    }
    .block li::before { content: ''; width: 9px; height: 9px; margin-top: 7px; background: var(--red); }
    .apply { border-top: 1px solid var(--line); padding-top: 24px; }
  `,
})
export class JobDialog {
  protected readonly data = inject<JobDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<JobDialog>);

  protected close(): void {
    this.ref.close();
  }
}
