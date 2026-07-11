-- Align legacy FAQ page_slug values with public URL paths.
UPDATE public.faqs SET page_slug = 'find-property' WHERE page_slug = 'match';
UPDATE public.faqs SET page_slug = 'list-property' WHERE page_slug = 'owners';
