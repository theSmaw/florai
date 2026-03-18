-- 0013_arrangement_images.sql
-- Creates the arrangement-images Storage bucket with per-user path policies.

-- Create the bucket (public so image URLs are directly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('arrangement-images', 'arrangement-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to allow idempotent migration
DROP POLICY IF EXISTS "users upload own arrangement images" ON storage.objects;
DROP POLICY IF EXISTS "users update own arrangement images" ON storage.objects;
DROP POLICY IF EXISTS "arrangement images are publicly readable" ON storage.objects;

-- Allow authenticated users to upload to their own folder: {user_id}/{uuid}.{ext}
CREATE POLICY "users upload own arrangement images" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'arrangement-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to overwrite their own images
CREATE POLICY "users update own arrangement images" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'arrangement-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Public read access (bucket is public, but explicit policy for clarity)
CREATE POLICY "arrangement images are publicly readable" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'arrangement-images');
