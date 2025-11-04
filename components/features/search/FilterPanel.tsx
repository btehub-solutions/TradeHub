'use client';

import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Category, ListingCondition } from '@/types';
import { PriceRangeFilter } from './PriceRangeFilter';
import { LocationFilter } from './LocationFilter';
import { ConditionFilter } from './ConditionFilter';
import { CategoryFilterCheckbox } from './CategoryFilterCheckbox';
import { SortByFilter, SortOption } from './SortByFilter';

export interface FilterState {
  categories: string[];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  conditions: ListingCondition[];
  sort: SortOption;
}

interface FilterPanelProps {
  categories: Category[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  resultCount?: number;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

type FilterSectionKey = 'categories' | 'price' | 'location' | 'condition' | 'sort';

export function FilterPanel({
  categories,
  filters,
  onChange,
  onReset,
  resultCount,
  isMobile = false,
  isOpen = true,
  onClose,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<FilterSectionKey, boolean>>({
    categories: true,
    price: true,
    location: true,
    condition: true,
    sort: true,
  });

  const toggleSection = (section: FilterSectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryIds: string[]) => {
    onChange({ ...filters, categories: categoryIds });
  };

  const handleLocationChange = (location?: string) => {
    onChange({ ...filters, location });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleConditionChange = (conditions: ListingCondition[]) => {
    onChange({ ...filters, conditions });
  };

  const handleSortChange = (sort: SortOption) => {
    onChange({ ...filters, sort });
  };

  const filterCount =
    filters.categories.length +
    (filters.location ? 1 : 0) +
    (filters.minPrice !== undefined || filters.maxPrice !== undefined ? 1 : 0) +
    filters.conditions.length;

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onClose}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '85vh' }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              {filterCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                  {filterCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-4 py-4" style={{ maxHeight: 'calc(85vh - 140px)' }}>
            <FilterContent
              categories={categories}
              filters={filters}
              expandedSections={expandedSections}
              onToggleSection={toggleSection}
              onCategoryChange={handleCategoryChange}
              onLocationChange={handleLocationChange}
              onPriceChange={handlePriceChange}
              onConditionChange={handleConditionChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onReset}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {resultCount !== undefined
                ? `Show ${resultCount} results`
                : 'Apply Filters'}
            </button>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-20 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {filterCount > 0 && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
              {filterCount}
            </span>
          )}
        </div>
        <button
          onClick={onReset}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <FilterContent
          categories={categories}
          filters={filters}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          onCategoryChange={handleCategoryChange}
          onLocationChange={handleLocationChange}
          onPriceChange={handlePriceChange}
          onConditionChange={handleConditionChange}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
}

interface FilterContentProps {
  categories: Category[];
  filters: FilterState;
  expandedSections: Record<FilterSectionKey, boolean>;
  onToggleSection: (section: FilterSectionKey) => void;
  onCategoryChange: (categoryIds: string[]) => void;
  onLocationChange: (location?: string) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onConditionChange: (conditions: ListingCondition[]) => void;
  onSortChange: (sort: SortOption) => void;
}

function FilterContent({
  categories,
  filters,
  expandedSections,
  onToggleSection,
  onCategoryChange,
  onLocationChange,
  onPriceChange,
  onConditionChange,
  onSortChange,
}: FilterContentProps) {
  return (
    <>
      {/* Sort By */}
      <FilterSection
        title="Sort By"
        isExpanded={expandedSections.sort}
        onToggle={() => onToggleSection('sort')}
      >
        <SortByFilter value={filters.sort} onChange={onSortChange} />
      </FilterSection>

      {/* Categories */}
      <FilterSection
        title="Categories"
        isExpanded={expandedSections.categories}
        onToggle={() => onToggleSection('categories')}
        count={filters.categories.length}
      >
        <CategoryFilterCheckbox
          categories={categories}
          selectedCategories={filters.categories}
          onChange={onCategoryChange}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => onToggleSection('price')}
        count={
          filters.minPrice !== undefined || filters.maxPrice !== undefined
            ? 1
            : 0
        }
      >
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={onPriceChange}
        />
      </FilterSection>

      {/* Location */}
      <FilterSection
        title="Location"
        isExpanded={expandedSections.location}
        onToggle={() => onToggleSection('location')}
        count={filters.location ? 1 : 0}
      >
        <LocationFilter value={filters.location} onChange={onLocationChange} />
      </FilterSection>

      {/* Condition */}
      <FilterSection
        title="Condition"
        isExpanded={expandedSections.condition}
        onToggle={() => onToggleSection('condition')}
        count={filters.conditions.length}
      >
        <ConditionFilter
          selectedConditions={filters.conditions}
          onChange={onConditionChange}
        />
      </FilterSection>
    </>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  count,
  children,
}: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-3"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            {title}
          </h3>
          {count !== undefined && count > 0 && (
            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              {count}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  );
}
