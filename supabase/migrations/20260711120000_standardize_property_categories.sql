-- Standardize property categories site-wide:
-- house (บ้านเดี่ยว/บ้านแฝด), townhome, condo, land

-- properties.sub_type had a CHECK for legacy values — replace it first
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_sub_type_check;

UPDATE public.properties
SET sub_type = CASE sub_type
  WHEN 'townhome' THEN 'townhome'
  WHEN 'condo' THEN 'condo'
  WHEN 'land' THEN 'land'
  WHEN 'house' THEN 'house'
  WHEN 'new' THEN 'house'
  WHEN 'renovated' THEN 'house'
  WHEN 'residential' THEN 'house'
  WHEN 'investment' THEN 'house'
  ELSE sub_type
END
WHERE sub_type IN ('new', 'renovated', 'residential', 'investment');

ALTER TABLE public.properties
  ADD CONSTRAINT properties_sub_type_check
  CHECK (sub_type IS NULL OR sub_type = ANY (ARRAY['house', 'townhome', 'condo', 'land']));

UPDATE public.form_submissions
SET property_type = CASE property_type
  WHEN 'twin-house' THEN 'house'
  WHEN 'commercial' THEN 'house'
  WHEN 'other' THEN 'house'
  WHEN 'new' THEN 'house'
  WHEN 'renovated' THEN 'house'
  WHEN 'residential' THEN 'house'
  WHEN 'investment' THEN 'house'
  ELSE property_type
END
WHERE property_type IN ('twin-house', 'commercial', 'other', 'new', 'renovated', 'residential', 'investment');

UPDATE public.list_property_requests
SET property_type = CASE property_type
  WHEN 'twin-house' THEN 'house'
  WHEN 'commercial' THEN 'house'
  WHEN 'other' THEN 'house'
  ELSE property_type
END
WHERE property_type IN ('twin-house', 'commercial', 'other');

UPDATE public.matchmaking_requests
SET property_type = CASE property_type
  WHEN 'twin-house' THEN 'house'
  WHEN 'commercial' THEN 'house'
  WHEN 'other' THEN 'house'
  ELSE property_type
END
WHERE property_type IN ('twin-house', 'commercial', 'other');

UPDATE public.coagent_requests
SET property_type = CASE property_type
  WHEN 'twin-house' THEN 'house'
  WHEN 'commercial' THEN 'house'
  WHEN 'other' THEN 'house'
  ELSE property_type
END
WHERE property_type IN ('twin-house', 'commercial', 'other');
