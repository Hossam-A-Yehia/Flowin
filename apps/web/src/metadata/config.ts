import { Metadata } from 'next';

/**
 * Shared metadata configuration
 */

export interface PageMetadata {
  en: Metadata;
  ar: Metadata;
}

// Base URL for the application
export const BASE_URL = 'http://localhost:3000';

// Common metadata shared across pages
export const commonMetadata = {
  authors: [{ name: 'Flowin' }],
  creator: 'Flowin',
  publisher: 'Flowin',
  category: 'Technology' as const,
};

// Common robots configuration for public pages
export const publicRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
};

// Common robots configuration for private pages
export const privateRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};
