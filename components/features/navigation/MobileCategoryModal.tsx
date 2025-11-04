'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryIcon } from '@/components/features/CategoryIcon';
import { createClient } from '@/lib/supabase/client';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';

interface MobileCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileCategoryModal({ isOpen, onClose }: MobileCategoryModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        const { data } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (data) setCategories(data);
      };

      fetchCategories();
    }
  }, [isOpen, supabase]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-background md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <h2 id="category-modal-title" className="text-lg font-semibold">
            Categories
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close categories"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 p-4 mb-3 rounded-lg border bg-card hover:bg-accent transition-colors"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Grid3x3 className="h-6 w-6 text-primary" />
          </div>
          <span className="font-medium">All Categories</span>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/?category=${category.slug}`}
              onClick={onClose}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <CategoryIcon slug={category.slug} className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
