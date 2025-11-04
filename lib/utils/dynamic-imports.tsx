/**
 * Dynamic Imports for Code Splitting
 * Use these to lazy-load heavy components
 */

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
  </div>
);

// Listing components
export const DynamicCreateListingForm = dynamic(
  () => import('@/components/listings/CreateListingForm').then((mod) => ({ default: mod.CreateListingForm })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // Disable SSR for form components
  }
);

export const DynamicEditListingForm = dynamic(
  () => import('@/components/listings/EditListingForm').then((mod) => ({ default: mod.EditListingForm })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

export const DynamicImageGallery = dynamic(
  () => import('@/components/listings/ImageGallery').then((mod) => ({ default: mod.ImageGallery })),
  {
    loading: () => <LoadingSpinner />,
  }
);

export const DynamicContactSeller = dynamic(
  () => import('@/components/listings/ContactSeller').then((mod) => ({ default: mod.ContactSeller })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

// Profile components
export const DynamicEditProfileModal = dynamic(
  () => import('@/components/profile/EditProfileModal').then((mod) => ({ default: mod.EditProfileModal })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

export const DynamicProfileForm = dynamic(
  () => import('@/components/profile/ProfileForm').then((mod) => ({ default: mod.ProfileForm })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

// Search components
export const DynamicFilterPanel = dynamic(
  () => import('@/components/features/search/FilterPanel').then((mod) => ({ default: mod.FilterPanel })),
  {
    loading: () => <LoadingSpinner />,
  }
);

// Image upload (heavy component with file handling)
export const DynamicImageUpload = dynamic(
  () => import('@/components/listings/ImageUpload').then((mod) => ({ default: mod.ImageUpload })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

/**
 * Preload a dynamic component
 * Call this on hover or focus to improve perceived performance
 */
export function preloadComponent(componentLoader: () => Promise<any>) {
  componentLoader();
}

/**
 * Example usage:
 * 
 * import { DynamicCreateListingForm, preloadComponent } from '@/lib/utils/dynamic-imports';
 * 
 * // In your component:
 * <button
 *   onMouseEnter={() => preloadComponent(() => import('@/components/listings/CreateListingForm'))}
 *   onClick={() => setShowForm(true)}
 * >
 *   Create Listing
 * </button>
 * 
 * {showForm && <DynamicCreateListingForm />}
 */
