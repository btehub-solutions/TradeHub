'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Eye, Calendar, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Listing, Category } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

interface ProfileListingCardProps {
  listing: Listing & { categories: Category };
  onStatusChange: (id: string, status: 'active' | 'sold' | 'inactive') => void;
  onDelete: (id: string) => void;
}

export function ProfileListingCard({ listing, onStatusChange, onDelete }: ProfileListingCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const imageUrl = listing.images[0] || '/placeholder.png';
  
  const getOptimizedUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const publicId = parts[1];
        return getOptimizedImageUrl(publicId, {
          width: 300,
          quality: 80,
          format: 'auto',
        });
      }
    }
    return url;
  };

  const optimizedImageUrl = getOptimizedUrl(imageUrl);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(listing.id);
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  const getStatusBadge = () => {
    switch (listing.status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
      case 'sold':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Sold</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <Link href={`/listings/${listing.id}`} className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <Image
            src={optimizedImageUrl}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 192px"
          />
          {listing.status === 'sold' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SOLD</span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <Link href={`/listings/${listing.id}`} className="hover:text-blue-600">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
                  {listing.title}
                </h3>
              </Link>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                {formatPrice(listing.price)}
              </p>
            </div>
            {getStatusBadge()}
          </div>

          <div className="space-y-1 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{listing.location}, {listing.state}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{listing.views} views</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>Posted {formatDate(listing.created_at)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/listings/${listing.id}/edit`}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>

            {listing.status === 'active' && (
              <>
                <button
                  onClick={() => onStatusChange(listing.id, 'sold')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Sold
                </button>
                <button
                  onClick={() => onStatusChange(listing.id, 'inactive')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Deactivate
                </button>
              </>
            )}

            {listing.status === 'inactive' && (
              <button
                onClick={() => onStatusChange(listing.id, 'active')}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Activate
              </button>
            )}

            {listing.status === 'sold' && (
              <button
                onClick={() => onStatusChange(listing.id, 'active')}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Relist
              </button>
            )}

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
