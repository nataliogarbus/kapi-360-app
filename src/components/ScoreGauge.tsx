import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ScoreGauge: React.FC<{ score: number; size?: 'large' | 'small' }> = ({ score, size = 'small' }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Pequeño retraso para asegurar que la animación se active al montar
    const timer = setTimeout(() => {
      setDisplayScore(score || 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [score]);

  const color = '#00DD82'; // kapi-verde-menta
  const dimension = size === 'large' ? 'w-48 h-48' : 'w-32 h-32';
  const textSize = size === 'large' ? 'text-5xl' : 'text-3xl';

  return (
    <div className={`relative ${dimension}`}>
      <CircularProgressbar
        value={displayScore}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: color,
          trailColor: '#4B5563', // kapi-gris-oscuro
          pathTransitionDuration: 1.5,
          pathTransition: 'stroke-dashoffset 1.5s ease-out',
        })}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${textSize} font-bold text-kapi-gris-claro`}>{Math.round(displayScore)}</span>
      </div>
    </div>
  );
};