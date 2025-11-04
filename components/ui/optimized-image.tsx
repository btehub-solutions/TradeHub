'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl, getBlurDataUrl, isCloudinaryImage, ImagePreset } from '@/lib/utils/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL'> {
  src: string;
  alt: string;
  preset?: ImagePreset;
  fallbackSrc?: string;
  showLoadingState?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  preset = 'card',
  fallbackSrc = '/placeholder.png',
  showLoadingState = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageSrc = error ? fallbackSrc : src;
  const optimizedSrc = isCloudinaryImage(imageSrc)
    ? getOptimizedImageUrl(imageSrc, preset)
    : imageSrc;

  const blurDataURL = isCloudinaryImage(imageSrc) && !error
    ? getBlurDataUrl(imageSrc)
    : undefined;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={optimizedSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading && showLoadingState ? 'opacity-0' : 'opacity-100'
        )}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
      
      {isLoading && showLoadingState && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}

interface OptimizedBackgroundImageProps {
  src: string;
  alt: string;
  preset?: ImagePreset;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function OptimizedBackgroundImage({
  src,
  alt,
  preset = 'hero',
  className,
  children,
  overlay = false,
  overlayOpacity = 0.5,
}: OptimizedBackgroundImageProps) {
  const optimizedSrc = isCloudinaryImage(src)
    ? getOptimizedImageUrl(src, preset)
    : src;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
