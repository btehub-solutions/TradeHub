# Cross-Browser & Performance Testing Guide

## 🌐 Cross-Browser Testing Matrix

### Desktop Browsers

| Browser | Version | Priority | Status | Notes |
|---------|---------|----------|--------|-------|
| Chrome | Latest | High | ⬜ | Primary browser |
| Firefox | Latest | Medium | ⬜ | |
| Edge | Latest | Medium | ⬜ | Chromium-based |
| Safari | Latest | Low | ⬜ | macOS only |

### Mobile Browsers

| Browser | OS | Device | Priority | Status | Notes |
|---------|-----|--------|----------|--------|-------|
| Chrome | Android 11+ | Real device | **Critical** | ⬜ | Primary target |
| Chrome | Android 9-10 | Real device | High | ⬜ | Older devices |
| Safari | iOS 14+ | Real device | **Critical** | ⬜ | iPhone users |
| Safari | iOS 12-13 | Real device | Medium | ⬜ | Older iPhones |
| Firefox | Android | Real device | Low | ⬜ | Small user base |
| Samsung Internet | Android | Real device | Medium | ⬜ | Popular in Nigeria |

---

## 📱 Device Testing Requirements

### Minimum Test Devices

#### Android Devices (Priority)
- [ ] **Budget Android** (2GB RAM, Android 9-10)
  - Example: Tecno Spark, Infinix Hot series
  - Test on actual Nigerian market devices
- [ ] **Mid-range Android** (4GB RAM, Android 11-12)
  - Example: Samsung Galaxy A series, Redmi Note
- [ ] **Flagship Android** (6GB+ RAM, Android 13+)
  - Example: Samsung Galaxy S series, Google Pixel

#### iOS Devices
- [ ] **iPhone SE/8** (older, smaller screen)
- [ ] **iPhone 11/12** (standard size)
- [ ] **iPhone 13/14 Pro Max** (large screen)

