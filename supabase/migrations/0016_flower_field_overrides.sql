-- 0016_flower_field_overrides.sql
-- Extend the per-user override table so users can override ALL remaining fields
-- of a global catalogue flower (not just image, care, notes and pairings).
-- Each column is nullable: NULL means "no override — use the catalogue default".
-- The rowToFlower transformer resolves override ?? global at read time.

ALTER TABLE user_flower_overrides
  ADD COLUMN IF NOT EXISTS name             TEXT,
  ADD COLUMN IF NOT EXISTS type             TEXT,
  ADD COLUMN IF NOT EXISTS colors           TEXT[],
  ADD COLUMN IF NOT EXISTS wholesale_price  NUMERIC(10, 2),
  ADD COLUMN IF NOT EXISTS supplier         TEXT,
  ADD COLUMN IF NOT EXISTS season           TEXT[],
  ADD COLUMN IF NOT EXISTS availability     TEXT,
  ADD COLUMN IF NOT EXISTS climate          TEXT,
  ADD COLUMN IF NOT EXISTS stem_length_cm   NUMERIC,
  ADD COLUMN IF NOT EXISTS fragrance_level  TEXT,
  ADD COLUMN IF NOT EXISTS toxicity         TEXT,
  ADD COLUMN IF NOT EXISTS vase_life_days   INTEGER;
