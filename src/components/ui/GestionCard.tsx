"use client";

import React, { ReactNode } from 'react';

interface DashboardItemProps {
  icon: ReactNode;
  label: string;
}

interface DashboardCardProps {
  items: DashboardItemProps[];
}

const GestionCard: React.FC<DashboardCardProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className={`flex ${items.length === 1 ? 'justify-center' : 'justify-evenly'} w-full`}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center hover:shadow-md rounded-lg p-3 transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <span className="text-center text-gray-800 font-medium" dangerouslySetInnerHTML={{ __html: item.label.replace(/\n/g, '<br />') }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionCard;