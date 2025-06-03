/*
  # Add initial products and categories

  1. Changes
    - Insert sample categories
    - Insert sample brands for each category
    - Insert products organized by category
*/

-- Insert Categories
INSERT INTO categories (name, description, image_url) VALUES
  ('Fruits & Vegetables', 'Fresh produce from local farms', 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg'),
  ('Dairy & Eggs', 'Fresh dairy products and eggs', 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg'),
  ('Bakery', 'Freshly baked goods', 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg'),
  ('Meat & Seafood', 'Quality meats and fresh seafood', 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg')
ON CONFLICT (name) DO NOTHING;

-- Insert Brands
INSERT INTO brands (name, category_id) 
SELECT 'Nature''s Best', id FROM categories WHERE name = 'Fruits & Vegetables'
ON CONFLICT (name, category_id) DO NOTHING;

INSERT INTO brands (name, category_id)
SELECT 'Farm Fresh', id FROM categories WHERE name = 'Dairy & Eggs'
ON CONFLICT (name, category_id) DO NOTHING;

INSERT INTO brands (name, category_id)
SELECT 'Artisan Bake House', id FROM categories WHERE name = 'Bakery'
ON CONFLICT (name, category_id) DO NOTHING;

INSERT INTO brands (name, category_id)
SELECT 'Premium Meats', id FROM categories WHERE name = 'Meat & Seafood'
ON CONFLICT (name, category_id) DO NOTHING;

-- Insert Products
-- Fruits & Vegetables
INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Organic Bananas',
  'Fresh organic bananas, perfect for smoothies and snacks',
  2.99,
  'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg',
  c.id,
  b.id,
  100,
  true,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Fruits & Vegetables' AND b.name = 'Nature''s Best';

INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Fresh Avocados',
  'Ripe and ready-to-eat avocados',
  1.99,
  'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg',
  c.id,
  b.id,
  50,
  true,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Fruits & Vegetables' AND b.name = 'Nature''s Best';

-- Dairy & Eggs
INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Organic Whole Milk',
  'Fresh organic whole milk from local farms',
  4.99,
  'https://images.pexels.com/photos/248337/pexels-photo-248337.jpeg',
  c.id,
  b.id,
  30,
  true,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Dairy & Eggs' AND b.name = 'Farm Fresh';

INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Free-Range Eggs',
  'Farm fresh free-range eggs, dozen',
  5.99,
  'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
  c.id,
  b.id,
  40,
  true,
  false
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Dairy & Eggs' AND b.name = 'Farm Fresh';

-- Bakery
INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Sourdough Bread',
  'Freshly baked artisan sourdough bread',
  6.99,
  'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
  c.id,
  b.id,
  20,
  false,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Bakery' AND b.name = 'Artisan Bake House';

INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Croissants',
  'Buttery, flaky croissants baked fresh daily',
  3.99,
  'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg',
  c.id,
  b.id,
  30,
  false,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Bakery' AND b.name = 'Artisan Bake House';

-- Meat & Seafood
INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Grass-Fed Ground Beef',
  'Premium grass-fed ground beef, 1lb',
  8.99,
  'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg',
  c.id,
  b.id,
  25,
  true,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Meat & Seafood' AND b.name = 'Premium Meats';

INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category_id, 
  brand_id,
  stock_count,
  is_organic,
  is_featured
)
SELECT 
  'Fresh Atlantic Salmon',
  'Wild-caught Atlantic salmon fillet',
  12.99,
  'https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg',
  c.id,
  b.id,
  15,
  false,
  true
FROM categories c
JOIN brands b ON b.category_id = c.id
WHERE c.name = 'Meat & Seafood' AND b.name = 'Premium Meats';