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
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'Kontakt — Elias Solutions GmbH',
  },
  {
    path: 'impressum',
    loadComponent: () => import('./features/impressum/impressum').then((m) => m.Impressum),
    title: 'Impressum — Elias Solutions GmbH',
  },
  { path: '**', redirectTo: '' },
];
