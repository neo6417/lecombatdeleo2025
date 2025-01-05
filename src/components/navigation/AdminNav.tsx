import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Image, FileText, Calendar, Settings, Tag } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/articles', icon: FileText, label: 'Articles' },
  { to: '/admin/categories', icon: Tag, label: 'Catégories' },
  { to: '/admin/events', icon: Calendar, label: 'Événements' },
  { to: '/admin/carousel', icon: Image, label: 'Carrousel' },
  { to: '/admin/settings', icon: Settings, label: 'Paramètres' }
];

export function AdminNav() {
  const { profile, loading } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading || profile?.role !== 'admin') {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
      >
        <LayoutDashboard size={20} />
        <span>Administration</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {adminLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}