# User Type Migration Instructions

## What Changed

Added a `user_type` column to the `users` table to support two distinct workflows:
- **customer** - Users who rent tools
- **renter** - Users who list tools to earn money  
- **both** - Users who do both

## Run Migration

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/ksfpfhydcuktzopgczrb
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/20260202_add_user_type.sql`
5. Click **Run**

## Migration SQL

```sql
-- Add user_type column to users table
ALTER TABLE users 
ADD COLUMN user_type TEXT DEFAULT 'customer' 
CHECK (user_type IN ('customer', 'renter', 'both'));

-- Add comment for documentation
COMMENT ON COLUMN users.user_type IS 'User type: customer (rent only), renter (list tools), or both';

-- Update existing users to default customer type if NULL
UPDATE users SET user_type = 'customer' WHERE user_type IS NULL;
```

## What This Enables

### Registration Flow
- Users now select their type during signup
- Dropdown options: "Rent tools", "List my tools and earn money", "Both"
- Redirects to appropriate page after signup:
  - Customer → `/listings`
  - Renter/Both → `/dashboard`

### Dynamic Navigation
The navbar now shows different menu items based on user type:

**Customer**:
- Browse
- Learn More
- My Bookings
- Messages
- Account

**Renter**:
- Dashboard
- List Your Tool
- Learn More
- Rentals
- Messages
- Account

**Both**:
- Dashboard
- List Your Tool
- Browse
- Learn More
- My Bookings
- Messages
- Account

## Next Steps

After running the migration:
1. Test signup with each user type option
2. Build `/dashboard` page for renters
3. Build `/list-tool` multi-step form page
4. Build `/messages` page
5. Build `/how-it-works` standalone page
