import { Injectable, computed, signal } from '@angular/core';
import { EMPTY_HOLDING, Holding } from './holding';
import { Profile } from './profile';

type HoldingMap = Record<string, Holding>;

interface ProfilesState {
  activeId: string;
  profiles: Profile[];
}

/**
 * Manages several named profiles, each with its own holdings, and persists them
 * to localStorage. The dashboard reads the currently active profile's holdings.
 */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private static readonly STORAGE_KEY = 'btc-dashboard.profiles';
  private static readonly LEGACY_KEY = 'btc-dashboard.profile';

  private readonly state = signal<ProfilesState>(this.load());

  readonly profiles = computed(() => this.state().profiles);
  readonly activeId = computed(() => this.state().activeId);
  readonly active = computed(() => {
    const { profiles, activeId } = this.state();
    return profiles.find((profile) => profile.id === activeId) ?? profiles[0];
  });

  /** Holdings of the active profile, keyed by asset id. Used by the dashboard. */
  readonly holdings = computed(() => this.active().holdings);

  /** Holding of the active profile for one asset, or an empty one. */
  holdingFor(assetId: string): Holding {
    return this.active().holdings[assetId] ?? EMPTY_HOLDING;
  }

  /** Switches which profile is active. */
  select(profileId: string): void {
    this.state.update((state) => ({ ...state, activeId: profileId }));
    this.persist();
  }

  /** Creates a new, empty profile and makes it active. Returns its id. */
  create(name: string): string {
    const profile: Profile = { id: this.newId(), name: name.trim() || 'Neues Profil', holdings: {} };
    this.state.update((state) => ({ activeId: profile.id, profiles: [...state.profiles, profile] }));
    this.persist();
    return profile.id;
  }

  /** Renames a profile. */
  rename(profileId: string, name: string): void {
    this.state.update((state) => ({
      ...state,
      profiles: state.profiles.map((profile) =>
        profile.id === profileId ? { ...profile, name: name.trim() || profile.name } : profile,
      ),
    }));
    this.persist();
  }

  /** Removes a profile, unless it is the last remaining one. */
  remove(profileId: string): void {
    this.state.update((state) => {
      if (state.profiles.length <= 1) {
        return state;
      }
      const profiles = state.profiles.filter((profile) => profile.id !== profileId);
      const activeId = state.activeId === profileId ? profiles[0].id : state.activeId;
      return { activeId, profiles };
    });
    this.persist();
  }

  /** Merges changes into one asset's holding within the active profile. */
  patch(assetId: string, changes: Partial<Holding>): void {
    this.updateActive((holdings) => ({
      ...holdings,
      [assetId]: { ...(holdings[assetId] ?? EMPTY_HOLDING), ...changes },
    }));
  }

  /** Replaces all holdings of a profile with the given set. */
  saveHoldings(profileId: string, holdings: HoldingMap): void {
    this.state.update((state) => ({
      ...state,
      profiles: state.profiles.map((profile) =>
        profile.id === profileId ? { ...profile, holdings: { ...holdings } } : profile,
      ),
    }));
    this.persist();
  }

  private updateActive(change: (holdings: HoldingMap) => HoldingMap): void {
    this.state.update((state) => ({
      ...state,
      profiles: state.profiles.map((profile) =>
        profile.id === state.activeId ? { ...profile, holdings: change(profile.holdings) } : profile,
      ),
    }));
    this.persist();
  }

  private load(): ProfilesState {
    try {
      const raw = localStorage.getItem(ProfileService.STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as ProfilesState;
      }
      const legacy = localStorage.getItem(ProfileService.LEGACY_KEY);
      const holdings = legacy ? (JSON.parse(legacy) as HoldingMap) : {};
      return this.initialState(holdings);
    } catch {
      // Corrupt or unavailable storage (private mode): start clean.
      return this.initialState({});
    }
  }

  private initialState(holdings: HoldingMap): ProfilesState {
    const profile: Profile = { id: 'standard', name: 'Standard', holdings };
    return { activeId: profile.id, profiles: [profile] };
  }

  private persist(): void {
    try {
      localStorage.setItem(ProfileService.STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      // Storage may be unavailable or full; in-memory state stays authoritative.
    }
  }

  private newId(): string {
    return globalThis.crypto?.randomUUID?.() ?? `p-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
