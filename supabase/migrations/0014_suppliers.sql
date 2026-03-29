CREATE TABLE suppliers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  emails          TEXT[] NOT NULL DEFAULT '{}',
  phones          TEXT[] NOT NULL DEFAULT '{}',
  website         TEXT,
  address         TEXT,
  contact_person  TEXT,
  payment_terms   TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own suppliers" ON suppliers
  FOR ALL
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
