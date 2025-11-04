import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie removal errors in Server Components
          }
        },
      },
    }
  );
}

// Server-side helper to get current user
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Server-side helper to get current user profile
export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return profile;
}

// Server-side helper to get all categories
export async function getCategories() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  return { data, error };
}

// Server-side helper to get listing analytics
export async function getListingAnalytics(listingId: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  
  if (!user) return null;
  
  // Verify user owns the listing
  const { data: listing } = await supabase
    .from('listings')
    .select('user_id')
    .eq('id', listingId)
    .single();
  
  if (!listing || listing.user_id !== user.id) {
    return null;
  }
  
  // Get view analytics
  const { data: views, error } = await supabase
    .from('listing_views')
    .select('*')
    .eq('listing_id', listingId)
    .order('viewed_at', { ascending: false });
  
  return { views, error };
}

// Server-side helper to create or update profile
export async function upsertProfile(profileData: Database['public']['Tables']['profiles']['Insert']) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profileData)
    .select()
    .single();
  
  return { data, error };
}

// Server-side helper to create listing
export async function createListing(listingData: Database['public']['Tables']['listings']['Insert']) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }
  
  const { data, error } = await supabase
    .from('listings')
    .insert({ ...listingData, user_id: user.id })
    .select()
    .single();
  
  return { data, error };
}

// Server-side helper to update listing
export async function updateListing(
  listingId: string,
  listingData: Database['public']['Tables']['listings']['Update']
) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }
  
  const { data, error } = await supabase
    .from('listings')
    .update(listingData)
    .eq('id', listingId)
    .eq('user_id', user.id)
    .select()
    .single();
  
  return { data, error };
}

// Server-side helper to delete listing
export async function deleteListing(listingId: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  
  if (!user) {
    return { error: new Error('User not authenticated') };
  }
  
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId)
    .eq('user_id', user.id);
  
  return { error };
}
