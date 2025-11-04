'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Eye, Clock, Tag, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { ListingWithProfile } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { LISTING_CONDITIONS } from '@/types';
import { ImageGallery } from './ImageGallery';
import { ContactSeller } from './ContactSeller';
import { SellerInfoCard } from './SellerInfoCard';

interface ListingDetailsProps {
  listing: any;
  sellerListingsCount?: number;
  isOwner?: boolean;
}

export function ListingDetails({ 
  listing, 
  sellerListingsCount = 0,
  isOwner = false 
}: ListingDetailsProps) {
  const [viewsIncremented, setViewsIncremented] = useState(false);

  const conditionLabel = LISTING_CONDITIONS.find(
    (c) => c.value === listing.condition
  )?.label;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'like_new':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Increment views on mount (client-side tracking)
  useEffect(() => {
    if (!viewsIncremented && !isOwner) {
      fetch(`/api/listings/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'increment_views' }),
      }).catch(console.error);
      setViewsIncremented(true);
    }
  }, [listing.id, viewsIncremented, isOwner]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/listings" className="hover:text-blue-600 transition-colors">
                Listings
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link 
                href={`/listings?category=${listing.categories.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {listing.categories.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">
              {listing.title}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
              <ImageGallery 
                images={listing.images.length > 0 ? listing.images : ['/placeholder.png']} 
                title={listing.title} 
              />
            </div>

            {/* Listing Details Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
              {/* Header with Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {listing.title}
                </h1>
                <p className="text-3xl md:text-4xl font-bold text-blue-600">
                  {formatPrice(listing.price)}
                </p>
              </div>

              {/* Badges and Info Grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getConditionColor(listing.condition)}`}>
                  {conditionLabel}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  <Tag className="w-4 h-4 mr-1" />
                  {listing.categories.name}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </p>
                  <p className="font-semibold text-gray-900">
                    {listing.location}, {listing.state}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Posted
                  </p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(listing.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Views
                  </p>
                  <p className="font-semibold text-gray-900">
                    {listing.views.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              </div>

              {/* Owner Actions */}
              {isOwner && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      This is your listing
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/listings/${listing.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Listing
                    </Link>
                    <button
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Seller Info and Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Seller - Sticky on desktop */}
            {!isOwner && (
              <div className="sticky top-6">
                <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Seller</h2>
                  <ContactSeller
                    listingId={listing.id}
                    listingTitle={listing.title}
                    listingPrice={listing.price}
                    sellerWhatsApp={listing.profiles.whatsapp_number}
                    sellerPhone={listing.profiles.phone_number}
                  />
                </div>

                {/* Seller Info Card */}
                <SellerInfoCard 
                  seller={listing.profiles} 
                  listingsCount={sellerListingsCount}
                />
              </div>
            )}

            {/* If owner, show seller info without contact */}
            {isOwner && (
              <div className="sticky top-6">
                <SellerInfoCard 
                  seller={listing.profiles} 
                  listingsCount={sellerListingsCount}
                />
              </div>
            )}
          </div>
        </div>

        {/* Report Listing - Placeholder */}
        {!isOwner && (
          <div className="mt-8 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 underline">
              Report this listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
