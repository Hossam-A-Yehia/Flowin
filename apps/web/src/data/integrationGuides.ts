/**
 * Integration Setup Guides - i18n Version
 * 
 * This file contains integration guide data with translation keys.
 * The actual translated content is in the translation files (en.json, ar.json).
 * 
 * Translation Strategy:
 * - User-facing content uses translation keys
 * - Technical UI labels (like button names in external services) remain in English
 * - URLs and technical identifiers are not translated
 */

export interface SetupStep {
  titleKey: string;
  descriptionKey: string;
  imageUrl?: string;
  tipsKeys?: string[];
  externalLink?: {
    url: string;
    labelKey: string;
  };
}

export interface IntegrationGuide {
  integrationName: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  estimatedTimeKey: string;
  prerequisitesKeys?: string[];
  steps: SetupStep[];
  videoUrl?: string;
  troubleshootingKeys?: {
    issueKey: string;
    solutionKey: string;
  }[];
}

/**
 * Integration guides with translation keys
 * Format: integrations.guides.{integrationName}.{property}
 */
export const integrationGuides: Record<string, IntegrationGuide> = {
  // Example: Telegram (Easy setup)
  telegram: {
    integrationName: 'telegram',
    difficulty: 'easy',
    estimatedTimeKey: 'integrations.guides.telegram.estimatedTime',
    steps: [
      {
        titleKey: 'integrations.guides.telegram.step1.title',
        descriptionKey: 'integrations.guides.telegram.step1.description',
        externalLink: {
          url: 'https://t.me/botfather',
          labelKey: 'integrations.guides.telegram.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.telegram.step2.title',
        descriptionKey: 'integrations.guides.telegram.step2.description',
        tipsKeys: [
          'integrations.guides.telegram.step2.tip1',
          'integrations.guides.telegram.step2.tip2',
        ],
      },
      {
        titleKey: 'integrations.guides.telegram.step3.title',
        descriptionKey: 'integrations.guides.telegram.step3.description',
        tipsKeys: [
          'integrations.guides.telegram.step3.tip1',
          'integrations.guides.telegram.step3.tip2',
        ],
      },
    ],
  },

  // Example: Discord (Easy setup)
  discord: {
    integrationName: 'discord',
    difficulty: 'easy',
    estimatedTimeKey: 'integrations.guides.discord.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.discord.prerequisites.0',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.discord.step1.title',
        descriptionKey: 'integrations.guides.discord.step1.description',
        tipsKeys: [
          'integrations.guides.discord.step1.tip1',
        ],
      },
      {
        titleKey: 'integrations.guides.discord.step2.title',
        descriptionKey: 'integrations.guides.discord.step2.description',
      },
      {
        titleKey: 'integrations.guides.discord.step3.title',
        descriptionKey: 'integrations.guides.discord.step3.description',
        tipsKeys: [
          'integrations.guides.discord.step3.tip1',
          'integrations.guides.discord.step3.tip2',
        ],
      },
      {
        titleKey: 'integrations.guides.discord.step4.title',
        descriptionKey: 'integrations.guides.discord.step4.description',
      },
    ],
  },

  // SendGrid - Commented out (not active in seed.ts)
  // sendgrid: {
  //   integrationName: 'sendgrid',
  //   difficulty: 'easy',
  //   estimatedTimeKey: 'integrations.guides.sendgrid.estimatedTime',
  //   prerequisitesKeys: [
  //     'integrations.guides.sendgrid.prerequisites.0',
  //   ],
  //   steps: [
  //     {
  //       titleKey: 'integrations.guides.sendgrid.step1.title',
  //       descriptionKey: 'integrations.guides.sendgrid.step1.description',
  //       externalLink: {
  //         url: 'https://app.sendgrid.com',
  //         labelKey: 'integrations.guides.sendgrid.step1.linkLabel',
  //       },
  //     },
  //     {
  //       titleKey: 'integrations.guides.sendgrid.step2.title',
  //       descriptionKey: 'integrations.guides.sendgrid.step2.description',
  //     },
  //     {
  //       titleKey: 'integrations.guides.sendgrid.step3.title',
  //       descriptionKey: 'integrations.guides.sendgrid.step3.description',
  //       tipsKeys: [
  //         'integrations.guides.sendgrid.step3.tip1',
  //         'integrations.guides.sendgrid.step3.tip2',
  //       ],
  //     },
  //     {
  //       titleKey: 'integrations.guides.sendgrid.step4.title',
  //       descriptionKey: 'integrations.guides.sendgrid.step4.description',
  //       tipsKeys: [
  //         'integrations.guides.sendgrid.step4.tip1',
  //         'integrations.guides.sendgrid.step4.tip2',
  //       ],
  //     },
  //   ],
  // },

  // Example: Stripe (Easy setup)
  stripe: {
    integrationName: 'stripe',
    difficulty: 'easy',
    estimatedTimeKey: 'integrations.guides.stripe.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.stripe.prerequisites.0',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.stripe.step1.title',
        descriptionKey: 'integrations.guides.stripe.step1.description',
        externalLink: {
          url: 'https://dashboard.stripe.com',
          labelKey: 'integrations.guides.stripe.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.stripe.step2.title',
        descriptionKey: 'integrations.guides.stripe.step2.description',
      },
      {
        titleKey: 'integrations.guides.stripe.step3.title',
        descriptionKey: 'integrations.guides.stripe.step3.description',
        tipsKeys: [
          'integrations.guides.stripe.step3.tip1',
          'integrations.guides.stripe.step3.tip2',
          'integrations.guides.stripe.step3.tip3',
        ],
      },
    ],
  },

  // Example: OpenAI (Easy setup)
  openai: {
    integrationName: 'openai',
    difficulty: 'easy',
    estimatedTimeKey: 'integrations.guides.openai.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.openai.prerequisites.0',
      'integrations.guides.openai.prerequisites.1',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.openai.step1.title',
        descriptionKey: 'integrations.guides.openai.step1.description',
        externalLink: {
          url: 'https://platform.openai.com',
          labelKey: 'integrations.guides.openai.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.openai.step2.title',
        descriptionKey: 'integrations.guides.openai.step2.description',
      },
      {
        titleKey: 'integrations.guides.openai.step3.title',
        descriptionKey: 'integrations.guides.openai.step3.description',
        tipsKeys: [
          'integrations.guides.openai.step3.tip1',
          'integrations.guides.openai.step3.tip2',
          'integrations.guides.openai.step3.tip3',
        ],
      },
    ],
  },

  // Popular integrations
  slack: {
    integrationName: 'slack',
    difficulty: 'medium',
    estimatedTimeKey: 'integrations.guides.slack.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.slack.prerequisites.0',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.slack.step1.title',
        descriptionKey: 'integrations.guides.slack.step1.description',
        externalLink: {
          url: 'https://api.slack.com/apps',
          labelKey: 'integrations.guides.slack.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.slack.step2.title',
        descriptionKey: 'integrations.guides.slack.step2.description',
      },
      {
        titleKey: 'integrations.guides.slack.step3.title',
        descriptionKey: 'integrations.guides.slack.step3.description',
        tipsKeys: [
          'integrations.guides.slack.step3.tip1',
          'integrations.guides.slack.step3.tip2',
        ],
      },
      {
        titleKey: 'integrations.guides.slack.step4.title',
        descriptionKey: 'integrations.guides.slack.step4.description',
        tipsKeys: [
          'integrations.guides.slack.step4.tip1',
        ],
      },
    ],
  },

  github: {
    integrationName: 'github',
    difficulty: 'easy',
    estimatedTimeKey: 'integrations.guides.github.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.github.prerequisites.0',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.github.step1.title',
        descriptionKey: 'integrations.guides.github.step1.description',
        externalLink: {
          url: 'https://github.com/settings/tokens',
          labelKey: 'integrations.guides.github.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.github.step2.title',
        descriptionKey: 'integrations.guides.github.step2.description',
        tipsKeys: [
          'integrations.guides.github.step2.tip1',
          'integrations.guides.github.step2.tip2',
        ],
      },
      {
        titleKey: 'integrations.guides.github.step3.title',
        descriptionKey: 'integrations.guides.github.step3.description',
        tipsKeys: [
          'integrations.guides.github.step3.tip1',
          'integrations.guides.github.step3.tip2',
        ],
      },
    ],
  },

  notion: {
    integrationName: 'notion',
    difficulty: 'medium',
    estimatedTimeKey: 'integrations.guides.notion.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.notion.prerequisites.0',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.notion.step1.title',
        descriptionKey: 'integrations.guides.notion.step1.description',
        externalLink: {
          url: 'https://www.notion.so/my-integrations',
          labelKey: 'integrations.guides.notion.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.notion.step2.title',
        descriptionKey: 'integrations.guides.notion.step2.description',
      },
      {
        titleKey: 'integrations.guides.notion.step3.title',
        descriptionKey: 'integrations.guides.notion.step3.description',
        tipsKeys: [
          'integrations.guides.notion.step3.tip1',
          'integrations.guides.notion.step3.tip2',
        ],
      },
      {
        titleKey: 'integrations.guides.notion.step4.title',
        descriptionKey: 'integrations.guides.notion.step4.description',
        tipsKeys: [
          'integrations.guides.notion.step4.tip1',
        ],
      },
    ],
  },

  google_sheets: {
    integrationName: 'google_sheets',
    difficulty: 'advanced',
    estimatedTimeKey: 'integrations.guides.google_sheets.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.google_sheets.prerequisites.0',
      'integrations.guides.google_sheets.prerequisites.1',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.google_sheets.step1.title',
        descriptionKey: 'integrations.guides.google_sheets.step1.description',
        externalLink: {
          url: 'https://console.cloud.google.com',
          labelKey: 'integrations.guides.google_sheets.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.google_sheets.step2.title',
        descriptionKey: 'integrations.guides.google_sheets.step2.description',
      },
      {
        titleKey: 'integrations.guides.google_sheets.step3.title',
        descriptionKey: 'integrations.guides.google_sheets.step3.description',
        tipsKeys: [
          'integrations.guides.google_sheets.step3.tip1',
        ],
      },
      {
        titleKey: 'integrations.guides.google_sheets.step4.title',
        descriptionKey: 'integrations.guides.google_sheets.step4.description',
      },
      {
        titleKey: 'integrations.guides.google_sheets.step5.title',
        descriptionKey: 'integrations.guides.google_sheets.step5.description',
        tipsKeys: [
          'integrations.guides.google_sheets.step5.tip1',
          'integrations.guides.google_sheets.step5.tip2',
        ],
      },
    ],
  },

  shopify: {
    integrationName: 'shopify',
    difficulty: 'medium',
    estimatedTimeKey: 'integrations.guides.shopify.estimatedTime',
    prerequisitesKeys: [
      'integrations.guides.shopify.prerequisites.0',
      'integrations.guides.shopify.prerequisites.1',
    ],
    steps: [
      {
        titleKey: 'integrations.guides.shopify.step1.title',
        descriptionKey: 'integrations.guides.shopify.step1.description',
        externalLink: {
          url: 'https://admin.shopify.com',
          labelKey: 'integrations.guides.shopify.step1.linkLabel',
        },
      },
      {
        titleKey: 'integrations.guides.shopify.step2.title',
        descriptionKey: 'integrations.guides.shopify.step2.description',
      },
      {
        titleKey: 'integrations.guides.shopify.step3.title',
        descriptionKey: 'integrations.guides.shopify.step3.description',
        tipsKeys: [
          'integrations.guides.shopify.step3.tip1',
        ],
      },
      {
        titleKey: 'integrations.guides.shopify.step4.title',
        descriptionKey: 'integrations.guides.shopify.step4.description',
        tipsKeys: [
          'integrations.guides.shopify.step4.tip1',
          'integrations.guides.shopify.step4.tip2',
        ],
      },
    ],
  },
};

/**
 * Get guide for a specific integration
 */
export function getIntegrationGuide(integrationName: string): IntegrationGuide | undefined {
  return integrationGuides[integrationName];
}

/**
 * Check if an integration has a setup guide
 */
export function hasSetupGuide(integrationName: string): boolean {
  return integrationName in integrationGuides;
}
