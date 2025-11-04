# TradeHub MVP - Manual Testing Checklist

## 🔐 Authentication Flow Testing

### Login Flow
- [ ] Navigate to login page
- [ ] Enter valid Nigerian phone number (+234...)
- [ ] Verify phone number validation (format, length)
- [ ] Submit and verify OTP sent notification
- [ ] Check OTP arrives via SMS (test on MTN, Glo, Airtel, 9mobile)
- [ ] Enter correct OTP code
- [ ] Verify successful login and redirect
- [ ] Test "Resend OTP" functionality (wait 60 seconds)
- [ ] Test with invalid OTP (wrong code)
- [ ] Test with expired OTP (after 10 minutes)

### Profile Setup (First-time Users)
- [ ] After first login, redirected to complete-profile page
- [ ] Fill in full name (test min/max length)
- [ ] Fill in location (select state and LGA)
- [ ] Upload profile picture (test various formats: JPG, PNG, WEBP)
- [ ] Test image size validation (max 5MB)
- [ ] Test image preview before upload
- [ ] Submit profile and verify redirect to home
- [ ] Verify profile data saved correctly
- [ ] Test skipping profile setup (if allowed)

### Session Management
- [ ] Verify user stays logged in after page refresh
- [ ] Test logout functionality
- [ ] Verify redirect to login when accessing protected routes
- [ ] Test session persistence across browser tabs
- [ ] Test session expiry (if implemented)

---

## 📝 Create Listing Testing

### Basic Listing Creation
- [ ] Navigate to "Post Listing" or "Sell" page
- [ ] Verify user must be logged in
- [ ] Fill in listing title (test 10-100 characters)
- [ ] Fill in description (test 50-2000 characters)
- [ ] Enter price (test numeric validation)
- [ ] Test price formatting (commas, currency symbol)
- [ ] Select category from dropdown
- [ ] Select condition (New/Used/Refurbished)
- [ ] Select location (state and LGA)
- [ ] Add contact phone number
- [ ] Verify phone number validation

### Image Upload
- [ ] Upload single image (test JPG, PNG, WEBP)
- [ ] Upload multiple images (test up to 5 images)
- [ ] Test image size validation (max 5MB per image)
- [ ] Test total upload size limit
- [ ] Verify image preview/thumbnail display
- [ ] Test image reordering (drag and drop)
- [ ] Test removing uploaded images
- [ ] Test uploading invalid file types (PDF, DOC, etc.)
- [ ] Test uploading oversized images
- [ ] Verify image compression/optimization

### Form Validation
- [ ] Submit empty form (verify all required field errors)
- [ ] Test title too short (< 10 chars)
- [ ] Test title too long (> 100 chars)
- [ ] Test description too short (< 50 chars)
- [ ] Test description too long (> 2000 chars)
- [ ] Test negative price
- [ ] Test price = 0
- [ ] Test extremely large price (billions)
- [ ] Test special characters in title/description
- [ ] Test XSS attempts in text fields

### Submission & Confirmation
- [ ] Submit valid listing
- [ ] Verify loading state during submission
- [ ] Verify success message/notification
- [ ] Verify redirect to listing detail or profile
- [ ] Check listing appears in user's profile
- [ ] Check listing appears in browse/search results
- [ ] Verify all data saved correctly
- [ ] Test network failure during submission

---

## 🔍 Browse & Search Testing

### Homepage/Browse Listings
- [ ] Load homepage and verify listings display
- [ ] Verify listing cards show: image, title, price, location
- [ ] Test pagination (load more listings)
- [ ] Test infinite scroll (if implemented)
- [ ] Verify "No listings" state when empty
- [ ] Test loading skeleton/placeholder
- [ ] Verify listings sorted correctly (newest first)

### Search Functionality
- [ ] Enter search query in search bar
- [ ] Verify search results match query
- [ ] Test search with partial words
- [ ] Test search with special characters
- [ ] Test search with empty query
- [ ] Test search with no results
- [ ] Verify search highlights/relevance
- [ ] Test search debouncing (typing fast)

### Category Filtering
- [ ] Select category filter
- [ ] Verify only listings in that category show
- [ ] Test "All Categories" option
- [ ] Test multiple category selections (if supported)
- [ ] Verify filter persists during pagination
- [ ] Test clearing filters

### Location Filtering
- [ ] Filter by state
- [ ] Filter by LGA
- [ ] Test "All Locations" option
- [ ] Verify location filter works with search
- [ ] Test location + category combination

### Price Filtering
- [ ] Set minimum price
- [ ] Set maximum price
- [ ] Set price range (min and max)
- [ ] Test invalid price ranges (min > max)
- [ ] Test extreme values
- [ ] Verify price filter works with other filters

