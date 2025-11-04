import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProfilePageClient } from '@/components/profile/ProfilePageClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get counts for each status
  const { count: activeCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'active');

  const { count: soldCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'sold');

  const { count: inactiveCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'inactive');

  const totalListings = (activeCount || 0) + (soldCount || 0) + (inactiveCount || 0);

  return (
    <ProfilePageClient
      profile={profile}
      totalListings={totalListings}
      activeCount={activeCount || 0}
      soldCount={soldCount || 0}
      inactiveCount={inactiveCount || 0}
    />
  );
}
