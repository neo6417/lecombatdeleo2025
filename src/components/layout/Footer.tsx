import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Le Combat de Léo</h3>
            <p className="text-gray-300">
              Ensemble pour soutenir la recherche et l'accompagnement.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
              <li><Link to="/articles" className="text-gray-300 hover:text-white">Articles</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">À Propos</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:contact@lecombatdeleo.fr" className="hover:text-white">
                  contact@lecombatdeleo.fr
                </a>
              </li>
              <li className="flex items-center">
                <Facebook className="w-5 h-5 mr-2" />
                <a 
                  href="https://www.facebook.com/lecombatdeleo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Suivez-nous sur Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Le Combat de Léo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}