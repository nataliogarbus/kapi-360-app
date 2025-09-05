'use client';

import React from 'react';

interface DashboardSectionProps {
  title?: string; // Title is now optional
  children: React.ReactNode;
  className?: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`p-8 bg-gray-800/20 border border-gray-700 rounded-lg ${className}`}>
      {title && <h2 className="text-xl font-bold text-white mb-6">{title}</h2>}
      {children}
    </div>
  );
};

export default DashboardSection;
