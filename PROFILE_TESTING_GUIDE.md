# Profile & Listings Management - Testing Guide

## 🧪 Complete Testing Checklist

Use this guide to systematically test all features of the profile and listings management system.

---

## Prerequisites

- [ ] Development server running (`npm run dev`)
- [ ] Supabase configured and connected
- [ ] User account created and logged in
- [ ] At least 2-3 test listings created

---

## 1. Profile Page Access

### Test: Navigate to Profile
- [ ] Go to `http://localhost:3000/profile`
- [ ] Page loads without errors
- [ ] Profile header displays

### Test: Authentication
- [ ] Logout and try accessing `/profile`
- [ ] Should redirect to `/login`
- [ ] Login and access profile again
- [ ] Should display profile successfully

**Expected Result**: Only authenticated users can access profile page.

---

## 2. Profile Header Display

### Test: User Information
- [ ] Full name displays correctly
- [ ] Avatar shows correct initials (first letters of name)
- [ ] Avatar has colored background
- [ ] Location shows: "City, State"
- [ ] "Member since" date is formatted correctly
- [ ] Total listings count is accurate

### Test: Bio Display
- [ ] If bio exists, it displays below user info
- [ ] If no bio, section is hidden
- [ ] Bio text wraps properly

### Test: Action Buttons
- [ ] "Edit Profile" button visible
- [ ] "New Listing" button visible
- [ ] Both buttons have proper icons
- [ ] Hover states work

**Expected Result**: All user information displays correctly with proper formatting.

---

## 3. Listings Tabs

### Test: Tab Display
- [ ] Three tabs visible: Active | Sold | Inactive
- [ ] Each tab shows count badge
- [ ] Active tab selected by default
- [ ] Tab counts match actual listings

### Test: Tab Switching
- [ ] Click "Sold" tab
- [ ] Tab becomes active (blue underline)
- [ ] Only sold listings display
- [ ] Click "Inactive" tab
- [ ] Only inactive listings display
- [ ] Click "Active" tab
- [ ] Returns to active listings

### Test: Loading States
- [ ] Loading spinner shows when switching tabs
- [ ] Listings appear after loading
- [ ] No flicker or layout shift

**Expected Result**: Tabs work smoothly with correct filtering.

---

## 4. Listing Cards Display

### Test: Card Information
For each listing card, verify:
- [ ] Image displays correctly
- [ ] Title shows (truncated if long)
- [ ] Price formatted as ₦X,XXX
- [ ] Location shows "City, State"
- [ ] Views count displays
- [ ] Posted date shows (e.g., "2 days ago")
- [ ] Status badge shows correct color

### Test: Status Badges
- [ ] Active: Green badge
- [ ] Sold: Blue badge
- [ ] Inactive: Gray badge

### Test: Sold Overlay
- [ ] Sold listings have dark overlay on image
- [ ] "SOLD" text appears on image
- [ ] Image still visible behind overlay

**Expected Result**: All listing information displays correctly.

---

## 5. Edit Profile Modal

### Test: Open Modal
- [ ] Click "Edit Profile" button
- [ ] Modal opens with overlay
- [ ] Form fields pre-populated
- [ ] Close button (X) visible

### Test: Form Fields
- [ ] Full Name field has current value
- [ ] State field has current value
- [ ] City/Area field has current value
- [ ] WhatsApp Number field has current value
- [ ] Bio field has current value

### Test: Validation
- [ ] Clear "Full Name" field
- [ ] Try to save
- [ ] Error message appears
- [ ] Clear "State" field
- [ ] Try to save
- [ ] Error message appears

### Test: Update Profile
- [ ] Change full name
- [ ] Change location
- [ ] Update bio
- [ ] Click "Save Changes"
- [ ] Loading state shows
- [ ] Success toast appears
- [ ] Modal closes
- [ ] Profile updates on page

### Test: Cancel
- [ ] Open modal
- [ ] Make changes
- [ ] Click "Cancel"
- [ ] Modal closes
- [ ] Changes not saved

### Test: Close Modal
- [ ] Open modal
- [ ] Click X button
- [ ] Modal closes
- [ ] Click outside modal
- [ ] Modal closes

**Expected Result**: Profile updates successfully with validation.

---

## 6. Listing Management Actions

### Test: Mark as Sold (Active → Sold)
- [ ] Find active listing
- [ ] Click "Mark as Sold"
- [ ] Listing disappears from Active tab
- [ ] Success toast appears
- [ ] Switch to Sold tab
- [ ] Listing appears there
- [ ] Sold badge visible
- [ ] Image has sold overlay

### Test: Deactivate (Active → Inactive)
- [ ] Find active listing
- [ ] Click "Deactivate"
- [ ] Listing disappears from Active tab
- [ ] Success toast appears
- [ ] Switch to Inactive tab
- [ ] Listing appears there
- [ ] Inactive badge visible

