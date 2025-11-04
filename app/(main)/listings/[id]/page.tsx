import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ListingDetails } from '@/components/listings/ListingDetails';
import { Metadata } from 'next';
import { formatPrice, truncate } from '@/lib/utils';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: listing } = await supabase
    .from('listings')
    .select('*, profiles(*), categories(*)')
    .eq('id', params.id)
    .single();

  if (!listing) {
    return {
      title: 'Listing Not Found | TradeHub',
      description: 'The listing you are looking for could not be found.',
    };
  }

  const description = truncate(listing.description, 160);
  const imageUrl = listing.images.length > 0 ? listing.images[0] : null;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tradehub.ng'}/listings/${params.id}`;

  return {
    title: `${listing.title} - ${formatPrice(listing.price)} | TradeHub`,
    description,
    keywords: [
      listing.title,
      listing.categories.name,
      listing.condition,
      listing.location,
      listing.state,
      'Nigeria marketplace',
      'buy and sell',
    ].join(', '),
    openGraph: {
      title: `${listing.title} - ${formatPrice(listing.price)}`,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'website',
      url,
      siteName: 'TradeHub',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} - ${formatPrice(listing.price)}`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ListingPage({ params }: PageProps) {
  const supabase = await createClient();

  // Fetch listing with seller profile and category
  const { data: listing, error } = await supabase
    .from('listings')
    .select(`
      *,
      profiles (*),
      categories (*)
    `)
    .eq('id', params.id)
    .single();

  if (error || !listing) {
    notFound();
  }

  // Check if listing is active
  if (listing.status !== 'active') {
    notFound();
  }

  // Get seller's active listings count
  const { count: sellerListingsCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', listing.user_id)
    .eq('status', 'active');

  // Check if current user is the owner
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === listing.user_id;

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description,
    image: listing.images,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: listing.profiles.full_name || 'TradeHub User',
      },
    },
    category: listing.categories.name,
    itemCondition: `https://schema.org/${listing.condition === 'new' ? 'NewCondition' : 'UsedCondition'}`,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <ListingDetails 
        listing={listing} 
        sellerListingsCount={sellerListingsCount || 0}
        isOwner={isOwner}
      />
    </>
  );
}
