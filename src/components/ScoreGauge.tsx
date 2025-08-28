import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const getPathColor = (score: number) => {
  if (score < 40) return '#f87171'; // red-400
  if (score < 70) return '#facc15'; // yellow-400
  return '#22d3ee'; // cyan-400
};

export const ScoreGauge: React.FC<{ score: number; size?: 'large' | 'small' }> = ({ score, size = 'small' }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Pequeño retraso para asegurar que la animación se active al montar
    const timer = setTimeout(() => {
      setDisplayScore(score || 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [score]);

  const color = getPathColor(displayScore);
  const dimension = size === 'large' ? 'w-48 h-48' : 'w-32 h-32';
  const textSize = size === 'large' ? 'text-5xl' : 'text-3xl';

  return (
    <div className={`relative ${dimension}`}>
      <CircularProgressbar
        value={displayScore}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: color,
          trailColor: '#374151', // gray-700
          pathTransitionDuration: 1.5,
          pathTransition: 'stroke-dashoffset 1.5s ease-out',
        })}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${textSize} font-bold text-white`}>{score}</span>
      </div>
    </div>
  );
};