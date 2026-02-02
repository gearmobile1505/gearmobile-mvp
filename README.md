# Gearmobile MVP

Peer-to-peer equipment rental marketplace built with Next.js 16, Supabase, and Stripe.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Setup Environment Variables
Create `.env.local` in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ksfpfhydcuktzopgczrb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
```

### Run Development Server
```bash
npm run dev:turbo
```

Or use the restart script:
```bash
npm run restart
```

Or directly:
```bash
./restart-dev.sh
```

Server will be available at: **http://localhost:3000**

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run dev:turbo` | Start dev server with Turbopack |
| `npm run restart` | Restart dev server (kills existing) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
gearmobile/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── listings/           # Browse & listing detail
│   │   ├── auth/               # Login & register
│   │   ├── account/            # User profile
│   │   ├── activity/           # Notifications
│   │   └── bookings/           # User bookings
│   ├── components/             # React components
│   └── lib/                    # Utilities & Supabase clients
├── public/                     # Static assets
├── docs/                       # Documentation
├── scripts/                    # Database seeds & utilities
├── supabase/migrations/        # Database schema
├── CLAUDE.md                   # AI architect instructions
└── DATABASE_SETUP.md           # Database setup guide
```

---

## Database Setup

1. Run the migration in Supabase SQL Editor:
   - File: `supabase/migrations/20260202_initial_schema.sql`

2. Add seed data (optional, for testing):
   - File: `scripts/seed-data.sql`

See `DATABASE_SETUP.md` for detailed instructions.

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router + Turbopack)
- **Database**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS 4.0
- **Maps**: OpenStreetMap (Leaflet) - 100% Free!
- **Payments**: Stripe Connect (coming soon)

---

## Key Features

✅ **Homepage** - Hero, search, categories, how it works  
✅ **Listings Browse** - Grid view with filters & interactive map  
✅ **Listing Detail** - Photos, booking card, reviews  
✅ **Authentication** - Sign up & login forms  
✅ **User Profile** - Account details, favorites, reviews  
✅ **Activity Feed** - Notifications & booking updates  
✅ **Database Integration** - Live data from Supabase  

---

## Troubleshooting

### Server won't start?
```bash
pkill -f "next dev"
npm run dev:turbo
```

### Port 3000 already in use?
```bash
lsof -i :3000
kill -9 <PID>
```

### Database not loading?
- Check `.env.local` has correct Supabase keys
- Verify migration ran successfully
- Add seed data: `scripts/seed-data.sql`

### Map not showing?
- Refresh the page
- Check browser console for errors
- Clear browser cache

---

## Next Steps

1. ✅ Database connection (DONE)
2. 🔄 Authentication (In Progress)
3. ⏳ Booking flow
4. ⏳ Stripe payments
5. ⏳ Image uploads
6. ⏳ Messaging system

---

## Documentation

- `CLAUDE.md` - Architecture rules & tech stack
- `DATABASE_SETUP.md` - How to setup database
- `NEXT_STEPS.md` - Development roadmap
- `SUPABASE_SETUP.md` - Supabase configuration

---

## License

Private - All Rights Reserved
