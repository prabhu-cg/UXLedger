-- ============================================================
-- UXLedger — Demo Seed Data
-- Run AFTER creating a user account via the app.
-- Replace 'YOUR_USER_ID' with your actual auth.users UUID.
-- ============================================================

-- Usage:
-- 1. Sign up via the app
-- 2. Copy your user ID from Supabase Auth > Users
-- 3. Run: psql <connection_string> -v user_id="'your-uuid-here'" -f 002_seed.sql

do $$
declare
  v_user_id    uuid;
  v_project1   uuid;
  v_project2   uuid;
  v_debt1      uuid;
  v_debt2      uuid;
  v_debt3      uuid;
  v_debt4      uuid;
  v_debt5      uuid;
  v_debt6      uuid;
  v_debt7      uuid;
  v_debt8      uuid;
begin
  -- Get the first user (adjust if you have multiple users)
  select id into v_user_id from public.profiles limit 1;

  if v_user_id is null then
    raise exception 'No profiles found. Please sign up via the app first.';
  end if;

  -- Projects
  insert into public.projects (id, owner_id, name, description, color)
  values
    (uuid_generate_v4(), v_user_id, 'Mobile Banking App', 'UX debt tracking for the consumer mobile banking product', '#4F46E5'),
    (uuid_generate_v4(), v_user_id, 'Design System — Bedrock', 'Component library and token system debt register', '#7C3AED');

  select id into v_project1 from public.projects where owner_id = v_user_id and name = 'Mobile Banking App';
  select id into v_project2 from public.projects where owner_id = v_user_id and name = 'Design System — Bedrock';

  -- Debt items for Project 1
  insert into public.debt_items (id, project_id, created_by, title, description, severity, status, category, due_date, created_at)
  values
    (
      uuid_generate_v4(), v_project1, v_user_id,
      'Onboarding flow fails WCAG 2.1 AA colour contrast',
      '<p>The onboarding screens use <strong>#9CA3AF</strong> text on a white background which yields a contrast ratio of 2.85:1 — well below the required 4.5:1 for normal text.</p><ul><li>Affects 3 screens</li><li>Impacts users with low vision</li><li>Legal compliance risk</li></ul>',
      'critical', 'open', 'accessibility',
      current_date + interval '14 days',
      now() - interval '45 days'
    ),
    (
      uuid_generate_v4(), v_project1, v_user_id,
      'Transfer confirmation screen missing error recovery path',
      '<p>When a transfer fails, users see a generic error toast with no actionable recovery step. They must navigate back manually to retry.</p>',
      'high', 'in_progress', 'usability',
      current_date + interval '21 days',
      now() - interval '30 days'
    ),
    (
      uuid_generate_v4(), v_project1, v_user_id,
      'Inconsistent button styles across transaction flows',
      '<p>Primary CTA buttons vary in height (44px vs 48px vs 52px) across the payment, transfer, and card management flows. This creates a fragmented feel and makes systematic updates difficult.</p>',
      'medium', 'open', 'design_system',
      null,
      now() - interval '20 days'
    ),
    (
      uuid_generate_v4(), v_project1, v_user_id,
      'Home screen loads >3s on 3G connections',
      '<p>Performance profiling shows the home dashboard takes 3.4 seconds to become interactive on a simulated 3G network. Primary cause is unoptimised account summary API calls made in sequence rather than parallel.</p>',
      'high', 'open', 'performance',
      current_date + interval '30 days',
      now() - interval '10 days'
    ),
    (
      uuid_generate_v4(), v_project1, v_user_id,
      'No keyboard navigation support in date picker',
      '<p>The custom date picker component used in scheduled transfer screens is not keyboard accessible. Users cannot tab through months or select dates without a mouse.</p>',
      'high', 'open', 'accessibility',
      current_date + interval '7 days',
      now() - interval '5 days'
    ),
    (
      uuid_generate_v4(), v_project1, v_user_id,
      'Microcopy on overdraft notice is misleading',
      '<p>The overdraft notification reads "Your account is low" but the threshold is triggered at £0 balance, not a warning threshold. Research participants interpreted this as having a remaining buffer.</p>',
      'medium', 'resolved', 'content',
      null,
      now() - interval '60 days'
    );

  -- Debt items for Project 2
  insert into public.debt_items (id, project_id, created_by, title, description, severity, status, category, due_date, created_at)
  values
    (
      uuid_generate_v4(), v_project2, v_user_id,
      'Typography tokens missing responsive scale',
      '<p>The current type scale only defines desktop sizes. Mobile values are hard-coded as overrides in individual components rather than using responsive token variants.</p>',
      'high', 'open', 'design_system',
      current_date + interval '60 days',
      now() - interval '15 days'
    ),
    (
      uuid_generate_v4(), v_project2, v_user_id,
      'Icon set includes deprecated Feather icons',
      '<p>23 components still reference Feather icons that were replaced by Lucide in Q2. Inconsistent icon weights (1px vs 1.5px stroke) are visible at larger sizes.</p>',
      'low', 'deferred', 'visual_design',
      null,
      now() - interval '90 days'
    );

  -- Comments
  select id into v_debt1 from public.debt_items where project_id = v_project1 and title like 'Onboarding%';
  select id into v_debt2 from public.debt_items where project_id = v_project1 and title like 'Transfer%';

  if v_debt1 is not null then
    insert into public.comments (debt_item_id, author_id, body, created_at)
    values
      (v_debt1, v_user_id, 'Confirmed with the design system team — we need to update all secondary text tokens globally, not just these 3 screens. Opening a DS ticket.', now() - interval '40 days'),
      (v_debt1, v_user_id, 'Proposed fix: #6B7280 on white gives 4.63:1 which passes AA. Needs design sign-off before shipping.', now() - interval '35 days');
  end if;

  if v_debt2 is not null then
    insert into public.comments (debt_item_id, author_id, body, created_at)
    values
      (v_debt2, v_user_id, 'In progress — adding a "Retry" CTA and a support link to the error state. ETA next sprint.', now() - interval '5 days');
  end if;

  raise notice 'Seed data inserted successfully for user %', v_user_id;
end;
$$;
