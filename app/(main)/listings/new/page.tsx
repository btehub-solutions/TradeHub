import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CreateListingFormEnhanced } from '@/components/listings/CreateListingFormEnhanced';

export default async function NewListingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a Listing</h1>
          <p className="text-gray-600 mt-2">
            Share details about the item you're selling
          </p>
        </div>

        <CreateListingFormEnhanced categories={categories || []} />
      </div>
    </div>
  );
}
