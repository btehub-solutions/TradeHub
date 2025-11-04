# Advanced Search and Filtering System

## Overview

TradeHub now features a comprehensive advanced search and filtering system that allows users to find listings quickly and efficiently. The system includes text search, multiple filter types, sorting options, and a responsive UI that works seamlessly on both desktop and mobile devices.

## Features Implemented

### 1. **Text Search**
- Search across listing titles and descriptions
- Debounced input (500ms) to reduce API calls
- Real-time result count updates
- Search query preserved in URL for sharing

### 2. **Filter Types**

#### **Category Filter**
- Multiple category selection via checkboxes
- Visual feedback for selected categories
- Scrollable list for many categories

#### **Location Filter**
- Autocomplete search for Nigerian cities and states
- Comprehensive database of Nigerian locations
- Supports "City, State" format
- Smart matching for both cities and states

#### **Price Range Filter**
- Min/Max price inputs
- Quick preset buttons:
  - Under ₦10,000
  - ₦10,000 - ₦50,000
  - ₦50,000 - ₦100,000
  - Over ₦100,000

#### **Condition Filter**
- Multiple condition selection
- Options: Brand New, Like New, Good, Fair, Poor
- Checkbox-based selection

#### **Sort Options**
- Newest First (default)
- Price: Low to High
- Price: High to Low
- Oldest First

### 3. **User Interface**

#### **Desktop Experience**
- Left sidebar with all filters
- Sticky positioning for easy access
- Collapsible filter sections
- Filter count badges
- Reset button for quick clearing

#### **Mobile Experience**
- Bottom drawer that slides up
- Swipe-to-close functionality
- Filter button with badge count
- Apply/Reset buttons in drawer footer
- One-handed friendly design

#### **Active Filters Display**
- Chips/tags showing active filters
- Individual remove buttons on each chip
- "Clear all" button
- Displayed below search bar

### 4. **URL Integration**
- All filters reflected in URL parameters
- Shareable filtered URLs
- Browser back/forward navigation support
- Filters persist on page refresh

### 5. **Performance Optimizations**
- Debounced search (500ms delay)
- Only fetches when filters actually change
- Efficient Supabase queries
- Loading states during filter application
- Pagination support with "Load More"

## File Structure

```
lib/
├── data/
│   └── locations.ts              # Nigerian locations database
├── hooks/
│   └── useDebounce.ts            # Debounce hook for search

components/features/search/
├── FilterPanel.tsx               # Main filter panel (desktop/mobile)
├── ActiveFilters.tsx             # Active filter chips display
├── PriceRangeFilter.tsx          # Price range filter component
├── LocationFilter.tsx            # Location autocomplete filter
├── ConditionFilter.tsx           # Condition checkbox filter
├── CategoryFilterCheckbox.tsx    # Category checkbox filter
└── SortByFilter.tsx              # Sort options component

app/
├── (main)/
│   └── page.tsx                  # Updated homepage with filters
└── api/
    └── listings/
        └── route.ts              # Updated API with filter support
```

## API Parameters

The `/api/listings` endpoint now supports the following query parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (title + description) |
| `categories` | string | Comma-separated category IDs |
| `conditions` | string | Comma-separated condition values |
| `price_min` | number | Minimum price filter |
| `price_max` | number | Maximum price filter |
| `location` | string | City or state to filter by |
| `sort` | string | Sort option (newest, price_low_high, price_high_low, oldest) |
| `limit` | number | Number of results per page (default: 20) |
| `offset` | number | Pagination offset (default: 0) |

### Example API Calls

```javascript
// Search for "laptop" in Lagos
GET /api/listings?q=laptop&location=Lagos

// Electronics under ₦50,000, brand new condition
GET /api/listings?categories=electronics-id&price_max=50000&conditions=new

// Sort by price low to high
GET /api/listings?sort=price_low_high

// Multiple filters combined
GET /api/listings?q=phone&categories=cat1,cat2&location=Abuja&price_min=10000&price_max=50000&conditions=new,like_new&sort=price_low_high
```

