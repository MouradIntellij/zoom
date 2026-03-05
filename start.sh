#!/bin/bash
set -e

echo "🔧 Installing root dependencies..."
npm install

echo "🔧 Installing frontend dependencies..."
cd frontend && npm install

echo "🔨 Building frontend..."
npm run build

cd ..
echo "🚀 Starting backend..."
node backend/server.js

