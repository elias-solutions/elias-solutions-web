import { RenderMode, ServerRoute } from '@angular/ssr';

import { JOB_KEYS } from './core/jobs/job-keys';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'jobs/:key',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => JOB_KEYS.map((key) => ({ key })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
