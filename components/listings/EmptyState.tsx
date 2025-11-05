import Link from 'next/link';
import { Package, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showCreateButton?: boolean;
}

export function EmptyState({
  title = 'No listings found',
  description = 'Try adjusting your search or filters to find what you\'re looking for.',
  showCreateButton = false,
}: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 text-center max-w-md mb-6">
        {description}
      </p>
      
      {showCreateButton && (
        <Link
          href="/listings/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create First Listing
        </Link>
      )}
    </div>
  );
}
