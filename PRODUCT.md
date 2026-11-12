# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Product and design teams who find usability, accessibility and content problems in their own products and need somewhere reliable to log them, rank them, and show stakeholders that the experience is improving. Confirmed primary audience: product and design teams.

## Product Purpose
UXLedger is a UX debt management app. It gives usability, accessibility and content issues the same rigour engineering teams give bugs: a register, a severity, a category, an owner and a status that moves. Each project gets a health score so a team can see at a glance whether the experience is getting better or worse. Tagline: Better experience, Lower debt.

## Positioning
UX debt usually lives in a spreadsheet nobody opens twice, a buried Slack thread, or a designer's memory. UXLedger replaces that with a living register and a severity-weighted health score that moves as items are fixed. It is a register for UX debt specifically, not a general issue tracker.

## Operating Context
Teams create one project per product or surface, log debt items with rich-text descriptions, screenshots and comments, watch the dashboard (health score, debt by category and severity, 30-day trend), and export reports for reviews and roadmap planning.

## Capabilities and Constraints
Live features: projects with a colour; a debt register (9 categories, 4 severities, 5 statuses, owner, due date); rich-text descriptions; attachments up to 10MB per item; threaded comments; a 0-100 health score; dashboard charts; CSV and Excel export; light, dark and system themes.
Health score: starts at 100 and deducts for every item that is not resolved or won't-fix (critical 10, high 5, medium 2, low 1), floored at 0.
Two read-only sample projects (Mobile Banking App, Design System — Bedrock) are locked against edits.
Auth is Supabase (email and password) with row-level security isolating each account's data. Stack: Next.js 15 App Router, Tailwind 4, Supabase, Recharts, Tiptap, deployed on Vercel.
Pricing: Free only for now. No paid plans are announced; marketing must not show prices or plan tables.

## Brand Commitments
Name: UXLedger (UX in ink, Ledger in the accent). Logo: the checklist-document mark in `public/logo.svg` and the `Logo` component. Manrope. Primary orange #C74504. The design system is shared with Yedara ("The Working Ledger" tokens, see DESIGN.md).

## Evidence on Hand
No customers, testimonials, usage statistics, case studies, integrations or benchmarks exist, and none may be invented. Product previews are real screenshots of the app or authored mockups, always labelled as sample data. The sign-in photograph (`public/auth/panel.jpg`, Compagnons on Unsplash, Unsplash License) is atmosphere, never presented as a customer or study.

## Product Principles
1. Give UX debt the same rigour as bugs: severity, owner, status.
2. Show product health at a glance, and let it move as work gets done.
3. Show the real product doing its job; never fabricate proof.
4. Keep context with the issue: description, screenshots and discussion live on the item.

## Accessibility & Inclusion
WCAG AA contrast, keyboard navigation, visible focus, reduced motion respected, responsive from phone to desktop.
