import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { checkDatabaseConnection } from '../../lib/supabase-health';
import { Button } from '../ui/Button';

interface AdminErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  dbConnectionStatus: {
    connected: boolean;
    error?: string;
  } | null;
}

export class AdminErrorBoundary extends React.Component<
  { children: React.ReactNode },
  AdminErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      dbConnectionStatus: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  async componentDidCatch(error: Error) {
    const dbStatus = await checkDatabaseConnection();
    this.setState({ 
      hasError: true, 
      error,
      dbConnectionStatus: dbStatus
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Erreur d'accès à la console administrateur
            </h1>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded">
                <h2 className="font-medium text-gray-700">État de la connexion :</h2>
                <p className="text-sm text-gray-600">
                  {this.state.dbConnectionStatus?.connected 
                    ? '✅ Connexion à la base de données établie'
                    : `❌ Erreur de connexion : ${this.state.dbConnectionStatus?.error || 'Vérifiez vos identifiants'}`
                  }
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <h2 className="font-medium text-gray-700">Message d'erreur :</h2>
                <p className="text-sm text-gray-600">
                  {this.state.error?.message || 'Erreur inconnue'}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => window.location.reload()}
                >
                  Réessayer
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                >
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}