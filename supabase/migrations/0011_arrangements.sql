CREATE TABLE arrangements (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                   TEXT NOT NULL,
  image_url              TEXT,
  description            TEXT,
  flower_ids             TEXT[] NOT NULL DEFAULT '{}',
  size                   TEXT NOT NULL,
  style                  TEXT,
  occasion               TEXT[],
  stem_count             INTEGER,
  estimated_weight_grams INTEGER,
  time_to_build_minutes  INTEGER,
  vase_life_days         INTEGER,
  wholesale_cost         NUMERIC(10,2),
  retail_price           NUMERIC(10,2),
  notes                  TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE arrangements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own arrangements"
  ON arrangements FOR ALL
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Storage bucket for arrangement images (mirroring 0002_storage.sql pattern)
INSERT INTO storage.buckets (id, name, public)
  VALUES ('arrangement-images', 'arrangement-images', true)
  ON CONFLICT (id) DO NOTHING;
CREATE POLICY "users upload own arrangement images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'arrangement-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "users update own arrangement images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'arrangement-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "arrangement images are publicly readable" ON storage.objects
  FOR SELECT USING (bucket_id = 'arrangement-images');
