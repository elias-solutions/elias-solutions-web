import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { COMPANY } from '../company';
import { ContactMessage } from './contact-message';
import { ContactSender } from './contact-sender';

/**
 * Zero-dependency default: opens the visitor's mail client with a pre-filled
 * message to the company address. Works without any backend; replace with an
 * HTTP/EmailJS sender once a delivery endpoint exists.
 */
@Injectable({ providedIn: 'root' })
export class MailtoContactSender implements ContactSender {
  private readonly platformId = inject(PLATFORM_ID);

  send(message: ContactMessage): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    const subject = `Kontaktanfrage – ${message.name}`;
    const body = [
      `Name: ${message.name}`,
      `E-Mail: ${message.email}`,
      message.company ? `Unternehmen: ${message.company}` : null,
      '',
      message.message,
      '',
      '---',
      `Datenschutzerklärung akzeptiert: ${message.consentTimestamp}`,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    window.location.href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    return Promise.resolve();
  }
}
