#!/bin/bash
# Apply Gearmobile database migration to Supabase

cd "$(dirname "$0")/.."

echo "🚀 Applying Gearmobile Database Migration..."
echo "=============================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found"
    exit 1
fi

# Source the environment variables
export $(grep -v '^#' .env.local | xargs)

MIGRATION_FILE="supabase/migrations/20260202_initial_schema.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found: $MIGRATION_FILE"
    exit 1
fi

echo "📋 Manual Migration Required"
echo ""
echo "Due to API limitations, please run the migration manually:"
echo ""
echo "1. Go to your Supabase SQL Editor:"
echo "   https://ksfpfhydcuktzopgczrb.supabase.co/project/_/sql"
echo ""
echo "2. Click 'New Query'"
echo ""
echo "3. Copy the contents of this file:"
echo "   $PWD/$MIGRATION_FILE"
echo ""
echo "4. Paste into the SQL Editor and click 'Run'"
echo ""
echo "Or run this command to copy the SQL:"
echo "   cat $MIGRATION_FILE | xclip -selection clipboard"
echo ""
echo "=============================================="
echo ""
echo "📊 This will create:"
echo "   ✓ 6 tables (users, listings, bookings, reviews, messages, payment_transactions)"
echo "   ✓ Double-booking prevention constraint"
echo "   ✓ Row Level Security policies"
echo "   ✓ Indexes for performance"
echo ""
