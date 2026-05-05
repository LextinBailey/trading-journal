# Trading Journal

A simple web-based trading journal designed to help traders track, review, and improve their performance over time.

## 📝 Overview

Trading Journal is an MVP project focused on building a personal trade tracking system with user authentication and basic performance analytics.
The goal is to create a foundation that can later expand into a more advanced trading analytics platform.

This project is being built to strengthen backend, full-stack architecture, and data modeling skills while creating something useful for personal trading review.

## 🎯 Features (MVP)

### Authentication

- [ ] Secure user sign-up and login
- [ ] Each user has isolated

### Trade Management

- [ ] Add new trades with details such as:
    - Entry/exit info (basic)
    - Win/Loss status
    - Profit & Loss (PNL)
    - Notes
    - Mistake tracking (dropdown + custom input)

### Trade History

- [ ] View all past trades in a structured list

### Basic Statistics

- [ ] Win rate
- [ ] Total PNL

## 💻 Tech Stack (Planned)

### Frontend

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS

### Backend

- API Layer: Next.js API Routes

### Database + Auth + Storage

- Platform: Supabase
- Database: PostgreSQL
- Authentication: Supabase Auth (email/password, session-based auth)
- Storage: Supabase Storage (planned for future image uploads)

### Hosting/Deployment

- Frontend + Backend: Vercel (auto-deploy from GitHub)
- Database + Auth: Supabase

### Data Fetching/State Management

- Built-in React + Next.js data fetching (no external state library for MVP)

### Charts/Analytics:

- Library: Recharts

### Dev Tools:

- Code Editor: VS Code
- Version Control: Git + GitHub

## 📈 Development Notes

Progress and development insights are tracked in `progress-log.md`.

## ⏱️ Future Improvements (Post-MVP)

- Backtesting section
- Prop firm tracker
- Chart uploads
- AI insights
- Trade rules reminder (pre-session)
- Trade tagging & filtering
- Strategy comparison

## 🚧 Status

In active development (MVP stage)
