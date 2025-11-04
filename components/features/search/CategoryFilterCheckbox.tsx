'use client';

import { Category } from '@/types';
import { Check } from 'lucide-react';

interface CategoryFilterCheckboxProps {
  categories: Category[];
  selectedCategories: string[];
  onChange: (categoryIds: string[]) => void;
}

export function CategoryFilterCheckbox({
  categories,
  selectedCategories,
  onChange,
}: CategoryFilterCheckboxProps) {
  const handleToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        
        return (
          <label
            key={category.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                isSelected
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleToggle(category.id)}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-700">
              {category.name}
            </span>
          </label>
        );
      })}
    </div>
  );
}
