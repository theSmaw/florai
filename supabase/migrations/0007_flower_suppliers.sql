CREATE TABLE flower_suppliers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flower_id        TEXT NOT NULL REFERENCES flowers(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  wholesale_price  NUMERIC,
  created_at       TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE flower_suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own flower suppliers" ON flower_suppliers
  FOR ALL
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Superseded by per-supplier prices
ALTER TABLE user_flower_overrides DROP COLUMN wholesale_price;
