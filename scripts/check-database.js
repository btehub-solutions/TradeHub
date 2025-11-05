// Quick database check script
// Run: node scripts/check-database.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://abowohdwtaxywdfmcipk.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFib3dvaGR3dGF4eXdkZm1jaXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxODUwNDIsImV4cCI6MjA3Nzc2MTA0Mn0.VFWvc3iWqtmDRDBbFGiVFOgJEbaNY1VIuJAHhVM2Suw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking TradeHub Database...\n');

  try {
    // Check categories
    console.log('1️⃣ Checking categories...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');

    if (catError) {
      console.error('❌ Categories error:', catError.message);
      console.log('\n⚠️  Database tables might not be created yet!');
      console.log('📝 Please run the schema in Supabase SQL Editor:');
      console.log('   File: /supabase/schema.sql\n');
      return;
    }

    console.log(`✅ Found ${categories?.length || 0} categories`);
    if (categories && categories.length > 0) {
      categories.forEach(c => console.log(`   - ${c.name}`));
    }

    // Check listings
    console.log('\n2️⃣ Checking listings...');
    const { data: listings, error: listError, count } = await supabase
      .from('listings')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    if (listError) {
      console.error('❌ Listings error:', listError.message);
      return;
    }

    console.log(`✅ Found ${count || 0} active listings`);
    
    if (!listings || listings.length === 0) {
      console.log('\n📝 No listings found! Here\'s what to do:\n');
      console.log('OPTION 1: Add Demo Listings (Recommended)');
      console.log('   1. Get your user ID: SELECT id FROM auth.users;');
      console.log('   2. Edit /scripts/create-demo-listings.sql');
      console.log('   3. Replace YOUR_USER_ID_HERE with your ID');
      console.log('   4. Run the script in Supabase SQL Editor');
      console.log('   5. Refresh your app - you\'ll see 22 listings!\n');
      
      console.log('OPTION 2: Create Listing Manually');
      console.log('   1. Login to your app');
      console.log('   2. Click "Post Listing"');
      console.log('   3. Fill out the form');
      console.log('   4. Submit\n');
    } else {
      console.log('\n📋 Sample listings:');
      listings.slice(0, 5).forEach(l => {
        console.log(`   - ${l.title} (₦${l.price.toLocaleString()})`);
      });
    }

    // Check auth users
    console.log('\n3️⃣ Checking users...');
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      console.log(`✅ You are logged in as: ${user.email}`);
    } else {
      console.log('ℹ️  Not logged in (this is OK for checking)');
    }

    console.log('\n✅ Database connection successful!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDatabase();
