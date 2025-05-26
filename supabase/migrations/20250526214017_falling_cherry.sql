/*
  # Create admin user

  1. Changes
    - Insert initial admin user with credentials
*/

-- Insert admin user if not exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@freshmart.com',
  crypt('Admin123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@freshmart.com'
);

-- Ensure admin profile exists
INSERT INTO public.profiles (id, role)
SELECT 
  id,
  'admin'
FROM auth.users 
WHERE email = 'admin@freshmart.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';