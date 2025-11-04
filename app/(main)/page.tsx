'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { ListingWithProfile, Category, ListingCondition } from '@/types';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingGridSkeleton } from '@/components/listings/ListingCardSkeleton';
import { EmptyState } from '@/components/listings/EmptyState';
import { SearchBar } from '@/components/listings/SearchBar';
import { FilterPanel, FilterState } from '@/components/features/search/FilterPanel';
import { ActiveFilters } from '@/components/features/search/ActiveFilters';
import { SortOption } from '@/components/features/search/SortByFilter';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Loader2, SlidersHorizontal } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [listings, setListings] = useState<ListingWithProfile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    location: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    conditions: [],
    sort: 'newest' as SortOption,
  });
  
  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Initialize filters from URL params
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const location = searchParams.get('location') || undefined;
    const price_min = searchParams.get('price_min');
    const price_max = searchParams.get('price_max');
    const conditions = (searchParams.get('conditions')?.split(',').filter(Boolean) || []) as ListingCondition[];
    const sort = (searchParams.get('sort') || 'newest') as SortOption;

    setSearchQuery(q);
    setFilters({
      categories,
      location,
      minPrice: price_min ? parseFloat(price_min) : undefined,
      maxPrice: price_max ? parseFloat(price_max) : undefined,
      conditions,
      sort,
    });
  }, [searchParams]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // Update URL params when filters change
  const updateURLParams = (newFilters: FilterState, newSearchQuery: string) => {
    const params = new URLSearchParams();

    if (newSearchQuery) {
      params.set('q', newSearchQuery);
    }

    if (newFilters.categories.length > 0) {
      params.set('categories', newFilters.categories.join(','));
    }

    if (newFilters.location) {
      params.set('location', newFilters.location);
    }

    if (newFilters.minPrice !== undefined) {
      params.set('price_min', newFilters.minPrice.toString());
    }

    if (newFilters.maxPrice !== undefined) {
      params.set('price_max', newFilters.maxPrice.toString());
    }

    if (newFilters.conditions.length > 0) {
      params.set('conditions', newFilters.conditions.join(','));
    }

    if (newFilters.sort !== 'newest') {
      params.set('sort', newFilters.sort);
    }

    const newURL = params.toString() ? `?${params.toString()}` : '/';
    router.push(newURL, { scroll: false });
  };

  // Fetch listings when debounced search or filters change
  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        setCurrentPage(0);

        const params = new URLSearchParams({
          limit: ITEMS_PER_PAGE.toString(),
          offset: '0',
        });

        if (debouncedSearchQuery) {
          params.set('q', debouncedSearchQuery);
        }

        if (filters.categories.length > 0) {
          params.set('categories', filters.categories.join(','));
        }

        if (filters.location) {
          params.set('location', filters.location);
        }

        if (filters.minPrice !== undefined) {
          params.set('price_min', filters.minPrice.toString());
        }

        if (filters.maxPrice !== undefined) {
          params.set('price_max', filters.maxPrice.toString());
        }

        if (filters.conditions.length > 0) {
          params.set('conditions', filters.conditions.join(','));
        }

        params.set('sort', filters.sort);

        const response = await fetch(`/api/listings?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListings(data.listings || []);
        setTotalCount(data.count || 0);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [debouncedSearchQuery, filters]);

  // Load more listings
  const handleLoadMore = async () => {
    if (loadingMore || listings.length >= totalCount) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const offset = nextPage * ITEMS_PER_PAGE;

      const params = new URLSearchParams({
        limit: ITEMS_PER_PAGE.toString(),
        offset: offset.toString(),
      });

      if (debouncedSearchQuery) {
        params.set('q', debouncedSearchQuery);
      }

      if (filters.categories.length > 0) {
        params.set('categories', filters.categories.join(','));
      }

      if (filters.location) {
        params.set('location', filters.location);
      }

      if (filters.minPrice !== undefined) {
        params.set('price_min', filters.minPrice.toString());
      }

      if (filters.maxPrice !== undefined) {
        params.set('price_max', filters.maxPrice.toString());
      }

      if (filters.conditions.length > 0) {
        params.set('conditions', filters.conditions.join(','));
      }

      params.set('sort', filters.sort);

      const response = await fetch(`/api/listings?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      setListings((prev) => [...prev, ...(data.listings || [])]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more listings:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateURLParams(filters, query);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateURLParams(newFilters, debouncedSearchQuery);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      categories: [],
      location: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      conditions: [],
      sort: 'newest',
    };
    setFilters(defaultFilters);
    updateURLParams(defaultFilters, debouncedSearchQuery);
  };

  // Handle clear individual filters
  const handleClearCategory = (categoryId: string) => {
    const newFilters = {
      ...filters,
      categories: filters.categories.filter((id) => id !== categoryId),
    };
    setFilters(newFilters);
    updateURLParams(newFilters, debouncedSearchQuery);
  };

  const handleClearLocation = () => {
    const newFilters = { ...filters, location: undefined };
    setFilters(newFilters);
    updateURLParams(newFilters, debouncedSearchQuery);
  };

  const handleClearPriceRange = () => {
    const newFilters = {
      ...filters,
      minPrice: undefined,
      maxPrice: undefined,
    };
    setFilters(newFilters);
    updateURLParams(newFilters, debouncedSearchQuery);
  };

  const handleClearCondition = (condition: ListingCondition) => {
    const newFilters = {
      ...filters,
      conditions: filters.conditions.filter((c) => c !== condition),
    };
    setFilters(newFilters);
    updateURLParams(newFilters, debouncedSearchQuery);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    handleResetFilters();
  };

  const filterCount =
    filters.categories.length +
    (filters.location ? 1 : 0) +
    (filters.minPrice !== undefined || filters.maxPrice !== undefined ? 1 : 0) +
    filters.conditions.length;

  const hasMore = listings.length < totalCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Great Deals on TradeHub
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Buy and sell items easily across Nigeria
            </p>
            
            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearchChange}
              placeholder="Search for items, brands, or categories..."
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* Search Results Count */}
          {(debouncedSearchQuery || filterCount > 0) && !loading && (
            <div className="text-center text-blue-100">
              {debouncedSearchQuery ? (
                <>
                  Found {totalCount} {totalCount === 1 ? 'result' : 'results'} for "{debouncedSearchQuery}"
                </>
              ) : (
                <>
                  Showing {totalCount} {totalCount === 1 ? 'listing' : 'listings'}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Active Filters */}
      <ActiveFilters
        searchQuery={debouncedSearchQuery}
        categories={categories}
        selectedCategories={filters.categories}
        location={filters.location}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        conditions={filters.conditions}
        onClearSearch={() => handleSearchChange('')}
        onClearCategory={handleClearCategory}
        onClearLocation={handleClearLocation}
        onClearPriceRange={handleClearPriceRange}
        onClearCondition={handleClearCondition}
        onClearAll={handleClearAllFilters}
      />

      {/* Main Content with Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {filterCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                {filterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterPanel
              categories={categories}
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              resultCount={totalCount}
            />
          </aside>

          {/* Listings Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <ListingGridSkeleton count={8} />
              </div>
            ) : listings.length === 0 ? (
              <EmptyState
                title={debouncedSearchQuery || filterCount > 0 ? 'No results found' : 'No listings yet'}
                description={
                  debouncedSearchQuery || filterCount > 0
                    ? 'We couldn\'t find any listings matching your search. Try different keywords or filters.'
                    : 'Be the first to create a listing on TradeHub!'
                }
                showCreateButton={!debouncedSearchQuery && filterCount === 0}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>Load More</>
                      )}
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                      Showing {listings.length} of {totalCount} listings
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Panel */}
      <FilterPanel
        categories={categories}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        resultCount={totalCount}
        isMobile
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
      />
    </div>
  );
}
