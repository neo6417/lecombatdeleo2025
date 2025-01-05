import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export function useEventEditor(id: string | undefined) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchEvent() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const saveEvent = async (data: EventData) => {
    try {
      if (id) {
        const { error } = await supabase
          .from('events')
          .update(data)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert([data]);
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      throw err;
    }
  };

  return { event, loading, error, saveEvent };
}