import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { EditListingForm } from '@/components/listings/EditListingForm';

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the listing
  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !listing) {
    redirect('/profile');
  }

  // Verify ownership
  if (listing.user_id !== user.id) {
    redirect('/profile');
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditListingForm listing={listing} categories={categories || []} />
      </div>
    </div>
  );
}
