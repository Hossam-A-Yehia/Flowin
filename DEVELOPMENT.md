# 🌊 Flowin Development Guide

This guide will help you set up and run the Flowin development environment.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Hossam-A-Yehia/Flowin.git
cd Flowin

# Run the automated setup script
npm run setup
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
# At minimum, update these values:
# - JWT_SECRET (generate a secure random string)
# - Database credentials (if different from defaults)
# - API keys for integrations you want to test
```

### 3. Start Development Servers

```bash
# Start all services (API, Web, Database, Redis)
npm run dev

# Or use the PowerShell script
npm run dev:start
```

## 🏗️ Project Structure

```
Flowin/
├── apps/
│   ├── api/          # NestJS Backend API
│   ├── web/          # Next.js Frontend
│   └── admin/        # Admin Dashboard (future)
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI components
│   ├── utils/        # Shared utilities
│   ├── ai/           # AI integration package
│   └── sdk/          # Integration SDK
├── prisma/           # Database schema and migrations
├── docker/           # Docker configuration
└── scripts/          # Development scripts
```

## 🗄️ Database Management

### Initial Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### Database GUI
```bash
# Open Prisma Studio
npm run db:studio
# Visit: http://localhost:5555
```

## 🐳 Docker Commands

```bash
# Start all Docker services
npm run docker:up

# Stop all Docker services
npm run docker:down

# View logs
npm run docker:logs

# Start only database and Redis
docker-compose -f docker/docker-compose.yml up -d postgres redis
```

## 🌐 Service URLs

When running in development mode:

- **Web App**: http://localhost:3000
- **API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs
- **Prisma Studio**: http://localhost:5555
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🔧 Development Workflow

### Adding New Features

1. **Database Changes**:
   ```bash
   # Update prisma/schema.prisma
   npm run db:push  # For development
   # or
   npm run db:migrate  # For production
   ```

2. **API Development**:
   - Add new modules in `apps/api/src/`
   - Follow NestJS conventions
   - Add Swagger documentation
   - Write tests

3. **Frontend Development**:
   - Add pages in `apps/web/src/app/`
   - Use shadcn/ui components
   - Follow Next.js 14 App Router patterns

### Code Quality

```bash
# Lint all projects
npm run lint

# Run tests
npm run test

# Type checking
npm run type-check
```

## 🔌 Adding Integrations

1. Create new integration in `packages/sdk/integrations/`
2. Follow the integration SDK pattern
3. Add to the integrations database table
4. Create UI components for connection flow

## 🧪 Testing

### API Testing
```bash
cd apps/api
npm run test
npm run test:watch
npm run test:cov
```

### Integration Testing
- Use the API documentation at `/api/docs`
- Test endpoints with Postman or similar tools
- Use the built-in Swagger UI

## 🔒 Environment Variables

### Required Variables
```env
DATABASE_URL="postgresql://flowin:flowin_dev_password@localhost:5432/flowin"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key"
```

### Optional Variables
```env
# AI Integration
OPENAI_API_KEY="your-openai-api-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# External Integrations
WHATSAPP_ACCESS_TOKEN="your-whatsapp-token"
NOTION_CLIENT_ID="your-notion-client-id"
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Ensure Docker is running
   docker ps
   
   # Restart database
   npm run docker:down
   npm run docker:up
   ```

2. **Port Already in Use**
   ```bash
   # Kill processes on ports 3000, 4000, 5432, 6379
   npx kill-port 3000 4000 5432 6379
   ```

3. **Prisma Client Issues**
   ```bash
   # Regenerate Prisma client
   npm run db:generate
   ```

4. **Node Modules Issues**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

- Check the [main README](./README.md) for project overview
- Review API documentation at `/api/docs`
- Check Docker logs: `npm run docker:logs`
- Ensure all prerequisites are installed

## 📚 Next Steps

1. **Complete Stage 1**: Finish all foundation deliverables
2. **Start MVP Development**: Begin implementing core features
3. **Set up CI/CD**: Automated testing and deployment
4. **Add Monitoring**: Logging and error tracking

## 🎯 Development Priorities

Based on your README Stage 1 checklist:

- [x] ✅ **Project Documentation** - Complete
- [x] ✅ **Technical Architecture** - Database schema implemented
- [x] ✅ **Development Setup** - Docker and scripts ready
- [ ] 🔄 **UI/UX Wireframes** - Need to create flow builder mockups
- [ ] 🔄 **Integration Research** - API documentation for key integrations

Ready to move to Stage 2: MVP Development! 🚀
