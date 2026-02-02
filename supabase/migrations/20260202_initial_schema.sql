-- Gearmobile Initial Schema Migration
-- Created: 2026-02-02

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE listing_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE listing_category AS ENUM (
  'camera', 'audio', 'lighting', 'outdoor', 'tools', 
  'sports', 'camping', 'electronics', 'other'
);

CREATE TYPE booking_status AS ENUM (
  'pending',
  'accepted',
  'paid',
  'active',
  'returned',
  'completed',
  'cancelled_by_renter',
  'cancelled_by_owner',
  'disputed'
);

CREATE TYPE review_type AS ENUM ('renter_to_owner', 'owner_to_renter');

CREATE TYPE transaction_type AS ENUM (
  'booking_payment',
  'security_deposit_hold',
  'security_deposit_release',
  'payout_to_owner',
  'refund_to_renter',
  'platform_fee'
);

-- =====================================================
-- TABLES
-- =====================================================

-- Users table
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
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_stripe ON users(stripe_account_id);
CREATE INDEX idx_users_email ON users(email);

-- Listings table
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
  images JSONB DEFAULT '[]'::jsonb,
  
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

-- Bookings table with double-booking prevention
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

-- Double-booking prevention: exclusion constraint
CREATE INDEX idx_bookings_listing_dates ON bookings 
  USING GIST (listing_id, daterange(start_date, end_date, '[]'))
  WHERE status IN ('paid', 'active', 'returned');

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

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  type review_type NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(booking_id, reviewer_id)
);

CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_booking ON reviews(booking_id);

-- Messages table
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

-- Payment transactions table
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

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Listings policies
CREATE POLICY "Anyone can view active listings"
  ON listings FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid());

CREATE POLICY "Owners can manage their listings"
  ON listings FOR ALL
  USING (owner_id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can view their bookings"
  ON bookings FOR SELECT
  USING (renter_id = auth.uid() OR owner_id = auth.uid());

CREATE POLICY "Renters can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (renter_id = auth.uid());

CREATE POLICY "Participants can update booking status"
  ON bookings FOR UPDATE
  USING (renter_id = auth.uid() OR owner_id = auth.uid());

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for their bookings"
  ON reviews FOR INSERT
  WITH CHECK (reviewer_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can read their messages"
  ON messages FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages in their bookings"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- Payment transactions policies
CREATE POLICY "Users can view their transactions"
  ON payment_transactions FOR SELECT
  USING (user_id = auth.uid());

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA (Optional)
-- =====================================================

-- Add any seed data here if needed

-- =====================================================
-- COMPLETE
-- =====================================================
