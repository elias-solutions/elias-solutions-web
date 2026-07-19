export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  message: string;
  /** ISO 8601 timestamp of when the privacy consent was given. */
  consentTimestamp: string;
}
