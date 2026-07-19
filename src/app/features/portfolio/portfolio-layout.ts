import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

registerLocaleData(localeDe);

/**
 * Shell for the embedded portfolio dashboard. Remaps the dashboard's own theme
 * variables (--bg, --card, --accent, …) onto the Elias design tokens so the
 * portfolio matches the Swiss look and follows the light/dark theme toggle.
 */
@Component({
  selector: 'es-portfolio-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="portfolio">
      <header class="topbar">
        <nav class="nav" aria-label="Portfolio">
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

      /* Map the dashboard's variables onto the Elias tokens (theme-aware). */
      --bg: var(--paper);
      --card: var(--paper-2);
      --border: var(--line);
      --text: var(--ink);
      --accent: var(--red);
      --up: #1a7f43;
      --down: var(--red);
    }

    .portfolio {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      min-height: 70vh;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      padding: 14px var(--pad);
      border-bottom: 1px solid var(--line);
      background: var(--bg);
    }

    .nav {
      display: flex;
      gap: clamp(14px, 2.2vw, 30px);
    }

    .nav__link {
      position: relative;
      padding: 4px 0;
      color: var(--ink);
      text-decoration: none;
      font-size: var(--step--1);
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .nav__link::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      height: 2px;
      width: 0;
      background: var(--red);
      transition: width 0.22s ease;
    }

    .nav__link:hover::after,
    .nav__link--active::after {
      width: 100%;
    }

    .content {
      max-width: var(--maxw);
      margin-inline: auto;
      padding-block: clamp(24px, 4vw, 48px);
    }
  `,
})
export class PortfolioLayout {}
