# TradeHub PWA & Performance Optimization Guide

## Overview

TradeHub has been optimized for performance and converted to a Progressive Web App (PWA) with a focus on Nigerian mobile networks and 3G performance.

## 🚀 Performance Optimizations Implemented

### 1. Image Optimization

#### Cloudinary Integration
- **Automatic format selection**: WebP/AVIF for modern browsers, JPEG fallback
- **Quality optimization**: `q_auto` for automatic quality adjustment
- **Responsive images**: Multiple sizes generated automatically
- **Lazy loading**: Images load as they enter viewport
- **Blur placeholders**: Low-quality placeholders for better perceived performance

#### Image Presets
```typescript
- thumbnail: 300x300, fill, q_auto
- card: 400x400, fill, q_80
- detail: 800x800, fit, q_auto
- hero: 1200x600, fill, q_85
- avatar: 150x150, thumb, q_auto
```

#### Usage
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

### 2. Progressive Web App (PWA)

#### Features
- ✅ Installable on mobile and desktop
- ✅ Offline support with fallback page
- ✅ App-like experience (standalone mode)
- ✅ Fast loading with service worker caching
- ✅ Background sync for failed requests
- ✅ Push notifications ready (infrastructure in place)

#### Caching Strategy

**Static Assets** (CacheFirst)
- Images: 30 days
- Fonts: 1 year
- Next.js static files: 1 year

**API Routes** (StaleWhileRevalidate)
- Listings: 5 minutes
- Categories: 24 hours

**User Data** (NetworkFirst)
- Profile: 1 hour
- Supabase data: 24 hours

### 3. Loading States

#### Route-Level Loading
- `app/loading.tsx` - Root loading state
- `app/(main)/loading.tsx` - Main layout loading
- `app/(main)/listings/[id]/loading.tsx` - Detail page loading

#### Component-Level Loading
- Skeleton screens for listings grid
- Shimmer effects for text content
- Progressive image loading with blur-up

### 4. Error Handling

#### Error Boundaries
- `app/error.tsx` - Global error handler
- Automatic error tracking to analytics
- User-friendly error messages
- Retry functionality

#### Offline Support
- `app/offline/page.tsx` - Dedicated offline page
- Cached content available offline
- Clear messaging about offline capabilities

### 5. Analytics & Monitoring

#### Tracked Events
- `listing_view` - When user views a listing
- `listing_created` - When user creates a listing
- `contact_seller_click` - When user clicks contact
- `search_query` - Search queries with results count
- `filter_applied` - Filter usage
- `image_upload` - Image upload metrics
- `error_occurred` - Error tracking

#### Usage
```typescript
import { trackListingView, trackSearchQuery } from '@/lib/analytics/track';

// Track listing view
trackListingView(listingId, listingTitle, category, price);

// Track search
trackSearchQuery(query, resultsCount, filters);
```

#### Performance Monitoring
- Vercel Analytics for page views
- Speed Insights for Core Web Vitals
- Custom performance tracking for:
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID)
  - Cumulative Layout Shift (CLS)

### 6. SEO Optimizations

#### Metadata
- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD) ready

#### Sitemap & Robots
- `app/sitemap.ts` - Dynamic sitemap generation
- `public/robots.txt` - Search engine directives
- Automatic listing URLs in sitemap
- Category pages indexed

#### Performance
- Preconnect to Cloudinary CDN
- DNS prefetch for external resources
- Optimized font loading with `display: swap`

### 7. Bundle Optimization

#### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Tree shaking enabled

#### Compression
- Brotli compression enabled
- Gzip fallback
- Minified CSS and JS

#### Analysis
```bash
npm run analyze
```

### 8. Mobile Optimization

#### Network Considerations
- Target: < 3s initial load on 3G
- Image compression optimized for slow networks
- Stale-while-revalidate for better perceived performance
- Reduced JavaScript bundle size

#### UI/UX
- Touch-friendly tap targets (min 44x44px)
- Bottom navigation for easy thumb access
- Responsive images with appropriate sizes
- Reduced motion support for accessibility

## 📱 Installation

### Prerequisites
```bash
npm install
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_APP_URL=https://tradehub.ng
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Bundle Analysis
```bash
npm run analyze
```

## 🎨 PWA Icons

Generate icons in the following sizes and place in `public/icons/`:
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

Use tools like:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## 🧪 Testing Checklist

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (PWA)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1

### PWA
- [ ] Installable on mobile (iOS/Android)
- [ ] Installable on desktop (Chrome/Edge)
- [ ] Works offline (shows offline page)
- [ ] Service worker registered
- [ ] Manifest.json valid
- [ ] Icons display correctly

### Mobile
- [ ] Works on 3G network
- [ ] Images load progressively
- [ ] Touch targets are adequate
- [ ] Bottom nav accessible
- [ ] No horizontal scroll

### Cross-Browser
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 📊 Performance Monitoring

### Vercel Analytics
Automatically tracks:
- Page views
- User sessions
- Geographic distribution
- Device types

### Custom Events
Track custom events in your components:
```typescript
import { trackEvent } from '@/lib/analytics/track';

trackEvent('custom_event', {
  property1: 'value1',
  property2: 'value2',
});
```

## 🔧 Configuration Files

### next.config.mjs
- PWA configuration with next-pwa
- Image optimization settings
- Caching headers
- Bundle optimization

### manifest.json
- App metadata
- Icons configuration
- Display mode (standalone)
- Theme colors
- Shortcuts

### robots.txt
- Search engine directives
- Sitemap location
- Crawl delay settings

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

Environment variables to set:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Other Platforms
Ensure the following:
1. Node.js 18+ runtime
2. Build command: `npm run build`
3. Start command: `npm start`
4. Environment variables configured

## 📈 Performance Targets

### Mobile (3G)
- First Load: < 3s
- Time to Interactive: < 5s
- Lighthouse Performance: > 85

### Desktop
- First Load: < 1.5s
- Time to Interactive: < 2.5s
- Lighthouse Performance: > 95

### Core Web Vitals
- LCP: < 2.5s (Good)
- FID: < 100ms (Good)
- CLS: < 0.1 (Good)

## 🛠️ Troubleshooting

### Service Worker Issues
```bash
# Clear service worker cache
# In browser DevTools > Application > Service Workers > Unregister
```

### Image Optimization Issues
- Verify Cloudinary cloud name is correct
- Check image URLs are properly formatted
- Ensure images are publicly accessible

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Additional Resources

- [Next.js PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [Cloudinary Image Optimization](https://cloudinary.com/documentation/image_optimization)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

## 🎯 Future Enhancements

- [ ] Push notifications for new messages
- [ ] Background sync for offline actions
- [ ] Advanced caching strategies
- [ ] Image upload compression on client
- [ ] WebP/AVIF generation on upload
- [ ] Service worker updates notification
- [ ] App shortcuts for common actions
- [ ] Share target API integration

## 📝 Notes

- PWA features are disabled in development mode
- Service worker only works on HTTPS (or localhost)
- Icons must be generated before deployment
- Analytics requires npm install after package.json update
- Test on real devices for accurate performance metrics
