import { InjectionToken } from '@angular/core';

import { ContactMessage } from './contact-message';

/**
 * Transport for a contact submission. Kept behind an abstraction so the form
 * depends on the contract, not the delivery mechanism — swap the mailto default
 * for an EmailJS or HTTP-backend sender without touching the component.
 */
export interface ContactSender {
  send(message: ContactMessage): Promise<void>;
}

export const CONTACT_SENDER = new InjectionToken<ContactSender>('CONTACT_SENDER');
