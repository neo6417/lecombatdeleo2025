import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}