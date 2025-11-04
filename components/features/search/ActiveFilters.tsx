'use client';

import { X } from 'lucide-react';
import { ListingCondition, Category } from '@/types';
import { SortOption } from './SortByFilter';

interface ActiveFiltersProps {
  searchQuery?: string;
  categories?: Category[];
  selectedCategories?: string[];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  conditions?: ListingCondition[];
  sort?: SortOption;
  onClearSearch?: () => void;
  onClearCategory?: (categoryId: string) => void;
  onClearLocation?: () => void;
  onClearPriceRange?: () => void;
  onClearCondition?: (condition: ListingCondition) => void;
  onClearAll?: () => void;
}

export function ActiveFilters({
  searchQuery,
  categories = [],
  selectedCategories = [],
  location,
  minPrice,
  maxPrice,
  conditions = [],
  sort,
  onClearSearch,
  onClearCategory,
  onClearLocation,
  onClearPriceRange,
  onClearCondition,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    location ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    conditions.length > 0;

  if (!hasFilters) return null;

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  const getConditionLabel = (condition: ListingCondition) => {
    const labels: Record<ListingCondition, string> = {
      new: 'Brand New',
      like_new: 'Like New',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
    };
    return labels[condition];
  };

  const getPriceRangeLabel = () => {
    if (minPrice !== undefined && maxPrice !== undefined) {
      return `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`;
    } else if (minPrice !== undefined) {
      return `Over ₦${minPrice.toLocaleString()}`;
    } else if (maxPrice !== undefined) {
      return `Under ₦${maxPrice.toLocaleString()}`;
    }
    return '';
  };

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">
            Active Filters:
          </span>

          {/* Search Query */}
          {searchQuery && (
            <FilterChip
              label={`Search: "${searchQuery}"`}
              onRemove={onClearSearch}
            />
          )}

          {/* Categories */}
          {selectedCategories.map((categoryId) => (
            <FilterChip
              key={categoryId}
              label={getCategoryName(categoryId)}
              onRemove={() => onClearCategory?.(categoryId)}
            />
          ))}

          {/* Location */}
          {location && (
            <FilterChip label={`Location: ${location}`} onRemove={onClearLocation} />
          )}

          {/* Price Range */}
          {(minPrice !== undefined || maxPrice !== undefined) && (
            <FilterChip
              label={getPriceRangeLabel()}
              onRemove={onClearPriceRange}
            />
          )}

          {/* Conditions */}
          {conditions.map((condition) => (
            <FilterChip
              key={condition}
              label={getConditionLabel(condition)}
              onRemove={() => onClearCondition?.(condition)}
            />
          ))}

          {/* Clear All */}
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="ml-2 text-sm font-medium text-blue-600 hover:text-blue-700 underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label} filter`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
