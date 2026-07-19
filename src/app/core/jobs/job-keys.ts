/** Stable job slugs — used for routes, prerendering and i18n role matching. */
export const JOB_KEYS = ['fullstack-csharp', 'fullstack-java', 'sales', 'ai-referent'] as const;

export type JobKey = (typeof JOB_KEYS)[number];
