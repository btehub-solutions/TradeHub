/**
 * Test Database Connection Script
 * Run this to verify your Supabase connection is working
 * 
 * Usage: npx tsx scripts/test-db-connection.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.log('\nPlease add:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Check categories
    console.log('1️⃣ Checking categories table...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');

    if (catError) {
      console.error('❌ Categories error:', catError.message);
    } else {
      console.log(`✅ Found ${categories?.length || 0} categories`);
      if (categories && categories.length > 0) {
        console.log('   Categories:', categories.map(c => c.name).join(', '));
      }
    }

    // Test 2: Check listings
    console.log('\n2️⃣ Checking listings table...');
    const { data: listings, error: listError, count } = await supabase
      .from('listings')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .limit(5);

    if (listError) {
      console.error('❌ Listings error:', listError.message);
    } else {
      console.log(`✅ Found ${count || 0} active listings`);
      if (listings && listings.length > 0) {
        console.log('   Sample listings:');
        listings.forEach(l => {
          console.log(`   - ${l.title} (₦${l.price})`);
        });
      } else {
        console.log('   ℹ️  No listings yet - database is empty');
      }
    }

    // Test 3: Check profiles
    console.log('\n3️⃣ Checking profiles table...');
    const { data: profiles, error: profError } = await supabase
      .from('profiles')
      .select('id, full_name')
      .limit(5);

    if (profError) {
      console.error('❌ Profiles error:', profError.message);
    } else {
      console.log(`✅ Found ${profiles?.length || 0} profiles`);
    }

    console.log('\n✅ Database connection successful!');
    console.log('\n📝 Next steps:');
    if (!listings || listings.length === 0) {
      console.log('   1. Create a user account (sign up)');
      console.log('   2. Create some test listings');
      console.log('   3. Browse listings page should show them');
    } else {
      console.log('   1. Visit http://localhost:3001');
      console.log('   2. Click "Browse Listings"');
      console.log('   3. You should see your listings!');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testConnection();
