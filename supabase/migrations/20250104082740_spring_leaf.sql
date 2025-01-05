/*
  # Fix profile creation logic
  
  1. Changes
    - Remove automatic trigger-based profile creation
    - Let application handle profile creation explicitly
  
  2. Security
    - Maintain existing RLS policies
    - Keep profile creation tied to authenticated users
*/

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user;