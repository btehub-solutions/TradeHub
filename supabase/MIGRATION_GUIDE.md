# Database Migration Guide

## Quick Start

Follow these steps to set up your TradeHub database:

### Step 1: Prerequisites

- [ ] Supabase account created at [supabase.com](https://supabase.com)
- [ ] New Supabase project created
- [ ] Project URL and anon key copied

### Step 2: Environment Setup

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Run Migration

#### Option A: Using Supabase Dashboard (Recommended)

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql`
5. Paste into the SQL editor
6. Click **Run** or press `Ctrl+Enter`
7. Verify success message

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

### Step 4: Verify Migration

Run these verification queries in the SQL Editor:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Expected output:
-- categories
-- favorites
-- listing_views
-- listings
-- profiles

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- All tables should have rowsecurity = true

-- Check default categories
SELECT name, slug FROM categories ORDER BY name;

-- Should return 8 categories
```

### Step 5: Test Database Access

Create a test file `test-db.ts`:

```typescript
import { createClient } from '@/lib/supabase/client';

async function testDatabase() {
  const supabase = createClient();
  
  // Test 1: Fetch categories
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');
  
  console.log('Categories:', categories);
  console.log('Error:', error);
}

testDatabase();
```

## Common Issues

### Issue: "relation does not exist"

**Solution**: The migration hasn't run successfully. Re-run the migration script.

### Issue: "permission denied for table"

**Solution**: RLS policies aren't set up correctly. Verify RLS is enabled:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_views ENABLE ROW LEVEL SECURITY;
```

### Issue: "duplicate key value violates unique constraint"

**Solution**: You're trying to insert duplicate data. This is normal if re-running the migration. The `ON CONFLICT DO NOTHING` clause should handle this for categories.

### Issue: TypeScript errors about missing types

**Solution**: Ensure dependencies are installed:

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install -D @types/node
```

## Database Schema Diagram

```
┌─────────────┐
│ auth.users  │
│ (Supabase)  │
└──────┬──────┘
       │
       │ references
       ▼
┌─────────────┐         ┌──────────────┐
│  profiles   │◄────────│  listings    │
│             │         │              │
│ - id        │         │ - id         │
│ - phone     │         │ - user_id    │
│ - name      │         │ - title      │
│ - location  │         │ - price      │
└──────┬──────┘         │ - status     │
       │                │ - images[]   │
       │                └──────┬───────┘
       │                       │
       │                       │ references
       │                       ▼
       │                ┌──────────────┐
       │                │ categories   │
       │                │              │
       │                │ - id         │
       │                │ - name       │
       │                │ - slug       │
       │                └──────────────┘
       │
       │ references
       ▼
┌─────────────┐         ┌──────────────┐
│ favorites   │         │listing_views │
│             │         │              │
│ - user_id   │         │ - listing_id │
│ - listing_id│         │ - viewer_id  │
└─────────────┘         │ - viewed_at  │
                        └──────────────┘
```

## Next Steps

After successful migration:

1. ✅ Test authentication flow
2. ✅ Create a test user profile
3. ✅ Create a test listing
4. ✅ Test RLS policies
5. ✅ Set up Cloudinary for image uploads
6. ✅ Configure email templates in Supabase Auth

## Rollback

If you need to rollback the migration:

```sql
-- WARNING: This will delete all data!

DROP TABLE IF EXISTS listing_views CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS increment_listing_views CASCADE;
```

## Support

If you encounter issues:

1. Check Supabase logs in the dashboard
2. Review RLS policies
3. Verify environment variables
4. Check the [Supabase Discord](https://discord.supabase.com)
