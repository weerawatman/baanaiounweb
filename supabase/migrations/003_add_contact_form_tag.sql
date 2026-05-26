-- Add 'contact' to form_tag CHECK constraint
ALTER TABLE form_submissions
  DROP CONSTRAINT IF EXISTS form_submissions_form_tag_check;

ALTER TABLE form_submissions
  ADD CONSTRAINT form_submissions_form_tag_check
  CHECK (form_tag IN (
    'owner', 'owner-foreign',
    'buyer', 'buyer-foreign',
    'co-agent', 'academy',
    'contact'
  ));
