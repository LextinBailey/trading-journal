# Progress Log

A day-by-day log of development decisions, features, and desing evolution.

## Day 1 (May 5, 2026): Initial Setup, Supabase Setup, Auth Pages, Table + RLS Policies

- Inital Setup:
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

## Day 2 (May 6, 2026): Trade Insertion

- Implemented trade creation flow (`/trades/new`)
    - Retrieves authenticated user via Supabase session
    - Inserts trade into PostgreSQL with `user_id` attached
    - Enforced ownership using Row Level Security (RLS)
