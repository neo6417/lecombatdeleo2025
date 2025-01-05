import { checkDatabaseConnection, checkTableAccess, checkAdminAccess } from '../lib/database-check';
import { performanceMonitor } from './performanceCheck';

interface SiteCheckResult {
  database: {
    connection: boolean;
    tables: Record<string, boolean>;
    adminAccess: boolean;
  };
  performance: {
    averageLoadTime: number;
    averageQueryTime: number;
  };
  functionality: {
    auth: boolean;
    crud: boolean;
    search: boolean;
  };
}

export async function runSiteCheck(): Promise<SiteCheckResult> {
  // Vérification de la base de données
  const dbConnection = await checkDatabaseConnection();
  const tableAccess = await checkTableAccess();
  const adminAccess = await checkAdminAccess();

  // Récupération des métriques de performance
  const avgLoadTime = performanceMonitor.getAverageLoadTime();
  const avgQueryTime = performanceMonitor.getAverageQueryTime();

  // Test des fonctionnalités CRUD
  const crudTest = await testCrudOperations();

  return {
    database: {
      connection: dbConnection.status === 'success',
      tables: Object.fromEntries(
        Object.entries(tableAccess).map(([table, result]) => [
          table,
          result.status === 'success'
        ])
      ),
      adminAccess: adminAccess.status === 'success'
    },
    performance: {
      averageLoadTime: avgLoadTime,
      averageQueryTime: avgQueryTime
    },
    functionality: {
      auth: await testAuthentication(),
      crud: crudTest,
      search: await testSearch()
    }
  };
}

async function testCrudOperations(): Promise<boolean> {
  try {
    // Test de création
    const { data: article, error: createError } = await supabase
      .from('articles')
      .insert({
        title: 'Test Article',
        slug: 'test-article',
        content: 'Test content'
      })
      .select()
      .single();

    if (createError || !article) return false;

    // Test de lecture
    const { error: readError } = await supabase
      .from('articles')
      .select()
      .eq('id', article.id)
      .single();

    if (readError) return false;

    // Test de mise à jour
    const { error: updateError } = await supabase
      .from('articles')
      .update({ title: 'Updated Test Article' })
      .eq('id', article.id);

    if (updateError) return false;

    // Test de suppression
    const { error: deleteError } = await supabase
      .from('articles')
      .delete()
      .eq('id', article.id);

    if (deleteError) return false;

    return true;
  } catch {
    return false;
  }
}

async function testAuthentication(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch {
    return false;
  }
}

async function testSearch(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select()
      .textSearch('title', 'test');

    return !error && Array.isArray(data);
  } catch {
    return false;
  }
}