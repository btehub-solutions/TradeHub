# TradeHub PWA & Performance Optimization - Installation Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all new packages including:
- `@vercel/analytics` - Analytics tracking
- `@vercel/speed-insights` - Performance monitoring
- `next-pwa` - PWA functionality
- `sharp` - Image optimization
- `@next/bundle-analyzer` - Bundle size analysis

### 2. Generate PWA Icons

You need to create app icons before the PWA will work properly. Create these files in `public/icons/`:

**Required icon sizes:**
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

**Quick generation using ImageMagick:**

```bash
# Install ImageMagick first, then:
cd public/icons

# Create from a 1024x1024 logo.png
for size in 72 96 128 144 152 192 384 512; do
  magick convert ../../logo.png -resize ${size}x${size} icon-${size}x${size}.png
done
```

**Or use online tools:**
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- https://favicon.io/

### 3. Environment Variables

Create or update `.env.local`:

```env
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudinary (for image optimization)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

For production, update URLs to your actual domain.

### 4. Build and Test

```bash
# Development (PWA disabled in dev mode)
npm run dev

# Production build
npm run build
npm start

# Test on https://localhost:3000 or deploy to test PWA features
```

## What's Been Added

### New Files

**Utilities:**
- `lib/utils/image.ts` - Image optimization utilities
- `lib/analytics/track.ts` - Analytics tracking
- `lib/utils/dynamic-imports.tsx` - Code splitting helpers

**Components:**
- `components/ui/optimized-image.tsx` - Optimized image component
- `components/ui/skeleton.tsx` - Loading skeletons
- `components/providers/analytics-provider.tsx` - Analytics provider

**Routes:**
- `app/loading.tsx` - Root loading state
- `app/error.tsx` - Global error handler
- `app/offline/page.tsx` - Offline fallback page
- `app/(main)/loading.tsx` - Main layout loading
- `app/(main)/listings/[id]/loading.tsx` - Detail loading
- `app/sitemap.ts` - Dynamic sitemap generation

**PWA Files:**
- `public/manifest.json` - PWA manifest
- `public/robots.txt` - SEO robots file
- `public/icons/` - App icons directory

**Documentation:**
- `PWA_OPTIMIZATION_GUIDE.md` - Complete optimization guide
- `PERFORMANCE_TESTING_CHECKLIST.md` - Testing checklist
- `INSTALLATION_PWA.md` - This file

### Modified Files

- `package.json` - Added new dependencies and scripts
- `next.config.mjs` - PWA configuration, caching, optimization
- `app/layout.tsx` - Analytics, PWA metadata, viewport config
- `components/listings/ListingCard.tsx` - Uses OptimizedImage

## Features

### ✅ Image Optimization
- Cloudinary transformations
- Automatic format selection (WebP/AVIF)
- Lazy loading with blur placeholders
- Responsive images
- Multiple size presets

### ✅ Progressive Web App
- Installable on mobile and desktop
- Offline support
- Service worker caching
- App-like experience
- Fast loading

### ✅ Performance
- Code splitting
- Dynamic imports
- Route prefetching
- Bundle optimization
- Caching strategies

### ✅ Analytics
- Page view tracking
- Event tracking
- Error monitoring
- Performance metrics
- Vercel Analytics integration

### ✅ SEO
- Dynamic sitemap
- Robots.txt
- Meta tags
- Open Graph
- Structured data ready

### ✅ Loading States
- Route-level loading
- Skeleton screens
- Progressive loading
- Smooth transitions

### ✅ Error Handling
- Error boundaries
- Friendly error messages
- Automatic error tracking
- Retry functionality

## Testing

### 1. Development Testing

```bash
npm run dev
```

Visit http://localhost:3000

**Note:** PWA features are disabled in development mode.

### 2. Production Testing

```bash
npm run build
npm start
```

Visit http://localhost:3000

### 3. PWA Testing

To test PWA features locally:

1. **Use HTTPS:** PWA requires HTTPS (or localhost)
2. **Build for production:** `npm run build && npm start`
3. **Open DevTools:** Chrome > Application tab
4. **Check:**
   - Service Worker registered
   - Manifest loaded
   - Install prompt available

### 4. Performance Testing

```bash
# Run Lighthouse in Chrome DevTools
# Or use:
npx lighthouse http://localhost:3000 --view
```

### 5. Bundle Analysis

```bash
npm run analyze
```

Opens bundle analyzer in browser.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

Or connect your GitHub repo for automatic deployments.

### Environment Variables in Vercel

Set these in your Vercel project settings:

```
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Post-Deployment

