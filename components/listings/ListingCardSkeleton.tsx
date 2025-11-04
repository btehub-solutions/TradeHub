export function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-pulse">
      <div className="relative aspect-square bg-gray-200" />
      
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded mb-2" />
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
        
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-3" />
        
        <div className="flex items-center mb-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

export function ListingGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </>
  );
}