#### Tablets (Optional)
- [ ] Android tablet (10")
- [ ] iPad (10.2" or larger)

### Screen Sizes to Test
- [ ] 320px (iPhone SE portrait)
- [ ] 375px (iPhone 12/13 portrait)
- [ ] 414px (iPhone Pro Max portrait)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 1366px (Laptop)
- [ ] 1920px (Desktop)

---

## 🔍 Browser-Specific Testing Checklist

### Chrome (Android) - CRITICAL
- [ ] Test on Chrome 100+
- [ ] Verify PWA install prompt
- [ ] Test "Add to Home Screen"
- [ ] Test service worker caching
- [ ] Verify push notifications (if implemented)
- [ ] Test camera access for image upload
- [ ] Test WhatsApp integration
- [ ] Test phone call links
- [ ] Verify autofill works
- [ ] Test Chrome DevTools mobile emulation
- [ ] Test Chrome Lighthouse audit

### Safari (iOS) - CRITICAL
- [ ] Test on Safari 14+
- [ ] Verify PWA install (Add to Home Screen)
- [ ] Test iOS-specific gestures (swipe back)
- [ ] Test camera/photo library access
- [ ] Test WhatsApp integration
- [ ] Test phone call links (tel: links)
- [ ] Verify date/time pickers work
- [ ] Test iOS keyboard behavior
- [ ] Check for iOS-specific bugs (viewport, scroll)
- [ ] Test in both portrait and landscape
- [ ] Verify no horizontal scroll issues

### Firefox (Desktop/Mobile)
- [ ] Test on Firefox 100+
- [ ] Verify all CSS features work
- [ ] Test image uploads
- [ ] Test form validation
- [ ] Check console for errors
- [ ] Verify PWA features (limited support)

### Edge (Desktop)
- [ ] Test on Edge 100+ (Chromium)
- [ ] Verify compatibility (should match Chrome)
- [ ] Test PWA install
- [ ] Check for Edge-specific issues

### Samsung Internet (Android)
- [ ] Test on Samsung Internet 15+
- [ ] Verify PWA support
- [ ] Test image uploads
- [ ] Test video playback (if applicable)
- [ ] Check for Samsung-specific bugs

---

## ⚡ Performance Testing

### Lighthouse Audit (Target: 90+)

#### Run Lighthouse in Chrome DevTools
```bash
# Or use CLI
npm install -g lighthouse
lighthouse https://your-tradehub-url.com --view
```

#### Performance Metrics Targets
- [ ] **Performance Score:** ≥ 90
- [ ] **First Contentful Paint (FCP):** < 1.8s
- [ ] **Largest Contentful Paint (LCP):** < 2.5s
- [ ] **Time to Interactive (TTI):** < 3.8s
- [ ] **Total Blocking Time (TBT):** < 300ms
- [ ] **Cumulative Layout Shift (CLS):** < 0.1
- [ ] **Speed Index:** < 3.4s

#### Other Lighthouse Scores
- [ ] **Accessibility:** ≥ 90
- [ ] **Best Practices:** ≥ 90
- [ ] **SEO:** ≥ 90
- [ ] **PWA:** ≥ 90 (if applicable)

### Page Load Performance

#### Homepage
- [ ] Initial load time < 3s (3G)
- [ ] Initial load time < 1.5s (4G)
- [ ] Time to first listing visible < 2s
- [ ] Images load progressively
- [ ] Skeleton/loading states display

#### Listing Detail Page
- [ ] Page load time < 2s (4G)
- [ ] Hero image loads first
- [ ] Other images lazy load
- [ ] Contact buttons immediately interactive

#### Create Listing Page
- [ ] Form loads instantly
- [ ] Image upload responsive
- [ ] Form submission < 2s (excluding image upload)

### Image Performance

#### Image Optimization
- [ ] All images compressed (use WebP)
- [ ] Images responsive (srcset)
- [ ] Images lazy loaded (below fold)
- [ ] Placeholder/blur-up effect
- [ ] Maximum image size enforced (5MB)
- [ ] Images served from CDN (Supabase Storage)

#### Image Loading Times
- [ ] Thumbnail loads < 500ms
- [ ] Full image loads < 2s (4G)
- [ ] Multiple images load progressively
- [ ] Failed images show placeholder

### Bundle Size Analysis

#### Check Bundle Sizes
```bash
# Build production bundle
npm run build

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

#### Bundle Size Targets
- [ ] **Total JS:** < 300KB (gzipped)
- [ ] **Total CSS:** < 50KB (gzipped)
- [ ] **First Load JS:** < 200KB
- [ ] **Shared chunks:** Properly split
- [ ] **Vendor chunks:** Optimized

#### Code Splitting
- [ ] Route-based code splitting
- [ ] Component lazy loading
- [ ] Dynamic imports for heavy components
- [ ] Tree shaking enabled
- [ ] Unused code removed

---

## 🐌 Network Testing

### 3G Network Simulation

#### Chrome DevTools Throttling
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Select "Slow 3G" or "Fast 3G"
4. Test all critical flows

#### 3G Performance Targets
- [ ] Homepage loads < 5s
- [ ] Listing detail loads < 4s
- [ ] Search results load < 3s
- [ ] Form submission < 3s
- [ ] Image upload shows progress
- [ ] Timeout handling works
- [ ] Retry mechanism works

### Real Network Testing (Nigeria)

#### Test on Actual Networks
- [ ] **MTN 3G/4G**
  - Test in urban area
  - Test in suburban area
  - Note: Usually fastest
- [ ] **Glo 3G/4G**
  - Test in coverage area
  - Note: Can be spotty
- [ ] **Airtel 3G/4G**
  - Test in coverage area
  - Note: Generally reliable
- [ ] **9mobile 3G/4G**
  - Test in coverage area
  - Note: Limited coverage

#### Network Conditions to Test
- [ ] Strong signal (full bars)
- [ ] Weak signal (1-2 bars)
- [ ] Switching between WiFi and mobile data
- [ ] Network interruption (tunnel, elevator)
- [ ] Airplane mode on/off
- [ ] Slow/congested network (peak hours)

### Offline Testing
- [ ] Enable airplane mode
- [ ] Verify offline page displays
- [ ] Test service worker cache
- [ ] Test cached pages load
- [ ] Test form submission queuing (if implemented)
- [ ] Re-enable network
- [ ] Verify sync works
- [ ] Test online/offline detection

---

## 🔧 Performance Optimization Checklist

### Images
- [x] Images compressed and optimized
- [x] WebP format with fallbacks
- [x] Lazy loading implemented
- [x] Responsive images (srcset)
- [ ] Image CDN configured
- [ ] Blur-up placeholders
- [ ] Maximum dimensions enforced

### JavaScript
- [x] Code splitting enabled
- [x] Tree shaking configured
- [ ] Unused dependencies removed
- [ ] Dynamic imports for heavy components
- [ ] Debouncing on search/input
- [ ] Memoization where appropriate
- [ ] Web Workers for heavy tasks (if needed)

### CSS
- [x] Tailwind CSS purging enabled
- [x] Critical CSS inlined
- [ ] Unused CSS removed
- [ ] CSS minified
- [ ] Font loading optimized

### Caching
- [x] Service worker configured
- [x] Static assets cached
- [ ] API responses cached (where appropriate)
- [ ] Cache invalidation strategy
- [ ] CDN caching headers

### Database/API
- [ ] Database queries optimized
- [ ] Indexes on frequently queried fields
- [ ] Pagination implemented
- [ ] API response compression
- [ ] Rate limiting configured
- [ ] Connection pooling

### Fonts
- [ ] System fonts used (or web fonts optimized)
- [ ] Font subsetting
- [ ] Font display: swap
- [ ] Preload critical fonts

---

## 📊 Performance Monitoring Tools

### Browser DevTools
- [ ] Chrome DevTools Performance tab
- [ ] Network tab (waterfall analysis)
- [ ] Coverage tab (unused code)
- [ ] Lighthouse audits
- [ ] Memory profiler

### Online Tools
- [ ] **PageSpeed Insights:** https://pagespeed.web.dev/
- [ ] **WebPageTest:** https://www.webpagetest.org/
- [ ] **GTmetrix:** https://gtmetrix.com/
- [ ] **Pingdom:** https://tools.pingdom.com/

### Real User Monitoring (RUM)
- [ ] Set up analytics (Google Analytics, Vercel Analytics)
- [ ] Track Core Web Vitals
- [ ] Monitor error rates
- [ ] Track page load times
- [ ] Monitor API response times

---

## 🧪 Testing Scenarios by Network

### Fast 4G (50 Mbps)
- [ ] All pages load instantly
- [ ] Images load quickly
- [ ] Smooth animations
- [ ] No loading indicators needed

### Slow 4G (10 Mbps)
- [ ] Pages load within 2-3s
- [ ] Images load progressively
- [ ] Loading indicators visible
- [ ] No timeout errors

### Fast 3G (1.5 Mbps)
- [ ] Pages load within 5s
- [ ] Images lazy load
- [ ] Loading indicators prominent
- [ ] Graceful degradation

### Slow 3G (400 Kbps)
- [ ] Basic functionality works
- [ ] Text content loads first
- [ ] Images load last
- [ ] Timeout handling works
- [ ] User can still complete tasks

---

## 📝 Performance Testing Report Template

### Test Information
- **Date:** _______________
- **Tester:** _______________
- **Device:** _______________
- **Browser:** _______________
- **Network:** _______________

### Lighthouse Scores
- **Performance:** _____ / 100
- **Accessibility:** _____ / 100
- **Best Practices:** _____ / 100
- **SEO:** _____ / 100
- **PWA:** _____ / 100

### Core Web Vitals
- **LCP:** _____ s
- **FID:** _____ ms
- **CLS:** _____

### Page Load Times
- **Homepage:** _____ s
- **Listing Detail:** _____ s
- **Search Results:** _____ s
- **Create Listing:** _____ s

### Bundle Sizes
- **Total JS:** _____ KB
- **Total CSS:** _____ KB
- **First Load JS:** _____ KB

### Issues Found
1. _______________
2. _______________
3. _______________

### Recommendations
1. _______________
2. _______________
3. _______________

---

## 🎯 Performance Optimization Priority

### Critical (Fix Immediately)
- LCP > 4s
- CLS > 0.25
- TTI > 7s
- Performance score < 50

### High (Fix Before Launch)
- LCP > 2.5s
- CLS > 0.1
- TTI > 3.8s
- Performance score < 70

### Medium (Fix Soon After Launch)
- LCP > 2s
- Performance score < 90
- Bundle size > 500KB
- Unused code > 30%

### Low (Nice to Have)
- Further optimizations
- Advanced caching strategies
- Edge case performance

---

**Last Updated:** {{ DATE }}
**Version:** 1.0
