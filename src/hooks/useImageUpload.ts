import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      setError(null);

      // Validation du type de fichier
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Format de fichier non supporté. Utilisez JPG, PNG, WebP ou GIF.');
      }

      // Validation de la taille
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('L\'image ne doit pas dépasser 5MB');
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Récupération de l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur inattendue est survenue';
      setError(message);
      console.error('Erreur lors de l\'upload:', err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, error };
}