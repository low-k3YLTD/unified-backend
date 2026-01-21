#!/bin/bash

# Migration script for unified-backend monorepo
echo "Starting migration from prior repositories..."

# Example: Migrating ingest service
# git clone https://github.com/legacy/ingest-service.git /tmp/ingest
# cp -r /tmp/ingest/src/* ./apps/ingest/src/

echo "Migration complete. Please run 'pnpm install' to update dependencies."
