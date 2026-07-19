import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';

import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'es-contact-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, TranslocoDirective, ContactForm],
  template: `
    <div class="dialog" *transloco="let t">
      <header class="dialog-head">
        <h2 mat-dialog-title>{{ t('pages.contact.title') }}</h2>
        <button type="button" class="close" (click)="close()" [attr.aria-label]="t('pages.contact.form.close')">
          &times;
        </button>
      </header>
      <mat-dialog-content>
        <es-contact-form />
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .dialog { background: var(--paper); color: var(--ink); }
    .dialog-head {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding: 24px 28px 8px;
    }
    h2 {
      margin: 0; font-size: var(--step-2); font-weight: 800; letter-spacing: -0.02em;
      font-family: var(--font);
    }
    .close {
      appearance: none; background: transparent; border: 0; cursor: pointer;
      font-size: 2rem; line-height: 1; color: var(--muted); padding: 0 4px;
    }
    .close:hover { color: var(--red); }
    mat-dialog-content { padding: 8px 28px 28px; max-height: 78vh; }
  `,
})
export class ContactDialog {
  private readonly ref = inject(MatDialogRef<ContactDialog>);

  protected close(): void {
    this.ref.close();
  }
}
