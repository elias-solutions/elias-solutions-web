import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Client-side send throttle shared by the contact and job-application forms.
 * Prevents rapid repeated submissions from the same browser (persisted, so a
 * page reload does not reset it).
 *
 * Note: this is a UX / first-line measure only. It cannot stop a bot that calls
 * EmailJS directly with the public key — client code is always bypassable.
 */
@Injectable({ providedIn: 'root' })
export class SendRateLimiter {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'es-last-send';

  readonly intervalMs = 10_000;

  /** Milliseconds until the next send is allowed (0 = allowed now). */
  remainingMs(): number {
    if (!isPlatformBrowser(this.platformId)) {
      return 0;
    }
    const last = Number(localStorage.getItem(this.storageKey) ?? 0);
    const elapsed = Date.now() - last;
    return elapsed >= this.intervalMs ? 0 : this.intervalMs - elapsed;
  }

  /** Record a send so the interval starts now. */
  record(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, String(Date.now()));
    }
  }
}
