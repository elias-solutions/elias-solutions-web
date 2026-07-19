import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetDashboard } from '../dashboard/asset-dashboard';
import { AssetRegistry } from '../dashboard/asset-registry';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AssetDashboard],
  template: `
    <p class="active-profile">Profil: <strong>{{ activeProfile().name }}</strong></p>
    @for (asset of assets; track asset.id) {
      <app-asset-dashboard [asset]="asset" />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      padding: 1.5rem 0 2.5rem;
    }

    .active-profile {
      max-width: 860px;
      width: 100%;
      margin: 0 auto -1rem;
      padding: 0 1rem;
      color: var(--muted);
      font-size: 0.9rem;

      strong {
        color: var(--text);
      }
    }
  `,
})
export class DashboardPage {
  private readonly profile = inject(ProfileService);

  protected readonly assets = inject(AssetRegistry).assets;
  protected readonly activeProfile = this.profile.active;
}
