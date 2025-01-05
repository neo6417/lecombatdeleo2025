import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

export function AdminRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  
  if (authLoading || profileLoading) {
    return <div>Chargement...</div>;
  }
  
  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}