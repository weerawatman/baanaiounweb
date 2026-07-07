-- Property Match page (mockup 2026-07-07): admin-managed team/consultation
-- photo shown in the hero's left column. Empty = placeholder shown.

ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS match_team_image TEXT NOT NULL DEFAULT '';
