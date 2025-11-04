'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Grid3x3 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CategoryIcon } from '@/components/features/CategoryIcon';
import { createClient } from '@/lib/supabase/client';
import type { Category } from '@/types';

export function CategoryDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="hidden md:flex items-center gap-1"
          disabled={loading}
        >
          <Grid3x3 className="h-4 w-4" />
          <span>Categories</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem asChild>
          <Link href="/" className="cursor-pointer">
            <Grid3x3 className="mr-2 h-4 w-4" />
            <span>All Categories</span>
          </Link>
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem key={category.id} asChild>
            <Link 
              href={`/?category=${category.slug}`}
              className="cursor-pointer"
            >
              <CategoryIcon slug={category.slug} className="mr-2 h-4 w-4" />
              <span>{category.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
