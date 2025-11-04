import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { ListingWithProfile } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

interface ListingCardProps {
  listing: ListingWithProfile;
}

export function ListingCard({ listing }: ListingCardProps) {
  const imageUrl = listing.images[0] || '/placeholder.png';
  
  // Extract Cloudinary public_id from URL if it's a Cloudinary image
  const getOptimizedUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      // Extract public_id from Cloudinary URL
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const publicId = parts[1];
        return getOptimizedImageUrl(publicId, {
          width: 400,
          quality: 80,
          format: 'auto',
        });
      }
    }
    return url;
  };

  const optimizedImageUrl = getOptimizedUrl(imageUrl);

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={optimizedImageUrl}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {listing.condition === 'new' && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-sm">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {listing.title}
        </h3>

        <p className="text-xl md:text-2xl font-bold text-blue-600 mb-3">
          {formatPrice(listing.price)}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{listing.location}, {listing.state}</span>
        </div>

        <div className="flex items-center text-xs text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formatDate(listing.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}
