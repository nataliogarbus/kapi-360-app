import React from 'react';

interface ReportCardProps {
  children: React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({ children }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6 hover:border-slate-600 transition-colors duration-300">
      {children}
    </div>
  );
};

export default ReportCard;
