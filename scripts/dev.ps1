# Flowin Development Server Script
# Starts all development services

Write-Host "🌊 Starting Flowin development servers..." -ForegroundColor Cyan

# Start Docker services if not running
Write-Host "🐳 Ensuring Docker services are running..." -ForegroundColor Yellow
docker-compose -f docker/docker-compose.yml up -d postgres redis

# Start development servers using Turbo
Write-Host "🚀 Starting development servers..." -ForegroundColor Yellow
npx turbo dev

Write-Host "🎉 All services started!" -ForegroundColor Green
Write-Host ""
Write-Host "Services running:" -ForegroundColor Cyan
Write-Host "• Web App: http://localhost:3000" -ForegroundColor White
Write-Host "• API: http://localhost:4000" -ForegroundColor White
Write-Host "• API Docs: http://localhost:4000/api/docs" -ForegroundColor White
Write-Host "• Prisma Studio: npx prisma studio" -ForegroundColor White
