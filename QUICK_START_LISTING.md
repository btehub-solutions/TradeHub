# Quick Start Guide - Listing Creation Feature

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Supabase project set up
- Cloudinary account created

### 1. Install Dependencies
All required dependencies are already in `package.json`:
```bash
npm install
```

### 2. Configure Environment Variables
Create or update `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Set Up Cloudinary Upload Preset
1. Go to https://cloudinary.com/console
2. Navigate to **Settings** > **Upload**
3. Scroll to **Upload presets**
4. Click **Add upload preset**
5. Configure:
   - **Preset name**: `tradehub_preset`
   - **Signing mode**: Unsigned
   - **Folder**: `tradehub`
6. Click **Save**

### 4. Verify Database Schema
Ensure your Supabase database has the `listings` table. Run the schema from `supabase/schema.sql` if needed.

### 5. Run the Development Server
```bash
npm run dev
```

### 6. Test the Feature
1. Navigate to http://localhost:3000/login
2. Log in with your account
3. Go to http://localhost:3000/listings/new
4. Fill out the form and upload images
5. Submit and verify the listing is created

## 📋 Feature Checklist

### Form Fields
- [x] Title (3-100 chars)
- [x] Description (10-500 chars)
- [x] Price (NGN)
- [x] Category (dropdown from DB)
- [x] Condition (new/like_new/good/fair/poor)
- [x] Location (city/area)
- [x] State (Nigerian states)

### Image Upload
- [x] Drag & drop support
- [x] 1-5 images required
- [x] Max 5MB per image
- [x] JPG, PNG, WebP formats
- [x] Client-side compression
- [x] Preview thumbnails
- [x] Reorder images
- [x] Delete images
- [x] Upload progress bar

### Form Validation
- [x] React Hook Form
- [x] Zod schema validation
- [x] Real-time validation
- [x] Inline error messages
- [x] Character counters

### API & Backend
- [x] POST /api/listings
- [x] Image upload to Cloudinary
- [x] Save to Supabase
- [x] Authentication check
- [x] Error handling

### UI/UX
- [x] Multi-step form
- [x] Progress indicator
- [x] Mobile-optimized
- [x] Loading states
- [x] Success screen
- [x] Share functionality

## 🎯 Quick Test

### Test Image Upload
1. Go to `/listings/new`
2. Drag and drop an image
3. Verify:
   - Preview appears
   - File size is shown
   - Compression savings displayed (if applicable)
   - Can reorder by dragging
   - Can delete with X button

### Test Form Validation
1. Try submitting empty form → Should show errors
2. Enter title with 2 chars → Should show "minimum 3 characters"
3. Enter description with 9 chars → Should show "minimum 10 characters"
4. Enter negative price → Should show error
5. Skip category → Should show "required" error

### Test Full Flow
1. Fill all fields correctly
2. Upload 2-3 images
3. Click "Continue to Images"
4. Click "Continue to Review"
5. Review listing preview
6. Click "Post Listing"
7. Wait for upload (progress bar)
8. Verify success screen appears
9. Click "View Listing" → Should redirect to listing detail page

## 🔧 Troubleshooting

### "Failed to upload image"
- Check Cloudinary credentials
- Verify upload preset exists and is unsigned
- Check browser console for detailed error

### "Unauthorized" error
- Ensure you're logged in
- Check Supabase auth token
- Verify middleware is working

### Images not compressing
- Check browser compatibility (needs Canvas API)
- Verify file is actually an image
- Check console for compression errors

### Form not submitting
- Check all required fields are filled
- Verify at least 1 image is uploaded
- Check Network tab for API errors

## 📱 Mobile Testing

Test on mobile devices or use browser DevTools:
1. Toggle device toolbar (Ctrl+Shift+M)
2. Select mobile device (iPhone, Android)
3. Test touch interactions:
   - Tap to upload images
   - Scroll through form
   - Drag to reorder images
   - Submit form

## 🎨 Customization

### Change Image Limits
Edit `components/listings/ImageUpload.tsx`:
```typescript
maxImages={5}  // Change to desired number
maxSizeMB={5}  // Change max file size
```

### Adjust Compression Settings
Edit `lib/utils/image-compression.ts`:
```typescript
const DEFAULT_OPTIONS = {
  maxWidth: 1920,    // Change max width
  maxHeight: 1920,   // Change max height
  quality: 0.8,      // Change quality (0-1)
  maxSizeMB: 5,      // Change max size
};
```

### Modify Validation Rules
Edit `lib/validations/listing.ts`:
```typescript
title: z.string().min(3).max(100),  // Adjust limits
description: z.string().min(10).max(500),
```

## 📊 Monitoring

### Check Cloudinary Usage
- Go to Cloudinary Dashboard
- View uploaded images in `tradehub` folder
- Monitor storage and bandwidth usage

### Check Supabase Database
- Go to Supabase Dashboard
- Navigate to Table Editor > listings
- Verify new listings are being created

### Check API Logs
- View browser Network tab
- Check POST /api/listings requests
- Verify 201 status code on success

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Images not uploading | Check Cloudinary preset is "Unsigned" |
| Form validation failing | Verify all required fields filled |
| Slow upload | Images are being compressed, wait for progress |
| Can't reorder images | Use drag handle, ensure not on mobile Safari |
| Success screen not showing | Check API response in Network tab |

## 📞 Need Help?

1. Check `LISTING_CREATION_FEATURE.md` for detailed documentation
2. Review browser console for errors
3. Check Network tab for API responses
4. Verify environment variables are set correctly

---

**Ready to go!** Navigate to `/listings/new` and start creating listings! 🎉
