import { supabase } from './supabase';

interface CheckResult {
  status: 'success' | 'error';
  message: string;
  details?: any;
}

export async function checkDatabaseConnection(): Promise<CheckResult> {
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) throw error;
    return {
      status: 'success',
      message: 'Connexion à la base de données établie'
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur de connexion à la base de données',
      details: error
    };
  }
}

export async function checkTableAccess(): Promise<Record<string, CheckResult>> {
  const tables = ['profiles', 'articles', 'media'];
  const results: Record<string, CheckResult> = {};

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('count');
      results[table] = {
        status: error ? 'error' : 'success',
        message: error ? `Erreur d'accès à ${table}` : `Accès à ${table} confirmé`,
        details: error || undefined
      };
    } catch (error) {
      results[table] = {
        status: 'error',
        message: `Erreur lors de la vérification de ${table}`,
        details: error
      };
    }
  }

  return results;
}

export async function checkAdminAccess(): Promise<CheckResult> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .single();

    if (error) throw error;

    return {
      status: profile?.role === 'admin' ? 'success' : 'error',
      message: profile?.role === 'admin' 
        ? 'Accès administrateur confirmé' 
        : 'Accès administrateur non disponible'
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Erreur lors de la vérification des droits administrateur',
      details: error
    };
  }
}