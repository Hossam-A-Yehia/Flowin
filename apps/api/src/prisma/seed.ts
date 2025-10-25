import { PrismaClient, AuthType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create initial integrations
  const integrations = [
    {
      name: 'google_sheets',
      displayName: 'Google Sheets',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      description: 'Connect to Google Sheets for data automation',
      iconUrl: 'https://developers.google.com/sheets/api/images/sheets-icon.png',
      websiteUrl: 'https://sheets.google.com',
    },
    {
      name: 'whatsapp_business',
      displayName: 'WhatsApp Business',
      category: 'Communication',
      authType: AuthType.API_KEY,
      description: 'Send WhatsApp messages via Business API',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      websiteUrl: 'https://business.whatsapp.com',
    },
    {
      name: 'notion',
      displayName: 'Notion',
      category: 'Productivity',
      authType: AuthType.OAUTH2,
      description: 'Connect to Notion databases and pages',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      websiteUrl: 'https://notion.so',
    },
    {
      name: 'gmail',
      displayName: 'Gmail',
      category: 'Communication',
      authType: AuthType.OAUTH2,
      description: 'Send and receive emails via Gmail',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
      websiteUrl: 'https://gmail.com',
    },
    {
      name: 'telegram',
      displayName: 'Telegram',
      category: 'Communication',
      authType: AuthType.API_KEY,
      description: 'Send messages via Telegram Bot API',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
      websiteUrl: 'https://telegram.org',
    },
  ];

  for (const integration of integrations) {
    await prisma.integration.upsert({
      where: { name: integration.name },
      update: integration,
      create: integration,
    });
  }

  console.log('✅ Integrations seeded');

  // Create sample templates
  const templates = [
    {
      name: 'New Order WhatsApp Notification',
      description: 'Send WhatsApp message when new order is received',
      category: 'E-commerce',
      tags: ['whatsapp', 'orders', 'notifications'],
      isOfficial: true,
      isPublic: true,
      flowStructure: {
        nodes: [
          {
            id: 'trigger-1',
            type: 'TRIGGER',
            name: 'New Order',
            integration: 'shopify',
            config: { event: 'order.created' },
            position: { x: 100, y: 100 },
          },
          {
            id: 'action-1',
            type: 'ACTION',
            name: 'Send WhatsApp',
            integration: 'whatsapp_business',
            config: {
              message: 'Hello {{customer_name}}, your order #{{order_id}} has been received!',
              phone: '{{customer_phone}}',
            },
            position: { x: 300, y: 100 },
          },
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'trigger-1',
            target: 'action-1',
          },
        ],
      },
    },
    {
      name: 'Gmail to Notion Database',
      description: 'Add new Gmail contacts to Notion database',
      category: 'Productivity',
      tags: ['gmail', 'notion', 'contacts'],
      isOfficial: true,
      isPublic: true,
      flowStructure: {
        nodes: [
          {
            id: 'trigger-1',
            type: 'TRIGGER',
            name: 'New Email',
            integration: 'gmail',
            config: { label: 'INBOX' },
            position: { x: 100, y: 100 },
          },
          {
            id: 'action-1',
            type: 'ACTION',
            name: 'Add to Notion',
            integration: 'notion',
            config: {
              database_id: '{{notion_database_id}}',
              properties: {
                Name: '{{sender_name}}',
                Email: '{{sender_email}}',
                Subject: '{{email_subject}}',
              },
            },
            position: { x: 300, y: 100 },
          },
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'trigger-1',
            target: 'action-1',
          },
        ],
      },
    },
  ];

  for (const template of templates) {
    const existingTemplate = await prisma.template.findFirst({
      where: { name: template.name },
    });
    
    if (!existingTemplate) {
      await prisma.template.create({
        data: template,
      });
    }
  }

  console.log('✅ Templates seeded');

  // Create test user (for development only)
  if (process.env.NODE_ENV === 'development') {
    const testPassword = await bcrypt.hash('TestPass123!', 12);
    
    await prisma.user.upsert({
      where: { email: 'test@flowin.app' },
      update: {},
      create: {
        email: 'test@flowin.app',
        name: 'Test User',
        password: testPassword,
        plan: 'PRO',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Test user created: test@flowin.app / TestPass123!');
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
