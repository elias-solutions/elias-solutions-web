import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';

import { environment } from '../../../environments/environment';
import { JobApplication } from './job-application';
import { JobApplicationSender } from './job-application-sender';

/**
 * Sends a job application through the dedicated EmailJS jobs template.
 * Parameters are a superset so the template populates regardless of the exact
 * variable names it uses (position / role / reply_to / …).
 */
@Injectable({ providedIn: 'root' })
export class EmailjsJobApplicationSender implements JobApplicationSender {
  private readonly platformId = inject(PLATFORM_ID);

  async send(application: JobApplication): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { serviceId, templateId, publicKey } = environment.emailjsJobs;
    const consentNote = `Datenschutzerklärung akzeptiert: ${application.consentTimestamp}`;
    const params = {
      position: application.role,
      role: application.role,
      role_key: application.roleKey,
      email: application.email,
      reply_to: application.email,
      message: `${application.message}\n\n---\n${consentNote}`,
      consent: consentNote,
      consent_timestamp: application.consentTimestamp,
    };

    await emailjs.send(serviceId, templateId, params, { publicKey });
  }
}
