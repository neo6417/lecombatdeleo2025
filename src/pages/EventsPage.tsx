import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useEvents } from '../hooks/useEvents';
import { formatDate } from '../utils/formatDate';

export function EventsPage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div>Chargement des événements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-red-600">
        <div>Erreur: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Événements à Venir</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Rejoignez-nous pour nos prochains événements de sensibilisation et de soutien
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Aucun événement à venir pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Button className="w-full">S'inscrire à l'événement</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Vous souhaitez organiser un événement ?</h2>
        <p className="text-gray-600 mb-6">
          Nous sommes toujours à la recherche de nouvelles initiatives pour sensibiliser et soutenir notre cause.
        </p>
        <Link to="/contact">
          <Button variant="outline">Contactez-nous</Button>
        </Link>
      </div>
    </div>
  );
}