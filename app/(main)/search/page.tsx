'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryIcon } from '@/components/features/CategoryIcon';
import { createClient } from '@/lib/supabase/client';
import type { Category } from '@/types';

const RECENT_SEARCHES_KEY = 'tradehub_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }

    // Fetch categories
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (data) setCategories(data);
    };

    fetchCategories();
  }, [supabase]);

  const saveRecentSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const updated = [
      trimmed,
      ...recentSearches.filter(s => s !== trimmed)
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      router.push(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const removeRecentSearch = (searchQuery: string) => {
    const updated = recentSearches.filter(s => s !== searchQuery);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 h-12 text-base"
                autoFocus
                aria-label="Search listings"
              />
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => router.back()}
              aria-label="Cancel search"
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Searches
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-muted-foreground"
              >
                Clear All
              </Button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <button
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex-1 text-left"
                  >
                    <span className="text-sm">{search}</span>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecentSearch(search)}
                    aria-label={`Remove ${search}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Popular Categories */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.slug}`}
                className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <CategoryIcon slug={category.slug} className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-sm">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Search Suggestions */}
        {query && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
            <div className="space-y-2">
              <button
                onClick={handleSubmit}
                className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="text-sm">
                  Search for "<strong>{query}</strong>"
                </span>
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
