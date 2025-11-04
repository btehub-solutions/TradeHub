import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Package } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Profile } from '@/types';

interface SellerInfoCardProps {
  seller: Profile;
  listingsCount: number;
}

export function SellerInfoCard({ seller, listingsCount }: SellerInfoCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h2>

      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {seller.avatar_url ? (
            <Image
              src={seller.avatar_url}
              alt={seller.full_name || 'Seller'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-xl">
              {(seller.full_name || 'U')[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* Seller Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {seller.full_name || 'TradeHub User'}
          </h3>
          
          {seller.location && (
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {seller.location}
                {seller.state && `, ${seller.state}`}
              </span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>Member since {formatDate(seller.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Package className="w-4 h-4 mr-2" />
            <span>Active listings</span>
          </div>
          <span className="font-semibold text-gray-900">{listingsCount}</span>
        </div>
      </div>

      {/* Bio */}
      {seller.bio && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-3">{seller.bio}</p>
        </div>
      )}

      {/* View Profile Link - Placeholder for future feature */}
      <Link
        href={`/profile/${seller.id}`}
        className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
      >
        View Seller Profile
      </Link>
    </div>
  );
}
