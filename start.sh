#!/bin/bash
set -e

echo "🔧 Installing all workspace dependencies..."
npm install

echo "🔧 Installing backend dependencies explicitly..."
cd backend && npm install && cd ..

echo "🔨 Building frontend from root..."
npm run build --workspace=frontend

echo "✅ Checking build output..."
if [ -f "frontend/dist/index.html" ]; then
    echo "✅ Build successful! index.html exists"
    ls -la frontend/dist/
else
    echo "❌ Build failed! index.html not found"
    exit 1
fi

echo "🚀 Starting backend..."
node backend/server.js

