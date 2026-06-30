-- =============================================================
--  Fix: RLS Performance (auth_rls_initplan) +
--       Function Search Path (mutable) +
--       Duplicate policies +
--       Revoke anon EXECUTE on sensitive functions
-- =============================================================

-- ─── 1. Fix auth_rls_initplan: user_profiles ────────────────
-- Wrap auth.uid() in (select ...) so it evaluates once (InitPlan),
-- not per-row (Correlated Subplan)
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING      (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

-- ─── 2. Fix auth_rls_initplan: activity_logs ────────────────
DROP POLICY IF EXISTS "Admins can view all logs" ON public.activity_logs;
CREATE POLICY "Admins can view all logs" ON public.activity_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM   public.user_profiles
      WHERE  user_profiles.id   = (SELECT auth.uid())
      AND    user_profiles.role = 'admin'
    )
  );

-- ─── 3. Fix duplicate UPDATE policies on leads ──────────────
-- "Admin can update lead status and notes" (USING true) already covers
-- all authenticated updates — the second policy is redundant overhead
DROP POLICY IF EXISTS "Authenticated update leads" ON public.leads;

-- ─── 4. Fix mutable search_path on all public functions ─────
-- Without a fixed search_path, a malicious schema in the search path
-- could shadow system objects and hijack execution
ALTER FUNCTION public.get_user_role()
  SET search_path = public, pg_catalog;

ALTER FUNCTION public.log_asset_changes()
  SET search_path = public, pg_catalog;

ALTER FUNCTION public.complete_project(uuid, boolean, text)
  SET search_path = public, pg_catalog;

ALTER FUNCTION public.handle_new_user()
  SET search_path = public, pg_catalog;

ALTER FUNCTION public.update_updated_at()
  SET search_path = public, pg_catalog;

ALTER FUNCTION public.set_updated_at()
  SET search_path = public, pg_catalog;

-- ─── 5. Revoke anon EXECUTE on sensitive functions ──────────
-- get_user_role: no value for anon (auth.uid() = NULL → no rows)
-- complete_project: admin-only operation, should never be anon-callable
REVOKE EXECUTE ON FUNCTION public.get_user_role()                         FROM anon;
REVOKE EXECUTE ON FUNCTION public.complete_project(uuid, boolean, text)   FROM anon;

-- handle_new_user + log_asset_changes are TRIGGER functions.
-- Calling a trigger function directly raises:
--   ERROR: trigger functions can only be called as triggers
-- This is the most likely source of the 14 postgres ERROR log entries.
REVOKE EXECUTE ON FUNCTION public.handle_new_user()    FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user()    FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_asset_changes()  FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_asset_changes()  FROM authenticated;
