-- Initialize Flowin Database
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create development user (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'flowin') THEN
        CREATE ROLE flowin WITH LOGIN PASSWORD 'flowin_dev_password';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE flowin TO flowin;

-- Create schema
CREATE SCHEMA IF NOT EXISTS public;
GRANT ALL ON SCHEMA public TO flowin;
