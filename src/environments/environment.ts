// Template for src/environments/environment.ts (which is git-ignored).
// Copy this file to environment.ts and fill in the real EmailJS keys.
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  },
  // Dedicated template for job applications.
  emailjsJobs: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_JOBS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  },
};
