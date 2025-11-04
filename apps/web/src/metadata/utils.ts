import { Metadata } from 'next';
import i18n from '@/il8n';
import { registerMetadata } from './RegisterMetadata';
import { loginMetadata } from './LoginMetadata';
import { dashboardMetadata } from './DashboardMetadata';
import { FlowsMetadata } from './FlowsMetadata';

/**
 * Get the current locale from i18n
 */
export function getCurrentLocale(): 'en' | 'ar' {
  const currentLang = i18n.language;
  return currentLang === 'ar' ? 'ar' : 'en';
}

/**
 * Get metadata for a specific page based on current locale
 */
export function getMetadataForPage(
  page: 'register' | 'login' | 'dashboard' | 'flows'
): Metadata {
  const locale = getCurrentLocale();
  
  const metadataMap = {
    register: registerMetadata,
    login: loginMetadata,
    dashboard: dashboardMetadata,
    flows: FlowsMetadata,
  };

  return metadataMap[page][locale];
}

/**
 * Get metadata based on page and locale (manual selection)
 */
export function getPageMetadata(
  page: 'register' | 'login' | 'dashboard' | 'flows',
  locale: 'en' | 'ar' = 'en'
): Metadata {
  const metadataMap = {
    register: registerMetadata,
    login: loginMetadata,
    dashboard: dashboardMetadata,
    flows: FlowsMetadata,
  };

  return metadataMap[page][locale];
}

/**
 * Generate dynamic metadata based on locale
 * Use this in generateMetadata function for dynamic routes
 */
export async function generateLocalizedMetadata(
  page: 'register' | 'login' | 'dashboard' | 'flows',
  locale?: string
): Promise<Metadata> {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  
  const metadataMap = {
    register: registerMetadata,
    login: loginMetadata,
    dashboard: dashboardMetadata,
    flows: FlowsMetadata,
  };

  return metadataMap[page][currentLocale];
}
