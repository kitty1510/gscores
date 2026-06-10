#!/bin/sh
set -e

echo "Running migrations..."
node ./node_modules/typeorm/cli.js migration:run -d dist/config/typeorm.config.js

echo "Running seeder (skipped if data already exists)..."
node dist/database/seeds/import-csv.seeder.js || echo "Seeder skipped"

echo "Starting server..."
exec node dist/main
