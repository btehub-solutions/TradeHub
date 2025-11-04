# Advanced Search & Filtering - Quick Start Guide

## 🚀 Getting Started

The advanced search and filtering system is now live on the TradeHub homepage. No additional setup required!

## 📱 How to Use

### For Users

#### **Desktop**
1. Visit the homepage
2. Use the search bar to search for items
3. Use the left sidebar to apply filters:
   - Select categories
   - Set price range
   - Choose location
   - Filter by condition
   - Change sort order
4. Active filters appear as chips below the search bar
5. Click X on any chip to remove that filter
6. Click "Clear all" to reset all filters

#### **Mobile**
1. Visit the homepage
2. Use the search bar to search for items
3. Tap the "Filters" button below the search bar
4. Bottom drawer slides up with all filter options
5. Apply your desired filters
6. Tap "Show X results" to close drawer and see results
7. Tap "Reset" to clear all filters

### Sharing Filtered Results
- Simply copy the URL from your browser
- The URL contains all active filters
- Share it with anyone - they'll see the same filtered results

## 🎯 Common Use Cases

### Find Cheap Electronics in Lagos
```
1. Type "laptop" in search bar
2. Select "Electronics" category
3. Set max price to ₦50,000
4. Type "Lagos" in location filter
5. Results update automatically
```

### Browse Brand New Items
```
1. Open filters
2. Check "Brand New" under Condition
3. Sort by "Newest First"
```

### Find Expensive Items First
```
1. Open filters
2. Select "Price: High to Low" under Sort By
```

## 🔧 For Developers

### Running the Project
```bash
npm install
npm run dev
```

### Key Components

**Filter Panel** - `/components/features/search/FilterPanel.tsx`
- Main filter interface
- Handles both desktop and mobile layouts

**Active Filters** - `/components/features/search/ActiveFilters.tsx`
- Displays active filter chips
- Handles individual filter removal

**API Route** - `/app/api/listings/route.ts`
- Processes filter parameters
- Returns filtered results

### Adding a New Filter

1. **Create Filter Component**
```tsx
// /components/features/search/MyNewFilter.tsx
export function MyNewFilter({ value, onChange }) {
  return (
    <div>
      {/* Your filter UI */}
    </div>
  );
}
```

2. **Add to FilterState Type**
```tsx
// In FilterPanel.tsx
export interface FilterState {
  // ... existing filters
  myNewFilter?: string;
}
```

3. **Add to FilterPanel**
```tsx
<FilterSection title="My New Filter">
  <MyNewFilter 
    value={filters.myNewFilter} 
    onChange={(value) => onChange({ ...filters, myNewFilter: value })}
  />
</FilterSection>
```

4. **Update API Route**
```tsx
// In /app/api/listings/route.ts
const myNewFilter = searchParams.get('my_new_filter');

if (myNewFilter) {
  query = query.eq('my_field', myNewFilter);
}
```

5. **Update URL Params**
```tsx
// In page.tsx updateURLParams function
if (newFilters.myNewFilter) {
  params.set('my_new_filter', newFilters.myNewFilter);
}
```

## 🧪 Testing

### Manual Testing
1. Apply various filter combinations
2. Check URL updates correctly
3. Copy URL and open in new tab - filters should persist
4. Test on mobile device
5. Try clearing individual filters
6. Test "Clear all" functionality

### Test Scenarios
- ✅ Search with no filters
- ✅ Search with single filter
- ✅ Search with multiple filters
- ✅ Clear individual filters
- ✅ Clear all filters
- ✅ Share filtered URL
- ✅ Mobile drawer interaction
- ✅ Pagination with filters

## 🐛 Common Issues

### Issue: Filters not applying
**Solution**: Check browser console for errors. Ensure API route is running.

### Issue: URL not updating
**Solution**: Verify Next.js router is imported and `router.push()` is called.

### Issue: Mobile drawer not opening
**Solution**: Check `showMobileFilters` state and click handler.

### Issue: Autocomplete not working
**Solution**: Ensure `/lib/data/locations.ts` is imported correctly.

## 📊 Performance Tips

1. **Debouncing** - Search is debounced at 500ms to reduce API calls
2. **Pagination** - Use "Load More" instead of loading all results
3. **Indexes** - Ensure database has proper indexes on filtered columns
4. **Caching** - Consider implementing client-side caching for categories

## 🎨 Customization

### Change Debounce Delay
```tsx
// In page.tsx
const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms instead of 500ms
```

### Add Price Presets
```tsx
// In PriceRangeFilter.tsx
const presets = [
  { label: 'Under ₦5,000', max: 5000 },
  { label: 'Under ₦20,000', max: 20000 },
  // Add more presets
];
```

### Customize Mobile Drawer Height
```tsx
// In FilterPanel.tsx
<div style={{ maxHeight: '90vh' }}> {/* Change from 85vh */}
```

## 📚 Related Documentation

- [Full Documentation](./ADVANCED_SEARCH_FILTERING.md)
- [API Documentation](./API.md)
- [Component Documentation](./COMPONENTS.md)

## 💡 Tips

- Use keyboard shortcuts: Tab to navigate filters, Enter to apply
- Filters are applied automatically - no need to click "Apply"
- URL params make it easy to bookmark favorite searches
- Mobile drawer can be closed by swiping down or tapping backdrop

---

**Need Help?** Check the full documentation or open an issue on GitHub.
