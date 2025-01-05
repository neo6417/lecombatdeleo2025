import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  const { profile, loading } = useProfile();
  const { updateProfile, updating } = useUpdateProfile();
  const [formData, setFormData] = React.useState({
    username: '',
    full_name: '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        full_name: profile.full_name || '',
      });
    }
  }, [profile]);

  if (loading) return <div>Chargement...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Paramètres du compte</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button type="submit" disabled={updating}>
          {updating ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
}