### Test: Activate (Inactive → Active)
- [ ] Go to Inactive tab
- [ ] Find inactive listing
- [ ] Click "Activate"
- [ ] Listing disappears from Inactive tab
- [ ] Success toast appears
- [ ] Switch to Active tab
- [ ] Listing appears there
- [ ] Active badge visible

### Test: Relist (Sold → Active)
- [ ] Go to Sold tab
- [ ] Find sold listing
- [ ] Click "Relist"
- [ ] Listing disappears from Sold tab
- [ ] Success toast appears
- [ ] Switch to Active tab
- [ ] Listing appears there
- [ ] Sold overlay removed

**Expected Result**: All status changes work correctly with optimistic updates.

---

## 7. Delete Listing

### Test: Delete Confirmation
- [ ] Click "Delete" button
- [ ] "Confirm Delete" and "Cancel" buttons appear
- [ ] Original "Delete" button hidden
- [ ] Click "Cancel"
- [ ] Returns to normal state

### Test: Confirm Delete
- [ ] Click "Delete" button
- [ ] Click "Confirm Delete"
- [ ] Loading state shows
- [ ] Listing disappears immediately
- [ ] Success toast appears
- [ ] Tab count decreases

### Test: Delete from Different Tabs
- [ ] Delete from Active tab
- [ ] Delete from Sold tab
- [ ] Delete from Inactive tab
- [ ] All work correctly

**Expected Result**: Listings delete with confirmation, optimistic update.

---

## 8. Edit Listing Page

### Test: Navigate to Edit
- [ ] Click "Edit" on any listing
- [ ] Navigate to `/listings/[id]/edit`
- [ ] Page loads
- [ ] "Back to Profile" link visible

### Test: Form Pre-population
- [ ] Title field has current value
- [ ] Description field has current value
- [ ] Price field has current value
- [ ] Category selected correctly
- [ ] Condition selected correctly
- [ ] State selected correctly
- [ ] City/Area field has current value

### Test: Current Images
- [ ] All current images display
- [ ] Images in grid layout
- [ ] Each image has X button
- [ ] Click X on an image
- [ ] Image removed from display
- [ ] Can remove all images

### Test: Add New Images
- [ ] "Add New Images" section visible
- [ ] Shows how many more can be added
- [ ] Upload new image
- [ ] Preview appears
- [ ] Can add multiple (up to limit)
- [ ] Limit enforced (5 total)

### Test: Validation
- [ ] Clear title field
- [ ] Try to save
- [ ] Error message appears
- [ ] Clear all images
- [ ] Try to save
- [ ] Error message appears

### Test: Update Listing
- [ ] Change title
- [ ] Change price
- [ ] Change description
- [ ] Remove one image
- [ ] Add one new image
- [ ] Click "Update Listing"
- [ ] Loading state shows
- [ ] Success toast appears
- [ ] Redirects to profile
- [ ] Changes visible on listing card

### Test: Cancel Edit
- [ ] Make changes
- [ ] Click "Cancel"
- [ ] Returns to profile
- [ ] Changes not saved

### Test: Back Button
- [ ] Click "Back to Profile"
- [ ] Returns to profile
- [ ] Changes not saved

**Expected Result**: Listing edits successfully with image management.

---

## 9. Empty States

### Test: No Active Listings
- [ ] Mark all listings as sold or inactive
- [ ] Go to Active tab
- [ ] Empty state displays
- [ ] "No active listings" message
- [ ] "Create your first listing" CTA
- [ ] CTA button works

### Test: No Sold Listings
- [ ] Ensure no sold listings
- [ ] Go to Sold tab
- [ ] Empty state displays
- [ ] "No sold items yet" message

### Test: No Inactive Listings
- [ ] Ensure no inactive listings
- [ ] Go to Inactive tab
- [ ] Empty state displays
- [ ] "No inactive listings" message

**Expected Result**: Appropriate empty states for each tab.

---

## 10. Toast Notifications

### Test: Success Toasts
- [ ] Profile updated: "Profile updated successfully"
- [ ] Status changed: "Listing marked as [status]"
- [ ] Listing deleted: "Listing deleted successfully"
- [ ] Listing updated: "Listing updated successfully"

### Test: Error Toasts
- [ ] Network error: Error message displays
- [ ] Validation error: Error message displays
- [ ] Toast auto-dismisses after timeout
- [ ] Can manually close toast

**Expected Result**: All actions show appropriate feedback.

---

## 11. Mobile Responsive

### Test: Mobile Layout (< 640px)
- [ ] Profile header stacks vertically
- [ ] Avatar and info aligned properly
- [ ] Action buttons stack or wrap
- [ ] Tabs scroll horizontally
- [ ] Listing cards full width
- [ ] Action buttons wrap on cards
- [ ] Modal fits screen
- [ ] Edit form fields full width

