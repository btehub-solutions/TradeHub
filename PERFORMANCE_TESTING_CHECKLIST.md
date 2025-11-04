# TradeHub Performance Testing & Deployment Checklist

## Pre-Deployment Checklist

### 1. Install Dependencies
```bash
npm install
```

Expected new packages:
- [x] @vercel/analytics
- [x] @vercel/speed-insights
- [x] next-pwa
- [x] sharp
- [x] @next/bundle-analyzer
- [x] webpack-bundle-analyzer

### 2. Generate PWA Icons

Create icons in `public/icons/` directory:
- [ ] icon-72x72.png
- [ ] icon-96x96.png
- [ ] icon-128x128.png
- [ ] icon-144x144.png
- [ ] icon-152x152.png
- [ ] icon-192x192.png
- [ ] icon-384x384.png
- [ ] icon-512x512.png

**Quick Generate Script:**
```bash
# Using ImageMagick (install first)
# Create a base logo.png (1024x1024) then run:
for size in 72 96 128 144 152 192 384 512; do
  convert logo.png -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done
```

Or use online tools:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

### 3. Environment Variables

Create/update `.env.local`:
```env
# App
NEXT_PUBLIC_APP_URL=https://tradehub.ng
NEXT_PUBLIC_SITE_URL=https://tradehub.ng

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 4. Build Test
```bash
npm run build
```

Expected output:
- ✓ No build errors
- ✓ Service worker files generated in `public/`
- ✓ Sitemap generated
- ✓ All routes compiled successfully

## Performance Testing

### Lighthouse Audit

#### Desktop
```bash
# Run in Chrome DevTools
# Target scores:
Performance: > 95
Accessibility: > 95
Best Practices: > 95
SEO: > 95
PWA: ✓ Installable
```

#### Mobile (3G Throttling)
```bash
# Chrome DevTools > Lighthouse
# Network: Slow 3G
# CPU: 4x slowdown
# Target scores:
Performance: > 90
Accessibility: > 95
Best Practices: > 95
SEO: > 95
PWA: ✓ Installable
```

### Core Web Vitals

Test on real devices in Nigeria (or simulate):

**Largest Contentful Paint (LCP)**
- [ ] Desktop: < 2.5s
- [ ] Mobile: < 2.5s
- [ ] 3G: < 4s (acceptable)

**First Input Delay (FID)**
- [ ] All devices: < 100ms

**Cumulative Layout Shift (CLS)**
- [ ] All devices: < 0.1

**First Contentful Paint (FCP)**
- [ ] Desktop: < 1.8s
- [ ] Mobile: < 1.8s
- [ ] 3G: < 3s

### Network Performance

#### 3G Testing
```bash
# Chrome DevTools > Network
# Throttling: Slow 3G
# Test:
```

- [ ] Homepage loads in < 3s
- [ ] Images load progressively
- [ ] Skeleton screens appear immediately
- [ ] Interactive in < 5s
- [ ] No layout shifts during load

#### Offline Testing
```bash
# Chrome DevTools > Application > Service Workers
# Check "Offline"
```

- [ ] Offline page displays correctly
- [ ] Previously viewed listings accessible
- [ ] Cached images load
- [ ] Clear messaging about offline state

### Bundle Size Analysis

```bash
npm run analyze
```

**Target Sizes:**
- [ ] First Load JS: < 200KB
- [ ] Total Bundle: < 500KB
- [ ] Largest Chunk: < 150KB

**Check for:**
- [ ] No duplicate dependencies
- [ ] Tree shaking working
- [ ] Code splitting effective
- [ ] Unused code removed

## PWA Testing

### Installation

#### Android (Chrome)
- [ ] Install prompt appears
- [ ] App installs successfully
- [ ] Icon appears on home screen
- [ ] Opens in standalone mode
- [ ] Splash screen displays
- [ ] Status bar color correct (#3b82f6)

#### iOS (Safari)
- [ ] "Add to Home Screen" works
- [ ] Icon appears correctly
- [ ] Opens in standalone mode
- [ ] No browser UI visible

#### Desktop (Chrome/Edge)
- [ ] Install button in address bar
- [ ] App window opens separately
- [ ] Window controls work
- [ ] App shortcuts functional

### Service Worker

```bash
# Chrome DevTools > Application > Service Workers
```

- [ ] Service worker registered
- [ ] Status: Activated and running
- [ ] Update on reload works
- [ ] Caching strategies working:
  - [ ] Images cached (CacheFirst)
  - [ ] API responses cached (StaleWhileRevalidate)
  - [ ] Static assets cached (CacheFirst)

### Manifest

```bash
# Chrome DevTools > Application > Manifest
```

- [ ] Manifest loads without errors
- [ ] All icons present and correct sizes
- [ ] Theme color matches (#3b82f6)
- [ ] Display mode: standalone
- [ ] Start URL correct
- [ ] Shortcuts configured

## Functionality Testing

### Image Optimization

- [ ] Cloudinary images load with transformations
- [ ] Blur placeholders appear
- [ ] Progressive loading works
- [ ] Lazy loading triggers correctly
- [ ] Fallback images work
- [ ] Different presets apply correctly:
  - [ ] Thumbnail (300x300)
  - [ ] Card (400x400)
  - [ ] Detail (800x800)

### Analytics

```bash
# Check browser console for analytics events
```

- [ ] Page views tracked
- [ ] Listing views tracked
- [ ] Search queries tracked
- [ ] Contact clicks tracked
- [ ] Errors tracked
- [ ] No console errors from analytics

### Loading States

- [ ] Root loading.tsx displays
- [ ] Main layout loading displays
- [ ] Listing detail loading displays
- [ ] Skeleton screens render correctly
- [ ] Smooth transitions to content

### Error Handling

Test error scenarios:
- [ ] Network error shows error page
- [ ] Invalid route shows 404
- [ ] API error shows error boundary
- [ ] Retry button works
- [ ] Error logged to analytics

## SEO Testing

### Metadata

Check each page type:
- [ ] Homepage has correct title/description
- [ ] Listing pages have dynamic titles
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs correct

### Sitemap

```bash
# Visit /sitemap.xml
```

- [ ] Sitemap generates successfully
- [ ] All listing URLs included
- [ ] Category URLs included
- [ ] Static pages included
- [ ] Last modified dates correct

### Robots.txt

```bash
# Visit /robots.txt
```

- [ ] File accessible
- [ ] Sitemap URL correct
- [ ] Disallow rules correct
- [ ] Crawl delay set

### Structured Data

- [ ] JSON-LD schema present (if implemented)
- [ ] Product schema on listings
- [ ] Organization schema on homepage
- [ ] Breadcrumbs schema

## Mobile Testing

### Devices to Test

**Android:**
- [ ] Samsung Galaxy (Chrome)
- [ ] Google Pixel (Chrome)
- [ ] Low-end device (< 2GB RAM)

**iOS:**
- [ ] iPhone (Safari)
- [ ] iPad (Safari)

### Touch Interactions

- [ ] All buttons easily tappable (44x44px min)
- [ ] Bottom navigation accessible
- [ ] Swipe gestures work (if any)
- [ ] No accidental taps
- [ ] Scroll performance smooth

### Viewport

- [ ] No horizontal scroll
- [ ] Content fits viewport
- [ ] Images responsive
- [ ] Text readable without zoom
- [ ] Forms usable

## Cross-Browser Testing

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

## Accessibility Testing

### Keyboard Navigation
- [ ] All interactive elements accessible
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] No keyboard traps

### Screen Readers
- [ ] Images have alt text
- [ ] Headings hierarchical
- [ ] ARIA labels where needed
- [ ] Forms properly labeled

### Color Contrast
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Interactive elements meet AA
- [ ] Error messages visible

## Security Testing

### Headers
```bash
# Check response headers
```

- [ ] CSP headers present
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set
- [ ] Referrer-Policy set

### HTTPS
- [ ] All resources loaded over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid

## Deployment Steps

### 1. Pre-Deploy
```bash
# Run all tests
npm run lint
npm run build
npm run analyze
```

### 2. Deploy to Vercel

```bash
vercel deploy --prod
```

Or connect GitHub repo for automatic deployments.

### 3. Set Environment Variables

In Vercel dashboard:
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

### 4. Post-Deploy Verification

- [ ] Site accessible at production URL
- [ ] HTTPS working
- [ ] PWA installable
- [ ] Analytics tracking
- [ ] Images loading from Cloudinary
- [ ] API routes working
- [ ] Database connections working

### 5. Monitor

First 24 hours:
- [ ] Check Vercel Analytics
- [ ] Monitor error rates
- [ ] Check Core Web Vitals
- [ ] Review user feedback

## Performance Benchmarks

### Target Metrics (Mobile 3G)

| Metric | Target | Acceptable |
|--------|--------|------------|
| First Load | < 3s | < 5s |
| LCP | < 2.5s | < 4s |
| FID | < 100ms | < 300ms |
| CLS | < 0.1 | < 0.25 |
| TTI | < 5s | < 7s |
| Bundle Size | < 200KB | < 300KB |

### Target Lighthouse Scores

| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | > 95 | > 90 |
| Accessibility | > 95 | > 95 |
| Best Practices | > 95 | > 95 |
| SEO | > 95 | > 95 |
| PWA | ✓ | ✓ |

## Troubleshooting

### Common Issues

**Service Worker Not Registering**
- Check HTTPS is enabled
- Verify manifest.json is accessible
- Clear browser cache
- Check console for errors

**Images Not Optimizing**
- Verify Cloudinary cloud name
- Check image URLs format
- Test with sample Cloudinary URL
- Review network tab for transformations

**PWA Not Installable**
- Verify manifest.json valid
- Check all required icons present
- Ensure HTTPS enabled
- Test install criteria in Lighthouse

**Slow Performance**
- Run bundle analyzer
- Check for large dependencies
- Verify image optimization
- Test caching strategies

## Sign-Off

Before going live, confirm:

- [ ] All tests passed
- [ ] Performance targets met
- [ ] PWA fully functional
- [ ] Analytics tracking
- [ ] SEO optimized
- [ ] Mobile tested
- [ ] Cross-browser tested
- [ ] Accessibility verified
- [ ] Security headers set
- [ ] Monitoring configured

**Deployed by:** _______________
**Date:** _______________
**Version:** _______________
**Lighthouse Score:** _______________
