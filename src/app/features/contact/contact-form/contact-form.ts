import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { CONTACT_SENDER } from '../../../core/contact/contact-sender';
import { SendRateLimiter } from '../../../core/rate-limit/send-rate-limiter';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error' | 'throttled';

@Component({
  selector: 'es-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, TranslocoDirective],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly sender = inject(CONTACT_SENDER);
  private readonly rateLimiter = inject(SendRateLimiter);

  protected readonly state = signal<SubmitState>('idle');
  protected readonly retryIn = signal(0);

  protected readonly limits = { name: 50, company: 50, email: 254, message: 5000 } as const;

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(this.limits.name)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(this.limits.email)]],
    company: ['', [Validators.maxLength(this.limits.company)]],
    message: ['', [Validators.required, Validators.maxLength(this.limits.message)]],
    consent: [false, [Validators.requiredTrue]],
    // Honeypot — hidden from users; a filled value means a bot.
    website: [''],
  });

  protected async submit(): Promise<void> {
    const raw = this.form.getRawValue();

    // Bot caught by the honeypot: pretend success, never send.
    if (raw.website) {
      this.state.set('sent');
      this.form.reset();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const wait = this.rateLimiter.remainingMs();
    if (wait > 0) {
      this.retryIn.set(Math.ceil(wait / 1000));
      this.state.set('throttled');
      return;
    }

    this.state.set('sending');
    try {
      const { consent, website, ...message } = raw;
      this.rateLimiter.record();
      await this.sender.send({ ...message, consentTimestamp: new Date().toISOString() });
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

  protected showConsentError(): boolean {
    const c = this.form.controls.consent;
    return c.invalid && (c.touched || c.dirty);
  }

  protected emailFormatInvalid(): boolean {
    const c = this.form.controls.email;
    return !!c.errors && !c.errors['required'] && !!c.errors['email'];
  }
}
