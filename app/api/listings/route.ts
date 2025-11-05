import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createListingSchema } from '@/lib/validations/listing';

/**
 * POST /api/listings
 * Create a new listing with image uploads
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    
    // Extract listing data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category_id = formData.get('category_id') as string;
    const condition = formData.get('condition') as string;
    const location = formData.get('location') as string;
    const state = formData.get('state') as string;

    // For now, use placeholder images (Cloudinary optional)
    // You can add image upload later
    const uploadedImageUrls: string[] = [
      'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ];

    // Validate listing data with uploaded image URLs
    const validationResult = createListingSchema.safeParse({
      title,
      description,
      price,
      category_id,
      condition,
      location,
      state,
      images: uploadedImageUrls,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    // Create listing in database
    const { data: listing, error: dbError } = await supabase
      .from('listings')
      .insert({
        user_id: user.id,
        title: validationResult.data.title,
        description: validationResult.data.description,
        price: validationResult.data.price,
        category_id: validationResult.data.category_id,
        condition: validationResult.data.condition,
        location: validationResult.data.location,
        state: validationResult.data.state,
        images: validationResult.data.images,
        status: 'active',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create listing', details: dbError.message },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        listing,
        message: 'Listing created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/listings:', error);
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/listings
 * Get listings with optional filters and sorting
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const q = searchParams.get('q'); // Search query
    const categories = searchParams.get('categories'); // Comma-separated category IDs
    const conditions = searchParams.get('conditions'); // Comma-separated conditions
    const price_min = searchParams.get('price_min');
    const price_max = searchParams.get('price_max');
    const location = searchParams.get('location'); // City or state
    const sort = searchParams.get('sort') || 'newest'; // Sort option
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build base query
    let query = supabase
      .from('listings')
      .select('*, profiles(*), categories(*)', { count: 'exact' })
      .eq('status', 'active');

    // Apply text search filter
    if (q && q.trim()) {
      query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
    }

    // Apply category filter (multiple categories)
    if (categories) {
      const categoryIds = categories.split(',').filter(Boolean);
      if (categoryIds.length > 0) {
        query = query.in('category_id', categoryIds);
      }
    }

    // Apply condition filter (multiple conditions)
    if (conditions) {
      const conditionValues = conditions.split(',').filter(Boolean);
      if (conditionValues.length > 0) {
        query = query.in('condition', conditionValues);
      }
    }

    // Apply price range filters
    if (price_min) {
      const minPrice = parseFloat(price_min);
      if (!isNaN(minPrice)) {
        query = query.gte('price', minPrice);
      }
    }

    if (price_max) {
      const maxPrice = parseFloat(price_max);
      if (!isNaN(maxPrice)) {
        query = query.lte('price', maxPrice);
      }
    }

    // Apply location filter (matches city or state)
    if (location && location.trim()) {
      // Location can be "City, State" or just "City" or "State"
      const locationParts = location.split(',').map(part => part.trim());
      
      if (locationParts.length > 1) {
        // Has both city and state
        const city = locationParts[0];
        const state = locationParts[1];
        query = query.or(`location.ilike.%${city}%,state.ilike.%${state}%`);
      } else {
        // Just city or state
        query = query.or(`location.ilike.%${location}%,state.ilike.%${location}%`);
      }
    }

    // Apply sorting
    switch (sort) {
      case 'price_low_high':
        query = query.order('price', { ascending: true });
        break;
      case 'price_high_low':
        query = query.order('price', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: listings, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      listings,
      count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/listings:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
