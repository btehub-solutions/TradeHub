'use client';

import { Check } from 'lucide-react';

export type SortOption =
  | 'newest'
  | 'price_low_high'
  | 'price_high_low'
  | 'oldest';

interface SortByFilterProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string; description: string }[] = [
  {
    value: 'newest',
    label: 'Newest First',
    description: 'Recently listed items',
  },
  {
    value: 'price_low_high',
    label: 'Price: Low to High',
    description: 'Cheapest items first',
  },
  {
    value: 'price_high_low',
    label: 'Price: High to Low',
    description: 'Most expensive first',
  },
  {
    value: 'oldest',
    label: 'Oldest First',
    description: 'Earliest listings',
  },
];

export function SortByFilter({ value, onChange }: SortByFilterProps) {
  return (
    <div className="space-y-2">
      {SORT_OPTIONS.map((option) => {
        const isSelected = value === option.value;
        
        return (
          <label
            key={option.value}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                isSelected
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {isSelected && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <input
              type="radio"
              name="sort"
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.description}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
