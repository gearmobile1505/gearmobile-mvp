# User Types & Workflows

## Overview
GearMobile supports two distinct user workflows: **Renters** (tool owners) and **Customers** (people renting tools).

## User Types

### 1. Customer (Tool Renter)
**Goal**: Find and rent tools nearby  
**Primary Actions**:
- Browse available tools
- Search by location/category/dates
- Book tools
- Message tool owners
- Leave reviews

**Navigation**:
- Browse
- Learn More
- Messages
- My Bookings
- Account

### 2. Renter (Tool Owner)
**Goal**: List tools and earn money  
**Primary Actions**:
- List tools (multi-step form)
- Manage availability/pricing
- Accept/decline booking requests
- Track earnings
- Message customers

**Navigation**:
- Dashboard (overview of listings + bookings)
- List Your Tool
- Learn More
- Rentals (incoming bookings)
- Messages
- Account

### 3. Both (Dual Role)
Users can be both customer and renter.  
Navigation should show all options with clear context switching.

## Database Schema Updates

### Option A: Simple Boolean (Recommended for MVP)
```sql
ALTER TABLE users 
ADD COLUMN is_renter BOOLEAN DEFAULT FALSE;
```

### Option B: Role-based (More flexible)
```sql
ALTER TABLE users 
ADD COLUMN user_type TEXT DEFAULT 'customer' CHECK (user_type IN ('customer', 'renter', 'both'));
```

## Onboarding Flow

### Signup Step 2: User Type Selection
After email/password, ask:

**"What brings you to GearMobile?"**
- [ ] I want to rent tools
- [ ] I want to list my tools and earn money
- [ ] Both

Based on selection:
- Set `is_renter` or `user_type`
- Show appropriate onboarding tutorial
- Redirect to appropriate dashboard

## List Your Tool Flow (4 Steps)

### Step 1: Your Tools - Location
- "Where is your tool located?"
- Address/ZIP input
- Map preview

### Step 2: Tool Availability
- Calendar picker
- Available dates/times
- Minimum/maximum rental period

### Step 3: Tool Details
- Tool name
- Category
- Brand/model
- Condition
- Description
- Daily rate
- Deposit amount
- Delivery options

### Step 4: Tool Photos
- Upload 1-8 photos
- Drag to reorder
- Cover photo selection

**Result**: Draft listing → Review → Publish

## Dashboard Views

### Customer Dashboard
- Recent searches
- Saved favorites
- Active bookings
- Past rentals
- Suggested tools nearby

### Renter Dashboard
- Total earnings (month/all-time)
- Active listings (count)
- Pending booking requests
- Upcoming bookings
- Reviews received
- Quick actions: List new tool, Edit listing

## Next Steps

1. Update database schema with user_type column
2. Add user type selection to signup flow
3. Create conditional navbar component
4. Build List Your Tool multi-step form
5. Build Renter Dashboard
6. Add "Become a Renter" CTA for customers
