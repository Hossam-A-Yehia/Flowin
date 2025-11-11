import { PrismaClient, AuthType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Seed Integrations
  const integrations = [
    // Communication & Messaging
    {
      name: 'whatsapp',
      displayName: 'WhatsApp Business',
      category: 'Communication',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Send automated messages, notifications, and updates to your customers via WhatsApp Business API.',
      iconUrl: '/integrations/whatsapp-business-icon.svg',
      websiteUrl: 'https://developers.facebook.com/docs/whatsapp/getting-started',
    },
    {
      name: 'slack',
      displayName: 'Slack',
      category: 'Communication',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Send messages, notifications, and updates to Slack channels and direct messages.',
      iconUrl: '/integrations/slack-icon.svg',
      websiteUrl: 'https://api.slack.com/apps',
    },
    {
      name: 'telegram',
      displayName: 'Telegram',
      category: 'Communication',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Send automated messages and notifications through Telegram bots.',
      iconUrl: '/integrations/telegram-icon.svg',
      websiteUrl: 'https://core.telegram.org/bots#how-do-i-create-a-bot',
    },
    {
      name: 'discord',
      displayName: 'Discord',
      category: 'Communication',
      authType: AuthType.WEBHOOK,
      isActive: true,
      description:
        'Send messages and notifications to Discord channels via webhooks.',
      iconUrl: '/integrations/discord-round-color-icon.svg',
      websiteUrl: 'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks',
    },

    // Email
    {
      name: 'gmail',
      displayName: 'Gmail',
      category: 'Email',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Send emails, read inbox, and automate email workflows with Gmail.',
      iconUrl: '/integrations/gmail-icon.svg',
      websiteUrl: 'https://console.cloud.google.com/apis/library/gmail.googleapis.com',
    },
    {
      name: 'outlook',
      displayName: 'Outlook',
      category: 'Email',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage emails, calendar events, and contacts with Microsoft Outlook.',
      iconUrl: '/integrations/microsoft-outlook-icon.svg',
      websiteUrl: 'https://learn.microsoft.com/en-us/graph/auth-register-app-v2',
    },
    // {
    //   name: 'sendgrid',
    //   displayName: 'SendGrid',
    //   category: 'Email',
    //   authType: AuthType.API_KEY,
    //   isActive: true,
    //   description:
    //     'Send transactional and marketing emails at scale with SendGrid.',
    //   iconUrl: '/integrations/sendgrid.svg',
    //   websiteUrl: 'https://app.sendgrid.com/settings/api_keys',
    // },

    // Productivity & Documents
    {
      name: 'google_sheets',
      displayName: 'Google Sheets',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Read, write, and update data in Google Sheets spreadsheets.',
      iconUrl: '/integrations/google-sheets-icon.svg',
      websiteUrl: 'https://console.cloud.google.com/apis/library/sheets.googleapis.com',
    },
    {
      name: 'google_drive',
      displayName: 'Google Drive',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Upload, download, and manage files in Google Drive storage.',
      iconUrl: '/integrations/google-drive-color-icon.svg',
      websiteUrl: 'https://console.cloud.google.com/apis/library/drive.googleapis.com',
    },
    {
      name: 'notion',
      displayName: 'Notion',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Create, update, and manage pages and databases in Notion workspace.',
      iconUrl: '/integrations/notion-icon.svg',
      websiteUrl: 'https://www.notion.so/my-integrations',
    },
    {
      name: 'airtable',
      displayName: 'Airtable',
      category: 'Productivity',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Manage records in Airtable bases and automate database workflows.',
      iconUrl: '/integrations/airtable-icon.svg',
      websiteUrl: 'https://airtable.com/create/tokens',
    },
    {
      name: 'trello',
      displayName: 'Trello',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Create cards, manage boards, and automate project workflows in Trello.',
      iconUrl: '/integrations/trello-logo-icon.svg',
      websiteUrl: 'https://trello.com/power-ups/admin',
    },

    // E-commerce
    {
      name: 'shopify',
      displayName: 'Shopify',
      category: 'E-commerce',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage products, orders, and customers in your Shopify store.',
      iconUrl: '/integrations/shopify-icon.svg',
      websiteUrl: 'https://help.shopify.com/en/manual/apps/app-types/custom-apps',
    },
    {
      name: 'woocommerce',
      displayName: 'WooCommerce',
      category: 'E-commerce',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Automate order processing and inventory management for WooCommerce stores.',
      iconUrl: '/integrations/woocommerce-icon.svg',
      websiteUrl: 'https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication',
    },
    {
      name: 'stripe',
      displayName: 'Stripe',
      category: 'E-commerce',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Process payments, manage subscriptions, and handle invoices with Stripe.',
      iconUrl: '/integrations/stripe-icon.svg',
      websiteUrl: 'https://dashboard.stripe.com/apikeys',
    },

    // Social Media
    {
      name: 'instagram',
      displayName: 'Instagram',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Post content, manage comments, and analyze engagement on Instagram.',
      iconUrl: '/integrations/ig-instagram-icon.svg',
      websiteUrl: 'https://developers.facebook.com/docs/instagram-api/getting-started',
    },
    {
      name: 'twitter',
      displayName: 'Twitter (X)',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Post tweets, monitor mentions, and automate social media workflows.',
      iconUrl: '/integrations/x-social-media-black-icon.svg',
      websiteUrl: 'https://developer.twitter.com/en/portal/dashboard',
    },
    {
      name: 'facebook',
      displayName: 'Facebook',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Post updates, manage pages, and automate Facebook marketing.',
      iconUrl: '/integrations/facebook-round-color-icon.svg',
      websiteUrl: 'https://developers.facebook.com/apps',
    },
    {
      name: 'linkedin',
      displayName: 'LinkedIn',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Share content, manage company pages, and automate LinkedIn presence.',
      iconUrl: '/integrations/linkedin-app-icon.svg',
      websiteUrl: 'https://www.linkedin.com/developers/apps',
    },

    // CRM & Sales
    {
      name: 'hubspot',
      displayName: 'HubSpot',
      category: 'CRM',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage contacts, deals, and automate sales workflows in HubSpot CRM.',
      iconUrl: '/integrations/hubspot-icon.svg',
      websiteUrl: 'https://developers.hubspot.com/docs/api/overview',
    },
    {
      name: 'salesforce',
      displayName: 'Salesforce',
      category: 'CRM',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage leads, opportunities, and customer data in Salesforce.',
      iconUrl: '/integrations/salesforce-icon.svg',
      websiteUrl: 'https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_authentication.htm',
    },

    // Developer Tools
    {
      name: 'github',
      displayName: 'GitHub',
      category: 'Developer Tools',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage repositories, issues, and automate development workflows.',
      iconUrl: '/integrations/github-icon.svg',
      websiteUrl: 'https://github.com/settings/tokens',
    },
    {
      name: 'gitlab',
      displayName: 'GitLab',
      category: 'Developer Tools',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Automate CI/CD pipelines and manage GitLab projects.',
      iconUrl: '/integrations/gitlab-icon.svg',
      websiteUrl: 'https://gitlab.com/-/profile/personal_access_tokens',
    },

    // Calendar & Scheduling
    {
      name: 'google_calendar',
      displayName: 'Google Calendar',
      category: 'Calendar',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Create events, manage calendars, and automate scheduling workflows.',
      iconUrl: '/integrations/google-calendar-icon.svg',
      websiteUrl: 'https://console.cloud.google.com/apis/library/calendar-json.googleapis.com',
    },
    {
      name: 'calendly',
      displayName: 'Calendly',
      category: 'Calendar',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Automate meeting scheduling and manage Calendly bookings.',
      iconUrl: '/integrations/calendly-icon.svg',
      websiteUrl: 'https://developer.calendly.com/getting-started',
    },

    // Forms & Surveys
    // {
    //   name: 'typeform',
    //   displayName: 'Typeform',
    //   category: 'Forms',
    //   authType: AuthType.API_KEY,
    //   isActive: true,
    //   description:
    //     'Collect form responses and automate survey workflows.',
    //   iconUrl: '/integrations/typeform.svg',
    //   websiteUrl: 'https://developer.typeform.com/get-started/personal-access-token/',
    // },
    {
      name: 'google_forms',
      displayName: 'Google Forms',
      category: 'Forms',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Collect and process Google Forms responses automatically.',
      iconUrl: '/integrations/google-forms-icon.svg',
      websiteUrl: 'https://console.cloud.google.com/apis/library/forms.googleapis.com',
    },

    // AI & Automation
    {
      name: 'openai',
      displayName: 'OpenAI',
      category: 'AI',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Generate text, analyze content, and build AI-powered workflows with GPT.',
      iconUrl: '/integrations/openai-icon.svg',
      websiteUrl: 'https://platform.openai.com/api-keys',
    },
  ];

  console.log('📦 Seeding integrations...');
  
  for (const integration of integrations) {
    await prisma.integration.upsert({
      where: { name: integration.name },
      update: integration,
      create: integration,
    });
    console.log(`  ✓ ${integration.displayName}`);
  }

  console.log(`\n✅ Successfully seeded ${integrations.length} integrations!`);
  console.log('\n📊 Integration Categories:');
  
  const categories = [...new Set(integrations.map((i) => i.category))];
  categories.forEach((category) => {
    const count = integrations.filter((i) => i.category === category).length;
    console.log(`  • ${category}: ${count} integrations`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

