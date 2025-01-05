import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'À Propos', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export function MainNav() {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
      {navItems.map(item => (
        <Link
          key={item.label}
          to={item.href}
          className="text-gray-700 hover:text-blue-600"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}