/*
  # Add admin role to database

  1. Changes
    - Add admin role to auth.users
    - Create initial admin user
*/

DO $$ 
BEGIN
  -- Check if the role already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'admin'
  ) THEN
    -- Create the admin role
    CREATE ROLE admin;
  END IF;
END $$;

-- Update the profiles table to ensure role is either 'user' or 'admin'
ALTER TABLE profiles
ADD CONSTRAINT valid_role CHECK (role IN ('user', 'admin'));

-- Create a function to ensure at least one admin exists
CREATE OR REPLACE FUNCTION ensure_admin_exists()
RETURNS trigger AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE role = 'admin'
  ) THEN
    -- If no admin exists, make the first user an admin
    UPDATE profiles 
    SET role = 'admin' 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to ensure at least one admin exists
CREATE TRIGGER ensure_admin_trigger
AFTER INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION ensure_admin_exists();