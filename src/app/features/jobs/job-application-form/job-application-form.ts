import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

import { JOB_APPLICATION_SENDER } from '../../../core/jobs/job-application-sender';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'es-job-application-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslocoDirective],
  templateUrl: './job-application-form.html',
  styleUrl: './job-application-form.scss',
})
export class JobApplicationForm {
  readonly role = input<string>('');
  readonly roleKey = input<string>('');

  private readonly fb = inject(FormBuilder);
  private readonly sender = inject(JOB_APPLICATION_SENDER);

  protected readonly state = signal<SubmitState>('idle');

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('sending');
    try {
      await this.sender.send({ role: this.role(), roleKey: this.roleKey(), ...this.form.getRawValue() });
      this.state.set('sent');
      this.form.reset();
    } catch {
      this.state.set('error');
    }
  }

  protected showError(control: 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected emailFormatInvalid(): boolean {
    const c = this.form.controls.email;
    return !!c.errors && !c.errors['required'] && !!c.errors['email'];
  }
}
