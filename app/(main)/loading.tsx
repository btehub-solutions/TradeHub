import { ListingGridSkeleton } from '@/components/listings/ListingCardSkeleton';

export default function MainLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="h-12 bg-blue-700 rounded-lg mb-4 animate-pulse" />
            <div className="h-6 bg-blue-700 rounded-lg mb-8 max-w-md mx-auto animate-pulse" />
            <div className="h-14 bg-blue-700 rounded-lg max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Listings Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex gap-6">
          {/* Filter Sidebar Skeleton */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ListingGridSkeleton count={9} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
