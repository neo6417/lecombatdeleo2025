/*
  # Add reorder_articles function
  
  1. New Functions
    - reorder_articles: Handles reordering of articles by updating display_order
*/

CREATE OR REPLACE FUNCTION reorder_articles(
  article_id uuid,
  new_order integer,
  current_order integer
) RETURNS void AS $$
BEGIN
  IF new_order > current_order THEN
    -- Moving down: update articles between current and new position
    UPDATE articles
    SET display_order = display_order - 1
    WHERE display_order > current_order 
    AND display_order <= new_order;
  ELSE
    -- Moving up: update articles between new and current position
    UPDATE articles
    SET display_order = display_order + 1
    WHERE display_order >= new_order 
    AND display_order < current_order;
  END IF;

  -- Update the target article's position
  UPDATE articles
  SET display_order = new_order
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;