-- 0002_storage.sql
-- Creates the flower-images Storage bucket with per-user path policies.

-- Create the bucket (public so image URLs are directly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('flower-images', 'flower-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to their own folder: {user_id}/{flower_id}.{ext}
CREATE POLICY "users upload own flower images" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'flower-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to overwrite their own images
CREATE POLICY "users update own flower images" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'flower-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Public read access (bucket is public, but explicit policy for clarity)
CREATE POLICY "flower images are publicly readable" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'flower-images');
