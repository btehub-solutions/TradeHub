'use client';

import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2 min-w-max px-4 md:px-6 lg:px-8">
        {/* All Categories chip */}
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
            'border border-gray-300 hover:border-gray-400',
            selectedCategory === null
              ? 'bg-blue-600 text-white border-blue-600 hover:border-blue-700'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          )}
        >
          All Categories
        </button>

        {/* Category chips */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              'border border-gray-300 hover:border-gray-400',
              selectedCategory === category.id
                ? 'bg-blue-600 text-white border-blue-600 hover:border-blue-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            {category.icon && <span className="mr-1">{category.icon}</span>}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
