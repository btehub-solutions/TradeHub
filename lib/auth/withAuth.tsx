'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './useUser';
import { Loader2 } from 'lucide-react';

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireProfile?: boolean;
  }
) {
  return function ProtectedRoute(props: P) {
    const { user, profile, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/login');
        } else if (options?.requireProfile && !profile?.full_name) {
          router.push('/complete-profile');
        }
      }
    }, [user, profile, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!user) {
      return null;
    }

    if (options?.requireProfile && !profile?.full_name) {
      return null;
    }

    return <Component {...props} />;
  };
}
