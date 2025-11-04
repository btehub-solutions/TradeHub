-- TradeHub Seed Categories Migration
-- Version: 004
-- Description: Seeds initial categories for the marketplace

-- Insert default categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('Electronics', 'electronics', 'Laptops, TVs, cameras, and electronic devices', 'Laptop'),
  ('Fashion', 'fashion', 'Clothing, shoes, bags, and fashion accessories', 'Shirt'),
  ('Furniture', 'furniture', 'Home and office furniture, decor items', 'Armchair'),
  ('Phones', 'phones', 'Mobile phones, tablets, and accessories', 'Smartphone'),
  ('Vehicles', 'vehicles', 'Cars, motorcycles, bicycles, and vehicle parts', 'Car'),
  ('Home & Garden', 'home-garden', 'Home appliances, tools, and garden equipment', 'Home'),
  ('Sports', 'sports', 'Sports equipment, fitness gear, and outdoor items', 'Dumbbell'),
  ('Books', 'books', 'Books, magazines, textbooks, and educational materials', 'Book'),
  ('Beauty', 'beauty', 'Cosmetics, skincare, and beauty products', 'Sparkles'),
  ('Toys & Games', 'toys-games', 'Toys, games, and entertainment for kids', 'Gamepad2'),
  ('Real Estate', 'real-estate', 'Properties for sale or rent', 'Building'),
  ('Services', 'services', 'Professional services and skills', 'Briefcase'),
  ('Food & Agriculture', 'food-agriculture', 'Food products and agricultural items', 'Apple'),
  ('Baby & Kids', 'baby-kids', 'Baby products, kids clothing, and accessories', 'Baby'),
  ('Pets', 'pets', 'Pet supplies, accessories, and pet care', 'PawPrint'),
  ('Music & Instruments', 'music-instruments', 'Musical instruments and audio equipment', 'Music'),
  ('Art & Crafts', 'art-crafts', 'Art supplies, handmade crafts, and collectibles', 'Palette'),
  ('Office Supplies', 'office-supplies', 'Office equipment, stationery, and supplies', 'Briefcase'),
  ('Health & Wellness', 'health-wellness', 'Health products, supplements, and wellness items', 'Heart'),
  ('Other', 'other', 'Miscellaneous items and products', 'Package')
ON CONFLICT (slug) DO NOTHING;

-- Create function to get category by slug
CREATE OR REPLACE FUNCTION get_category_by_slug(category_slug TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  description TEXT,
  icon TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.name, c.slug, c.description, c.icon
  FROM categories c
  WHERE c.slug = category_slug;
END;
$$ LANGUAGE plpgsql;

-- Create function to get popular categories (by listing count)
CREATE OR REPLACE FUNCTION get_popular_categories(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  description TEXT,
  icon TEXT,
  listing_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id, 
    c.name, 
    c.slug, 
    c.description, 
    c.icon,
    COUNT(l.id) as listing_count
  FROM categories c
  LEFT JOIN listings l ON c.id = l.category_id AND l.status = 'active'
  GROUP BY c.id, c.name, c.slug, c.description, c.icon
  ORDER BY listing_count DESC, c.name ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
