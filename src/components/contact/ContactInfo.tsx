import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactPersonProps {
  title: string;
  name: string;
  address?: string[];
  email?: string;
  phone?: string;
  description?: string;
}

export function ContactPerson({ title, name, address, email, phone, description }: ContactPersonProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        <p className="font-medium">{name}</p>
        
        {address && (
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
            <div>
              {address.map((line, index) => (
                <p key={index} className="text-gray-600">{line}</p>
              ))}
            </div>
          </div>
        )}
        
        {email && (
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-600 mr-3" />
            <a href={`mailto:${email}`} className="text-gray-600 hover:text-blue-600">
              {email}
            </a>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-600 mr-3" />
            <a href={`tel:${phone}`} className="text-gray-600 hover:text-blue-600">
              {phone}
            </a>
          </div>
        )}
        
        {description && (
          <p className="text-gray-600 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
}