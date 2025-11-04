# Navigation System Documentation

## Overview

TradeHub features a responsive navigation system optimized for both desktop and mobile experiences.

## Components

### Desktop Navigation

#### Header (`/components/features/navigation/Header.tsx`)
- **Location**: Sticky top header
- **Features**:
  - Logo (links to home)
  - Search bar (full-width, max 600px)
  - Category dropdown menu
  - "Post Listing" CTA button
  - User menu (authenticated) or Sign In button (guest)

#### User Menu (`/components/features/navigation/UserMenu.tsx`)
- **Trigger**: User avatar/icon
- **Menu Items**:
  - User name and location
  - My Profile
  - My Listings
  - Post New Listing
  - Sign Out

#### Category Dropdown (`/components/features/navigation/CategoryDropdown.tsx`)
- **Trigger**: "Categories" button with icon
- **Content**: List of all categories with icons
- **Behavior**: Links to filtered homepage

### Mobile Navigation

#### Bottom Navigation Bar (`/components/features/navigation/BottomNav.tsx`)
- **Location**: Fixed bottom bar
- **Items**:
  1. **Home** - Navigate to homepage
  2. **Search** - Open search page
  3. **Post** - Create listing (center, elevated)
  4. **Messages** - Placeholder for future feature
  5. **Profile** - User profile (redirects to login if not authenticated)

#### Search Page (`/app/(main)/search/page.tsx`)
- **Route**: `/search`
- **Features**:
  - Full-screen search interface
  - Auto-focus search input
  - Recent searches (stored in localStorage)
  - Category grid for browsing
  - Search suggestions

#### Mobile Category Modal (`/components/features/navigation/MobileCategoryModal.tsx`)
- **Trigger**: Categories button (when implemented)
- **Display**: Full-screen modal with category grid
- **Layout**: 2-column grid with icons and names

## Utility Components

### Logo (`/components/ui/Logo.tsx`)
- Reusable logo component
- Props: `showText`, `className`, `iconClassName`, `textClassName`
- Always links to homepage

### Avatar (`/components/ui/Avatar.tsx`)
- User avatar with fallback
- Supports image URL or initials
- Sizes: `sm`, `md`, `lg`

### CategoryIcon (`/components/features/CategoryIcon.tsx`)
- Maps category slugs to Lucide icons
- Fallback to default icon if not found

## Responsive Behavior

### Desktop (≥768px)
- Top header with all navigation elements
- Search bar visible in header
- Category dropdown menu
- User menu dropdown
- No bottom navigation

### Mobile (<768px)
- Minimal top header (logo + sign in)
- Fixed bottom navigation bar
- Separate search page
- Full-screen category modal
- Content padding-bottom to avoid overlap with bottom nav

## Authentication States

### Authenticated Users
- **Desktop**: User menu with avatar
- **Mobile**: Profile icon in bottom nav
- Access to all features

### Guest Users
- **Desktop**: "Sign In" button + "Post Listing" CTA
- **Mobile**: "Sign In" button in header
- Protected actions redirect to `/login`

## Accessibility Features

- Semantic HTML elements (`<nav>`, `<header>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management in dropdowns
- Screen reader friendly
- Reduced motion support

## Performance Optimizations

- Client-side components for interactivity
- Lazy loading of category data
- localStorage for recent searches
- Minimal re-renders with proper state management
- Sticky positioning for smooth scrolling

## Styling

### Header
- `sticky top-0 z-50` - Always visible on scroll
- Backdrop blur for modern glass effect
- Border bottom for separation

### Bottom Navigation
- `fixed bottom-0 z-50` - Always accessible
- Elevated center button for primary action
- Active state highlighting
- Safe area padding for notched devices

### Transitions
- Smooth color transitions on hover
- Fade in/out animations for dropdowns
- Slide animations for mobile modals

## Local Storage

### Recent Searches
- **Key**: `tradehub_recent_searches`
- **Max Items**: 5
- **Format**: JSON array of strings
- **Actions**: Add, remove, clear all

## Routes

- `/` - Homepage
- `/search` - Mobile search page
- `/listings/create` - Create listing
- `/profile` - User profile
- `/profile/listings` - User's listings
- `/login` - Authentication
- `/messages` - Messages (placeholder)

## Future Enhancements

1. **Notifications Badge** - Unread message count
2. **Messages Feature** - Real-time messaging
3. **Search Filters** - Advanced filtering in search
4. **Category Icons** - Custom icon set
5. **Dark Mode Toggle** - Theme switcher
6. **Language Selector** - Multi-language support
7. **Location Selector** - Filter by location
8. **Saved Searches** - Persistent search queries

## Testing Checklist

- [ ] Desktop header displays correctly
- [ ] Mobile bottom nav is accessible
- [ ] Search functionality works
- [ ] Category dropdown loads categories
- [ ] User menu shows correct items
- [ ] Authentication state updates properly
- [ ] Recent searches persist
- [ ] Navigation is keyboard accessible
- [ ] Links navigate correctly
- [ ] Responsive breakpoints work
- [ ] Sign out functionality works
- [ ] Protected routes redirect to login

## Troubleshooting

### Categories not loading
- Check Supabase connection
- Verify `categories` table exists
- Check browser console for errors

### Recent searches not persisting
- Check localStorage is enabled
- Verify browser supports localStorage
- Check for quota exceeded errors

### Bottom nav overlapping content
- Ensure `pb-16 md:pb-0` on main element
- Check z-index conflicts
- Verify fixed positioning

### User menu not showing
- Check authentication state
- Verify profile data is loaded
- Check `useUser` hook implementation
