import { createClient } from '@/lib/supabase/server';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { cache } from 'react';

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

// Client-side: Sign out helper
export async function signOutClient() {
  const supabase = createBrowserClient();
  await supabase.auth.signOut();
}

// Format Nigerian phone number
export function formatNigerianPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 234, add +
  if (digits.startsWith('234')) {
    return `+${digits}`;
  }
  
  // If starts with 0, replace with +234
  if (digits.startsWith('0')) {
    return `+234${digits.slice(1)}`;
  }
  
  // Otherwise, assume it's without country code
  return `+234${digits}`;
}

// Validate Nigerian phone number
export function validateNigerianPhone(phone: string): boolean {
  const formatted = formatNigerianPhone(phone);
  // Nigerian numbers: +234 followed by 10 digits (7-9 as first digit)
  const regex = /^\+234[7-9][0-1]\d{8}$/;
  return regex.test(formatted);
}
