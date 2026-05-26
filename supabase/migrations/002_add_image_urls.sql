-- Add image_urls column for property images uploaded by owners
ALTER TABLE form_submissions
  ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

-- Create storage bucket for property images (run via Supabase dashboard or CLI)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('property-images', 'property-images', true)
-- ON CONFLICT DO NOTHING;
