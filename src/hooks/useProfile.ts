import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchProfile() {
      try {
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!existingProfile && isMounted) {
          const username = user.email?.split('@')[0] || 'user';
          try {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                username: `${username}_${Math.random().toString(36).slice(2, 7)}`,
                created_at: new Date().toISOString()
              })
              .select()
              .single();

            if (createError) throw createError;
            if (isMounted) setProfile(newProfile);
          } catch (err) {
            if (isMounted) {
              console.error('Error creating profile:', err);
              setError(err instanceof Error ? err : new Error('Erreur lors de la création du profil'));
            }
          }
        } else if (isMounted) {
          setProfile(existingProfile);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching profile:', err);
          setError(err instanceof Error ? err : new Error('Erreur lors du chargement du profil'));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return { profile, loading, error };
}