export default function ListingDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="bg-white rounded-lg p-6 mt-6 shadow-sm">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded mb-6 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-12 bg-gray-200 rounded mt-6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
