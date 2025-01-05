/*
  # Système de sous-rubriques pour les articles

  1. Nouvelles Tables
    - `article_categories`
      - `id` (uuid, primary key)
      - `name` (text, nom de la catégorie)
      - `slug` (text, unique, pour les URLs)
      - `description` (text)
      - `display_order` (integer, ordre d'affichage)
      - `is_active` (boolean)
      - `created_at` (timestamp)

  2. Modifications
    - Ajout d'une colonne category_id dans la table articles

  3. Sécurité
    - Enable RLS
    - Ajout des politiques d'accès
*/

-- Create article categories table
CREATE TABLE article_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  display_order integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Add category to articles
ALTER TABLE articles
ADD COLUMN category_id uuid REFERENCES article_categories(id);

-- Enable RLS
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

-- Public read access for active categories
CREATE POLICY "Categories are viewable by everyone"
  ON article_categories FOR SELECT
  USING (is_active = true);

-- Admin management policies
CREATE POLICY "Admins can manage categories"
  ON article_categories
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert default categories
INSERT INTO article_categories (name, slug, description, display_order, is_active)
VALUES 
  ('Lavage de voitures', 'lavage-voitures', 'Événements de lavage de voitures', 1, true),
  ('Repas', 'repas', 'Repas et événements culinaires', 2, true),
  ('Vente de gâteaux', 'vente-gateaux', 'Ventes de gâteaux et pâtisseries', 3, true),
  ('Autre', 'autre', 'Autres types d''événements', 4, true);

-- Function to reorder categories
CREATE OR REPLACE FUNCTION reorder_categories(
  category_id uuid,
  new_order integer,
  current_order integer
) RETURNS void AS $$
BEGIN
  IF new_order > current_order THEN
    UPDATE article_categories
    SET display_order = display_order - 1
    WHERE display_order > current_order 
    AND display_order <= new_order;
  ELSE
    UPDATE article_categories
    SET display_order = display_order + 1
    WHERE display_order >= new_order 
    AND display_order < current_order;
  END IF;

  UPDATE article_categories
  SET display_order = new_order
  WHERE id = category_id;
END;
$$ LANGUAGE plpgsql;