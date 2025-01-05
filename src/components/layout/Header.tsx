import React from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '../navigation/MainNav';
import { MobileNav } from '../navigation/MobileNav';
import { UserMenu } from './UserMenu';
import { AdminNav } from '../navigation/AdminNav';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="https://lbeelrqqjthmwyxbdpej.supabase.co/storage/v1/object/public/media/bananier-leo%20(1).png"
                alt="Logo Le combat de Leo" 
                className="h-12 w-auto sm:h-14"
              />
            </Link>
          </div>

          <MainNav />
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <AdminNav />
            </div>
            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block text-gray-700 hover:text-blue-600"
              >
                Connexion
              </Link>
            )}
            <div className="sm:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}