-- Remove placeholder success-story seed (placehold.co). Real entries are added via admin upload.
DELETE FROM public.success_stories
WHERE before_image_url LIKE '%placehold.co%'
   OR after_image_url LIKE '%placehold.co%';
