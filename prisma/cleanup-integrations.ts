import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  console.log('🧹 Cleaning up commented-out integrations...\n');

  const integrationsToRemove = ['sendgrid', 'typeform'];

  for (const name of integrationsToRemove) {
    try {
      const userIntegrations = await prisma.userIntegration.deleteMany({
        where: {
          integration: {
            name: name,
          },
        },
      });

      if (userIntegrations.count > 0) {
        console.log(`  ✓ Deleted ${userIntegrations.count} user connection(s) for ${name}`);
      }

      const integration = await prisma.integration.delete({
        where: { name: name },
      });

      console.log(`  ✓ Deleted integration: ${integration.displayName}`);
    } catch (error: any) {
      if (error.code === 'P2025') {
        console.log(`  ℹ ${name} not found (already removed)`);
      } else {
        console.error(`  ✗ Error removing ${name}:`, error.message);
      }
    }
  }

  console.log('\n✅ Cleanup complete!');
}

cleanup()
  .catch((e) => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
