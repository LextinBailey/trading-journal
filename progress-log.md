# Progress Log

A day-by-day log of development decisions, features, and design evolution.

## Day 1 (May 5, 2026): Initial Setup, Supabase Setup, Auth Pages, Table + RLS Policies

- Initial Setup:
    - Frontend: 
        - Framework: Next.js
        - Language: TypeScript
        - Styling: Tailwind CSS
- Created & connected local project to GitHub repository
- Initialized scalable structure
    - `components/`: Reusable UI
    - `lib/`: Core utilities
    - `types/`: All Typescript types
    - `features/`: Feature-based logic
- Setup Supabase scaffold
- Installed Supabase Auth helpers for session management
- Created Supabase browser client
- Created basic auth pages (`signup`, `login`)
    - Tested and ensured database users updated
- Created a `trades` table
- Added 2 RLS policies to the `trades` table
    - INSERT
        - Users can insert their own trades
    - SELECT
        - Users can view their own trades
    - Enforcing rules at the database level

## Day 2 (May 6, 2026): Trade Insertion, Trade Fetch + Display, Statistics, Landing Page

- Implemented trade creation flow (`/trades/new`)
    - Retrieves authenticated user via Supabase session
    - Inserts trade into PostgreSQL with `user_id` attached
    - Enforced ownership using Row Level Security (RLS)
- Defined `Trade` type
- Implemented full read pipeline:
    - Relies on RLS instead of filtering
    - Retrieves users trades from PostgreSQL database
    - Updates `trades` state
- Derived `totalPnl` & `winRate` data from `trades` state
- Added landing page with navigation to `/auth/login` and `/auth/signup`

## Day 3 (May 7, 2026): Server-Side Auth Protection, Supabase SSR Refactor, Dashboard Route Guard

- Implemented server-side authentication guard for `/dashboard`
    - Enforced authentication before page render using Supabase server client
    - Redirects unauthenticated users to `/auth/login` using `next/navigation`
- Refactored Supabase server client architecture 
    - Implemented `createServerClientClient()` wrapper using `@supabase/ssr`
    - Integrated `cookies()` from `next/headers` for session handling
    - Configured cookie `getAll` and `setAll` methods for SSR authentication flow
- Separated client vs server Supabase responsibilites
    - Browser client handles authentication across (login/signup, client-side requests)
    - Server client handles secure session validation and protected route access
- Improved understanding of Next.js App Router execution model
    - Differentiated between client-side rendering lifecycle vs server-side pre-render checks
    - Applied server-side redirect logic to prevent unauthorized dashboard access
