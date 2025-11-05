# TradeHub Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Project Name**: TradeHub
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to Nigeria (e.g., Frankfurt or Singapore)
5. Click "Create new project" (takes ~2 minutes)

---

## Step 2: Get Your API Keys

Once your project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (keep this secret!)
```

---

## Step 3: Update Environment Variables

1. Open your `.env.local` file in the project root
2. Update with your Supabase credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key

# Cloudinary (optional for now)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 4: Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (in sidebar)
2. Click **New Query**
3. Copy the entire contents of `/supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run** (bottom right)

This will create:
- ✅ Tables: profiles, categories, listings, favorites, listing_views
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Default categories (Electronics, Fashion, etc.)
- ✅ Triggers for timestamps

---

## Step 5: Enable Email Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings:
   - **Enable Email Confirmations**: ON (for production)
   - For development, you can turn this OFF for easier testing

---

## Step 6: Verify Setup

Run these queries in SQL Editor to verify:

### Check Categories
```sql
SELECT * FROM categories;
```
Should return 8 categories.

### Check Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```
Should show: profiles, categories, listings, favorites, listing_views

---

## Step 7: Create Test Data (Optional)

You can add test listings manually or wait for users to create them.

### Create a Test User:
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password
4. User will be created

### Create Test Profile:
```sql
INSERT INTO profiles (id, phone_number, full_name, location, state)
VALUES (
  'USER_ID_FROM_AUTH_USERS',
  '+2348012345678',
  'Test User',
  'Lagos',
  'Lagos'
);
```

### Create Test Listing:
```sql
INSERT INTO listings (
  user_id, 
  title, 
  description, 
  price, 
  category_id, 
  condition, 
  location, 
  state,
  images,
  status
)
VALUES (
  'USER_ID_FROM_PROFILES',
  'iPhone 13 Pro Max',
  'Excellent condition, barely used. Comes with original box and accessories.',
  450000,
  (SELECT id FROM categories WHERE slug = 'phones'),
  'like_new',
  'Ikeja',
  'Lagos',
  ARRAY['https://via.placeholder.com/400'],
  'active'
);
```

---

## Step 8: Restart Dev Server

After setting up environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Troubleshooting

### "Error fetching listings"
- ✅ Check `.env.local` has correct Supabase URL and keys
- ✅ Verify database schema was run successfully
- ✅ Check RLS policies are enabled
- ✅ Restart dev server after changing `.env.local`

### "Unauthorized" errors
- ✅ Check SUPABASE_SERVICE_ROLE_KEY is set correctly
- ✅ Verify RLS policies allow public SELECT on listings

### No listings showing
- ✅ Database might be empty - create test listings
- ✅ Check listings have `status = 'active'`

---

## Quick Test Checklist

After setup, test these:

1. ✅ Homepage loads without errors
2. ✅ Click "Browse Listings" → `/listings` page loads
3. ✅ Click "Post an Ad" → redirects to login (if not logged in)
4. ✅ Sign up / Login works
5. ✅ After login, can access "Post Listing" page
6. ✅ Can create a new listing
7. ✅ New listing appears on Browse page
8. ✅ Search works on listings page

---

## Next Steps After Database Setup

1. **Set up Cloudinary** (for image uploads)
   - Go to [https://cloudinary.com](https://cloudinary.com)
   - Create free account
   - Get API credentials
   - Update `.env.local`

2. **Deploy to Vercel**
   - Push code to GitHub
   - Connect to Vercel
   - Add environment variables
   - Deploy!

---

## Need Help?

Check these files for reference:
- `/supabase/schema.sql` - Complete database schema
- `/supabase/migrations/` - Migration files
- `/.env.local.example` - Environment variable template
