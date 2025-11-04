/**
 * Image Optimization Utilities for TradeHub
 * Optimized for Nigerian mobile networks (3G performance)
 */

export type ImageTransformOptions = {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  gravity?: 'auto' | 'face' | 'center';
  blur?: number;
};

export type ImagePreset = 'thumbnail' | 'card' | 'detail' | 'hero' | 'avatar';

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com';

/**
 * Preset configurations optimized for different use cases
 */
const IMAGE_PRESETS: Record<ImagePreset, ImageTransformOptions> = {
  thumbnail: {
    width: 300,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  },
  card: {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 80,
    format: 'auto',
    gravity: 'auto',
  },
  detail: {
    width: 800,
    height: 800,
    crop: 'fit',
    quality: 'auto',
    format: 'auto',
  },
  hero: {
    width: 1200,
    height: 600,
    crop: 'fill',
    quality: 85,
    format: 'auto',
    gravity: 'auto',
  },
  avatar: {
    width: 150,
    height: 150,
    crop: 'thumb',
    quality: 'auto',
    format: 'auto',
    gravity: 'face',
  },
};

/**
 * Build Cloudinary transformation string from options
 */
function buildTransformString(options: ImageTransformOptions): string {
  const transforms: string[] = [];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.format) transforms.push(`f_${options.format}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.blur) transforms.push(`e_blur:${options.blur}`);

  return transforms.join(',');
}

/**
 * Get optimized Cloudinary URL with transformations
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options: ImageTransformOptions | ImagePreset = 'card'
): string {
  // If it's a preset, use preset options
  const transformOptions = typeof options === 'string' 
    ? IMAGE_PRESETS[options] 
    : options;

  // Extract public_id from full Cloudinary URL if provided
  let publicId = publicIdOrUrl;
  if (publicIdOrUrl.includes('cloudinary.com')) {
    const parts = publicIdOrUrl.split('/upload/');
    if (parts.length === 2) {
      publicId = parts[1].split('?')[0]; // Remove query params if any
    }
  }

  // If it's not a Cloudinary URL, return as is
  if (!publicIdOrUrl.includes('cloudinary.com') && !publicId.startsWith('tradehub/')) {
    return publicIdOrUrl;
  }

  const transformString = buildTransformString(transformOptions);
  
  // Extract cloud name from URL or use default
  const cloudName = publicIdOrUrl.includes('cloudinary.com')
    ? publicIdOrUrl.split('/')[3]
    : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

  return `${CLOUDINARY_BASE_URL}/${cloudName}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate blur placeholder data URL for lazy loading
 */
export function getBlurDataUrl(
  publicIdOrUrl: string,
  width: number = 10,
  height: number = 10
): string {
  const blurOptions: ImageTransformOptions = {
    width,
    height,
    quality: 1,
    format: 'jpg',
    blur: 1000,
  };

  return getOptimizedImageUrl(publicIdOrUrl, blurOptions);
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  publicIdOrUrl: string,
  widths: number[] = [320, 640, 750, 828, 1080, 1200],
  options: Omit<ImageTransformOptions, 'width'> = {}
): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(publicIdOrUrl, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Check if URL is a Cloudinary image
 */
export function isCloudinaryImage(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary');
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(
  src: string,
  preset: ImagePreset = 'card',
  alt: string = ''
) {
  const options = IMAGE_PRESETS[preset];
  
  return {
    src: isCloudinaryImage(src) ? getOptimizedImageUrl(src, preset) : src,
    alt,
    width: options.width,
    height: options.height,
    placeholder: 'blur' as const,
    blurDataURL: isCloudinaryImage(src) ? getBlurDataUrl(src) : undefined,
    quality: typeof options.quality === 'number' ? options.quality : 80,
  };
}

/**
 * Preload critical images for better LCP
 */
export function preloadImage(src: string, preset: ImagePreset = 'card') {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedImageUrl(src, preset);
  link.imageSrcset = generateSrcSet(src);
  document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  preset: ImagePreset = 'card'
) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = getOptimizedImageUrl(src, preset);
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = getOptimizedImageUrl(src, preset);
  }
}

/**
 * Calculate optimal image dimensions based on viewport
 */
export function getResponsiveImageSize(
  containerWidth: number,
  aspectRatio: number = 1
): { width: number; height: number } {
  // Round up to nearest standard size for better caching
  const standardSizes = [320, 640, 750, 828, 1080, 1200, 1920];
  const width = standardSizes.find((size) => size >= containerWidth) || 1920;
  const height = Math.round(width / aspectRatio);

  return { width, height };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate image file before upload
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB. Current size: ${formatFileSize(file.size)}`,
    };
  }

  return { valid: true };
}

/**
 * Compress image on client side before upload (for slow networks)
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Resize if needed
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}
