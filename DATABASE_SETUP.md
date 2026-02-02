# Database Setup - Add Seed Data

## You Need to Add Sample Data to See Listings!

The listings page now fetches from Supabase, but your database is empty. Let's add some test listings.

---

## Quick Setup (2 minutes)

### Step 1: Go to Supabase SQL Editor
👉 https://ksfpfhydcuktzopgczrb.supabase.co/project/_/sql/new

### Step 2: Copy & Run the Seed SQL

Open this file in VSCode:
```
scripts/seed-data.sql
```

**Or copy this:**
```sql
-- Create test users
INSERT INTO users (id, email, full_name, phone, rating_as_owner, rating_as_renter, email_verified) VALUES
  ('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Doe', '+1234567890', 4.85, 4.90, true),
  ('00000000-0000-0000-0000-000000000002', 'sarah@example.com', 'Sarah Smith', '+1234567891', 5.00, 4.95, true),
  ('00000000-0000-0000-0000-000000000003', 'mike@example.com', 'Mike Johnson', '+1234567892', 4.70, 4.80, true)
ON CONFLICT (id) DO NOTHING;

-- Create 6 test listings (Power Drill, Camera, Guitar, Lawn Mower, Projector, Pressure Washer)
INSERT INTO listings (
  owner_id, title, description, category, daily_rate_cents, security_deposit_cents,
  location_city, location_state, location_zip, location_lat, location_lng,
  min_rental_days, max_rental_days, status
) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Professional Power Drill Set',
   'High-quality cordless drill with multiple bits and carrying case.', 'tools',
   2500, 5000, 'Los Angeles', 'CA', '90001', 34.0522, -118.2437, 1, 7, 'active'),
  ('00000000-0000-0000-0000-000000000001', 'Canon EOS R6 Camera Kit',
   'Full-frame mirrorless camera with 24-105mm lens.', 'camera',
   5000, 50000, 'Los Angeles', 'CA', '90012', 34.0489, -118.2518, 1, 14, 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Fender Stratocaster Electric Guitar',
   'American-made Stratocaster in excellent condition.', 'camera',
   3500, 20000, 'Los Angeles', 'CA', '90013', 34.0569, -118.2370, 1, 30, 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Lawn Mower - Gas Powered',
   'Reliable gas lawn mower, recently serviced.', 'tools',
   4000, 10000, 'Los Angeles', 'CA', '90014', 34.0447, -118.2505, 1, 3, 'active'),
  ('00000000-0000-0000-0000-000000000003', 'BenQ 4K Projector',
   'High-quality 4K projector perfect for events.', 'electronics',
   4500, 30000, 'Los Angeles', 'CA', '90015', 34.0594, -118.2477, 1, 7, 'active'),
  ('00000000-0000-0000-0000-000000000003', 'Pressure Washer - 3000 PSI',
   'Professional-grade pressure washer.', 'tools',
   3000, 8000, 'Los Angeles', 'CA', '90017', 34.0540, -118.2620, 1, 5, 'active');
```

### Step 3: Paste and Run in SQL Editor
Click **"Run"** in the bottom right

### Step 4: Refresh Your Browser
Go to: http://localhost:3000/listings

---

## ✅ What You'll See

After running the seed data:
- **6 real listings** in the grid (Power Drill, Camera, Guitar, etc.)
- **Markers on the map** showing exact locations in LA
- **Clickable markers** with prices and details
- **Real owner names** and ratings

---

## 🔍 Verify It Worked

In Supabase, check your tables:
- Go to: https://ksfpfhydcuktzopgczrb.supabase.co/project/_/editor
- Click "users" table → should see 3 users
- Click "listings" table → should see 6 listings

---

## What's Now Working

✅ **Live database connection**  
✅ **Real-time data fetching** from Supabase  
✅ **Owner information** with ratings  
✅ **Map markers** at actual lat/lng coordinates  
✅ **Price conversion** (cents → dollars)  

---

## Next Steps

Once you see the listings:
1. Test clicking on listings → detail page
2. I'll connect the detail page to show real data
3. Then we'll add user authentication
4. Then the booking flow!
