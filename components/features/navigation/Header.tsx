'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { SearchBar } from './SearchBar';
import { CategoryDropdown } from './CategoryDropdown';
import { UserMenu } from './UserMenu';
import { useUser } from '@/lib/auth/useUser';

export function Header() {
  const { user, profile, loading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Logo className="flex-shrink-0" />

          {/* Desktop Search Bar */}
          <SearchBar className="hidden md:block flex-1 max-w-xl" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <CategoryDropdown />
            
            {!loading && (
              <>
                {user && profile ? (
                  <>
                    <Button asChild className="gap-2">
                      <Link href="/listings/new">
                        <Plus className="h-4 w-4" />
                        Post Listing
                      </Link>
                    </Button>
                    <UserMenu profile={profile} />
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="gap-2">
                      <Link href="/listings/new">
                        <Plus className="h-4 w-4" />
                        Post Listing
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile: Show logo only, navigation is in bottom bar */}
          <div className="md:hidden ml-auto">
            {!loading && !user && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
