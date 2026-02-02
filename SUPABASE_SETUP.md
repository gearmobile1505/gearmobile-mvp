# Supabase Setup Instructions

## ✅ Completed
- [x] Supabase project created
- [x] Environment variables configured (`.env.local`)
- [x] Supabase packages installed (`@supabase/supabase-js`, `@supabase/ssr`)
- [x] Migration file created

## 🚀 Next Step: Run Database Migration

### Option 1: Supabase SQL Editor (Recommended)

1. **Open Supabase SQL Editor**:
   - Go to: https://ksfpfhydcuktzopgczrb.supabase.co/project/_/sql/new

2. **Copy the migration SQL**:
   - File location: `supabase/migrations/20260202_initial_schema.sql`
   - Or run in terminal: `cat ~/gearmobile/supabase/migrations/20260202_initial_schema.sql`

3. **Paste into SQL Editor**

4. **Click "Run"** (bottom right)

5. **Verify**: You should see success messages for all tables created

---

### What This Migration Creates

**📊 6 Database Tables:**
- `users` - User profiles with Stripe Connect & reputation
- `listings` - Gear items for rent
- `bookings` - Rental bookings with state machine
- `reviews` - Bidirectional ratings
- `messages` - In-app communication
- `payment_transactions` - Audit trail

**🔒 Security Features:**
- Double-booking prevention (PostgreSQL exclusion constraint)
- Row Level Security (RLS) policies on all tables
- Automatic `updated_at` triggers

**⚡ Performance:**
- 15+ indexes for fast queries
- GIST indexes for date range queries
- Optimized for location-based search

---

### After Migration Completes

**Verify tables exist:**
1. Go to: https://ksfpfhydcuktzopgczrb.supabase.co/project/_/editor
2. You should see 6 tables in the sidebar

**Next steps:**
1. Generate TypeScript types
2. Test Supabase connection
3. Build authentication flow

---

## 🐛 Troubleshooting

**If you see errors:**
- Make sure you're logged into the correct Supabase project
- Some extensions may already exist (ignore "already exists" errors)
- If migration fails partway, you may need to drop tables and re-run

**To reset database:**
```sql
DROP TABLE IF EXISTS payment_transactions CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS transaction_type CASCADE;
DROP TYPE IF EXISTS review_type CASCADE;
DROP TYPE IF EXISTS booking_status CASCADE;
DROP TYPE IF EXISTS listing_category CASCADE;
DROP TYPE IF EXISTS listing_status CASCADE;
```

Then run the migration again.

---

## 📝 Connection Details

- **Project URL**: https://ksfpfhydcuktzopgczrb.supabase.co
- **Anon Key**: Stored in `.env.local`
- **Service Role Key**: Stored in `.env.local`

✅ Ready to proceed!
