-- Seed Data for Gearmobile MVP
-- Run this in Supabase SQL Editor after migration

-- Create test users
INSERT INTO users (id, email, full_name, phone, rating_as_owner, rating_as_renter, email_verified) VALUES
  ('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Doe', '+1234567890', 4.85, 4.90, true),
  ('00000000-0000-0000-0000-000000000002', 'sarah@example.com', 'Sarah Smith', '+1234567891', 5.00, 4.95, true),
  ('00000000-0000-0000-0000-000000000003', 'mike@example.com', 'Mike Johnson', '+1234567892', 4.70, 4.80, true)
ON CONFLICT (id) DO NOTHING;

-- Create test listings
INSERT INTO listings (
  owner_id, 
  title, 
  description, 
  category, 
  daily_rate_cents, 
  security_deposit_cents,
  location_city,
  location_state,
  location_zip,
  location_lat,
  location_lng,
  min_rental_days,
  max_rental_days,
  status
) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Professional Power Drill Set',
    'High-quality cordless drill with multiple bits and carrying case. Perfect for home improvement projects. Includes 2 batteries and charger.',
    'tools',
    2500,
    5000,
    'Los Angeles',
    'CA',
    '90001',
    34.0522,
    -118.2437,
    1,
    7,
    'active'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Canon EOS R6 Camera Kit',
    'Full-frame mirrorless camera with 24-105mm lens. Includes extra batteries, SD cards, and camera bag. Great for professional photography.',
    'camera',
    5000,
    50000,
    'Los Angeles',
    'CA',
    '90012',
    34.0489,
    -118.2518,
    1,
    14,
    'active'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Fender Stratocaster Electric Guitar',
    'American-made Stratocaster in excellent condition. Perfect for gigs or recording. Includes hard case and cable.',
    'camera',
    3500,
    20000,
    'Los Angeles',
    'CA',
    '90013',
    34.0569,
    -118.2370,
    1,
    30,
    'active'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Lawn Mower - Gas Powered',
    'Reliable gas lawn mower, recently serviced. Perfect for medium to large yards. Easy to operate.',
    'tools',
    4000,
    10000,
    'Los Angeles',
    'CA',
    '90014',
    34.0447,
    -118.2505,
    1,
    3,
    'active'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'BenQ 4K Projector',
    'High-quality 4K projector perfect for events, presentations, or movie nights. Includes screen and cables.',
    'electronics',
    4500,
    30000,
    'Los Angeles',
    'CA',
    '90015',
    34.0594,
    -118.2477,
    1,
    7,
    'active'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Pressure Washer - 3000 PSI',
    'Professional-grade pressure washer for driveways, decks, and exterior cleaning. Very powerful and efficient.',
    'tools',
    3000,
    8000,
    'Los Angeles',
    'CA',
    '90017',
    34.0540,
    -118.2620,
    1,
    5,
    'active'
  );
