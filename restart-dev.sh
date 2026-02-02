#!/bin/bash
# Restart Next.js development server

echo "🔄 Stopping existing Next.js server..."
pkill -f "next dev"
sleep 1

echo "🚀 Starting development server..."
cd "$(dirname "$0")"
npm run dev -- --turbo

# If you want to run in background instead, uncomment this and comment the line above:
# npm run dev -- --turbo > /tmp/nextjs-dev.log 2>&1 &
# echo "✅ Server started in background. View logs: tail -f /tmp/nextjs-dev.log"
