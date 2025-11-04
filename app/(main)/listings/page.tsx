import { createClient } from '@/lib/supabase/server';
import { ListingCard } from '@/components/listings/ListingCard';
import { SearchFilters } from '@/components/listings/SearchFilters';
import { ListingWithProfile } from '@/types';

interface SearchParams {
  category?: string;
  state?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  condition?: string;
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('listings')
    .select(`
      *,
      profiles (*),
      categories (*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Apply filters
  if (params.category) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.category)
      .single();
    
    if (category) {
      query = query.eq('category_id', category.id);
    }
  }

  if (params.state) {
    query = query.eq('state', params.state);
  }

  if (params.minPrice) {
    query = query.gte('price', parseFloat(params.minPrice));
  }

  if (params.maxPrice) {
    query = query.lte('price', parseFloat(params.maxPrice));
  }

  if (params.condition) {
    query = query.eq('condition', params.condition);
  }

  if (params.search) {
    query = query.textSearch('title', params.search);
  }

  const { data: listings, error } = await query;

  if (error) {
    console.error('Error fetching listings:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Listings</h1>
          <p className="text-gray-600 mt-2">
            {listings?.length || 0} items available
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <SearchFilters />
          </aside>

          <main className="lg:col-span-3">
            {listings && listings.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing as ListingWithProfile}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No listings found</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
