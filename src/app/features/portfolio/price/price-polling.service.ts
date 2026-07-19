import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { PriceProvider } from './price-provider';
import { PriceState } from './price-state';

/** Default poll cadence in milliseconds. */
export const DEFAULT_POLL_INTERVAL_MS = 30_000;

/**
 * Repeatedly fetches an asset's price from a {@link PriceProvider} and exposes
 * each attempt as a {@link PriceState}. A failed request surfaces an error
 * state but keeps the stream alive so the next tick can recover.
 *
 * Stateless: the provider is passed per call, so a single instance can drive
 * any number of assets.
 */
@Injectable({ providedIn: 'root' })
export class PricePollingService {
  poll(provider: PriceProvider, intervalMs: number = DEFAULT_POLL_INTERVAL_MS): Observable<PriceState> {
    return timer(0, intervalMs).pipe(
      switchMap(() =>
        provider.getAssetPrice().pipe(
          map((price): PriceState => ({ status: 'success', price, updatedAt: new Date() })),
          catchError((error: unknown): Observable<PriceState> =>
            of({ status: 'error', message: this.describe(error) }),
          ),
        ),
      ),
      startWith<PriceState>({ status: 'loading' }),
    );
  }

  private describe(error: unknown): string {
    return error instanceof Error && error.message
      ? error.message
      : 'Kurs konnte nicht geladen werden.';
  }
}
