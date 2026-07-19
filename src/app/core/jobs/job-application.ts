export interface JobApplication {
  role: string;
  roleKey: string;
  email: string;
  message: string;
  /** ISO 8601 timestamp of when the privacy consent was given. */
  consentTimestamp: string;
}
