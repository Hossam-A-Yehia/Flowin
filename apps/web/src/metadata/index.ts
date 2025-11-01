/**
 * Metadata exports and utilities
 * Centralized metadata management for the application
 */

// Export shared config
export type { PageMetadata } from './config';
export { BASE_URL, commonMetadata, publicRobots, privateRobots } from './config';

// Export page metadata
export { registerMetadata } from './RegisterMetadata';
export { loginMetadata } from './LoginMetadata';
export { dashboardMetadata } from './DashboardMetadata';
export { forgotPasswordMetadata } from './ForgotPasswordMetadata';
export { resetPasswordMetadata } from './ResetPasswordMetadata';

// Export utility functions
export {
  getCurrentLocale,
  getMetadataForPage,
  generateLocalizedMetadata,
  getPageMetadata,
} from './utils';
