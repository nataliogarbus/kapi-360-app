'use client';

import React from 'react';

interface LookerStudioDashboardProps {
  src: string;
}

const LookerStudioDashboard: React.FC<LookerStudioDashboardProps> = ({ src }) => {
  return (
    <iframe
      src={src}
      className="w-full h-full border-0"
      frameBorder="0"
      allowFullScreen
      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      title="Looker Studio Dashboard"
    ></iframe>
  );
};

export default LookerStudioDashboard;
