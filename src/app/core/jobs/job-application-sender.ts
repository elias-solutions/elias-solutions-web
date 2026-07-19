import { InjectionToken } from '@angular/core';

import { JobApplication } from './job-application';

/** Transport for a job application — mirrors ContactSender, kept swappable. */
export interface JobApplicationSender {
  send(application: JobApplication): Promise<void>;
}

export const JOB_APPLICATION_SENDER = new InjectionToken<JobApplicationSender>(
  'JOB_APPLICATION_SENDER',
);