### Condition Filtering
- [ ] Filter by "New"
- [ ] Filter by "Used"
- [ ] Filter by "Refurbished"
- [ ] Test multiple condition selections
- [ ] Verify condition filter combines with others

### Sort Options
- [ ] Sort by "Newest First"
- [ ] Sort by "Oldest First"
- [ ] Sort by "Price: Low to High"
- [ ] Sort by "Price: High to Low"
- [ ] Verify sort persists with filters

---

## 📄 Listing Detail Page Testing

### Page Load & Display
- [ ] Navigate to listing detail page
- [ ] Verify all listing data displays correctly
- [ ] Verify image gallery/carousel works
- [ ] Test image zoom/lightbox functionality
- [ ] Test image navigation (next/previous)
- [ ] Verify seller information displays
- [ ] Verify listing metadata (posted date, views, etc.)
- [ ] Test loading state
- [ ] Test 404 for non-existent listing

### Contact Seller
- [ ] Click "Contact Seller" button
- [ ] Verify WhatsApp link opens correctly
- [ ] Test WhatsApp pre-filled message
- [ ] Verify phone number formatted correctly
- [ ] Click "Call" button (test on mobile)
- [ ] Verify call initiates on mobile device
- [ ] Test contact options for own listings (should be hidden/disabled)

### Share Listing
- [ ] Click share button
- [ ] Test native share (mobile)
- [ ] Test copy link functionality
- [ ] Test WhatsApp share
- [ ] Test Facebook share (if implemented)
- [ ] Test Twitter share (if implemented)

### Related Listings
- [ ] Verify related listings section displays
- [ ] Check related listings are from same category
- [ ] Test clicking on related listing
- [ ] Verify related listings exclude current listing

---

## ✏️ Edit Listing Testing

### Access Edit Page
- [ ] Navigate to own listing detail page
- [ ] Verify "Edit" button visible for own listings
- [ ] Verify "Edit" button hidden for others' listings
- [ ] Click edit and verify redirect to edit form
- [ ] Verify form pre-filled with existing data

### Edit Form
- [ ] Modify title
- [ ] Modify description
- [ ] Change price
- [ ] Change category
- [ ] Change condition
- [ ] Change location
- [ ] Update contact phone
- [ ] Add new images
- [ ] Remove existing images
- [ ] Reorder images

### Save Changes
- [ ] Submit edited listing
- [ ] Verify loading state
- [ ] Verify success message
- [ ] Verify redirect to listing detail
- [ ] Check all changes saved correctly
- [ ] Test canceling edit (no changes saved)
- [ ] Test validation on edit form
- [ ] Test network failure during save

---

## 🗑️ Delete Listing Testing

### Delete Functionality
- [ ] Navigate to own listing
- [ ] Click "Delete" button
- [ ] Verify confirmation dialog appears
- [ ] Cancel deletion (listing remains)
- [ ] Confirm deletion
- [ ] Verify loading state
- [ ] Verify success message
- [ ] Verify redirect (to profile or home)
- [ ] Check listing removed from database
- [ ] Check listing removed from search results
- [ ] Check images deleted from storage
- [ ] Test deleting listing with multiple images
- [ ] Verify can't access deleted listing URL

---

## 👤 Profile Management Testing

### View Profile
- [ ] Navigate to profile page
- [ ] Verify profile information displays
- [ ] Verify profile picture displays
- [ ] Verify user's listings display
- [ ] Test "My Listings" tab/section
- [ ] Verify listing count accurate
- [ ] Test empty state (no listings)

### Edit Profile
- [ ] Click "Edit Profile" button
- [ ] Verify edit modal/form opens
- [ ] Change full name
- [ ] Change location (state/LGA)
- [ ] Upload new profile picture
- [ ] Test image validation
- [ ] Save changes
- [ ] Verify changes reflected immediately
- [ ] Test canceling edit
- [ ] Test validation errors

### Profile Listings Management
- [ ] View all own listings from profile
- [ ] Test pagination (if many listings)
- [ ] Click listing to view detail
- [ ] Edit listing from profile
- [ ] Delete listing from profile
- [ ] Verify listing status (active/sold/expired)
- [ ] Test marking listing as sold (if implemented)

---

## 📱 Mobile Responsiveness Testing

### Layout & Navigation
- [ ] Test on mobile viewport (375px, 414px)
- [ ] Test on tablet viewport (768px, 1024px)
- [ ] Verify header/navigation responsive
- [ ] Test hamburger menu (if implemented)
- [ ] Verify footer responsive
- [ ] Test landscape orientation
- [ ] Test portrait orientation

