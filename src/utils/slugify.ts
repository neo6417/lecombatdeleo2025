import { supabase } from '../lib/supabase';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function generateUniqueSlug(title: string, currentSlug?: string): Promise<string> {
  let baseSlug = slugify(title);
  let finalSlug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const { data, error } = await supabase
      .from('articles')
      .select('slug')
      .eq('slug', finalSlug)
      .not('slug', 'eq', currentSlug)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      isUnique = true;
    } else {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return finalSlug;
}