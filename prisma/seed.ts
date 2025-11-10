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
      iconUrl: '/integrations/whatsapp.svg',
      websiteUrl: 'https://business.whatsapp.com',
    },
    {
      name: 'slack',
      displayName: 'Slack',
      category: 'Communication',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Send messages, notifications, and updates to Slack channels and direct messages.',
      iconUrl: '/integrations/slack.svg',
      websiteUrl: 'https://slack.com',
    },
    {
      name: 'telegram',
      displayName: 'Telegram',
      category: 'Communication',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Send automated messages and notifications through Telegram bots.',
      iconUrl: '/integrations/telegram.svg',
      websiteUrl: 'https://telegram.org',
    },
    {
      name: 'discord',
      displayName: 'Discord',
      category: 'Communication',
      authType: AuthType.WEBHOOK,
      isActive: true,
      description:
        'Send messages and notifications to Discord channels via webhooks.',
      iconUrl: '/integrations/discord.svg',
      websiteUrl: 'https://discord.com',
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
      iconUrl: '/integrations/gmail.svg',
      websiteUrl: 'https://gmail.com',
    },
    {
      name: 'outlook',
      displayName: 'Outlook',
      category: 'Email',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage emails, calendar events, and contacts with Microsoft Outlook.',
      iconUrl: '/integrations/outlook.svg',
      websiteUrl: 'https://outlook.com',
    },
    {
      name: 'sendgrid',
      displayName: 'SendGrid',
      category: 'Email',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Send transactional and marketing emails at scale with SendGrid.',
      iconUrl: '/integrations/sendgrid.svg',
      websiteUrl: 'https://sendgrid.com',
    },

    // Productivity & Documents
    {
      name: 'google_sheets',
      displayName: 'Google Sheets',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Read, write, and update data in Google Sheets spreadsheets.',
      iconUrl: '/integrations/google-sheets.svg',
      websiteUrl: 'https://sheets.google.com',
    },
    {
      name: 'google_drive',
      displayName: 'Google Drive',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Upload, download, and manage files in Google Drive storage.',
      iconUrl: '/integrations/google-drive.svg',
      websiteUrl: 'https://drive.google.com',
    },
    {
      name: 'notion',
      displayName: 'Notion',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Create, update, and manage pages and databases in Notion workspace.',
      iconUrl: '/integrations/notion.svg',
      websiteUrl: 'https://notion.so',
    },
    {
      name: 'airtable',
      displayName: 'Airtable',
      category: 'Productivity',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Manage records in Airtable bases and automate database workflows.',
      iconUrl: '/integrations/airtable.svg',
      websiteUrl: 'https://airtable.com',
    },
    {
      name: 'trello',
      displayName: 'Trello',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Create cards, manage boards, and automate project workflows in Trello.',
      iconUrl: '/integrations/trello.svg',
      websiteUrl: 'https://trello.com',
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
      iconUrl: '/integrations/shopify.svg',
      websiteUrl: 'https://shopify.com',
    },
    {
      name: 'woocommerce',
      displayName: 'WooCommerce',
      category: 'E-commerce',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Automate order processing and inventory management for WooCommerce stores.',
      iconUrl: '/integrations/woocommerce.svg',
      websiteUrl: 'https://woocommerce.com',
    },
    {
      name: 'stripe',
      displayName: 'Stripe',
      category: 'E-commerce',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Process payments, manage subscriptions, and handle invoices with Stripe.',
      iconUrl: '/integrations/stripe.svg',
      websiteUrl: 'https://stripe.com',
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
      iconUrl: '/integrations/instagram.svg',
      websiteUrl: 'https://instagram.com',
    },
    {
      name: 'twitter',
      displayName: 'Twitter (X)',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Post tweets, monitor mentions, and automate social media workflows.',
      iconUrl: '/integrations/twitter.svg',
      websiteUrl: 'https://twitter.com',
    },
    {
      name: 'facebook',
      displayName: 'Facebook',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Post updates, manage pages, and automate Facebook marketing.',
      iconUrl: '/integrations/facebook.svg',
      websiteUrl: 'https://facebook.com',
    },
    {
      name: 'linkedin',
      displayName: 'LinkedIn',
      category: 'Social Media',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Share content, manage company pages, and automate LinkedIn presence.',
      iconUrl: '/integrations/linkedin.svg',
      websiteUrl: 'https://linkedin.com',
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
      iconUrl: '/integrations/hubspot.svg',
      websiteUrl: 'https://hubspot.com',
    },
    {
      name: 'salesforce',
      displayName: 'Salesforce',
      category: 'CRM',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Manage leads, opportunities, and customer data in Salesforce.',
      iconUrl: '/integrations/salesforce.svg',
      websiteUrl: 'https://salesforce.com',
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
      iconUrl: '/integrations/github.svg',
      websiteUrl: 'https://github.com',
    },
    {
      name: 'gitlab',
      displayName: 'GitLab',
      category: 'Developer Tools',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Automate CI/CD pipelines and manage GitLab projects.',
      iconUrl: '/integrations/gitlab.svg',
      websiteUrl: 'https://gitlab.com',
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
      iconUrl: '/integrations/google-calendar.svg',
      websiteUrl: 'https://calendar.google.com',
    },
    {
      name: 'calendly',
      displayName: 'Calendly',
      category: 'Calendar',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Automate meeting scheduling and manage Calendly bookings.',
      iconUrl: '/integrations/calendly.svg',
      websiteUrl: 'https://calendly.com',
    },

    // Forms & Surveys
    {
      name: 'typeform',
      displayName: 'Typeform',
      category: 'Forms',
      authType: AuthType.API_KEY,
      isActive: true,
      description:
        'Collect form responses and automate survey workflows.',
      iconUrl: '/integrations/typeform.svg',
      websiteUrl: 'https://typeform.com',
    },
    {
      name: 'google_forms',
      displayName: 'Google Forms',
      category: 'Forms',
      authType: AuthType.OAUTH2,
      isActive: true,
      description:
        'Collect and process Google Forms responses automatically.',
      iconUrl: '/integrations/google-forms.svg',
      websiteUrl: 'https://forms.google.com',
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
      iconUrl: '/integrations/openai.svg',
      websiteUrl: 'https://openai.com',
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
