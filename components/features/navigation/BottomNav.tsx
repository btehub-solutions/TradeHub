'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/lib/auth/useUser';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Search',
    href: '/search',
    icon: Search,
  },
  {
    label: 'Post',
    href: '/listings/create',
    icon: Plus,
    isCenter: true,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageCircle,
    disabled: true, // Placeholder for future
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
    requiresAuth: true,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          // Redirect to login if auth is required
          const href = item.requiresAuth && !user ? '/login' : item.href;
          
          if (item.isCenter) {
            return (
              <Link
                key={item.label}
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center',
                  'relative -top-4',
                  item.disabled && 'pointer-events-none opacity-50'
                )}
                aria-label={item.label}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1',
                'transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
                item.disabled && 'pointer-events-none opacity-50'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
