#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm install

echo "🔨 Building frontend..."
cd frontend && npm run build

cd ..
echo "🚀 Starting backend..."
node backend/server.js