## Usage Examples

### Basic Search
1. User types "iPhone" in search bar
2. After 500ms debounce, search executes
3. Results update automatically
4. URL updates to `/?q=iPhone`

### Applying Filters
1. User opens filter panel (desktop sidebar or mobile drawer)
2. Selects "Electronics" category
3. Sets price range ₦10,000 - ₦50,000
4. Selects "Lagos" location
5. Chooses "Brand New" condition
6. URL updates to `/?categories=electronics-id&price_min=10000&price_max=50000&location=Lagos&conditions=new`

### Sharing Filtered Results
1. User applies multiple filters
2. Copies URL from browser
3. Shares URL with friend
4. Friend opens URL and sees same filtered results

### Clearing Filters
- Click individual X on filter chips
- Click "Clear all" button
- Click "Reset" in filter panel

## Nigerian Locations Database

The system includes a comprehensive database of Nigerian states and major cities:

- **37 States** including FCT
- **150+ Major Cities**
- Autocomplete suggestions
- Smart search (matches both city and state names)

### Location Data Structure

```typescript
interface NigerianLocation {
  state: string;
  cities: string[];
}
```

### Search Functions

```typescript
// Search locations with autocomplete
searchLocations(query: string, limit?: number)

// Get cities by state
getCitiesByState(state: string): string[]
```

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 768px (bottom drawer)
- **Desktop**: ≥ 768px (left sidebar)

### Mobile Features
- Touch-friendly filter controls
- Swipe gesture to close drawer
- Full-screen drawer overlay
- Apply/Reset buttons for confirmation
- Filter count badge on button

## Performance Considerations

### Debouncing
- Search input debounced at 500ms
- Prevents excessive API calls
- Smooth user experience

### Query Optimization
- Efficient Supabase queries with proper indexing
- Only fetches necessary data
- Pagination for large result sets

### Loading States
- Skeleton loaders during initial load
- Loading spinner for "Load More"
- Disabled states during API calls

## Future Enhancements

### Planned Features
1. **Save Search** - Allow users to save filter combinations
2. **Geolocation** - "Nearby" filter using user's location
3. **Advanced Filters**:
   - Date range (posted within last week/month)
   - Seller rating filter
   - Verified sellers only
4. **Filter Presets** - Quick access to popular filter combinations
5. **Search History** - Recent searches dropdown

## Testing Checklist

- [ ] Text search works across title and description
- [ ] Debouncing prevents excessive API calls
- [ ] Multiple categories can be selected
- [ ] Location autocomplete shows relevant suggestions
- [ ] Price range filters work correctly
- [ ] Condition filters apply properly
- [ ] Sort options change result order
- [ ] URL params update when filters change
- [ ] Shared URLs load with correct filters
- [ ] Active filter chips display correctly
- [ ] Individual filter removal works
- [ ] "Clear all" removes all filters
- [ ] Desktop sidebar is sticky and scrollable
- [ ] Mobile drawer opens/closes smoothly
- [ ] Mobile drawer can be swiped closed
- [ ] Filter count badge updates correctly
- [ ] Pagination works with filters
- [ ] Loading states display properly
- [ ] Empty states show appropriate messages
- [ ] Browser back/forward navigation works

## Troubleshooting

### Filters Not Working
1. Check browser console for errors
2. Verify API route is receiving correct parameters
3. Check Supabase query construction
4. Ensure database has proper indexes

### URL Not Updating
1. Verify Next.js router is imported correctly
2. Check `updateURLParams` function
3. Ensure `router.push` is called with correct params

### Mobile Drawer Not Opening
1. Check `showMobileFilters` state
2. Verify click handler on filter button
3. Check CSS transitions and z-index

### Autocomplete Not Showing
1. Verify locations data is imported
2. Check `searchLocations` function
3. Ensure dropdown z-index is high enough

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Accessibility

- Keyboard navigation supported
- ARIA labels on interactive elements
- Screen reader friendly
- Focus management in modals
- High contrast mode compatible

---

**Last Updated**: November 2025
**Version**: 1.0.0
