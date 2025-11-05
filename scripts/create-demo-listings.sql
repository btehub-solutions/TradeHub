-- ============================================
-- TradeHub Demo Listings
-- ============================================
-- Beautiful, realistic demo listings for all categories
-- 
-- INSTRUCTIONS:
-- 1. First, create a user account in your app (sign up)
-- 2. Get your user ID by running: SELECT id, email FROM auth.users;
-- 3. Replace 'YOUR_USER_ID_HERE' below with your actual user ID
-- 4. Run this script in Supabase SQL Editor
-- ============================================

-- ELECTRONICS (3 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'MacBook Pro 14" M2 Pro - 16GB RAM, 512GB SSD',
  'Barely used MacBook Pro with M2 Pro chip. Perfect for developers and content creators. Includes original box, charger, and all accessories. AppleCare+ valid until 2025. No scratches, pristine condition. Selling because I upgraded to M3.',
  850000,
  (SELECT id FROM categories WHERE slug = 'electronics'),
  'like_new',
  'Lekki Phase 1',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Sony WH-1000XM5 Noise Cancelling Headphones - Black',
  'Premium wireless headphones with industry-leading noise cancellation. Crystal clear sound quality, 30-hour battery life, multipoint connection. Used for only 2 months. Comes with carrying case, cables, and all original accessories. Perfect condition.',
  125000,
  (SELECT id FROM categories WHERE slug = 'electronics'),
  'like_new',
  'Victoria Island',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Samsung 55" 4K QLED Smart TV (2023 Model)',
  'Stunning 4K QLED display with Quantum HDR and 120Hz refresh rate. Perfect for gaming and movies. Smart TV with built-in Netflix, Prime Video, Disney+. Excellent condition, barely used. Wall mount bracket included. Moving abroad, must sell quickly!',
  320000,
  (SELECT id FROM categories WHERE slug = 'electronics'),
  'good',
  'Ikeja GRA',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'
  ],
  'active'
);

-- FASHION (3 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'Nike Air Jordan 1 Retro High OG "Chicago" - Size 43',
  'Authentic Nike Air Jordan 1 in iconic Chicago colorway. Size 43 (US 9.5). Worn only twice for photos, practically brand new. Comes with original box, extra laces, and authenticity card. A must-have for sneaker collectors. No trades please.',
  95000,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'like_new',
  'Surulere',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Gucci Marmont Leather Crossbody Bag - Authentic',
  '100% Authentic Gucci Marmont leather crossbody bag in black. Purchased from Gucci store in Dubai with original receipt. Gently used, excellent condition. Gold-tone hardware, adjustable chain strap. Comes with dust bag and authenticity card.',
  280000,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'good',
  'Lekki Phase 1',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1584917865442-de89df76afd8?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Zara Men''s Slim Fit Suit - Navy Blue (Size 50)',
  'Elegant navy blue slim fit suit from Zara. Size 50, perfect for business meetings and formal events. Worn only 3 times, dry cleaned and well maintained. Modern cut, excellent quality fabric. Jacket and trousers included.',
  45000,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  'like_new',
  'Yaba',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
  ],
  'active'
);

-- FURNITURE (3 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'Modern L-Shaped Sofa - Grey Fabric, 6-Seater',
  'Beautiful modern L-shaped sofa in grey fabric. 6-seater, perfect for large living rooms. Very comfortable with thick cushions. Excellent condition, no stains or tears. Selling due to relocation. Delivery can be arranged within Lagos.',
  180000,
  (SELECT id FROM categories WHERE slug = 'furniture'),
  'good',
  'Ajah',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Executive Office Desk with Drawers - Mahogany Wood',
  'Solid mahogany wood executive office desk. Large workspace with 3 drawers for storage. Perfect for home office or corporate use. Heavy duty, excellent build quality. Minor scratches from normal use. Dimensions: 150cm x 75cm x 75cm.',
  95000,
  (SELECT id FROM categories WHERE slug = 'furniture'),
  'good',
  'Ikeja',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'King Size Bed Frame with Mattress - Upholstered',
  'Luxurious king size bed frame with premium upholstered headboard in beige. Includes high-quality orthopedic mattress (1 year old). Very comfortable, excellent condition. Perfect for master bedroom. Mattress has removable, washable cover.',
  220000,
  (SELECT id FROM categories WHERE slug = 'furniture'),
  'like_new',
  'Lekki Phase 2',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
  ],
  'active'
);