1. Visit your site
2. Check PWA installability
3. Test offline functionality
4. Verify analytics tracking
5. Run Lighthouse audit

## Usage Examples

### Using Optimized Images

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

<OptimizedImage
  src={imageUrl}
  alt="Product"
  preset="card"
  fill
  sizes="(max-width: 640px) 100vw, 50vw"
/>
```

### Tracking Events

```tsx
import { trackListingView, trackSearchQuery } from '@/lib/analytics/track';

// Track listing view
trackListingView(listingId, title, category, price);

// Track search
trackSearchQuery(query, resultsCount);
```

### Dynamic Imports

```tsx
import { DynamicCreateListingForm } from '@/lib/utils/dynamic-imports';

// Component loads only when needed
{showForm && <DynamicCreateListingForm />}
```

### Image Utilities

```tsx
import { getOptimizedImageUrl, getBlurDataUrl } from '@/lib/utils/image';

// Get optimized URL
const optimizedUrl = getOptimizedImageUrl(imageUrl, 'thumbnail');

// Get blur placeholder
const blurUrl = getBlurDataUrl(imageUrl);
```

## Troubleshooting

### Icons Not Showing

**Problem:** PWA icons not displaying

**Solution:**
1. Ensure all icon files exist in `public/icons/`
2. Check file names match manifest.json
3. Clear browser cache
4. Rebuild: `npm run build`

### Service Worker Not Registering

**Problem:** PWA not installable

**Solution:**
1. Ensure you're using HTTPS (or localhost)
2. Check manifest.json is accessible: `/manifest.json`
3. Verify icons exist
4. Check browser console for errors
5. Clear site data in DevTools

### Images Not Optimizing

**Problem:** Images loading slowly

**Solution:**
1. Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
2. Check image URLs are Cloudinary URLs
3. Test with a sample Cloudinary image
4. Check network tab for transformation parameters

### Build Errors

**Problem:** Build fails

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Analytics Not Tracking

**Problem:** Events not showing in Vercel Analytics

**Solution:**
1. Ensure `@vercel/analytics` is installed
2. Check Analytics is enabled in Vercel dashboard
3. Verify production deployment
4. Check browser console for errors
5. Wait a few minutes for data to appear

## Performance Targets

### Mobile (3G Network)
- First Load: < 3s
- Time to Interactive: < 5s
- Lighthouse Performance: > 85

### Desktop
- First Load: < 1.5s
- Time to Interactive: < 2.5s
- Lighthouse Performance: > 95

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## Next Steps

1. **Generate Icons:** Create all required PWA icons
2. **Test Locally:** Build and test in production mode
3. **Deploy:** Deploy to Vercel or your hosting platform
4. **Monitor:** Check analytics and performance metrics
5. **Optimize:** Use bundle analyzer to identify improvements

## Support

For issues or questions:
1. Check the documentation files
2. Review the testing checklist
3. Check browser console for errors
4. Review Vercel deployment logs

## Additional Resources

- [PWA Optimization Guide](./PWA_OPTIMIZATION_GUIDE.md)
- [Performance Testing Checklist](./PERFORMANCE_TESTING_CHECKLIST.md)
- [Next.js PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Web.dev Performance](https://web.dev/performance/)
