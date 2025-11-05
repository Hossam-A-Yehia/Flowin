'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { registerMetadata } from '@/metadata/RegisterMetadata';
import { loginMetadata } from '@/metadata/LoginMetadata';
import { dashboardMetadata } from '@/metadata/DashboardMetadata';
import { forgotPasswordMetadata } from '@/metadata/ForgotPasswordMetadata';
import { resetPasswordMetadata } from '@/metadata/ResetPasswordMetadata';
import { verifyEmailMetadata } from '@/metadata/VerifyEmailMetadata';
import { FlowsMetadata } from '@/metadata/FlowsMetadata';
import { FlowBuilderMetadata } from '@/metadata/FlowBuilderMetadata';

interface DynamicMetadataProps {
  page: 'register' | 'login' | 'dashboard' | 'forgot-password' | 'reset-password' | 'verify-email' | 'flows' | 'flow-builder';
}

/**
 * Client-side component that updates page metadata based on current locale
 * This is necessary because Next.js metadata is server-side only
 */
export function DynamicMetadata({ page }: DynamicMetadataProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const locale = i18n.language === 'ar' ? 'ar' : 'en';
    
    const metadataMap = {
      register: registerMetadata,
      login: loginMetadata,
      dashboard: dashboardMetadata,
      'forgot-password': forgotPasswordMetadata,
      'reset-password': resetPasswordMetadata,
      'verify-email': verifyEmailMetadata,
      'flows': FlowsMetadata,
      'flow-builder': FlowBuilderMetadata,
    };

    const metadata = metadataMap[page][locale];

    // Update document title
    if (metadata.title) {
      document.title = metadata.title as string;
    }

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta && metadata.description) {
      descriptionMeta.setAttribute('content', metadata.description as string);
    } else if (metadata.description) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metadata.description as string;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (metadata.keywords && Array.isArray(metadata.keywords)) {
      const keywordsString = metadata.keywords.join(', ');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywordsString);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywordsString;
        document.head.appendChild(meta);
      }
    }

    // Update Open Graph title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (metadata.openGraph?.title) {
      const titleStr = String(metadata.openGraph.title);
      if (ogTitleMeta) {
        ogTitleMeta.setAttribute('content', titleStr);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = titleStr;
        document.head.appendChild(meta);
      }
    }

    // Update Open Graph description
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (metadata.openGraph?.description) {
      const descStr = String(metadata.openGraph.description);
      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', descStr);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = descStr;
        document.head.appendChild(meta);
      }
    }

    // Update Open Graph locale
    const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
    if (metadata.openGraph?.locale) {
      if (ogLocaleMeta) {
        ogLocaleMeta.setAttribute('content', metadata.openGraph.locale);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:locale');
        meta.content = metadata.openGraph.locale;
        document.head.appendChild(meta);
      }
    }

    // Update Twitter title
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (metadata.twitter?.title) {
      const titleStr = String(metadata.twitter.title);
      if (twitterTitleMeta) {
        twitterTitleMeta.setAttribute('content', titleStr);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'twitter:title';
        meta.content = titleStr;
        document.head.appendChild(meta);
      }
    }

    // Update Twitter description
    const twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
    if (metadata.twitter?.description) {
      const descStr = String(metadata.twitter.description);
      if (twitterDescMeta) {
        twitterDescMeta.setAttribute('content', descStr);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'twitter:description';
        meta.content = descStr;
        document.head.appendChild(meta);
      }
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (metadata.alternates?.canonical) {
      const canonicalStr = String(metadata.alternates.canonical);
      if (canonicalLink) {
        canonicalLink.href = canonicalStr;
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = canonicalStr;
        document.head.appendChild(canonicalLink);
      }
    }

  }, [i18n.language, page]);

  return null; // This component doesn't render anything
}
