'use client';

import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onChange: (min?: number, max?: number) => void;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onChange,
}: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(minPrice?.toString() || '');
  const [localMax, setLocalMax] = useState(maxPrice?.toString() || '');

  useEffect(() => {
    setLocalMin(minPrice?.toString() || '');
    setLocalMax(maxPrice?.toString() || '');
  }, [minPrice, maxPrice]);

  const handleMinChange = (value: string) => {
    setLocalMin(value);
    const numValue = value ? parseFloat(value) : undefined;
    if (!value || !isNaN(numValue!)) {
      onChange(numValue, maxPrice);
    }
  };

  const handleMaxChange = (value: string) => {
    setLocalMax(value);
    const numValue = value ? parseFloat(value) : undefined;
    if (!value || !isNaN(numValue!)) {
      onChange(minPrice, numValue);
    }
  };

  // Price presets
  const presets = [
    { label: 'Under ₦10,000', max: 10000 },
    { label: '₦10,000 - ₦50,000', min: 10000, max: 50000 },
    { label: '₦50,000 - ₦100,000', min: 50000, max: 100000 },
    { label: 'Over ₦100,000', min: 100000 },
  ];

  const handlePresetClick = (min?: number, max?: number) => {
    setLocalMin(min?.toString() || '');
    setLocalMax(max?.toString() || '');
    onChange(min, max);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={localMin}
              onChange={(e) => handleMinChange(e.target.value)}
              placeholder="0"
              min="0"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={localMax}
              onChange={(e) => handleMaxChange(e.target.value)}
              placeholder="Any"
              min="0"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Quick Select
        </p>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset.min, preset.max)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors text-left"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
