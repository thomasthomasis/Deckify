import { createClient } from '@supabase/supabase-js';

// Service-role client — bypasses RLS. Only use in trusted server contexts (webhooks, crons).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
