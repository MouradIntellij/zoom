#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building frontend..."
npm run build --workspace=frontend

echo "🚀 Starting server..."
npm start --workspace=backend
