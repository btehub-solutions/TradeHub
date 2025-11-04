import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { id } = params;

    // Fetch listing with seller profile and category
    const { data: listing, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:user_id (
          id,
          full_name,
          avatar_url,
          location,
          state,
          whatsapp_number,
          phone_number,
          created_at
        ),
        categories:category_id (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .single();

    if (error || !listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Check if listing is active
    if (listing.status !== 'active') {
      return NextResponse.json(
        { error: 'Listing is not available' },
        { status: 404 }
      );
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

    return NextResponse.json({
      listing,
      sellerListingsCount: sellerListingsCount || 0,
      isOwner,
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { id } = params;
    const body = await request.json();

    // Handle view increment
    if (body.action === 'increment_views') {
      // Use the database function to increment views
      const { error } = await supabase.rpc('increment_listing_views', {
        listing_id: id,
      });

      if (error) {
        console.error('Error incrementing views:', error);
        return NextResponse.json(
          { error: 'Failed to update views' },
          { status: 500 }
        );
      }

      // Also track the view in listing_views table
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('listing_views').insert({
        listing_id: id,
        viewer_id: user?.id || null,
      });

      return NextResponse.json({ success: true });
    }

    // Handle listing updates (status, etc.) - requires authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify ownership
    const { data: listing } = await supabase
      .from('listings')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!listing || listing.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Update listing
    const updateData: any = {};
    if (body.status) updateData.status = body.status;
    if (body.title) updateData.title = body.title;
    if (body.description) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.condition) updateData.condition = body.condition;
    if (body.location) updateData.location = body.location;
    if (body.state) updateData.state = body.state;
    if (body.category_id) updateData.category_id = body.category_id;
    if (body.images) updateData.images = body.images;

    updateData.updated_at = new Date().toISOString();

    const { data: updatedListing, error: updateError } = await supabase
      .from('listings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating listing:', updateError);
      return NextResponse.json(
        { error: 'Failed to update listing' },
        { status: 500 }
      );
    }

    return NextResponse.json({ listing: updatedListing });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { id } = params;

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify ownership
    const { data: listing } = await supabase
      .from('listings')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!listing || listing.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete listing
    const { error: deleteError } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting listing:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete listing' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
