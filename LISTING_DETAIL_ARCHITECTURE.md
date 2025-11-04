# Listing Detail Page - Architecture

## Component Hierarchy

```
Page: /app/(main)/listings/[id]/page.tsx
│
├── Server Component (Page)
│   ├── Fetch listing data
│   ├── Fetch seller listings count
│   ├── Check ownership
│   ├── Generate SEO metadata
│   └── Render JSON-LD structured data
│
└── Client Component: ListingDetails
    │
    ├── Breadcrumb Navigation
    │   └── Home > Listings > Category > Title
    │
    ├── Left Column (2/3 width on desktop)
    │   │
    │   ├── ImageGallery Component
    │   │   ├── Main Image Display
    │   │   │   ├── Touch event handlers
    │   │   │   ├── Click to fullscreen
    │   │   │   └── Navigation arrows (desktop)
    │   │   │
    │   │   ├── Thumbnail Navigation
    │   │   │   └── Clickable thumbnails
    │   │   │
    │   │   └── Fullscreen Modal
    │   │       ├── Full-size image
    │   │       ├── Keyboard navigation
    │   │       ├── Touch gestures
    │   │       └── Close button
    │   │
    │   └── Listing Details Card
    │       ├── Title & Price
    │       ├── Condition & Category Badges
    │       ├── Info Grid (Location, Date, Views)
    │       ├── Description
    │       └── Owner Actions (if owner)
    │           ├── Edit button
    │           └── Delete button
    │
    └── Right Column (1/3 width on desktop)
        │
        ├── Contact Seller Card (if not owner)
        │   └── ContactSeller Component
        │       ├── WhatsApp Button
        │       ├── Call Button
        │       ├── Share Buttons
        │       └── Safety Notice
        │
        └── SellerInfoCard Component
            ├── Avatar
            ├── Seller Name
            ├── Location
            ├── Member Since
            ├── Active Listings Count
            ├── Bio
            └── View Profile Link
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser Request                          │
│                  /listings/[id]                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js Server Component                        │
│                                                              │
│  1. Fetch listing from Supabase                             │
│     - Join with profiles table                              │
│     - Join with categories table                            │
│                                                              │
│  2. Fetch seller listings count                             │
│                                                              │
│  3. Check if user is owner                                  │
│     - Get current user from Supabase Auth                   │
│     - Compare user_id with listing.user_id                  │
│                                                              │
│  4. Generate SEO metadata                                   │
│     - Title, description, keywords                          │
│     - Open Graph tags                                       │
│     - Twitter Cards                                         │
│     - JSON-LD structured data                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Render Client Component                         │
│              (ListingDetails)                                │
│                                                              │
│  Props passed:                                              │
│  - listing (with profiles & categories)                     │
│  - sellerListingsCount                                      │
│  - isOwner                                                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Client-Side Interactions                        │
│                                                              │
│  useEffect: Increment views (if not owner)                  │
│  ├─→ PATCH /api/listings/[id]                              │
│  └─→ { action: 'increment_views' }                         │
│                                                              │
│  WhatsApp Click:                                            │
│  ├─→ Track contact (API call)                              │
│  └─→ Open WhatsApp with pre-filled message                 │
│                                                              │
│  Call Click:                                                │
│  ├─→ Track contact (API call)                              │
│  └─→ Open phone dialer                                     │
│                                                              │
│  Share Click:                                               │
│  ├─→ Try native share API                                  │
│  └─→ Fallback to clipboard                                 │
│                                                              │
│  Image Gallery:                                             │
│  ├─→ Touch events for swipe                                │
│  ├─→ Click for fullscreen                                  │
│  └─→ Keyboard navigation                                   │
└─────────────────────────────────────────────────────────────┘
```

## API Routes

