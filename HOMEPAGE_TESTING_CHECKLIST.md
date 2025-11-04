# TradeHub Homepage - Testing Checklist

## 🧪 Pre-Testing Setup

### Environment Variables
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- [ ] `NEXT_PUBLIC_APP_URL` is set
- [ ] Supabase credentials are configured
- [ ] Database has sample listings
- [ ] Database has categories

### Database Verification
```sql
-- Check if categories exist
SELECT COUNT(*) FROM categories;

-- Check if listings exist
SELECT COUNT(*) FROM listings WHERE status = 'active';

-- Check if listings have images
SELECT COUNT(*) FROM listings WHERE array_length(images, 1) > 0;
```

## ✅ Functional Testing

### 1. Homepage Load
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Search bar is visible
- [ ] Category filters load
- [ ] Listings grid displays
- [ ] No console errors

### 2. Search Functionality
- [ ] Can type in search bar
- [ ] Search icon displays on left
- [ ] Clear button (X) appears when typing
- [ ] Search is debounced (500ms delay)
- [ ] Results update after typing stops
- [ ] Results count displays correctly
- [ ] Clear button resets search
- [ ] Empty state shows for no results

**Test Cases:**
```
Search: "iPhone" → Should show iPhone listings
Search: "xyz123abc" → Should show empty state
Search: "" (clear) → Should show all listings
```

### 3. Category Filters
- [ ] All categories load from database
- [ ] "All Categories" chip displays first
- [ ] Horizontal scroll works on mobile
- [ ] Scrollbar is hidden
- [ ] Active category has blue background
- [ ] Clicking category filters listings
- [ ] Clicking "All" shows all listings
- [ ] Category icons display (if present)

**Test Cases:**
```
Click "All" → Show all listings
Click "Electronics" → Show only electronics
Click "Fashion" → Show only fashion items
```

### 4. Listings Grid
- [ ] Listings display in grid
- [ ] Images load correctly
- [ ] Images are optimized (Cloudinary)
- [ ] Titles display (max 2 lines)
- [ ] Prices show in NGN format (₦)
- [ ] Locations display with icon
- [ ] Posted time shows (relative format)
- [ ] "New" badge shows for new items
- [ ] Cards are clickable
- [ ] Hover effects work on desktop

**Test Cases:**
```
Desktop: 4 columns
Tablet: 2 columns
Mobile: 1 column
```

### 5. Pagination (Load More)
- [ ] "Load More" button appears
- [ ] Button shows correct count (e.g., "Showing 20 of 42")
- [ ] Clicking loads next 20 items
- [ ] Loading spinner appears during fetch
- [ ] New items append to grid
- [ ] Button disappears when all loaded
- [ ] No duplicate items

**Test Cases:**
```
Initial load: 20 items
After "Load More": 40 items
After second "Load More": 60 items (or all)
```

### 6. Loading States
- [ ] Skeleton cards show on initial load
- [ ] 8 skeleton cards display
- [ ] Skeleton animation works
- [ ] Loading spinner on "Load More"
- [ ] No layout shift during loading

### 7. Empty States
- [ ] Shows when no search results
- [ ] Shows appropriate message
- [ ] Package icon displays
- [ ] CTA button shows (when appropriate)
- [ ] CTA links to create listing

## 📱 Responsive Testing

### Mobile (375px - 640px)
- [ ] 1 column grid
- [ ] Search bar full width
- [ ] Category chips scroll horizontally
- [ ] Touch targets are large enough (44x44px)
- [ ] Text is readable (14px base)
- [ ] Images load properly
- [ ] No horizontal scroll (page)
- [ ] Hero section looks good
- [ ] Spacing is comfortable

### Tablet (640px - 1024px)
- [ ] 2 column grid
- [ ] Search bar centered
- [ ] Category chips visible
- [ ] Proper spacing
- [ ] Images scale correctly

### Desktop (1024px+)
- [ ] 3-4 column grid
- [ ] Max width container (7xl)
- [ ] Hover effects work
- [ ] Cursor changes on hover
- [ ] Images scale on hover
- [ ] Shadows increase on hover

## ⚡ Performance Testing

### Image Optimization
- [ ] Images use Cloudinary CDN
- [ ] Images have transformations (w_400,q_auto,f_auto)
- [ ] Images lazy load
- [ ] WebP/AVIF format used
- [ ] No layout shift from images
- [ ] Placeholder shows before load

### Network Performance
- [ ] Test on Fast 3G
- [ ] Test on Slow 3G
- [ ] Images load progressively
- [ ] Page is usable while loading
- [ ] No blocking requests

