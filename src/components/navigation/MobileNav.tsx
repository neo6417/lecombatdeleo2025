import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'À Propos', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const adminItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Articles', href: '/admin/articles' },
  { label: 'Événements', href: '/admin/events' },
  { label: 'Carrousel', href: '/admin/carousel' },
  { label: 'Paramètres', href: '/admin/settings' }
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:text-blue-600"
        aria-label="Menu principal"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 w-64 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <nav className="py-2">
            {navItems.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <>
                <div className="my-2 border-t border-gray-200" />
                {adminItems.map(item => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}

            {!user && (
              <>
                <div className="my-2 border-t border-gray-200" />
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}