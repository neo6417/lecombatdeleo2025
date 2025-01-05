/*
  # Ajout de la table carousel_images
  
  1. Nouvelle Table
    - `carousel_images`
      - `id` (uuid, primary key)
      - `title` (text)
      - `alt` (text)
      - `url` (text)
      - `order` (integer)
      - `created_at` (timestamp)
  
  2. Sécurité
    - Enable RLS
    - Policies pour lecture publique et gestion admin
*/

CREATE TABLE carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  alt text NOT NULL,
  url text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;

-- Lecture publique
CREATE POLICY "Carousel images are viewable by everyone"
  ON carousel_images FOR SELECT
  USING (true);

-- Seuls les admins peuvent gérer les images
CREATE POLICY "Only admins can manage carousel images"
  ON carousel_images
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );