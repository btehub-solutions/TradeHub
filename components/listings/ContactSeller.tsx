'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Share2, Check } from 'lucide-react';
import { getWhatsAppLink, getTelLink, formatPrice } from '@/lib/utils';

interface ContactSellerProps {
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  sellerWhatsApp: string | null;
  sellerPhone: string;
}

export function ContactSeller({
  listingId,
  listingTitle,
  listingPrice,
  sellerWhatsApp,
  sellerPhone,
}: ContactSellerProps) {
  const [copied, setCopied] = useState(false);

  const whatsappMessage = `Hi, I'm interested in your ${listingTitle} listed on TradeHub for ${formatPrice(listingPrice)}`;
  const whatsappNumber = sellerWhatsApp || sellerPhone;

  const handleWhatsAppClick = async () => {
    // Track contact click
    try {
      await fetch(`/api/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'increment_views' }),
      });
    } catch (error) {
      console.error('Failed to track contact:', error);
    }

    // Open WhatsApp
    window.open(getWhatsAppLink(whatsappNumber, whatsappMessage), '_blank');
  };

  const handleCallClick = async () => {
    // Track contact click
    try {
      await fetch(`/api/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'increment_views' }),
      });
    } catch (error) {
      console.error('Failed to track contact:', error);
    }

    // Open phone dialer
    window.location.href = getTelLink(sellerPhone);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/listings/${listingId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: listingTitle,
          text: `Check out this ${listingTitle} on TradeHub`,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const handleShareWhatsApp = () => {
    const url = `${window.location.origin}/listings/${listingId}`;
    const message = `Check out this ${listingTitle} on TradeHub: ${url}`;
    window.open(getWhatsAppLink('', message), '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Primary Contact Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleCallClick}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
        >
          <Phone className="w-5 h-5" />
          <span>Call</span>
        </button>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </>
          )}
        </button>

        <button
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
          aria-label="Share via WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800">
          <strong>Safety tip:</strong> Meet in a public place and inspect the item before making payment.
        </p>
      </div>
    </div>
  );
}
