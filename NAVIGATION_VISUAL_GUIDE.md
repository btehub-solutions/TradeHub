# Navigation System - Visual Guide

## Desktop Layout (≥768px)

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo] [Search Bar..................] [Categories▼] [Post] [@] │ ← Sticky Header
└─────────────────────────────────────────────────────────────────┘
│                                                                   │
│                        Page Content                               │
│                                                                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
│                         Footer                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Header Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│  🛍️ TradeHub  │  🔍 Search...  │  📁 Categories  │  ➕ Post  │  👤  │
│               │                │                 │           │      │
│   Logo        │  Search Bar    │   Dropdown      │   CTA     │ User │
│  (Link Home)  │  (Desktop)     │   (Categories)  │  Button   │ Menu │
└─────────────────────────────────────────────────────────────────┘
```

### User Menu Dropdown (Authenticated)

```
┌──────────────────────────┐
│  👤 John Doe             │
│     📍 Lagos, Nigeria    │
├──────────────────────────┤
│  👤 My Profile           │
│  📋 My Listings          │
├──────────────────────────┤
│  ➕ Post New Listing     │
├──────────────────────────┤
│  🚪 Sign Out             │
└──────────────────────────┘
```

### Category Dropdown

```
┌──────────────────────────┐
│  📁 All Categories       │
│  📱 Electronics          │
│  💻 Computers            │
│  🏠 Real Estate          │
│  🚗 Vehicles             │
│  👕 Fashion              │
│  🛋️  Furniture           │
│  📚 Books                │
│  ⚽ Sports               │
│  👶 Baby & Kids          │
│  🔧 Tools                │
└──────────────────────────┘
```

## Mobile Layout (<768px)

```
┌─────────────────────────────────────┐
│  🛍️ TradeHub          [Sign In]    │ ← Minimal Header
└─────────────────────────────────────┘
│                                     │
│                                     │
│          Page Content               │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
│  🏠    🔍    [➕]    💬    👤      │ ← Fixed Bottom Nav
│ Home Search  Post  Msg  Profile    │
└─────────────────────────────────────┘
```

### Bottom Navigation Bar

```
┌─────────────────────────────────────┐
│                                     │
│  🏠      🔍      ⭕      💬      👤  │
│ Home   Search   Post   Msg   Profile│
│                  ↑                   │
│            Elevated Button           │
└─────────────────────────────────────┘
```

**States:**
- **Active**: Blue color, bold text
- **Inactive**: Gray color, normal text
- **Disabled**: Gray color, 50% opacity (Messages)

### Mobile Search Page (`/search`)

```
┌─────────────────────────────────────┐
│  🔍 [Search for items...]  [Cancel] │ ← Search Header
└─────────────────────────────────────┘
│                                     │
│  🕐 Recent Searches    [Clear All]  │
│  ┌─────────────────────────────┐   │
│  │ iPhone 13          [×]      │   │
│  │ Laptop             [×]      │   │
│  │ Sofa               [×]      │   │
│  └─────────────────────────────┘   │
│                                     │
│  📈 Browse by Category              │
│  ┌──────────┬──────────┐           │
│  │ 📱 Elec  │ 💻 Comp  │           │
│  ├──────────┼──────────┤           │
│  │ 🏠 Real  │ 🚗 Veh   │           │
│  ├──────────┼──────────┤           │
│  │ 👕 Fash  │ 🛋️  Furn │           │
│  └──────────┴──────────┘           │
│                                     │
└─────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
├── Header (Desktop + Mobile minimal)
│   ├── Logo
│   ├── SearchBar (Desktop only)
│   ├── CategoryDropdown (Desktop only)
│   ├── Button "Post Listing"
│   └── UserMenu (if authenticated)
│       └── Avatar
│
├── Main Content
│   └── Page Content (with pb-16 on mobile)
│
├── Footer
│
└── BottomNav (Mobile only)
    ├── NavItem: Home
    ├── NavItem: Search
    ├── NavItem: Post (elevated)
    ├── NavItem: Messages (disabled)
    └── NavItem: Profile
```

## Interaction Flows

### Desktop Search Flow

```
1. User types in search bar
   ↓
2. User presses Enter
   ↓
3. Navigate to /?search=query
   ↓
4. Homepage shows filtered results
```

### Mobile Search Flow

```
1. User taps Search icon in bottom nav
   ↓
2. Navigate to /search page
   ↓
3. Search input auto-focuses
   ↓
