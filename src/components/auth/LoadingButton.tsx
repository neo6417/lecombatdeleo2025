import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ loading, children, className = '', ...props }: LoadingButtonProps) {
  return (
    <Button 
      {...props} 
      disabled={loading}
      className={`relative ${className}`}
    >
      {loading && (
        <Loader2 className="absolute left-4 w-4 h-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}