import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';

import { environment } from '../../../environments/environment';
import { ContactMessage } from './contact-message';
import { ContactSender } from './contact-sender';

/**
 * Sends the contact message through EmailJS. Parameters are a superset so they
 * populate the existing EmailJS template regardless of which variable names it
 * references (firstName / name / reply_to / …).
 */
@Injectable({ providedIn: 'root' })
export class EmailjsContactSender implements ContactSender {
  private readonly platformId = inject(PLATFORM_ID);

  async send(message: ContactMessage): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { serviceId, templateId, publicKey } = environment.emailjs;
    const consentNote = `Datenschutzerklärung akzeptiert: ${message.consentTimestamp}`;
    const params = {
      name: message.name,
      from_name: message.name,
      firstName: message.name,
      lastName: '',
      email: message.email,
      reply_to: message.email,
      company: message.company,
      phone: message.company,
      message: `${message.message}\n\n---\n${consentNote}`,
      consent: consentNote,
      consent_timestamp: message.consentTimestamp,
    };

    await emailjs.send(serviceId, templateId, params, { publicKey });
  }
}