### Test: Tablet Layout (640px - 1024px)
- [ ] Profile header side-by-side
- [ ] Listing cards 2 columns
- [ ] Tabs fit without scrolling
- [ ] Modal centered and sized properly

### Test: Desktop Layout (> 1024px)
- [ ] Full layout displays
- [ ] Listing cards maintain aspect
- [ ] Modal max-width applied
- [ ] Proper spacing and padding

### Test: Touch Interactions
- [ ] Buttons large enough to tap
- [ ] No hover-only functionality
- [ ] Swipe works on tabs
- [ ] Modal closes on backdrop tap

**Expected Result**: Perfect responsive behavior on all devices.

---

## 12. Security Testing

### Test: Ownership Verification
- [ ] Try to access edit page of another user's listing
- [ ] Should redirect to profile
- [ ] Try to edit via API (use browser console)
- [ ] Should return 403 Forbidden

### Test: Authentication
- [ ] Logout
- [ ] Try to access `/profile`
- [ ] Redirects to login
- [ ] Try to access `/listings/[id]/edit`
- [ ] Redirects to login

### Test: API Protection
- [ ] Open browser console
- [ ] Try to delete another user's listing via fetch
- [ ] Should return 403 Forbidden
- [ ] Try to update another user's listing
- [ ] Should return 403 Forbidden

**Expected Result**: All routes and operations properly secured.

---

## 13. Performance Testing

### Test: Loading Speed
- [ ] Profile page loads in < 2 seconds
- [ ] Tab switching is instant
- [ ] Images load progressively
- [ ] No layout shift during load

### Test: Optimistic Updates
- [ ] Status change reflects immediately
- [ ] Delete removes listing immediately
- [ ] No waiting for API response
- [ ] Rollback if API fails

### Test: Image Optimization
- [ ] Images load at appropriate size
- [ ] Cloudinary transformations applied
- [ ] Lazy loading works
- [ ] No oversized images

**Expected Result**: Fast, smooth user experience.

---

## 14. Error Handling

### Test: Network Errors
- [ ] Disconnect internet
- [ ] Try to update profile
- [ ] Error toast appears
- [ ] Try to change listing status
- [ ] Error toast appears
- [ ] Reconnect internet
- [ ] Retry action
- [ ] Works successfully

### Test: Invalid Data
- [ ] Submit form with invalid price (negative)
- [ ] Validation error shows
- [ ] Submit form with empty required field
- [ ] Validation error shows

### Test: 404 Errors
- [ ] Try to edit non-existent listing
- [ ] Redirects appropriately
- [ ] Error message or redirect to profile

**Expected Result**: Graceful error handling with user feedback.

---

## 15. Edge Cases

### Test: Long Content
- [ ] Create listing with very long title
- [ ] Title truncates on card
- [ ] Full title visible on edit page
- [ ] Create listing with very long description
- [ ] Description truncates appropriately

### Test: Special Characters
- [ ] Use special characters in title
- [ ] Use emojis in description
- [ ] Use special characters in location
- [ ] All display correctly

### Test: Multiple Rapid Actions
- [ ] Click status change multiple times quickly
- [ ] Only one request sent
- [ ] Button disabled during request
- [ ] Click delete then cancel quickly
- [ ] Handles correctly

### Test: Browser Back Button
- [ ] Edit listing
- [ ] Click browser back
- [ ] Returns to profile
- [ ] Changes not saved

**Expected Result**: All edge cases handled properly.

---

## ✅ Testing Summary

### Critical Tests (Must Pass)
- [ ] Profile page loads for authenticated users
- [ ] Tabs filter listings correctly
- [ ] Edit profile saves successfully
- [ ] Status changes work (all transitions)
- [ ] Delete with confirmation works
- [ ] Edit listing saves successfully
- [ ] Security: Can't edit others' listings
- [ ] Mobile responsive layout works

### Important Tests (Should Pass)
- [ ] Toast notifications appear
- [ ] Empty states display
- [ ] Loading states show
- [ ] Validation works
- [ ] Images upload/remove correctly
- [ ] Optimistic updates work

### Nice to Have (Good to Pass)
- [ ] Smooth animations
- [ ] Perfect mobile experience
- [ ] Fast loading times
- [ ] Graceful error handling

---

## 🐛 Bug Report Template

If you find issues, document them:

```
**Bug Title**: [Short description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Screenshots**:
[If applicable]

**Environment**:
- Browser: 
- Device: 
- Screen size: 
```

---

## 🎉 Testing Complete

Once all tests pass:
- [ ] Document any issues found
- [ ] Fix critical bugs
- [ ] Re-test fixed issues
- [ ] Mark feature as production-ready

**Status**: Ready for deployment ✅
