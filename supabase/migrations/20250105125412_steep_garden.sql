/*
  # Add article ordering system
  
  1. Changes
    - Add display_order column to articles table
    - Update existing articles with default order based on creation date
    - Add function to maintain order when articles are deleted
*/

-- Add display_order column
ALTER TABLE articles 
ADD COLUMN display_order integer;

-- Initialize display_order for existing articles
WITH ordered_articles AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as rn
  FROM articles
)
UPDATE articles
SET display_order = ordered_articles.rn
FROM ordered_articles
WHERE articles.id = ordered_articles.id;

-- Make display_order NOT NULL after initialization
ALTER TABLE articles 
ALTER COLUMN display_order SET NOT NULL;

-- Create function to reorder articles after deletion
CREATE OR REPLACE FUNCTION reorder_articles_after_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE articles
  SET display_order = display_order - 1
  WHERE display_order > OLD.display_order;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reordering after deletion
CREATE TRIGGER article_reorder_after_delete
  AFTER DELETE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION reorder_articles_after_delete();