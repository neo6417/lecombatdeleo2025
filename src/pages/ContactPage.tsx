import React from 'react';
import { ContactPerson } from '../components/contact/ContactInfo';
import { Button } from '../components/ui/Button';

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-Nous</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Nous sommes là pour répondre à vos questions et vous accompagner dans votre démarche.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ContactPerson
          title="Présidente de l'association"
          name="SCHAGENE Yolande"
          address={[
            "102 Grand rue",
            "68820 KRUTH"
          ]}
          email="yolande.hipp@wanadoo.fr"
        />
        
        <ContactPerson
          title="Renseignements sur les rééducations"
          name="KLEIN Julie"
          phone="0749343996"
          email="julie_984@hotmail.fr"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Envoyer le message
          </Button>
        </form>
      </div>
    </div>
  );
}