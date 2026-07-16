-- 0015_sample_arrangements.sql
-- Give every user a couple of ready-made arrangements so the Arrangements page
-- is populated out of the box and new users can see how the feature works.
--
-- Applies to:
--   * every future sign-up, via an AFTER INSERT trigger on auth.users
--   * every existing user with no arrangements yet, via the backfill at the end
--
-- The seeded rows are ordinary, fully-editable arrangements — users can rename,
-- edit or delete them like any other.

-- ── Sample-arrangement inserter ───────────────────────────────────────────────
-- SECURITY DEFINER so it runs as the table owner and bypasses RLS: at sign-up
-- time there is no auth.uid() in scope, and the backfill runs as a superuser DO
-- block. flower_ids reference the globally-seeded flowers (ids '1'–'100').
CREATE OR REPLACE FUNCTION public.create_sample_arrangements(uid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.arrangements (
    user_id, name, image_url, description, flower_ids, size, style, occasion,
    stem_count, estimated_weight_grams, time_to_build_minutes, vase_life_days,
    wholesale_cost, retail_price, notes
  ) VALUES
  (
    uid,
    'Classic Romance Bouquet',
    '/images/arrangements/classic-romance-bouquet.png',
    'A lush hand-tied bouquet of deep red roses and blush peonies, softened with fragrant English lavender.',
    ARRAY['2','1','6'],
    'medium',
    'romantic',
    ARRAY['anniversary','wedding'],
    24, 900, 25, 7,
    78.00, 195.00,
    'Condition roses overnight and remove guard petals from the peonies just before tying.'
  ),
  (
    uid,
    'Sunny Meadow Jar',
    '/images/arrangements/sunny-meadow-jar.png',
    'A cheerful rustic jar of sunflowers and scented lilies with a wild lavender finish.',
    ARRAY['5','33','6'],
    'large',
    'rustic',
    ARRAY['everyday','birthday'],
    18, 1100, 20, 9,
    42.00, 110.00,
    'Remove lily anthers to avoid pollen stains and keep the water topped up for maximum vase life.'
  );
END;
$$;

-- ── New-user trigger ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.create_sample_arrangements(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Backfill existing users ───────────────────────────────────────────────────
-- Only users who have no arrangements yet, so this is safe to re-run.
DO $$
DECLARE
  u RECORD;
BEGIN
  FOR u IN SELECT id FROM auth.users LOOP
    IF NOT EXISTS (SELECT 1 FROM public.arrangements WHERE user_id = u.id) THEN
      PERFORM public.create_sample_arrangements(u.id);
    END IF;
  END LOOP;
END;
$$;