```
┌─────────────────────────────────────────────────────────────┐
│         GET /api/listings/[id]                              │
│                                                              │
│  1. Fetch listing with joins                                │
│  2. Validate listing exists and is active                   │
│  3. Get seller listings count                               │
│  4. Check ownership                                         │
│  5. Return JSON response                                    │
│                                                              │
│  Response:                                                  │
│  {                                                          │
│    listing: { ...listing, profiles, categories },          │
│    sellerListingsCount: number,                            │
│    isOwner: boolean                                        │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│        PATCH /api/listings/[id]                             │
│                                                              │
│  Body: { action: 'increment_views' }                        │
│                                                              │
│  1. Call increment_listing_views() function                 │
│  2. Insert into listing_views table                         │
│  3. Return success response                                 │
│                                                              │
│  Response:                                                  │
│  { success: true }                                          │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│                    listings                                  │
├─────────────────────────────────────────────────────────────┤
│ id              UUID (PK)                                   │
│ user_id         UUID (FK → profiles.id)                     │
│ title           TEXT                                        │
│ description     TEXT                                        │
│ price           NUMERIC                                     │
│ category_id     UUID (FK → categories.id)                   │
│ condition       ENUM (new, like_new, good, fair, poor)     │
│ location        TEXT                                        │
│ state           TEXT                                        │
│ images          TEXT[]                                      │
│ status          ENUM (active, sold, inactive)               │
│ views           INTEGER                                     │
│ created_at      TIMESTAMP                                   │
│ updated_at      TIMESTAMP                                   │
└─────────────────────────────────────────────────────────────┘
                      │
                      │ user_id
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    profiles                                  │
├─────────────────────────────────────────────────────────────┤
│ id              UUID (PK)                                   │
│ phone_number    TEXT                                        │
│ full_name       TEXT                                        │
│ avatar_url      TEXT                                        │
│ location        TEXT                                        │
│ state           TEXT                                        │
│ bio             TEXT                                        │
│ whatsapp_number TEXT                                        │
│ created_at      TIMESTAMP                                   │
│ updated_at      TIMESTAMP                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   categories                                 │
├─────────────────────────────────────────────────────────────┤
│ id              UUID (PK)                                   │
│ name            TEXT                                        │
│ slug            TEXT                                        │
│ description     TEXT                                        │
│ icon            TEXT                                        │
│ created_at      TIMESTAMP                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 listing_views                                │
├─────────────────────────────────────────────────────────────┤
│ id              UUID (PK)                                   │
│ listing_id      UUID (FK → listings.id)                     │
│ viewer_id       UUID (FK → profiles.id, nullable)           │
│ viewed_at       TIMESTAMP                                   │
└─────────────────────────────────────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│              ImageGallery Component State                    │
├─────────────────────────────────────────────────────────────┤
│ selectedIndex    number    - Current image index            │
│ touchStart       number    - Touch start position           │
│ touchEnd         number    - Touch end position             │
│ isFullscreen     boolean   - Fullscreen mode active         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│             ContactSeller Component State                    │
├─────────────────────────────────────────────────────────────┤
│ copied           boolean   - Link copied feedback           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            ListingDetails Component State                    │
├─────────────────────────────────────────────────────────────┤
│ viewsIncremented boolean   - Prevent duplicate tracking     │
└─────────────────────────────────────────────────────────────┘
```

## Image Optimization Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  Image URL in Database                       │
│  https://res.cloudinary.com/.../upload/v123/image.jpg      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Extract Public ID                               │
│              "v123/image.jpg"                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│           Apply Cloudinary Transformations                   │
│                                                              │
│  Main Image:                                                │
│  - Width: 1200px                                            │
│  - Quality: 85%                                             │
│  - Format: auto (WebP/AVIF)                                 │
│                                                              │
│  Thumbnails:                                                │
│  - Width: 200px                                             │
│  - Quality: 70%                                             │
│  - Format: auto                                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Optimized Image URL                             │
│  https://res.cloudinary.com/.../w_1200,q_85,f_auto/...     │
└─────────────────────────────────────────────────────────────┘
```

## Responsive Layout

```
Mobile (< 768px)
┌─────────────────────────────────────┐
│          Breadcrumb                 │
├─────────────────────────────────────┤
│                                     │
│         Image Gallery               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       Listing Details               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      Contact Seller                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       Seller Info                   │
│                                     │
└─────────────────────────────────────┘

