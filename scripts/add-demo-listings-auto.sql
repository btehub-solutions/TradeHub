-- Automatic Demo Listings Creator
-- This will create listings using the first user in your database
-- Just run this in Supabase SQL Editor!

-- Create demo listings for the first user
DO $$
DECLARE
  first_user_id UUID;
BEGIN
  -- Get the first user ID
  SELECT id INTO first_user_id FROM auth.users LIMIT 1;
  
  IF first_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found! Please create an account first.';
  END IF;

  -- Electronics
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'MacBook Pro 14" M2 Pro - 16GB RAM', 'Barely used MacBook Pro with M2 Pro chip. Perfect for developers. Includes original box and charger. No scratches, pristine condition.', 850000, (SELECT id FROM categories WHERE slug = 'electronics'), 'like_new', 'Lekki Phase 1', 'Lagos', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'], 'active'),
  (first_user_id, 'Sony WH-1000XM5 Headphones', 'Premium wireless headphones with noise cancellation. 30-hour battery. Used 2 months. Comes with case and accessories.', 125000, (SELECT id FROM categories WHERE slug = 'electronics'), 'like_new', 'Victoria Island', 'Lagos', ARRAY['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'], 'active'),
  (first_user_id, 'Samsung 55" 4K QLED Smart TV', 'Stunning 4K display with Quantum HDR. Smart TV with Netflix, Prime Video. Wall mount included. Moving abroad!', 320000, (SELECT id FROM categories WHERE slug = 'electronics'), 'good', 'Ikeja GRA', 'Lagos', ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'], 'active');

  -- Fashion
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'Nike Air Jordan 1 "Chicago" Size 43', 'Authentic Air Jordan 1 in Chicago colorway. Worn twice. Comes with original box and extra laces. Perfect for collectors.', 95000, (SELECT id FROM categories WHERE slug = 'fashion'), 'like_new', 'Surulere', 'Lagos', ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'], 'active'),
  (first_user_id, 'Gucci Marmont Leather Bag', 'Authentic Gucci bag in black. Purchased from Dubai with receipt. Excellent condition with dust bag.', 280000, (SELECT id FROM categories WHERE slug = 'fashion'), 'good', 'Lekki', 'Lagos', ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd8?w=800&q=80'], 'active');

  -- Furniture
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'Modern L-Shaped Sofa - Grey', 'Beautiful 6-seater L-shaped sofa. Very comfortable. No stains. Delivery available within Lagos.', 180000, (SELECT id FROM categories WHERE slug = 'furniture'), 'good', 'Ajah', 'Lagos', ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'], 'active'),
  (first_user_id, 'Executive Office Desk - Mahogany', 'Solid wood executive desk with 3 drawers. Perfect for home office. 150cm x 75cm.', 95000, (SELECT id FROM categories WHERE slug = 'furniture'), 'good', 'Ikeja', 'Lagos', ARRAY['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'], 'active');

  -- Phones
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'iPhone 14 Pro Max 256GB Deep Purple', 'Unlocked iPhone 14 Pro Max. Battery 98%. Includes box and charger. Always used with case.', 650000, (SELECT id FROM categories WHERE slug = 'phones'), 'like_new', 'Victoria Island', 'Lagos', ARRAY['https://images.unsplash.com/photo-1678652197950-1e6754b4d7ac?w=800&q=80'], 'active'),
  (first_user_id, 'Samsung Galaxy S23 Ultra 512GB', 'Flagship Samsung with S Pen. Excellent camera. Comes with case and screen protector.', 580000, (SELECT id FROM categories WHERE slug = 'phones'), 'like_new', 'Lekki', 'Lagos', ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'], 'active');

  -- Vehicles
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'Toyota Camry 2018 LE - Low Mileage', 'Clean Camry 2018. 45,000km. First owner. AC cold. No accident. Papers complete.', 8500000, (SELECT id FROM categories WHERE slug = 'vehicles'), 'good', 'Ikeja', 'Lagos', ARRAY['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80'], 'active'),
  (first_user_id, 'Honda Accord 2020 Sport Edition', 'Fully loaded with leather, sunroof, navigation. 38,000km. Relocating abroad.', 12500000, (SELECT id FROM categories WHERE slug = 'vehicles'), 'like_new', 'Lekki', 'Lagos', ARRAY['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'], 'active');

  -- Home & Garden
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'LG Inverter AC 1.5HP', 'Energy efficient, quiet. Used 1 year. Still under warranty. Includes installation kit.', 185000, (SELECT id FROM categories WHERE slug = 'home-garden'), 'like_new', 'Ajah', 'Lagos', ARRAY['https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80'], 'active'),
  (first_user_id, 'Bosch Washing Machine 7kg', 'Front load, fully automatic. Multiple wash programs. Well maintained. Delivery available.', 165000, (SELECT id FROM categories WHERE slug = 'home-garden'), 'good', 'Surulere', 'Lagos', ARRAY['https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80'], 'active');

  -- Sports
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'Foldable Electric Treadmill', 'LCD display, multiple speeds. Used 6 months. Max weight 120kg. Delivery available.', 145000, (SELECT id FROM categories WHERE slug = 'sports'), 'good', 'Ikeja', 'Lagos', ARRAY['https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80'], 'active'),
  (first_user_id, 'Complete Home Gym Set', 'Adjustable bench, dumbbells 5-25kg, barbell 50kg, resistance bands, yoga mat. Barely used.', 95000, (SELECT id FROM categories WHERE slug = 'sports'), 'like_new', 'Lekki', 'Lagos', ARRAY['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'], 'active');

  -- Books
  INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
  (first_user_id, 'Medical Textbooks Bundle MBBS', '15 books for MBBS 1st-3rd year. Anatomy, Physiology, Biochemistry, more. Minimal highlighting.', 85000, (SELECT id FROM categories WHERE slug = 'books'), 'good', 'Yaba', 'Lagos', ARRAY['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'], 'active'),
  (first_user_id, 'Programming Books Collection', 'Python, JavaScript, React books. Total 8 books. Perfect for developers. Very good condition.', 35000, (SELECT id FROM categories WHERE slug = 'books'), 'good', 'Surulere', 'Lagos', ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'], 'active');

  RAISE NOTICE '✅ Created 16 demo listings successfully!';
END $$;

-- Verify
SELECT COUNT(*) as total_listings FROM listings WHERE status = 'active';
