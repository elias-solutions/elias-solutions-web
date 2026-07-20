import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CURRENCIES, CURRENCY_LABELS, Currency } from '../portfolio/currency';
import { AssetRegistry } from '../dashboard/asset-registry';
import { Holding } from '../profile/holding';
import { ProfileService } from '../profile/profile.service';

type DraftMap = Record<string, Holding>;

/** Numeric fields that are edited as free text so comma decimals survive on mobile. */
type NumericField = 'amount' | 'entryPrice';
type DraftTextMap = Record<string, Record<NumericField, string>>;

@Component({
  selector: 'app-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  private readonly profile = inject(ProfileService);

  protected readonly assets = inject(AssetRegistry).assets;
  protected readonly currencies = CURRENCIES;
  protected readonly currencyLabels = CURRENCY_LABELS;

  protected readonly profiles = this.profile.profiles;
  protected readonly activeId = this.profile.activeId;

  /** Name for a new profile to be created. */
  protected readonly newName = signal('');

  /** Editable name of the active profile. */
  protected readonly renameValue = signal(this.profile.active().name);

  /** True while the rename field holds a valid, changed name. */
  protected readonly canRename = computed(() => {
    const name = this.renameValue().trim();
    return name.length > 0 && name !== this.profile.active().name;
  });

  /** Editable copy, seeded from the active profile. */
  protected readonly draft = signal<DraftMap>(this.seedDraft());

  /**
   * Raw text mirror of the numeric draft fields. Bound to the inputs so the
   * user's keystrokes (incl. a comma decimal separator on mobile keyboards, or
   * a half-typed "1,") are preserved verbatim and never overwritten by a
   * parsed number written back into the field.
   */
  protected readonly draftText = signal<DraftTextMap>(this.seedDraftText());

  /** True while the draft differs from the active profile's stored holdings. */
  protected readonly dirty = computed(() =>
    this.assets.some((asset) => !this.equal(this.draft()[asset.id], this.profile.holdingFor(asset.id))),
  );

  selectProfile(profileId: string): void {
    this.profile.select(profileId);
    this.loadActive();
  }

  createProfile(): void {
    this.profile.create(this.newName());
    this.newName.set('');
    this.loadActive();
  }

  removeActiveProfile(): void {
    this.profile.remove(this.activeId());
    this.loadActive();
  }

  renameProfile(): void {
    this.profile.rename(this.activeId(), this.renameValue());
  }

  save(): void {
    this.profile.saveHoldings(this.activeId(), this.draft());
  }

  reset(): void {
    this.draft.set(this.seedDraft());
    this.draftText.set(this.seedDraftText());
  }

  update(assetId: string, changes: Partial<Holding>): void {
    this.draft.update((draft) => ({ ...draft, [assetId]: { ...draft[assetId], ...changes } }));
  }

  protected setAmount(assetId: string, raw: string): void {
    this.setNumeric(assetId, 'amount', raw);
  }

  protected setEntryPrice(assetId: string, raw: string): void {
    this.setNumeric(assetId, 'entryPrice', raw);
  }

  protected setEntryCurrency(assetId: string, entryCurrency: Currency): void {
    this.update(assetId, { entryCurrency });
  }

  /** Keeps the raw text and updates the parsed numeric draft in lockstep. */
  private setNumeric(assetId: string, field: NumericField, raw: string): void {
    this.draftText.update((text) => ({ ...text, [assetId]: { ...text[assetId], [field]: raw } }));
    this.update(assetId, { [field]: this.parseNumber(raw) });
  }

  /** Parses user input, tolerating a comma or dot decimal separator. */
  private parseNumber(raw: string): number {
    const value = Number.parseFloat(raw.replace(',', '.').trim());
    return Number.isFinite(value) ? value : 0;
  }

  /** Re-seeds all editable state from the now-active profile. */
  private loadActive(): void {
    this.draft.set(this.seedDraft());
    this.draftText.set(this.seedDraftText());
    this.renameValue.set(this.profile.active().name);
  }

  private seedDraft(): DraftMap {
    return Object.fromEntries(
      this.assets.map((asset) => [asset.id, { ...this.profile.holdingFor(asset.id) }]),
    );
  }

  private seedDraftText(): DraftTextMap {
    return Object.fromEntries(
      this.assets.map((asset) => {
        const holding = this.profile.holdingFor(asset.id);
        return [
          asset.id,
          { amount: this.numberToText(holding.amount), entryPrice: this.numberToText(holding.entryPrice) },
        ];
      }),
    );
  }

  /** Shows a stored value, leaving the field empty for the unset zero default. */
  private numberToText(value: number): string {
    return value ? String(value) : '';
  }

  private equal(a: Holding, b: Holding): boolean {
    return a.amount === b.amount && a.entryPrice === b.entryPrice && a.entryCurrency === b.entryCurrency;
  }
}