Desktop (> 1024px)
┌─────────────────────────────────────────────────────────────┐
│                      Breadcrumb                              │
├──────────────────────────────────────┬──────────────────────┤
│                                      │                      │
│         Image Gallery                │  Contact Seller      │
│                                      │  (Sticky)            │
│                                      │                      │
├──────────────────────────────────────┤                      │
│                                      │                      │
│       Listing Details                ├──────────────────────┤
│                                      │                      │
│                                      │   Seller Info        │
│                                      │   (Sticky)           │
│                                      │                      │
└──────────────────────────────────────┴──────────────────────┘
```

## Event Flow - Contact Tracking

```
User clicks WhatsApp button
        │
        ▼
┌─────────────────────────────────────┐
│   handleWhatsAppClick()             │
│                                     │
│   1. Track contact                  │
│      ├─→ fetch('/api/listings/id') │
│      └─→ PATCH { action: ... }     │
│                                     │
│   2. Open WhatsApp                  │
│      └─→ window.open(whatsapp_url) │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│   API Route Handler                 │
│                                     │
│   1. increment_listing_views()      │
│   2. Insert into listing_views      │
│   3. Return success                 │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│   WhatsApp Opens                    │
│   - Pre-filled message              │
│   - Seller's phone number           │
└─────────────────────────────────────┘
```

## SEO Metadata Generation

```
Server Component (generateMetadata)
        │
        ▼
┌─────────────────────────────────────┐
│   Fetch listing data                │
└─────────┬───────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│   Generate metadata object:         │
│                                     │
│   - title                           │
│   - description (truncated)         │
│   - keywords (array)                │
│   - openGraph                       │
│     ├─ title                        │
│     ├─ description                  │
│     ├─ images                       │
│     ├─ url                          │
│     └─ siteName                     │
│   - twitter                         │
│     ├─ card                         │
│     ├─ title                        │
│     ├─ description                  │
│     └─ images                       │
│   - alternates                      │
│     └─ canonical                    │
└─────────┬───────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│   Next.js injects into <head>      │
│   - <title>                         │
│   - <meta> tags                     │
│   - <link rel="canonical">          │
└─────────────────────────────────────┘
```

## Security Considerations

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Server-Side Validation                                  │
│     - Check listing exists                                  │
│     - Verify status is 'active'                             │
│     - Validate ownership for actions                        │
│                                                              │
│  2. Client-Side Protection                                  │
│     - Sanitize user input                                   │
│     - Validate phone numbers                                │
│     - Prevent XSS in description                            │
│                                                              │
│  3. Database Security                                       │
│     - Row Level Security (RLS)                              │
│     - Foreign key constraints                               │
│     - Input validation                                      │
│                                                              │
│  4. API Security                                            │
│     - Rate limiting (future)                                │
│     - CSRF protection                                       │
│     - Authentication checks                                 │
└─────────────────────────────────────────────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│              Performance Strategies                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Image Optimization                                      │
│     - Cloudinary transformations                            │
│     - Responsive sizes                                      │
│     - Lazy loading                                          │
│     - Modern formats (WebP/AVIF)                            │
│                                                              │
│  2. Code Splitting                                          │
│     - Dynamic imports                                       │
│     - Component-level splitting                             │
│     - Route-based splitting                                 │
│                                                              │
│  3. Server-Side Rendering                                   │
│     - Pre-render metadata                                   │
│     - Fetch data on server                                  │
│     - Reduce client-side work                               │
│                                                              │
│  4. Caching                                                 │
│     - Browser caching                                       │
│     - CDN caching (Cloudinary)                              │
│     - API response caching (future)                         │
└─────────────────────────────────────────────────────────────┘
```

This architecture provides a scalable, performant, and maintainable solution for the listing detail page.