4. User types query
   ↓
5. User presses Enter or taps suggestion
   ↓
6. Navigate to /?search=query
   ↓
7. Homepage shows filtered results
```

### Category Selection Flow

**Desktop:**
```
1. User clicks "Categories" button
   ↓
2. Dropdown opens
   ↓
3. User clicks category
   ↓
4. Navigate to /?category=slug
```

**Mobile:**
```
1. User taps Search icon
   ↓
2. Scroll to categories section
   ↓
3. Tap category card
   ↓
4. Navigate to /?category=slug
```

### Authentication Flow

**Sign In:**
```
1. User clicks "Sign In" button
   ↓
2. Navigate to /login
   ↓
3. User completes authentication
   ↓
4. Redirect to previous page
   ↓
5. Navigation updates:
   - Desktop: Show user menu
   - Mobile: Profile icon active
```

**Sign Out:**
```
1. User opens menu and clicks "Sign Out"
   ↓
2. Supabase auth.signOut()
   ↓
3. Navigate to homepage
   ↓
4. Navigation updates to guest state
```

## Responsive Breakpoints

### Tailwind Breakpoints Used

- **Mobile**: `< 768px` (default)
- **Desktop**: `≥ 768px` (`md:` prefix)

### Key Responsive Classes

```css
/* Header Search Bar */
.hidden.md:block         /* Hidden on mobile, visible on desktop */

/* Bottom Navigation */
.md:hidden               /* Visible on mobile, hidden on desktop */

/* Content Padding */
.pb-16.md:pb-0          /* Bottom padding on mobile only */

/* Category Dropdown */
.hidden.md:flex         /* Hidden on mobile, flex on desktop */
```

## Color Scheme

### Primary Actions
- **Background**: `bg-primary` (Blue)
- **Text**: `text-primary-foreground` (White)
- **Hover**: `hover:bg-primary/90`

### Secondary Actions
- **Background**: `bg-secondary`
- **Text**: `text-secondary-foreground`
- **Hover**: `hover:bg-secondary/80`

### Navigation States
- **Active**: `text-primary` (Blue)
- **Inactive**: `text-muted-foreground` (Gray)
- **Hover**: `hover:text-foreground`

### Backgrounds
- **Header**: `bg-background/95` with backdrop blur
- **Bottom Nav**: `bg-background` solid
- **Cards**: `bg-card`

## Spacing & Sizing

### Header
- **Height**: `h-16` (64px)
- **Padding**: `px-4` (16px horizontal)

### Bottom Navigation
- **Height**: `h-16` (64px)
- **Icon Size**: `h-5 w-5` (20px)
- **Center Button**: `w-14 h-14` (56px)

### Search Bar
- **Height**: `h-10` (40px) desktop, `h-12` (48px) mobile
- **Max Width**: `max-w-xl` (576px) on desktop

### Dropdowns
- **Min Width**: `min-w-[8rem]` (128px)
- **Padding**: `p-1` (4px)
- **Item Padding**: `px-2 py-1.5`

## Z-Index Layers

```
z-50  ← Header, Bottom Nav, Modals
z-10  ← Sticky elements, Search header
z-0   ← Default content
```

## Accessibility Features

### Keyboard Navigation
- **Tab**: Move between elements
- **Enter/Space**: Activate buttons
- **Escape**: Close dropdowns/modals
- **Arrow Keys**: Navigate dropdown items

### ARIA Labels
```html
<button aria-label="Search">
<nav aria-label="Mobile navigation">
<button aria-current="page">
<button aria-label="Close categories">
```

### Focus Indicators
- **Ring**: `focus-visible:ring-2`
- **Color**: `focus-visible:ring-ring`
- **Offset**: `focus-visible:ring-offset-2`

## Performance Considerations

### Client Components
- All navigation components use `'use client'`
- Enables interactivity and state management
- Minimal impact on initial load

### Data Fetching
- Categories fetched on demand
- Cached in component state
- No unnecessary re-fetches

### Local Storage
- Recent searches stored locally
- No server requests needed
- Fast retrieval

### Lazy Loading
- Components render only when needed
- Dropdowns render content on open
- Search page loads on navigation

## Browser Support

### Tested On
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features Used
- CSS Grid
- Flexbox
- Backdrop Filter
- LocalStorage
- CSS Custom Properties

### Fallbacks
- No backdrop filter: Solid background
- No grid: Flexbox fallback
- No localStorage: In-memory only
