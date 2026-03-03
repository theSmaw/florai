-- RLS tests for user_flower_overrides
-- Run against the local Supabase instance:
--   psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" -f supabase/tests/rls_test.sql

BEGIN;

-- ── Helpers ──────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create two test users in auth.users
DO $$
DECLARE
  user_a_id UUID := '11111111-1111-1111-1111-111111111111';
  user_b_id UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
  INSERT INTO auth.users (id, email, role, aud, created_at, updated_at)
  VALUES
    (user_a_id, 'rls-test-a@test.florai.com', 'authenticated', 'authenticated', now(), now()),
    (user_b_id, 'rls-test-b@test.florai.com', 'authenticated', 'authenticated', now(), now())
  ON CONFLICT (id) DO NOTHING;
END $$;

-- ── Test 1: User A can insert their own override ──────────────────────────────

SET LOCAL role = 'authenticated';
SET LOCAL "request.jwt.claims" = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

INSERT INTO user_flower_overrides (user_id, flower_id, image_url)
VALUES ('11111111-1111-1111-1111-111111111111', '1', 'https://example.com/a.jpg');

DO $$
DECLARE count_a INT;
BEGIN
  SELECT COUNT(*) INTO count_a
  FROM user_flower_overrides
  WHERE user_id = '11111111-1111-1111-1111-111111111111';
  ASSERT count_a = 1, 'Test 1 failed: User A should see their own override';
  RAISE NOTICE 'Test 1 passed: User A can insert and read their own override';
END $$;

-- ── Test 2: User B sees zero rows (User A's row is hidden) ────────────────────

SET LOCAL "request.jwt.claims" = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

DO $$
DECLARE count_b INT;
BEGIN
  SELECT COUNT(*) INTO count_b FROM user_flower_overrides;
  ASSERT count_b = 0, 'Test 2 failed: User B should not see User A''s overrides';
  RAISE NOTICE 'Test 2 passed: User B cannot see User A''s overrides';
END $$;

-- ── Test 3: User B cannot insert a row with User A's user_id ─────────────────

DO $$
BEGIN
  BEGIN
    INSERT INTO user_flower_overrides (user_id, flower_id, image_url)
    VALUES ('11111111-1111-1111-1111-111111111111', '2', 'https://example.com/b-as-a.jpg');
    RAISE EXCEPTION 'Test 3 failed: RLS should have prevented this insert';
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'Test 3 passed: RLS prevents User B inserting with User A''s user_id';
    WHEN check_violation THEN
      RAISE NOTICE 'Test 3 passed: CHECK violation prevents User B inserting with User A''s user_id';
  END;
END $$;

-- ── Cleanup ───────────────────────────────────────────────────────────────────

RESET role;

DELETE FROM user_flower_overrides
WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222'
);

DELETE FROM auth.users
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222'
);

ROLLBACK;
