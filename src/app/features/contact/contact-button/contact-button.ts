import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';

import { ContactDialog } from '../contact-dialog/contact-dialog';

@Component({
  selector: 'es-contact-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective],
  template: `
    <button *transloco="let t" type="button" class="btn solid" (click)="open()">
      {{ t('nav.contact') }}
    </button>
  `,
  styles: `:host { display: inline-flex; }`,
})
export class ContactButton {
  private readonly dialog = inject(MatDialog);

  open(): void {
    this.dialog.open(ContactDialog, {
      panelClass: 'es-dialog-panel',
      width: 'min(640px, 92vw)',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    });
  }
}
