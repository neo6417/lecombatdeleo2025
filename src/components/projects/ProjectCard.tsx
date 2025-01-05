import React from 'react';
import { Target, Clock } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  goal: number;
  current: number;
  deadline: string;
}

export function ProjectCard({ title, description, image, goal, current, deadline }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progression</span>
              <span>{Math.round((current / goal) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(current / goal) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Target className="w-4 h-4 mr-1" />
              <span>{goal}€</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>{deadline}</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Faire un don
          </button>
        </div>
      </div>
    </div>
  );
}