export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  status: 'draft' | 'published';
  author_id: string | null;
  category_id: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}