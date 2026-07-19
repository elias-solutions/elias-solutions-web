import { LOCALE_ID } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing').then((m) => m.Landing),
    title: 'Elias Solutions GmbH — Software & KI · Schweiz',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    title: 'Über uns — Elias Solutions GmbH',
  },
  {
    path: 'jobs',
    loadComponent: () => import('./features/jobs/jobs').then((m) => m.Jobs),
    title: 'Jobs — Elias Solutions GmbH',
  },
  {
    path: 'jobs/:key',
    loadComponent: () => import('./features/jobs/job-detail/job-detail').then((m) => m.JobDetail),
    title: 'Jobs — Elias Solutions GmbH',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'Kontakt — Elias Solutions GmbH',
  },
  {
    path: 'impressum',
    loadComponent: () => import('./features/impressum/impressum').then((m) => m.Impressum),
    title: 'Impressum — Elias Solutions GmbH',
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./features/privacy/privacy').then((m) => m.Privacy),
    title: 'Datenschutz — Elias Solutions GmbH',
  },
  {
    path: 'portfolio',
    // The embedded dashboard formats numbers/currency in de-DE.
    providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
    loadComponent: () =>
      import('./features/portfolio/portfolio-layout').then((m) => m.PortfolioLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/portfolio/pages/dashboard-page').then((m) => m.DashboardPage),
        title: 'Portfolio — Dashboard',
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./features/portfolio/pages/profile-page').then((m) => m.ProfilePage),
        title: 'Portfolio — Profil',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
