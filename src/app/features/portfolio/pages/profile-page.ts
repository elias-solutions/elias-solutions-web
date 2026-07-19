import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CURRENCIES, CURRENCY_LABELS, Currency } from '../portfolio/currency';
import { AssetRegistry } from '../dashboard/asset-registry';
import { Holding } from '../profile/holding';
import { ProfileService } from '../profile/profile.service';

type DraftMap = Record<string, Holding>;

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
  }

  update(assetId: string, changes: Partial<Holding>): void {
    this.draft.update((draft) => ({ ...draft, [assetId]: { ...draft[assetId], ...changes } }));
  }

  protected setAmount(assetId: string, amount: number | null): void {
    this.update(assetId, { amount: amount ?? 0 });
  }

  protected setEntryPrice(assetId: string, entryPrice: number | null): void {
    this.update(assetId, { entryPrice: entryPrice ?? 0 });
  }

  protected setEntryCurrency(assetId: string, entryCurrency: Currency): void {
    this.update(assetId, { entryCurrency });
  }

  /** Re-seeds all editable state from the now-active profile. */
  private loadActive(): void {
    this.draft.set(this.seedDraft());
    this.renameValue.set(this.profile.active().name);
  }

  private seedDraft(): DraftMap {
    return Object.fromEntries(
      this.assets.map((asset) => [asset.id, { ...this.profile.holdingFor(asset.id) }]),
    );
  }

  private equal(a: Holding, b: Holding): boolean {
    return a.amount === b.amount && a.entryPrice === b.entryPrice && a.entryCurrency === b.entryCurrency;
  }
}
