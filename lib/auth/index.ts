import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

// Re-export client-safe utilities
export { formatNigerianPhone, validateNigerianPhone } from './utils';

// Server-side: Get current user
export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user;
});

// Server-side: Get current user with profile
export const getUserWithProfile = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return {
    user,
    profile,
  };
});

// Server-side: Sign out helper
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
