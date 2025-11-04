# TradeHub - Deployment Guide

Complete step-by-step guide to deploy TradeHub to Vercel.

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Supabase account (sign up at https://supabase.com)
- [ ] Cloudinary account (sign up at https://cloudinary.com)
- [ ] Git installed locally
- [ ] Node.js 18+ installed

---

## Part 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: TradeHub
   - **Database Password**: (generate a strong password - save it!)
   - **Region**: Choose closest to Nigeria (e.g., Frankfurt or Singapore)
4. Click "Create new project"
5. Wait for project to be ready (~2 minutes)

### 1.2 Run Database Migrations

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute
5. Verify tables were created in **Table Editor**

Expected tables:
- `profiles`
- `categories`
- `listings`
- `listing_views`

### 1.3 Set Up Row Level Security (RLS)

1. In SQL Editor, create a new query
2. Copy and paste contents of `supabase/migrations/002_rls_policies.sql`
3. Run the query
4. Verify policies in **Authentication** > **Policies**

### 1.4 Configure Storage

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `listing-images`
3. Set it to **Public**
4. Copy and paste contents of `supabase/migrations/003_storage_buckets.sql` in SQL Editor
5. Run to set up storage policies

### 1.5 Enable Phone Authentication

1. Go to **Authentication** > **Providers**
2. Enable **Phone** provider
3. Choose a provider:
   - **Twilio** (recommended for production)
   - **MessageBird**
   - Or use Supabase's test OTP for development
4. Add provider credentials if using Twilio/MessageBird

### 1.6 Get API Keys

1. Go to **Project Settings** > **API**
2. Copy these values (you'll need them later):
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key**
   - **service_role key** (⚠️ Keep secret!)

---

## Part 2: Cloudinary Setup

### 2.1 Create Cloudinary Account

1. Go to https://cloudinary.com
2. Sign up for free account
3. Verify your email

### 2.2 Get API Credentials

1. Go to **Dashboard**
2. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2.3 Create Upload Preset

1. Go to **Settings** > **Upload**
2. Scroll to **Upload presets**
3. Click "Add upload preset"
4. Configure:
   - **Preset name**: `tradehub_listings`
   - **Signing Mode**: Unsigned
   - **Folder**: `tradehub/listings`
   - **Format**: Auto
   - **Quality**: Auto
5. Save

---

## Part 3: GitHub Setup

### 3.1 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository:
   - **Name**: `tradehub`
   - **Visibility**: Private (recommended) or Public
   - **Don't** initialize with README (we already have one)
3. Click "Create repository"

### 3.2 Push Code to GitHub

```bash
# Navigate to your project directory
cd c:\Users\THIS\Documents\TradeHub

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - TradeHub marketplace"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/tradehub.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Part 4: Vercel Deployment

### 4.1 Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." > "Project"
3. Click "Import" next to your GitHub repository
4. If not connected, click "Add GitHub Account" and authorize Vercel

### 4.2 Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (leave as is)
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `.next` (auto-filled)
5. **Install Command**: `npm install` (auto-filled)

### 4.3 Add Environment Variables

Click "Environment Variables" and add the following:

#### Required Variables

```env
# Application URLs
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tradehub_listings
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Important**: 
- Replace `your-domain` with your actual Vercel domain (you'll get this after deployment)
- You can update `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` after first deployment

### 4.4 Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL like `https://tradehub-xxxxx.vercel.app`

### 4.5 Update Environment Variables

1. Go to **Project Settings** > **Environment Variables**
2. Update these variables with your actual Vercel URL:
   ```env
   NEXT_PUBLIC_APP_URL=https://tradehub-xxxxx.vercel.app
   NEXT_PUBLIC_SITE_URL=https://tradehub-xxxxx.vercel.app
   ```
3. Click "Save"
4. Go to **Deployments** tab
5. Click "..." on latest deployment > "Redeploy"

---

## Part 5: Post-Deployment Configuration

### 5.1 Update Supabase Redirect URLs

1. Go to Supabase Dashboard > **Authentication** > **URL Configuration**
2. Add your Vercel URL to **Site URL**: `https://tradehub-xxxxx.vercel.app`
3. Add to **Redirect URLs**:
   ```
   https://tradehub-xxxxx.vercel.app/**
   https://tradehub-xxxxx.vercel.app/verify
   https://tradehub-xxxxx.vercel.app/complete-profile
   ```

### 5.2 Seed Initial Data

1. Go to Supabase Dashboard > **SQL Editor**
2. Run this query to add categories:

```sql
INSERT INTO categories (name, slug, icon, description) VALUES
('Electronics', 'electronics', '📱', 'Phones, laptops, tablets, and gadgets'),
('Vehicles', 'vehicles', '🚗', 'Cars, motorcycles, and auto parts'),
('Fashion', 'fashion', '👕', 'Clothing, shoes, and accessories'),
('Home & Garden', 'home-garden', '🏠', 'Furniture, appliances, and decor'),
('Real Estate', 'real-estate', '🏘️', 'Houses, land, and property'),
('Jobs', 'jobs', '💼', 'Job listings and opportunities'),
('Services', 'services', '🔧', 'Professional and personal services'),
('Sports & Fitness', 'sports-fitness', '⚽', 'Sports equipment and fitness gear'),
('Books & Media', 'books-media', '📚', 'Books, movies, music, and games'),
('Babies & Kids', 'babies-kids', '👶', 'Baby items and children products'),
('Pets', 'pets', '🐕', 'Pets and pet accessories'),
('Agriculture', 'agriculture', '🌾', 'Farm products and equipment'),
('Health & Beauty', 'health-beauty', '💄', 'Cosmetics and health products'),
('Business & Industry', 'business-industry', '🏭', 'Business equipment and supplies');
```

### 5.3 Configure Custom Domain (Optional)

1. In Vercel, go to **Project Settings** > **Domains**
2. Click "Add"
3. Enter your custom domain (e.g., `tradehub.ng`)
4. Follow DNS configuration instructions
5. Update environment variables with new domain

---

## Part 6: Testing Checklist

After deployment, test these features:

### Authentication Flow
- [ ] Visit your site
- [ ] Click "Sign In"
- [ ] Enter Nigerian phone number (format: 08012345678)
- [ ] Receive OTP (check phone or use test OTP if configured)
- [ ] Enter OTP and verify
- [ ] Complete profile with name and location
- [ ] Successfully logged in

### Listing Creation
- [ ] Click "Post Listing" or "Post an Ad"
- [ ] Fill in listing details:
  - Title
  - Description
  - Price
  - Category
  - Condition
  - Location
- [ ] Upload 1-5 images
- [ ] Submit listing
- [ ] Listing appears on homepage

### Browse & Search
- [ ] Homepage loads with categories
- [ ] Click on a category
- [ ] Listings filter correctly
- [ ] Search bar works
- [ ] Filters work (price, location, condition)
- [ ] Sort options work

### Listing Details
- [ ] Click on a listing
- [ ] All details display correctly
- [ ] Images load and gallery works
- [ ] Contact seller button works (WhatsApp link)
- [ ] Seller info displays

### Profile Management
- [ ] Go to profile page
- [ ] View your listings
- [ ] Edit a listing
- [ ] Delete a listing
- [ ] Edit profile information

### Mobile Responsiveness
- [ ] Test on mobile device or DevTools mobile view
- [ ] Bottom navigation works
- [ ] All pages are responsive
- [ ] Images load properly
- [ ] Forms are usable

---

## Part 7: Monitoring & Maintenance

### 7.1 Set Up Monitoring

1. **Vercel Analytics**: Automatically enabled
2. **Vercel Speed Insights**: Automatically enabled
3. **Supabase Logs**: Check **Logs** tab in Supabase dashboard
4. **Error Tracking**: Monitor **Deployments** > **Functions** logs in Vercel

### 7.2 Database Backups

1. Go to Supabase Dashboard > **Database** > **Backups**
2. Enable automatic daily backups
3. Download manual backup before major changes

### 7.3 Monitor Usage

- **Vercel**: Check **Analytics** and **Usage** tabs
- **Supabase**: Monitor **Database** > **Usage**
- **Cloudinary**: Check **Dashboard** for storage and bandwidth

---

## Troubleshooting

### Build Fails

**Issue**: Build fails on Vercel

**Solutions**:
1. Check build logs in Vercel deployment
2. Ensure all environment variables are set
3. Try building locally: `npm run build`
4. Check `ERROR_FIXES.md` for common issues

### Authentication Not Working

**Issue**: Can't log in or receive OTP

**Solutions**:
1. Verify Supabase phone auth is enabled
2. Check redirect URLs in Supabase settings
3. Verify environment variables are correct
4. Check Supabase logs for errors

### Images Not Uploading

**Issue**: Image upload fails

**Solutions**:
1. Verify Cloudinary credentials
2. Check upload preset is "unsigned"
3. Verify CORS settings in Cloudinary
4. Check browser console for errors

### Database Errors

**Issue**: Can't fetch or save data

**Solutions**:
1. Verify RLS policies are set up
2. Check Supabase service role key
3. Test queries in Supabase SQL Editor
4. Check network tab for API errors

---

## Rollback Procedures

### Rollback Deployment

1. Go to Vercel **Deployments** tab
2. Find previous working deployment
3. Click "..." > "Promote to Production"

### Rollback Database

1. Go to Supabase **Database** > **Backups**
2. Select backup point
3. Click "Restore"
4. Confirm restoration

---

## Performance Optimization

### Enable Caching

Already configured in `vercel.json` and `next.config.mjs`:
- Static assets: 1 year cache
- API routes: 60s cache with stale-while-revalidate
- Images: Optimized with Next.js Image component

### CDN Configuration

Vercel automatically uses Edge Network for:
- Static files
- API routes
- Server-rendered pages

### Database Optimization

1. Add indexes for frequently queried fields
2. Use Supabase connection pooling
3. Monitor slow queries in Supabase dashboard

---

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] Service role key is kept secret
- [ ] RLS policies are enabled on all tables
- [ ] CORS is configured properly
- [ ] HTTPS is enforced (automatic on Vercel)
- [ ] Security headers are set (in `vercel.json`)
- [ ] Input validation is in place
- [ ] File upload limits are enforced

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

## Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema migrated
- [ ] RLS policies enabled
- [ ] Phone authentication configured
- [ ] Cloudinary account set up
- [ ] Upload preset created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Environment variables updated with Vercel URL
- [ ] Redeployed with correct URLs
- [ ] Supabase redirect URLs updated
- [ ] Initial categories seeded
- [ ] All features tested
- [ ] Mobile responsiveness verified
- [ ] Performance checked
- [ ] Monitoring enabled

---

**Congratulations! Your TradeHub marketplace is now live! 🎉**

For any issues, refer to `ERROR_FIXES.md` or check the troubleshooting section above.
