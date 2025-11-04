# TradeHub Supabase Database Setup

## Overview

This directory contains the database schema and migration scripts for the TradeHub marketplace application.

## Database Schema

### Tables

#### 1. **profiles**
Extends Supabase `auth.users` with additional user information.

```sql
- id (uuid, references auth.users)
- phone_number (text, unique, required)
- full_name (text)
- avatar_url (text)
- location (text)
- state (text)
- bio (text)
- whatsapp_number (text)
- created_at (timestamp)
- updated_at (timestamp)
```

#### 2. **categories**
Product categories for organizing listings.

```sql
- id (uuid, primary key)
- name (text, unique, required)
- slug (text, unique, required)
- description (text)
- icon (text) - for emoji/icon reference
- created_at (timestamp)
```

#### 3. **listings**
Main marketplace listings table.

```sql
- id (uuid, primary key)
- user_id (uuid, references profiles.id)
- title (text, required)
- description (text, required)
- price (numeric, required)
- category_id (uuid, references categories.id)
- condition (enum: new, like_new, good, fair, poor)
- location (text, required)
- state (text, required)
- images (text[]) - array of Cloudinary URLs
- status (enum: active, sold, inactive)
- views (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
```

#### 4. **favorites**
User's saved/favorited listings.

```sql
- id (uuid, primary key)
- user_id (uuid, references profiles.id)
- listing_id (uuid, references listings.id)
- created_at (timestamp)
- UNIQUE(user_id, listing_id)
```

#### 5. **listing_views**
Analytics table for tracking listing views.

```sql
- id (uuid, primary key)
- listing_id (uuid, references listings.id)
- viewer_id (uuid, nullable, references profiles.id)
- viewed_at (timestamp)
```

## Row Level Security (RLS) Policies

### Profiles
- ✅ **SELECT**: Public - all profiles are viewable by everyone
- ✅ **INSERT**: Users can create their own profile
- ✅ **UPDATE**: Users can only update their own profile

### Listings
- ✅ **SELECT**: Public - all listings are viewable by everyone
- ✅ **INSERT**: Authenticated users can create listings
- ✅ **UPDATE**: Users can only update their own listings
- ✅ **DELETE**: Users can only delete their own listings

### Favorites
- ✅ **SELECT**: Users can only view their own favorites
- ✅ **INSERT**: Users can only create their own favorites
- ✅ **DELETE**: Users can only delete their own favorites

### Listing Views
- ✅ **INSERT**: Anyone can create listing views (for analytics)
- ✅ **SELECT**: Listing owners can view analytics for their listings

## Indexes

Performance indexes are created on:
- `listings.user_id`
- `listings.category_id`
- `listings.status`
- `listings.created_at`
- `listings.state`
- `listings.price`
- `favorites.user_id`
- `favorites.listing_id`
- `listing_views.listing_id`
- `listing_views.viewer_id`
- `listing_views.viewed_at`
- Full-text search on `listings.title` and `listings.description`

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Migration

Execute the SQL migration script in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `schema.sql`
4. Paste and run the script

Alternatively, use the Supabase CLI:

```bash
supabase db push
```

### 4. Verify Setup

After running the migration, verify:

1. All tables are created
2. RLS policies are enabled
3. Indexes are created
4. Default categories are inserted

## Default Categories

The migration includes these default categories:
- Electronics
- Fashion
- Furniture
- Phones
- Vehicles
- Home & Garden
- Sports
- Books

## Helper Functions

### Client-Side (`/lib/supabase/client.ts`)

- `createClient()` - Create browser Supabase client
- `getCurrentUserProfile()` - Get current user's profile
- `trackListingView(listingId, viewerId?)` - Track listing view
- `getListingWithProfile(listingId)` - Get listing with user and category data
- `getUserListings(userId)` - Get all listings by user
- `getActiveListings(filters?)` - Get active listings with optional filters

### Server-Side (`/lib/supabase/server.ts`)

- `createClient()` - Create server Supabase client
- `getCurrentUser()` - Get current authenticated user
- `getCurrentUserProfile()` - Get current user's profile
- `getCategories()` - Get all categories
- `getListingAnalytics(listingId)` - Get view analytics for a listing
- `upsertProfile(profileData)` - Create or update profile
- `createListing(listingData)` - Create new listing
- `updateListing(listingId, listingData)` - Update listing
- `deleteListing(listingId)` - Delete listing

## TypeScript Types

Database types are automatically generated in `/types/database.ts` and provide full type safety for:
- Table row types
- Insert types
- Update types
- Function types

## Database Functions

### `increment_listing_views(listing_id UUID)`

Increments the view count for a listing. Called automatically when tracking views.

### `update_updated_at_column()`

Trigger function that automatically updates the `updated_at` timestamp on profile and listing updates.

## Security Considerations

1. **RLS Enabled**: All tables have Row Level Security enabled
2. **Auth Required**: Most write operations require authentication
3. **Owner Verification**: Users can only modify their own data
4. **Public Reads**: Listings and profiles are publicly readable for marketplace functionality
5. **Analytics Privacy**: Only listing owners can view their analytics data

## Maintenance

### Adding New Categories

```sql
INSERT INTO categories (name, slug, description, icon)
VALUES ('Category Name', 'category-slug', 'Description', '📱');
```

### Backing Up Data

Use Supabase's built-in backup features or export via:

```bash
supabase db dump > backup.sql
```

## Troubleshooting

### RLS Policies Not Working

Ensure you're authenticated and the policies are enabled:

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Migration Errors

If you encounter errors during migration:

1. Check if tables already exist
2. Verify foreign key references
3. Ensure UUID extension is enabled
4. Check for unique constraint violations

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
