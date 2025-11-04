'use client';

import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

export function Avatar({ 
  src, 
  alt = 'User avatar', 
  fallback,
  size = 'md',
  className 
}: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-full bg-muted", sizeClass, className)}>
        <img 
          src={src} 
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium",
        sizeClass,
        className
      )}
    >
      {fallback ? (
        <span>{fallback}</span>
      ) : (
        <User className="h-1/2 w-1/2" />
      )}
    </div>
  );
}