### Touch Interactions
- [ ] Test tap targets (min 44x44px)
- [ ] Test swipe gestures (image carousel)
- [ ] Test pull-to-refresh (if implemented)
- [ ] Test touch scrolling
- [ ] Test pinch-to-zoom on images
- [ ] Test form inputs on mobile keyboard

### Mobile-Specific Features
- [ ] Test WhatsApp integration on mobile
- [ ] Test phone call functionality
- [ ] Test camera access for image upload
- [ ] Test photo gallery access
- [ ] Test location services (if used)
- [ ] Test PWA install prompt
- [ ] Test offline functionality

### Forms on Mobile
- [ ] Test all form inputs on mobile
- [ ] Verify keyboard types (numeric for phone/price)
- [ ] Test autocomplete
- [ ] Test form validation messages
- [ ] Test file upload from camera
- [ ] Test file upload from gallery
- [ ] Verify forms don't zoom on focus

---

## 🐌 Slow Network Simulation

### 3G Network Testing
- [ ] Enable 3G throttling in DevTools
- [ ] Test page load times
- [ ] Test image loading
- [ ] Test form submissions
- [ ] Verify loading indicators display
- [ ] Test timeout handling
- [ ] Test retry mechanisms

### Offline Testing
- [ ] Disable network connection
- [ ] Test offline page displays
- [ ] Test service worker caching
- [ ] Test offline message
- [ ] Re-enable network
- [ ] Verify app recovers gracefully

### Network Failure Scenarios
- [ ] Test failed API requests
- [ ] Test failed image uploads
- [ ] Test failed form submissions
- [ ] Verify error messages user-friendly
- [ ] Test retry functionality
- [ ] Test request queuing (if implemented)

---

## 🎨 UI/UX Testing

### Visual Consistency
- [ ] Verify consistent color scheme
- [ ] Check font sizes and hierarchy
- [ ] Test button styles consistent
- [ ] Verify spacing/padding consistent
- [ ] Check icon consistency
- [ ] Test dark mode (if implemented)

### Accessibility
- [ ] Test keyboard navigation
- [ ] Test tab order logical
- [ ] Test focus indicators visible
- [ ] Test with screen reader (basic)
- [ ] Verify alt text on images
- [ ] Check color contrast ratios
- [ ] Test form labels and ARIA attributes

### User Feedback
- [ ] Verify loading states on all actions
- [ ] Test success notifications
- [ ] Test error notifications
- [ ] Test warning messages
- [ ] Verify notifications dismissible
- [ ] Test notification timing (auto-dismiss)

---

## 🔄 Edge Cases & Error Scenarios

### Empty States
- [ ] No listings in category
- [ ] No search results
- [ ] User has no listings
- [ ] No images in listing
- [ ] Profile not completed

### Maximum Limits
- [ ] Maximum title length (100 chars)
- [ ] Maximum description length (2000 chars)
- [ ] Maximum images (5 per listing)
- [ ] Maximum image size (5MB)
- [ ] Maximum price value

### Data Integrity
- [ ] Test with special characters (emoji, unicode)
- [ ] Test with HTML in text fields
- [ ] Test with SQL injection attempts
- [ ] Test with XSS attempts
- [ ] Test with very long words (no spaces)
- [ ] Test with RTL text (Arabic, if applicable)

### Concurrent Actions
- [ ] Edit listing in two tabs simultaneously
- [ ] Delete listing while viewing in another tab
- [ ] Submit form twice quickly (double-click)
- [ ] Test race conditions in API calls

---

## ✅ Testing Sign-off

### Tester Information
- **Tester Name:** _______________
- **Date:** _______________
- **Device:** _______________
- **Browser:** _______________
- **Network:** _______________

### Test Results Summary
- **Total Tests:** _______________
- **Passed:** _______________
- **Failed:** _______________
- **Blocked:** _______________

### Critical Issues Found
1. _______________
2. _______________
3. _______________

### Notes & Recommendations
_______________________________________________
_______________________________________________
_______________________________________________

---

## 📋 Testing Tips

1. **Test on Real Devices:** Always test on actual mobile devices, not just emulators
2. **Test on Real Networks:** Use actual Nigerian mobile networks (MTN, Glo, Airtel, 9mobile)
3. **Document Everything:** Screenshot bugs, note steps to reproduce
4. **Test Edge Cases:** Don't just test happy paths
5. **Think Like a User:** Try to break things, use unexpected inputs
6. **Test Systematically:** Go through checklist methodically
7. **Retest Fixes:** After bugs are fixed, retest the entire flow
8. **Cross-browser:** Test on multiple browsers and versions

---

**Last Updated:** {{ DATE }}
**Version:** 1.0