-- PHONES (3 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'iPhone 14 Pro Max 256GB - Deep Purple (Unlocked)',
  'iPhone 14 Pro Max in stunning Deep Purple. 256GB storage, unlocked for all networks. Battery health 98%. Includes original box, charger, and screen protector. Always used with case. No scratches on screen or body. Selling to upgrade to iPhone 15.',
  650000,
  (SELECT id FROM categories WHERE slug = 'phones'),
  'like_new',
  'Victoria Island',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1678652197950-1e6754b4d7ac?w=800&q=80',
    'https://images.unsplash.com/photo-1592286927505-c0d6b5e1f70e?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Samsung Galaxy S23 Ultra 512GB - Phantom Black',
  'Flagship Samsung Galaxy S23 Ultra with 512GB storage. Phantom Black color. Includes S Pen, excellent camera system. Battery health excellent. Comes with original box, charger, and protective case. Screen protector applied. Perfect condition.',
  580000,
  (SELECT id FROM categories WHERE slug = 'phones'),
  'like_new',
  'Lekki',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Google Pixel 7 Pro 128GB - Snow White (UK Used)',
  'UK used Google Pixel 7 Pro in Snow White. 128GB storage, unlocked. Amazing camera quality, pure Android experience. Battery health 95%. Minor wear on edges, screen is perfect. Includes charger and case. Great value for money!',
  280000,
  (SELECT id FROM categories WHERE slug = 'phones'),
  'good',
  'Yaba',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80'
  ],
  'active'
);

-- VEHICLES (2 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'Toyota Camry 2018 - LE Model, Low Mileage',
  'Clean Toyota Camry 2018 LE model. Very low mileage (45,000km). First owner, all services done at Toyota. AC super cold, engine in perfect condition. No accident history. Papers complete and up to date. Serious buyers only. Test drive available.',
  8500000,
  (SELECT id FROM categories WHERE slug = 'vehicles'),
  'good',
  'Ikeja',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Honda Accord 2020 - Sport Edition, Fully Loaded',
  'Honda Accord 2020 Sport Edition. Fully loaded with leather seats, sunroof, navigation, backup camera. Excellent condition, regularly serviced. 38,000km mileage. No issues whatsoever. Selling due to relocation abroad. Price slightly negotiable.',
  12500000,
  (SELECT id FROM categories WHERE slug = 'vehicles'),
  'like_new',
  'Lekki',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
  ],
  'active'
);

-- HOME & GARDEN (2 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'LG Inverter Air Conditioner 1.5HP - Energy Efficient',
  'LG inverter air conditioner, 1.5HP capacity. Energy efficient, quiet operation. Used for only 1 year, still under warranty. Cools very fast, perfect for medium-sized rooms. Includes installation kit. Selling due to relocation.',
  185000,
  (SELECT id FROM categories WHERE slug = 'home-garden'),
  'like_new',
  'Ajah',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Bosch Washing Machine 7kg - Front Load, Automatic',
  'Bosch front load washing machine, 7kg capacity. Fully automatic with multiple wash programs. Very efficient, gentle on clothes. Excellent condition, well maintained. Perfect for families. Delivery and installation can be arranged.',
  165000,
  (SELECT id FROM categories WHERE slug = 'home-garden'),
  'good',
  'Surulere',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80'
  ],
  'active'
);

-- SPORTS (2 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'Treadmill - Foldable, Electric, LCD Display',
  'Electric treadmill with LCD display showing speed, distance, calories. Foldable design, saves space. Multiple speed settings. Used for 6 months, excellent condition. Perfect for home workouts. Max user weight: 120kg. Delivery available.',
  145000,
  (SELECT id FROM categories WHERE slug = 'sports'),
  'good',
  'Ikeja',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Complete Home Gym Set - Dumbbells, Bench, Weights',
  'Complete home gym setup including: adjustable bench, dumbbell set (5kg-25kg), barbell with weights (50kg total), resistance bands, and yoga mat. Everything you need to start working out at home. Excellent condition, barely used.',
  95000,
  (SELECT id FROM categories WHERE slug = 'sports'),
  'like_new',
  'Lekki',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
  ],
  'active'
);

-- BOOKS (2 listings)
INSERT INTO listings (user_id, title, description, price, category_id, condition, location, state, images, status) VALUES
(
  'YOUR_USER_ID_HERE',
  'Medical Textbooks Bundle - MBBS 1st-3rd Year (15 Books)',
  'Complete set of medical textbooks for MBBS 1st to 3rd year. Includes Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, and more. All books in excellent condition with minimal highlighting. Perfect for medical students. Huge savings!',
  85000,
  (SELECT id FROM categories WHERE slug = 'books'),
  'good',
  'Yaba',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'
  ],
  'active'
),
(
  'YOUR_USER_ID_HERE',
  'Programming Books Collection - Python, JavaScript, React',
  'Collection of programming books: "Python Crash Course", "JavaScript: The Good Parts", "React Up & Running", "Clean Code", and more. Total 8 books. Perfect for developers. All books in very good condition, no torn pages.',
  35000,
  (SELECT id FROM categories WHERE slug = 'books'),
  'good',
  'Surulere',
  'Lagos',
  ARRAY[
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'
  ],
  'active'
);

-- Success message
SELECT 'Demo listings created successfully! Total: 22 listings across all categories.' AS message;
