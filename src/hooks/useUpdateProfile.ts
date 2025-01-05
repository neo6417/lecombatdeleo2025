import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ProfileData {
  username: string;
  full_name: string;
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const [updating, setUpdating] = useState(false);

  const updateProfile = async (data: ProfileData) => {
    if (!user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return { updateProfile, updating };
}