#!/usr/bin/env node
/**
 * Run Supabase migration using service role key
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const migrationPath = path.join(__dirname, '../supabase/migrations/20260202_initial_schema.sql');
const sql = fs.readFileSync(migrationPath, 'utf8');

console.log('🚀 Running Gearmobile database migration...\n');

// Execute SQL via Supabase REST API
fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
  },
  body: JSON.stringify({ query: sql })
})
.then(async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Migration failed: ${error}`);
  }
  console.log('✅ Migration completed successfully!\n');
  console.log('📊 Created tables:');
  console.log('   - users');
  console.log('   - listings');
  console.log('   - bookings (with double-booking prevention)');
  console.log('   - reviews');
  console.log('   - messages');
  console.log('   - payment_transactions\n');
  console.log('🔐 Row Level Security enabled on all tables\n');
})
.catch((error) => {
  console.error('❌ Migration error:', error.message);
  console.log('\n💡 Trying alternative method via SQL Editor...');
  console.log('\n📋 Manual steps:');
  console.log('1. Go to: https://ksfpfhydcuktzopgczrb.supabase.co/project/_/sql');
  console.log('2. Copy contents from: supabase/migrations/20260202_initial_schema.sql');
  console.log('3. Paste and run in SQL Editor\n');
  process.exit(1);
});
