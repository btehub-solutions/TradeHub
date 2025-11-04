import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tradehub.ng';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/listings`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    const supabase = await createClient();

    // Fetch all active listings
    const { data: listings } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'active')
      .order('updated_at', { ascending: false })
      .limit(1000);

    const listingPages: MetadataRoute.Sitemap = (listings || []).map((listing) => ({
      url: `${baseUrl}/listings/${listing.id}`,
      lastModified: new Date(listing.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Fetch all categories
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    const categoryPages: MetadataRoute.Sitemap = (categories || []).map((category) => ({
      url: `${baseUrl}/search?categories=${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    return [...staticPages, ...listingPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
