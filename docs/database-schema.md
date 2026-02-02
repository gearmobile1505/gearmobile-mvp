# Gearmobile Database Schema

## Overview
PostgreSQL schema for peer-to-peer gear rental marketplace with double-booking prevention and state-based rental flow.

---

## Core Tables

### 1. users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar_url TEXT,
  bio TEXT,
  
  -- Stripe Connect
  stripe_account_id VARCHAR(255) UNIQUE,
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  
  -- Reputation
  rating_as_owner DECIMAL(3,2) DEFAULT 0.00,
  rating_as_renter DECIMAL(3,2) DEFAULT 0.00,
  total_bookings_as_owner INTEGER DEFAULT 0,
  total_bookings_as_renter INTEGER DEFAULT 0,
  
  -- Verification
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  identity_verified BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Soft delete
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_stripe ON users(stripe_account_id);
CREATE INDEX idx_users_email ON users(email);
```

---

### 2. listings
```sql
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE listing_category AS ENUM (
  'camera', 'audio', 'lighting', 'outdoor', 'tools', 
  'sports', 'camping', 'electronics', 'other'
);

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Basic info
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category listing_category NOT NULL,
  
  -- Pricing (in cents)
  daily_rate_cents INTEGER NOT NULL CHECK (daily_rate_cents > 0),
  security_deposit_cents INTEGER DEFAULT 0 CHECK (security_deposit_cents >= 0),
  
  -- Location
  location_city VARCHAR(100) NOT NULL,
  location_state VARCHAR(50) NOT NULL,
  location_zip VARCHAR(20),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  
  -- Availability
  min_rental_days INTEGER DEFAULT 1 CHECK (min_rental_days > 0),
  max_rental_days INTEGER DEFAULT 30 CHECK (max_rental_days >= min_rental_days),
  advance_notice_days INTEGER DEFAULT 1 CHECK (advance_notice_days >= 0),
  
  -- Media
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  
  -- Status
  status listing_status DEFAULT 'draft',
  
  -- Metadata
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_listings_owner ON listings(owner_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_location ON listings(location_city, location_state);
```

---

### 3. bookings (with double-booking prevention)

**State Machine Flow:**
```
PENDING → ACCEPTED → PAID → ACTIVE → RETURNED → COMPLETED
                       ↓              ↓
                   CANCELLED      DISPUTED
```

```sql
CREATE TYPE booking_status AS ENUM (
  'pending',              -- Renter requested, awaiting owner approval
  'accepted',             -- Owner accepted, awaiting payment
  'paid',                 -- Payment captured, booking confirmed (BLOCKS CALENDAR)
  'active',               -- Rental period has started
  'returned',             -- Item returned, awaiting final confirmation
  'completed',            -- Transaction complete, funds released
  'cancelled_by_renter',  -- Renter cancelled
  'cancelled_by_owner',   -- Owner cancelled
  'disputed'              -- Issue needs resolution
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  renter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Dates
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  CHECK (end_date > start_date),
  
  -- Status
  status booking_status DEFAULT 'pending',
  
  -- Pricing snapshot (immutable after creation)
  daily_rate_cents INTEGER NOT NULL,
  security_deposit_cents INTEGER NOT NULL,
  total_days INTEGER NOT NULL,
  subtotal_cents INTEGER NOT NULL,
  service_fee_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  
  -- Stripe
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  
  -- Notes
  renter_message TEXT,
  cancellation_reason TEXT,
  dispute_details TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- CRITICAL: Prevent double-booking using exclusion constraint
-- Only blocks calendar for bookings that are PAID, ACTIVE, or RETURNED
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE INDEX idx_bookings_listing_dates ON bookings 
  USING GIST (listing_id, daterange(start_date, end_date, '[]'))
  WHERE status IN ('paid', 'active', 'returned');

-- Custom exclusion constraint
ALTER TABLE bookings ADD CONSTRAINT no_double_booking
  EXCLUDE USING GIST (
    listing_id WITH =,
    daterange(start_date, end_date, '[]') WITH &&
  )
  WHERE (status IN ('paid', 'active', 'returned'));

CREATE INDEX idx_bookings_renter ON bookings(renter_id);
CREATE INDEX idx_bookings_owner ON bookings(owner_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
```

---

### 4. reviews
```sql
CREATE TYPE review_type AS ENUM ('renter_to_owner', 'owner_to_renter');

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  type review_type NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate reviews for same booking
  UNIQUE(booking_id, reviewer_id)
);

CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
```

---

### 5. messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_messages_booking ON messages(booking_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id, read_at);
```

---

### 6. payment_transactions (audit trail)
```sql
CREATE TYPE transaction_type AS ENUM (
  'booking_payment',
  'security_deposit_hold',
  'security_deposit_release',
  'payout_to_owner',
  'refund_to_renter',
  'platform_fee'
);

CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  type transaction_type NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  stripe_id VARCHAR(255),
  stripe_status VARCHAR(50),
  
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_transactions_booking ON payment_transactions(booking_id);
CREATE INDEX idx_transactions_user ON payment_transactions(user_id);
CREATE INDEX idx_transactions_stripe ON payment_transactions(stripe_id);
```

---

## State Machine: Booking Flow

### State Transitions

| From State | To State | Triggered By | Payment Action |
|-----------|----------|--------------|----------------|
| `pending` | `accepted` | Owner approves | - |
| `pending` | `cancelled_by_owner` | Owner declines | - |
| `pending` | `cancelled_by_renter` | Renter cancels | - |
| `accepted` | `paid` | Payment success | Capture payment + hold deposit |
| `accepted` | `cancelled_by_renter` | Renter cancels | - |
| `paid` | `active` | start_date reached | - |
| `paid` | `cancelled_by_owner` | Owner cancels | Full refund |
| `paid` | `cancelled_by_renter` | Renter cancels | Partial refund (policy based) |
| `active` | `returned` | Renter marks returned | - |
| `active` | `disputed` | Either party disputes | - |
| `returned` | `completed` | Owner confirms return | Release funds to owner |
| `returned` | `disputed` | Owner reports damage | - |
| `disputed` | `completed` | Resolution reached | Distribute funds per resolution |

---

## Double-Booking Prevention Strategy

### PostgreSQL Exclusion Constraint
```sql
-- Only these statuses block the calendar
WHERE status IN ('paid', 'active', 'returned')
```

### Why This Works:
1. **Range Overlap Detection**: `daterange(start_date, end_date, '[]')` with `&&` operator
2. **Status-Based Blocking**: Only confirmed bookings block calendar
3. **Atomic Operations**: Database enforces constraint at transaction level
4. **Performance**: GIST index optimized for range queries

### Application-Level Checks:
```typescript
// Before allowing booking, check availability
SELECT COUNT(*) FROM bookings
WHERE listing_id = $1
  AND status IN ('paid', 'active', 'returned')
  AND daterange($2::date, $3::date, '[]') && daterange(start_date, end_date, '[]');
// If count > 0, dates unavailable
```

---

## Indexes for Performance

### Critical Queries:
1. **Search listings by location + category**
   - Composite index: `(location_city, location_state, category, status)`

2. **Check availability for date range**
   - GIST index: `(listing_id, daterange(start_date, end_date))`

3. **User dashboard (my bookings)**
   - Index: `(renter_id, status, start_date)`
   - Index: `(owner_id, status, start_date)`

4. **Unread messages count**
   - Index: `(recipient_id, read_at)`

---

## Supabase Integration Notes

### Row Level Security (RLS) Policies:

```sql
-- Users can only update their own profile
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Listings visibility
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active listings"
  ON listings FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid());

CREATE POLICY "Owners can manage their listings"
  ON listings FOR ALL
  USING (owner_id = auth.uid());

-- Bookings privacy
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their bookings"
  ON bookings FOR SELECT
  USING (renter_id = auth.uid() OR owner_id = auth.uid());

CREATE POLICY "Renters can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (renter_id = auth.uid());

CREATE POLICY "Participants can update booking status"
  ON bookings FOR UPDATE
  USING (renter_id = auth.uid() OR owner_id = auth.uid());
```

---

## Next Steps

1. **Create migration files** in `/docs/migrations/`
2. **Set up Supabase project** and run migrations
3. **Build TypeScript types** from schema (use `supabase gen types`)
4. **Implement state machine logic** in Next.js API routes
5. **Add Stripe Connect webhooks** for payment confirmation

---

## Notes

- All monetary values stored in **cents** to avoid floating-point errors
- Use **soft deletes** (`deleted_at`) for auditing
- **JSONB** for flexible data (images array, metadata)
- **Timestamps** with time zones for global operation
- **UUID** primary keys for security and distribution
