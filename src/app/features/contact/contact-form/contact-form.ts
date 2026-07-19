import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

import { CONTACT_SENDER } from '../../../core/contact/contact-sender';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'es-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslocoDirective],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly sender = inject(CONTACT_SENDER);

  protected readonly state = signal<SubmitState>('idle');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    message: ['', [Validators.required]],
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('sending');
    try {
      await this.sender.send(this.form.getRawValue());
      this.state.set('sent');
      this.form.reset();
    } catch {
      this.state.set('error');
    }
  }

  protected showError(control: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected emailFormatInvalid(): boolean {
    const c = this.form.controls.email;
    return !!c.errors && !c.errors['required'] && !!c.errors['email'];
  }
}
