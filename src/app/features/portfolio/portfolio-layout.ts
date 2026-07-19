import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

registerLocaleData(localeDe);

/**
 * Shell for the embedded BTC portfolio dashboard. Scopes the dashboard's dark
 * theme variables to this subtree (so the surrounding Swiss site stays light)
 * and provides the Dashboard / Profil sub-navigation.
 */
@Component({
  selector: 'es-portfolio-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="portfolio">
      <header class="topbar">
        <span class="brand">📊 Portfolio</span>
        <nav class="nav">
          <a
            routerLink="/portfolio"
            routerLinkActive="nav__link--active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav__link"
            >Dashboard</a
          >
          <a routerLink="/portfolio/profil" routerLinkActive="nav__link--active" class="nav__link"
            >Profil</a
          >
        </nav>
      </header>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    :host {
      display: block;
      --bg: #0f1117;
      --card: #1a1d27;
      --border: #2a2e3c;
      --text: #e7e9ee;
      --muted: #8b90a1;
      --accent: #f7931a;
      --up: #2ecc71;
      --down: #ff5c5c;
    }

    .portfolio {
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
      min-height: 70vh;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.9rem 1.5rem;
      border-bottom: 1px solid var(--border);
      background: var(--card);
    }

    .brand { font-weight: 700; color: var(--accent); }

    .nav { display: flex; gap: 0.5rem; }

    .nav__link {
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      color: var(--muted);
      text-decoration: none;
      font-size: 0.95rem;
    }

    .nav__link:hover { color: var(--text); }
    .nav__link--active { background: var(--accent); color: #12131a; }

    .content { max-width: 1180px; margin-inline: auto; }
  `,
})
export class PortfolioLayout {}
