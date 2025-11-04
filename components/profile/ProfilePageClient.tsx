'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, MapPin, Calendar, Edit, Plus, Loader2 } from 'lucide-react';
import { Profile, Listing, Category } from '@/types';
import { ProfileListingCard } from './ProfileListingCard';
import { EditProfileModal } from './EditProfileModal';
import { EmptyState } from '@/components/listings/EmptyState';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/lib/utils';

interface ProfilePageClientProps {
  profile: Profile | null;
  totalListings: number;
  activeCount: number;
  soldCount: number;
  inactiveCount: number;
}

type TabType = 'active' | 'sold' | 'inactive';

export function ProfilePageClient({
  profile,
  totalListings,
  activeCount,
  soldCount,
  inactiveCount,
}: ProfilePageClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [listings, setListings] = useState<(Listing & { categories: Category })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch listings when tab changes
  useEffect(() => {
    fetchListings(activeTab);
  }, [activeTab]);

  const fetchListings = async (status: TabType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/profile/listings?status=${status}`);
      if (!response.ok) throw new Error('Failed to fetch listings');
      
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load listings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'active' | 'sold' | 'inactive') => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update listing');

      toast({
        title: 'Success',
        description: `Listing marked as ${newStatus}`,
      });

      // Optimistically update UI
      setListings((prev) => prev.filter((listing) => listing.id !== id));
      
      // Refresh the page to update counts
      router.refresh();
    } catch (error) {
      console.error('Error updating listing:', error);
      toast({
        title: 'Error',
        description: 'Failed to update listing',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete listing');

      toast({
        title: 'Success',
        description: 'Listing deleted successfully',
      });

      // Optimistically update UI
      setListings((prev) => prev.filter((listing) => listing.id !== id));
      
      // Refresh the page to update counts
      router.refresh();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete listing',
        variant: 'destructive',
      });
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const tabs = [
    { id: 'active' as TabType, label: 'Active', count: activeCount },
    { id: 'sold' as TabType, label: 'Sold', count: soldCount },
    { id: 'inactive' as TabType, label: 'Inactive', count: inactiveCount },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {getInitials(profile?.full_name || null)}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {profile?.full_name || 'User'}
                </h1>
                
                <div className="space-y-1 text-sm text-gray-600">
                  {profile?.location && profile?.state && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}, {profile.state}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {formatDate(profile?.created_at || '')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{totalListings} {totalListings === 1 ? 'listing' : 'listings'}</span>
                  </div>
                </div>

                {profile?.bio && (
                  <p className="mt-3 text-gray-700">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <Link
                href="/listings/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                New Listing
              </Link>
            </div>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Listings Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : listings.length === 0 ? (
              <div className="py-12">
                {activeTab === 'active' ? (
                  <EmptyState
                    title="No active listings"
                    description="You don't have any active listings yet. Create your first listing to start selling!"
                    showCreateButton={true}
                  />
                ) : activeTab === 'sold' ? (
                  <div className="text-center">
                    <p className="text-gray-500">No sold items yet</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500">No inactive listings</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <ProfileListingCard
                    key={listing.id}
                    listing={listing}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {profile && (
        <EditProfileModal
          profile={profile}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
