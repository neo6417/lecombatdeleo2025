import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AdminEventList } from '../../components/admin/events/AdminEventList';
import { Button } from '../../components/ui/Button';

export function EventListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des événements</h1>
        <Link to="/admin/events/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        </Link>
      </div>
      <AdminEventList />
    </div>
  );
}