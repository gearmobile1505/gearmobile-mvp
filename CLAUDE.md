# CLAUDE.md — Gearmobile Architect

## Tech Stack

**Frontend:** Next.js 16 (App Router + Turbopack)  
**Database:** Supabase (PostgreSQL + Auth)  
**Styling:** Tailwind CSS 4.0  
**Logic:** Stripe Connect for P2P Escrow

## Rules

- Always run `npm run dev -- --turbo --no-stats` to verify changes (low-RAM optimization).
- Create a separate `/docs` folder for database schemas.
- Use 'Thinking Mode' for any payment or networking logic.
