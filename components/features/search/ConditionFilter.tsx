'use client';

import { LISTING_CONDITIONS, ListingCondition } from '@/types';
import { Check } from 'lucide-react';

interface ConditionFilterProps {
  selectedConditions: ListingCondition[];
  onChange: (conditions: ListingCondition[]) => void;
}

export function ConditionFilter({
  selectedConditions,
  onChange,
}: ConditionFilterProps) {
  const handleToggle = (condition: ListingCondition) => {
    if (selectedConditions.includes(condition)) {
      onChange(selectedConditions.filter((c) => c !== condition));
    } else {
      onChange([...selectedConditions, condition]);
    }
  };

  return (
    <div className="space-y-2">
      {LISTING_CONDITIONS.map((condition) => {
        const isSelected = selectedConditions.includes(condition.value);
        
        return (
          <label
            key={condition.value}
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
              onChange={() => handleToggle(condition.value)}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-700">
              {condition.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
