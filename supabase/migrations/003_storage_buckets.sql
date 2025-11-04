-- TradeHub Storage Buckets Migration
-- Version: 003
-- Description: Creates storage buckets and policies for images

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('listings', 'listings', true),
  ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Public listing images are accessible to everyone" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload listing images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own listing images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own listing images" ON storage.objects;
DROP POLICY IF EXISTS "Public profile images are accessible to everyone" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile image" ON storage.objects;

-- Listings bucket policies
CREATE POLICY "Public listing images are accessible to everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listings');

CREATE POLICY "Authenticated users can upload listing images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'listings' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own listing images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'listings' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own listing images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'listings' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Profiles bucket policies
CREATE POLICY "Public profile images are accessible to everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload own profile image"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profiles' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own profile image"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profiles' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own profile image"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profiles' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
