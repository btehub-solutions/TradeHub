# TradeHub Quick Reference

## 🚀 Start Development Server
```bash
npm run dev
```
Visit: http://localhost:3001

---

## 🔑 Environment Variables (.env.local)

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📍 Key Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Homepage with search | No |
| `/listings` | Browse all listings | No |
| `/listings/new` | Create listing | Yes |
| `/listings/[id]` | Listing detail | No |
| `/login` | Login page | No |
| `/profile` | User profile | Yes |
| `/search` | Search page | No |

---

## 🎨 Key Components

### Navigation
- `Header.tsx` - Main header with auth state
- `UserMenu.tsx` - User dropdown menu
- `BottomNav.tsx` - Mobile navigation

### Listings
- `ListingCard.tsx` - Listing display card
- `CreateListingForm.tsx` - Create listing form
- `SearchBar.tsx` - Search input component

### Auth
- `useUser.ts` - Auth hook
- `AuthProvider.tsx` - Auth context

---

## 🗄️ Database Tables

### profiles
- User profile information
- Linked to auth.users

### categories
- Listing categories (Electronics, Fashion, etc.)
- Pre-populated with 8 categories

### listings
- All listings
- Status: active, sold, inactive

### favorites
- User saved listings

### listing_views
- Analytics tracking

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Test database connection
npx tsx scripts/test-db-connection.ts
```

---

## 🐛 Quick Fixes

### Restart Dev Server
```bash
# Press Ctrl+C to stop
npm run dev
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Check Environment Variables
```bash
# Windows
Get-Content .env.local

# Mac/Linux
cat .env.local
```

---

## 📱 Test URLs

```
Homepage:           http://localhost:3001/
Browse Listings:    http://localhost:3001/listings
Search Results:     http://localhost:3001/listings?search=phone
Category Filter:    http://localhost:3001/listings?category=electronics
Create Listing:     http://localhost:3001/listings/new
Login:              http://localhost:3001/login
Profile:            http://localhost:3001/profile
```

---

## 🎯 Feature Status

✅ Homepage with functional search
✅ Authentication UI (login/logout)
✅ Browse listings
✅ Create listings
✅ Edit listings
✅ Delete listings
✅ Search functionality
✅ Category filters
✅ Price filters
✅ Location filters
✅ User profiles
✅ Responsive design
✅ Mobile navigation

---

## 📞 Support

- **Database Setup:** See `DATABASE_SETUP_GUIDE.md`
- **Complete Setup:** See `SETUP_COMPLETE.md`
- **Troubleshooting:** Check console errors first
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
