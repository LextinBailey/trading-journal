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

## Day 3 (May 7, 2026): Server-Side Auth Protection, Supabase SSR Refactor, Dashboard Route Guard, Server-Side Data Fetching, Backend-Derived Analytics, Login/Signup, Forgot & Reset Password

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
- Implemented server-side data fetching in `/dashboard`
    - Fetched `trades` data before page render
    - Used data-level security (RLS) to retrieve users trades only
- Added backend-derived analytics layer `/lib/stats/trades.ts`
    - Implemented reusable business logic module
    - Replaced client-side data architecture with server-side (scalable & secure)
- Improved login/signup pages & routed correctly
- Implemented forgot password flow using Supabase Auth
    - Created `/auth/forgot-password` page
    - Added password reset email request handling via `resetPasswordForEmail`
    - Configured secure reset redirect flow to `/auth/reset-password`
    - Implemented generic success messaging to avoid leaking account existence
- Implemented reset password flow
    - Created `/auth/reset-password` page
    - Added password update handling via `supabase.auth.updateUser`
    - Added client-side password confirmation validation
    - Redirects authenticated users after successful password reset

## Day 4 (May 8, 2026): Cumulative PNL

- Added cumulative PNL business logic layer (`/lib/stats/trade-pnl.ts`)
    - Implemented transformation pipeline for chart-ready anayltics data
    - Sorted trades chronologically using `created_at`
    - Calculated running/cumulative PNL values across trade history
    - Generated visualization-friendly data structure for Recharts integration
- Created shared `CumulativePnl` TypeScript type (`/types/cumulative-pnl.ts`)
    - Defined reusable chart data contract
    - Shared type across business logic and frontend visualization layer
    - Improved type safety for chart rendering pipeline
- Began chart visualization architecture
    - Separated server-side analytics generation from client-side chart rendering
    - Passed derived chart data into dedicated client chart component via props
    - Continued enforcing separation between business logic and presentation layer

## Day 5 (May 9, 2026): Dashboard Layout

- Refactored dashboard statistics UI into dedicated card-based layout
    - Added structured stats row for Total PNL, Total Trades, and Win Rate
    - Improved dashboard readability through visual grouping and spacing
    - Added conditional PNL coloring logic for positive vs negative performance
- Added responsive chart container architecture
    - Integrated `ResponsiveContainer` for adaptive chart sizing
    - Separated layout sizing responsibilities from chart rendering logic

## Day 6 (May 10, 2026): App Router Route Groups & Application Structure Refactor, Centralized Auth Protection, Side Bar

- Refactored Next.js App Router structure using route groups
    - Added:
        - `src/app/(app)`
        - `src/app/(auth)`
        - `src/app/(marketing)`
    - Introduced logical route separation without affecting public URL structure
- Separated application concerns by route responsibility
    - `(marketing)`: public landing/marketing pages
    - `(auth)`: authentication-related routes
    - `(app)`: authenticated application routes
- Moved landing page into `(marketing)` group
    - Isolated public-facing entry flow from authenticated application architecture 
- Moved authentication routes into `(auth)` group
    - Centralized login/signup/password recovery route organization
- Moved dashboard and trade routes into `(app)` group
    - Established foundation for shared authentication layouts and protected application routing
- Began transition toward scalable SaaS-style application structure using Next.js App Router conventions
- Centralized auth protection inside `src/app/(app)/layout.tsx`
    - Prevented repeat auth checks
    - Established shared authenticated layout system
    - Removed auth logic from `/dashboard` since layout now protects routes globally
- Added sidebar navigation component
    - Extracted navigation config for sidebar to render
    - Implemented `Sidebar` in app layout so every authenticated page gets the sidebar

## Day 7 (May 11, 2026): Trade CRUD Expansion, Dynamic Routes, Shared Form Architecture

- Added shared trade form component `src/features/trades/components/trade-form.tsx`
    - Refactored trade creation flow into reusable feature-level form architecture
    - Reduced page responsibility by separating route handling from form presentation/business logic
    - Established reusable controlled form state for both create and edit trade workflows
    - Centralized trade form UI and validation flow
- Implemented trades index page `src/app/(app)/trades/page.tsx`
    - Added server-side trade retrieval pipeline using Supabase
    - Rendered trade history table with:
        - result
        - pnl
        - notes
        - created date
    - Added navigation flow to trade creation and individual trade detail routes
    - Implemented empty-state rendering for user without trades
- Added dynamic trade detail route `src/app/(app)/trades/[id]/page.tsx`
    - Implemented dynamic App Router route segment `[id]`
    - Retrieved individual trades using parameterized route-based querying
    - Enforced user-level data access through existing Supabse RLS policies
    - Added trade detail visualization layer for individual trade inspection
    - Added `View` navigation flow from trades table
- Improved understanding of modern Next.js Server Component architecture
    - Learned that `params` is now asynchronous in newer App Router implementations
    - Updated dynamic route handling using awaited `params` access pattern
- Added UPDATE RLS policy to the `trades` table
    - Users can update their own trades
- Added edit trade route `src/app/(app)/trades/[id]/edit/page.tsx`
    - Implemented reusable edit workflow using shared `TradeForm`
    - Prefilled form state using existing trade data
    - Added database update flow using Supabase `.update()`
    - Reused shared create/edit form architecture to reduce duplication and improve maintainability

## Day 8 (May 12, 2026): DELETE, Frontend Validation, Trade Page UI

- Added DELETE RLS policy to the `trades` table
    - Users can delete their own trades
- Added delete button component `src/features/trades/components/delete-button.tsx`
    - Separated server and client component responsibilites
    - Implemented confirmation and local loading state
- Implemented loading state to 'Add' and 'Update'
- Implemented frontend input validation
    - Added required field checks
    - Added basic type validation
- Improved all trade pages UI

## Day 9 (May 13, 2026): Stats Chart

- Redesigned `stats-charts.tsx`
    - Added clear trade and profit separation
    - Added US dollar profit amounts 
    - Implemented visual cumulative pnl