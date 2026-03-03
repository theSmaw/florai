-- 0001_initial.sql
-- Creates the flowers table (global seed data) and user_flower_overrides (per-user deltas)

-- ── flowers ───────────────────────────────────────────────────────────────────
CREATE TABLE flowers (
  id                     TEXT        PRIMARY KEY,
  name                   TEXT        NOT NULL,
  image_url              TEXT,
  colors                 TEXT[]      NOT NULL DEFAULT '{}',
  type                   TEXT        NOT NULL,
  wholesale_price        NUMERIC     NOT NULL,
  retail_price           NUMERIC     NOT NULL,
  supplier               TEXT,
  origin                 TEXT,
  season                 TEXT[]      NOT NULL DEFAULT '{}',
  availability           TEXT        NOT NULL,  -- 'always' | 'seasonal' | 'limited'
  climate                TEXT        NOT NULL,  -- 'tropical' | 'subtropical' | 'mediterranean' | 'temperate' | 'alpine'
  quantity_on_hand       INT         NOT NULL DEFAULT 0,
  stem_length_cm         INT,
  fragrance_level        TEXT,                  -- 'none' | 'light' | 'moderate' | 'strong'
  toxicity               TEXT,                  -- 'safe' | 'mild' | 'toxic'
  vase_life_days         INT,
  care_instructions      TEXT,
  notes                  TEXT,
  complementary_flower_ids TEXT[]    NOT NULL DEFAULT '{}'
);

ALTER TABLE flowers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "flowers are publicly readable" ON flowers FOR SELECT USING (true);

-- ── user_flower_overrides ─────────────────────────────────────────────────────
-- Stores only the delta — currently just image_url override per user per flower.
-- NULL image_url means "use the global default from flowers table".
CREATE TABLE user_flower_overrides (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flower_id  TEXT        NOT NULL REFERENCES flowers(id) ON DELETE CASCADE,
  image_url  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, flower_id)
);

ALTER TABLE user_flower_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own overrides" ON user_flower_overrides
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
