import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Helper function to get current user profile
export async function getCurrentUserProfile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return profile;
}

// Helper function to track listing view
export async function trackListingView(listingId: string, viewerId?: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('listing_views')
    .insert({
      listing_id: listingId,
      viewer_id: viewerId || null,
    });
  
  if (error) {
    console.error('Error tracking listing view:', error);
  }
}

// Helper function to get listing with profile
export async function getListingWithProfile(listingId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      profiles (
        id,
        full_name,
        phone_number,
        location,
        avatar_url
      ),
      categories (
        id,
        name,
        slug,
        icon
      )
    `)
    .eq('id', listingId)
    .single();
  
  return { data, error };
}

// Helper function to get user's listings
export async function getUserListings(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      categories (
        name,
        slug,
        icon
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
}

// Helper function to get active listings with filters
export async function getActiveListings(filters?: {
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}) {
  const supabase = createClient();
  
  let query = supabase
    .from('listings')
    .select(`
      *,
      profiles (
        id,
        full_name,
        location
      ),
      categories (
        name,
        slug,
        icon
      )
    `)
    .eq('status', 'active');
  
  if (filters?.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }
  
  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  if (filters?.searchQuery) {
    query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
  }
  
  query = query.order('created_at', { ascending: false });
  
  const { data, error } = await query;
  
  return { data, error };
}