### API Performance
- [ ] Search is debounced (not called on every keystroke)
- [ ] Only one API call per search
- [ ] Pagination doesn't reload all items
- [ ] No unnecessary re-renders

### Lighthouse Scores
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Can tab through search bar
- [ ] Can tab through category chips
- [ ] Can tab through listing cards
- [ ] Can tab to "Load More" button
- [ ] Enter key works on buttons
- [ ] Focus indicators visible

### Screen Reader
- [ ] Search bar has proper label
- [ ] Clear button has aria-label
- [ ] Images have alt text
- [ ] Buttons have descriptive text
- [ ] Headings are semantic (h1, h2, etc.)

### Visual Accessibility
- [ ] Text has sufficient contrast
- [ ] Focus states are visible
- [ ] Color is not only indicator
- [ ] Text is scalable
- [ ] Works in high contrast mode

### Reduced Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] Page is usable without animations

## 🔍 SEO Testing

### Meta Tags
- [ ] Title tag is set
- [ ] Description is set
- [ ] Open Graph tags present
- [ ] Twitter card tags present
- [ ] Canonical URL set

### Content
- [ ] H1 tag present and unique
- [ ] Semantic HTML used
- [ ] Images have alt text
- [ ] Links are descriptive

## 🐛 Error Handling

### Network Errors
- [ ] Handles API failure gracefully
- [ ] Shows error message to user
- [ ] Doesn't crash on 500 error
- [ ] Doesn't crash on timeout
- [ ] Retry mechanism works

### Edge Cases
- [ ] Handles 0 listings
- [ ] Handles 1 listing
- [ ] Handles 1000+ listings
- [ ] Handles missing images
- [ ] Handles long titles
- [ ] Handles special characters in search
- [ ] Handles rapid clicking

## 🔒 Security Testing

### Input Validation
- [ ] Search input is sanitized
- [ ] No XSS vulnerabilities
- [ ] No SQL injection (API level)
- [ ] Rate limiting works (if implemented)

## 📊 Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet
- [ ] Firefox Mobile

## 🎯 User Experience Testing

### First-Time User
- [ ] Purpose is immediately clear
- [ ] Search is intuitive
- [ ] Categories are discoverable
- [ ] Listings are easy to browse
- [ ] Call-to-action is clear

### Return User
- [ ] Page loads quickly
- [ ] Search remembers nothing (privacy)
- [ ] Easy to find new listings
- [ ] Familiar interface

## 📝 Code Quality Checks

### TypeScript
- [ ] No TypeScript errors
- [ ] No `any` types used
- [ ] Proper type definitions
- [ ] Interfaces documented

### React Best Practices
- [ ] No console warnings
- [ ] Proper key props on lists
- [ ] useEffect dependencies correct
- [ ] No memory leaks
- [ ] Components are pure

### Code Style
- [ ] Consistent formatting
- [ ] Meaningful variable names
- [ ] Comments where needed
- [ ] No dead code

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] No TypeScript errors

### Post-Deployment
- [ ] Homepage loads on production
- [ ] API endpoints work
- [ ] Images load from Cloudinary
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works
- [ ] Mobile responsive
- [ ] Analytics tracking (if implemented)

## 📈 Monitoring

### Metrics to Track
- [ ] Page load time
- [ ] API response time
- [ ] Error rate
- [ ] User engagement
- [ ] Search queries
- [ ] Popular categories
- [ ] Bounce rate

## 🎉 Success Criteria

### Must Have (P0)
- ✅ Homepage loads without errors
- ✅ Search functionality works
- ✅ Category filters work
- ✅ Listings display correctly
- ✅ Pagination works
- ✅ Mobile responsive

### Should Have (P1)
- ✅ Loading states
- ✅ Empty states
- ✅ Image optimization
- ✅ Debounced search
- ✅ Hover effects

### Nice to Have (P2)
- ⏳ Infinite scroll option
- ⏳ Advanced filters
- ⏳ Sort options
- ⏳ Saved searches

---

## Quick Test Commands

```bash
# Run development server
npm run dev

# Run build
npm run build

# Run production build locally
npm run start

# Check TypeScript
npx tsc --noEmit

# Check linting
npm run lint
```

## Test URLs

```
Homepage: http://localhost:3000
Search: http://localhost:3000?search=iPhone
Category: http://localhost:3000?category=electronics-id
```

---

**Testing Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete | ❌ Failed

Use this checklist to ensure the homepage is production-ready! 🚀
