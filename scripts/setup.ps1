# Flowin Development Setup Script
# Run this script to set up the development environment

Write-Host "Setting up Flowin development environment..." -ForegroundColor Cyan

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js 20+ first." -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

Write-Host "Prerequisites check passed" -ForegroundColor Green

# Copy environment file if missing
if (!(Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please update .env file with your actual values" -ForegroundColor Yellow
}

# Clean any existing node_modules (with error handling)
Write-Host "Cleaning existing dependencies..." -ForegroundColor Yellow

$foldersToClean = @(
    "node_modules",
    "package-lock.json",
    "apps/api/node_modules",
    "apps/api/package-lock.json",
    "apps/web/node_modules",
    "apps/web/package-lock.json"
)

foreach ($path in $foldersToClean) {
    if (Test-Path $path) {
        try {
            Remove-Item -Recurse -Force $path -ErrorAction Stop
        } catch {
            Write-Host "Skipped $path (locked or in use)" -ForegroundColor DarkYellow
        }
    }
}

# Install dependencies
Write-Host "Installing all dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Start Docker services
Write-Host "Starting Docker services..." -ForegroundColor Yellow
docker-compose -f docker/docker-compose.yml up -d postgres redis

# Wait for database
Write-Host "Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma db push

# Done
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env file with your API keys" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start development servers" -ForegroundColor White
Write-Host "3. Visit http://localhost:3000 for the web app" -ForegroundColor White
Write-Host "4. Visit http://localhost:4000/api/docs for API documentation" -ForegroundColor White
