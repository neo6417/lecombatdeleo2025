import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { ImageUploader } from '../ImageUploader';

interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

interface EventFormProps {
  initialData?: Partial<EventData>;
  onSubmit: (data: EventData) => Promise<void>;
}

export function EventForm({ initialData, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<EventData>({
    title: initialData?.title || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <div className="mt-1">
          <ImageUploader
            onUploadComplete={(url) => {
              setFormData(prev => ({ ...prev, image: url }));
            }}
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Aperçu de l'événement"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Heure</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {initialData ? "Mettre à jour" : "Créer l'événement"}
        </Button>
      </div>
    </form>
  );
}