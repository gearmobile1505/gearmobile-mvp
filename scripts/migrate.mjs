#!/usr/bin/env node
/**
 * Run database migration using Supabase REST API
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

// Read migration file
const migrationPath = join(__dirname, '../supabase/migrations/20260202_initial_schema.sql');
const sql = readFileSync(migrationPath, 'utf8');

console.log('🚀 Running Gearmobile Database Migration...\n');

// Split SQL into individual statements (rough split by semicolons)
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s && !s.startsWith('--'));

console.log(`📊 Found ${statements.length} SQL statements to execute\n`);

// Execute via Supabase API using fetch
const dbUrl = SUPABASE_URL.replace('https://', 'https://') + '/rest/v1/rpc';

async function executeSql(query) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({})
  });
  
  return response;
}

// Alternative: Direct Postgres connection
console.log('⚠️  Direct SQL execution via REST API is limited.\n');
console.log('📋 Please run the migration manually:\n');
console.log('1. Go to: https://ksfpfhydcuktzopgczrb.supabase.co/project/_/sql/new');
console.log('2. Copy the contents from:');
console.log(`   ${migrationPath}`);
console.log('3. Paste and click "Run"\n');
console.log('Or copy to clipboard:');
console.log(`   cat "${migrationPath}" | xclip -selection clipboard\n`);

process.exit(0);
