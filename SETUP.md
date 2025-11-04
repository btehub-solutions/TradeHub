# TradeHub Setup Guide

Complete setup instructions for the TradeHub marketplace platform.

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- Cloudinary account
- Git (optional)

## 1. Install Dependencies

```bash
npm install
```

## 2. Supabase Setup

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish setting up

### Run Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL to create all tables, policies, and functions

### Enable Phone Authentication

1. Go to Authentication → Providers in Supabase dashboard
2. Enable "Phone" provider
3. Configure your SMS provider (Twilio recommended for Nigeria)
4. Add your Twilio credentials

### Create Storage Bucket (Optional)

If you want to use Supabase Storage instead of Cloudinary:
1. Go to Storage in Supabase dashboard
2. Create a new bucket named `listings`
3. Set it to public

## 3. Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Settings → Upload
3. Create an upload preset named `tradehub_preset`
4. Set it to "Unsigned"
5. Note your Cloud Name from the dashboard

## 4. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Where to Find Supabase Credentials

1. Go to Project Settings → API
2. Copy the Project URL → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy the service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### Where to Find Cloudinary Credentials

1. Go to Dashboard
2. Copy Cloud Name → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
3. Copy API Key → `CLOUDINARY_API_KEY`
4. Copy API Secret → `CLOUDINARY_API_SECRET`

## 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 6. Test the Application

### Test Authentication
1. Go to `/login`
2. Enter a Nigerian phone number (format: 08012345678)
3. You should receive an OTP via SMS
4. Enter the OTP to complete login

### Test Listing Creation
1. After logging in, click "Post an Ad"
2. Fill in the listing details
3. Upload images (max 5)
4. Submit the listing

### Test Browsing
1. Go to `/listings`
2. Use filters to search by category, location, price, etc.
3. Click on a listing to view details

## 7. Deploy to Vercel

### Prepare for Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables in Vercel dashboard
5. Deploy

### Update Environment Variables

After deployment, update `NEXT_PUBLIC_APP_URL` to your production URL:
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Troubleshooting

### Phone Authentication Not Working

- Verify Twilio credentials in Supabase
- Check that phone numbers are in correct format (+234...)
- Ensure SMS provider is properly configured

### Images Not Uploading

- Verify Cloudinary upload preset is set to "Unsigned"
- Check that Cloud Name is correct
- Ensure CORS is enabled in Cloudinary settings

### Database Errors

- Verify all SQL migrations ran successfully
- Check Row Level Security policies are enabled
- Ensure user is authenticated before accessing protected routes

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check for TypeScript errors: `npm run lint`

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema deployed to production Supabase
- [ ] Phone authentication configured with production SMS provider
- [ ] Cloudinary production credentials configured
- [ ] Custom domain configured (optional)
- [ ] Google verification code added to metadata
- [ ] Analytics setup (optional)
- [ ] Error monitoring setup (optional)

## Performance Optimization

The app is already optimized for Nigerian mobile users:

- **Image Optimization**: Cloudinary auto-formats to WebP/AVIF
- **Mobile-First**: Responsive design prioritizes mobile
- **Code Splitting**: Next.js automatically splits code
- **Lazy Loading**: Images load on demand
- **Caching**: Static pages cached at edge

## Support

For issues or questions:
- Check the README.md
- Review Supabase documentation
- Check Next.js 15 documentation
- Review Cloudinary documentation
