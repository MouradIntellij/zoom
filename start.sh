#!/bin/bash
set -e

echo "🔧 Installing root dependencies..."
npm install

echo "🔧 Installing backend dependencies..."
cd backend && npm install && cd ..

echo "🔧 Installing frontend dependencies..."
cd frontend && npm install

echo "🔨 Building frontend..."
npm run build

echo "✅ Build completed successfully!"
ls -la dist/

cd ..
echo "🚀 Starting backend..."
node backend/server.js

