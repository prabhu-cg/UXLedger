# UXLedger

**Better experience, Lower debt.**

A production-grade UX Debt Management SaaS built with Next.js 15, Supabase, and shadcn/ui.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (manually included) |
| Auth & Database | Supabase (Auth + PostgreSQL + Storage) |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Table | TanStack Table v8 |
| Charts | Recharts |
| Rich Text | Tiptap |
| Icons | Lucide React |
| Export | xlsx |
| Font | Manrope (Google Fonts) |

---

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- npm or pnpm

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Find these in your Supabase dashboard under **Project Settings → API**.

### 3. Set up the database

In the Supabase dashboard, go to **SQL Editor** and run the migration files in order:

1. `supabase/migrations/001_schema.sql` — Creates all tables, RLS policies, storage bucket, and triggers
2. `supabase/migrations/002_seed.sql` — Inserts demo data (run after signing up for the first time)

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and create your account.

---

## Supabase Setup Checklist

- [ ] Enable **Email/Password** auth in **Authentication → Providers**
- [ ] Set **Site URL** to `http://localhost:3000` in **Authentication → URL Configuration**
- [ ] Add `http://localhost:3000/**` to **Redirect URLs**
- [ ] Run `001_schema.sql` in SQL Editor
- [ ] Verify the `attachments` storage bucket was created in **Storage**

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, Register, Reset Password
│   └── (dashboard)/         # Protected app shell
│       ├── dashboard/       # Overview metrics + charts
│       ├── projects/        # Project list + [id] detail
│       ├── debt/            # Full debt register
│       └── reports/         # CSV + Excel export
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── layout/              # Sidebar, Topbar, Logo, ThemeProvider
│   ├── auth/                # Login/Register/Reset forms
│   ├── dashboard/           # MetricCard, HealthScore, Charts
│   ├── projects/            # ProjectCard, ProjectForm
│   └── debt/                # DebtTable, DebtForm, Attachments, Comments
├── lib/
│   ├── supabase/            # Browser + server clients
│   ├── validations/         # Zod schemas
│   └── utils.ts
├── stores/                  # Zustand (UI + Project state)
├── types/                   # Shared TypeScript types + helpers
├── hooks/                   # use-toast
└── middleware.ts             # Auth route protection
```

---

## Features

### Authentication
- Email/password login and registration
- Password reset via email
- Route protection via Next.js middleware
- Auto-creates user profile on signup

### Projects
- Create, edit, delete projects with custom colour
- Debt item count per project
- Per-project debt register

### Debt Register
- Full CRUD with TanStack Table
- Filter by severity, status, global search
- Sort by any column
- Rich text descriptions (Tiptap)
- Severity: Critical, High, Medium, Low
- Status: Open, In Progress, Resolved, Won't Fix, Deferred
- 9 categories (Usability, Accessibility, Content, etc.)
- Due dates with overdue highlight
- File attachments (PNG, JPG, PDF, max 10MB)
- Comments with edit/delete

### Dashboard
- 5 metric cards (Total, Open, Closed, Critical, Avg Resolution Time)
- Product Health Score (0–100, colour-coded)
- Debt by Category (bar chart)
- Debt by Severity (donut chart)
- Debt Trend — last 30 days (area chart)

### Reports
- Filter by project
- Export to CSV
- Export to Excel (.xlsx)

---

## Deployment on Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add the environment variables (same as `.env.local`)
4. Set **Framework Preset** to `Next.js`
5. Deploy

Update Supabase **Redirect URLs** to include your production domain:
```
https://your-app.vercel.app/**
```

---

## Security

- Row-Level Security (RLS) enabled on all tables
- Users can only access their own projects and debt items
- Storage policies restrict uploads to the authenticated user's folder
- Input validated with Zod on every form
- Supabase SSR client refreshes sessions server-side

---

## Seed Data

After your first sign-up, run `002_seed.sql` in the Supabase SQL Editor to populate demo projects and debt items so the dashboard charts are populated immediately.

---

## License

MIT
