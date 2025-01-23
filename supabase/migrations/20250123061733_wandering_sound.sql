/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `career_paths`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `color` (text)
    - `user_career_paths`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `career_path_id` (uuid, references career_paths)
      - `progress` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create career_paths table
CREATE TABLE career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_career_paths table
CREATE TABLE user_career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  career_path_id uuid REFERENCES career_paths(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, career_path_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_career_paths ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for career_paths
CREATE POLICY "Career paths are viewable by all authenticated users"
  ON career_paths
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_career_paths
CREATE POLICY "Users can view their own career paths"
  ON user_career_paths
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own career path progress"
  ON user_career_paths
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own career path progress"
  ON user_career_paths
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial career paths
INSERT INTO career_paths (title, description, icon, color) VALUES
  ('Software Development', 'Build the future of technology', 'Code', 'bg-blue-100 hover:bg-blue-200'),
  ('Business Analytics', 'Transform data into insights', 'BarChart', 'bg-blue-50 hover:bg-blue-100'),
  ('UX Design', 'Create amazing user experiences', 'Palette', 'bg-blue-100 hover:bg-blue-200'),
  ('Project Management', 'Lead teams to success', 'Briefcase', 'bg-blue-50 hover:bg-blue-100'),
  ('Data Science', 'Unlock patterns in data', 'Microscope', 'bg-blue-100 hover:bg-blue-200'),
  ('DevOps', 'Bridge development and operations', 'Server', 'bg-blue-50 hover:bg-blue-100');

-- Function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();