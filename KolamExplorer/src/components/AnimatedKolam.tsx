import React, { useEffect, useState } from 'react';

const AnimatedKolam: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStage(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const petals = 8;
  const radius = 60;
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD'];

  return (
    <div className="flex justify-center items-center py-12">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <g transform="translate(150 150)">
          {/* Center circle */}
          {stage >= 1 && (
            <circle
              cx={0}
              cy={0}
              r={20}
              fill="#FF6B6B"
              className="animate-fade-in"
            />
          )}

          {/* Petals */}
          {stage >= 1 &&
            Array.from({ length: petals }).map((_, i) => {
              const angle = (360 / petals) * i;
              const rad = (angle * Math.PI) / 180;
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);
              const color = colors[i % colors.length];
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx={15}
                  ry={30}
                  fill={color}
                  opacity={0}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  transform={`rotate(${angle}, ${x}, ${y})`}
                />
              );
            })}

          {/* Small dots on petals */}
          {stage >= 1 &&
            Array.from({ length: petals }).map((_, i) => {
              const angle = (360 / petals) * i;
              const rad = (angle * Math.PI) / 180;
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);
              const color = colors[(i + 1) % colors.length];
              return (
                <circle
                  key={i + petals}
                  cx={x}
                  cy={y}
                  r={5}
                  fill={color}
                  opacity={0}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                />
              );
            })}
        </g>

        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.5s forwards;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default AnimatedKolam;
