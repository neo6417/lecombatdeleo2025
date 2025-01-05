import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventForm } from '../../components/admin/events/EventForm';
import { useEventEditor } from '../../hooks/admin/useEventEditor';

export function EventEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error, saveEvent } = useEventEditor(id);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Modifier l\'événement' : 'Nouvel événement'}
      </h1>
      <EventForm
        initialData={event}
        onSubmit={async (data) => {
          await saveEvent(data);
          navigate('/admin/events');
        }}
      />
    </div>
  );
}