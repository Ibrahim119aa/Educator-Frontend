#!/bin/bash

# Exit immediately if a command fails
set -e

# Load env
if [ ! -f .env.deploy ]; then
  echo "❌ .env.deploy not found. Cannot deploy."
  exit 1
fi
source .env.deploy

echo "📦 Building Next.js frontend..."
npm install
npm run build && npm run export

echo "🚀 Uploading frontend to Hostinger..."
scp -r ./out/* "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_FRONTEND_PATH"

echo "✅ Frontend deployed successfully to oeducator.com"
