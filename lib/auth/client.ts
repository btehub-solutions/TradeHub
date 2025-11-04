/**
 * Client-side authentication helpers
 * These functions can only be used in client components
 */

import { createClient } from '@/lib/supabase/client';

// Client-side: Sign out helper
export async function signOutClient() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
