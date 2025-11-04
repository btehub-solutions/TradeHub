# Listing Detail Page - Testing Guide

## Quick Start Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Access a Listing
Navigate to: `http://localhost:3000/listings/[listing-id]`

## Test Scenarios

### Image Gallery Testing

#### Desktop
- [ ] Click main image to open fullscreen
- [ ] Use arrow keys to navigate in fullscreen
- [ ] Press ESC to close fullscreen
- [ ] Click thumbnails to change main image
- [ ] Verify image counter updates correctly
- [ ] Check hover effects on navigation arrows

#### Mobile
- [ ] Swipe left to go to next image
- [ ] Swipe right to go to previous image
- [ ] Tap main image to open fullscreen
- [ ] Swipe in fullscreen mode
- [ ] Verify smooth transitions
- [ ] Check image counter visibility

### Contact Features Testing

#### WhatsApp Button
1. Click WhatsApp button
2. Verify it opens WhatsApp (web or app)
3. Check pre-filled message format:
   ```
   Hi, I'm interested in your [Title] listed on TradeHub for ₦[Price]
   ```
4. Verify phone number is correct
5. Test on mobile and desktop

#### Call Button
1. Click Call button
2. On mobile: Should open phone dialer
3. On desktop: Should show tel: link
4. Verify correct phone number format (+234...)

#### Share Functionality
1. Click Share button
2. On mobile: Should open native share sheet
3. On desktop: Should copy link to clipboard
4. Verify "Link Copied!" feedback appears
5. Click WhatsApp share icon
6. Verify share message includes listing URL

### Seller Information Testing

#### For Non-Owners
- [ ] Seller name displays correctly
- [ ] Avatar shows (or initials if no avatar)
- [ ] Location displays
- [ ] "Member since" date is correct
- [ ] Active listings count is accurate
- [ ] Bio displays if available
- [ ] "View Seller Profile" link present

#### For Owners
- [ ] "This is your listing" notice appears
- [ ] Edit button is visible
- [ ] Delete button is visible
- [ ] Contact buttons are hidden
- [ ] Seller info card still shows

### SEO Testing

#### Metadata
1. View page source (Ctrl+U)
2. Check for:
   - [ ] `<title>` tag with listing title and price
   - [ ] Meta description (max 160 chars)
   - [ ] Meta keywords
   - [ ] Open Graph tags (og:title, og:description, og:image)
   - [ ] Twitter Card tags
   - [ ] Canonical URL
   - [ ] JSON-LD structured data

#### Social Sharing Preview
1. Use tools like:
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
2. Verify image, title, and description appear correctly

### View Tracking Testing

1. Open listing as non-owner
2. Check browser console for API call
3. Refresh page
4. Verify view count increments
5. Open as owner
6. Verify view count doesn't increment

### Responsive Design Testing

#### Mobile (< 768px)
- [ ] Image gallery is full width
- [ ] Swipe gestures work
- [ ] Contact buttons are prominent
- [ ] Seller info card displays properly
- [ ] Breadcrumb is readable
- [ ] Text is legible

#### Tablet (768px - 1024px)
- [ ] Two-column layout works
- [ ] Images scale appropriately
- [ ] Contact section is accessible
- [ ] Navigation is smooth

#### Desktop (> 1024px)
- [ ] Three-column layout (2 left, 1 right)
- [ ] Sidebar is sticky
- [ ] Hover effects work
- [ ] Fullscreen gallery works
- [ ] All content is readable

### Error Handling Testing

#### Invalid Listing ID
1. Navigate to `/listings/invalid-id`
2. Should show 404 page

#### Inactive Listing
1. Set listing status to 'inactive' or 'sold'
2. Try to access listing
3. Should show 404 page

#### Missing Images
1. Create listing with no images
2. Should show placeholder image
3. Gallery should still work

#### Missing Seller Data
1. Test with incomplete seller profile
2. Should show fallbacks (initials, "TradeHub User")

## Performance Testing

### Image Loading
- [ ] Main image loads quickly
- [ ] Thumbnails load progressively
- [ ] Cloudinary optimization works
- [ ] No layout shift during load

### API Calls
- [ ] View tracking doesn't block page load
- [ ] Contact tracking is fast
- [ ] No unnecessary API calls

### Mobile Performance
- [ ] Page loads in < 3 seconds on 3G
- [ ] Images are optimized
- [ ] No janky scrolling
- [ ] Gestures are responsive

## Accessibility Testing

- [ ] All images have alt text
- [ ] Buttons have aria-labels
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Color contrast is sufficient
- [ ] Screen reader friendly

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Common Issues & Solutions

### WhatsApp Not Opening
- Check phone number format (+234...)
- Verify WhatsApp is installed
- Test on different devices

### Images Not Loading
- Verify Cloudinary cloud name in .env
- Check image URLs in database
- Verify Cloudinary account is active

### View Count Not Incrementing
- Check database function exists
- Verify API route is working
- Check browser console for errors

### Share Not Working
- Test native share API support
- Verify clipboard fallback works
- Check HTTPS requirement for share API

## Manual Test Cases

### Test Case 1: Complete Buyer Journey
1. Navigate to listing page
2. View all images in gallery
3. Read description and details
4. Check seller information
5. Click WhatsApp button
6. Verify message is pre-filled
7. Share listing with friend

### Test Case 2: Owner View
1. Login as listing owner
2. Navigate to your listing
3. Verify "This is your listing" notice
4. Click Edit button
5. Verify no contact buttons shown

### Test Case 3: Mobile Experience
1. Open listing on mobile device
2. Swipe through images
3. Tap to open fullscreen
4. Navigate with swipes in fullscreen
5. Close fullscreen
6. Scroll to contact section
7. Tap WhatsApp button
8. Verify app opens

## Automated Testing (Future)

```typescript
// Example test structure
describe('Listing Detail Page', () => {
  it('should display listing information', () => {
    // Test implementation
  });

  it('should track views', () => {
    // Test implementation
  });

  it('should open WhatsApp with correct message', () => {
    // Test implementation
  });

  it('should show owner actions for listing owner', () => {
    // Test implementation
  });
});
```

## Performance Benchmarks

Target metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Security Testing

- [ ] No sensitive data in client-side code
- [ ] API routes validate ownership
- [ ] Phone numbers are properly formatted
- [ ] XSS protection in description
- [ ] CSRF protection on forms

## Checklist Before Production

- [ ] All images optimized
- [ ] SEO metadata complete
- [ ] Analytics tracking implemented
- [ ] Error handling tested
- [ ] Mobile experience verified
- [ ] Cross-browser testing done
- [ ] Performance benchmarks met
- [ ] Accessibility standards met
- [ ] Security review completed
- [ ] Documentation updated
