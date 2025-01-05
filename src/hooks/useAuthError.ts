import { useState, useCallback } from 'react';
import { AuthError } from '@supabase/supabase-js';

interface AuthErrorState {
  type: 'credentials' | 'network' | 'validation' | 'unknown';
  message: string;
}

const ERROR_MESSAGES = {
  'invalid_credentials': 'Email ou mot de passe incorrect',
  'invalid_email': 'Format d\'email invalide',
  'weak_password': 'Le mot de passe doit contenir au moins 6 caractères',
  'email_taken': 'Cet email est déjà utilisé',
  'network_error': 'Erreur de connexion au serveur',
  'default': 'Une erreur est survenue'
};

export function useAuthError() {
  const [error, setError] = useState<AuthErrorState | null>(null);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof AuthError) {
      const message = err.message.toLowerCase();
      
      if (message.includes('invalid login credentials')) {
        setError({ type: 'credentials', message: ERROR_MESSAGES.invalid_credentials });
      } else if (message.includes('invalid email')) {
        setError({ type: 'validation', message: ERROR_MESSAGES.invalid_email });
      } else if (message.includes('password')) {
        setError({ type: 'validation', message: ERROR_MESSAGES.weak_password });
      } else if (message.includes('email taken')) {
        setError({ type: 'validation', message: ERROR_MESSAGES.email_taken });
      } else {
        setError({ type: 'unknown', message: ERROR_MESSAGES.default });
      }
    } else if (err instanceof Error && err.message.includes('network')) {
      setError({ type: 'network', message: ERROR_MESSAGES.network_error });
    } else {
      setError({ type: 'unknown', message: ERROR_MESSAGES.default });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}