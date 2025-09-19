import React, { useEffect, useState } from 'react';

const AnimatedKolam: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; visible: boolean }>>([]);

  useEffect(() => {
    // Initialize dots
    const dotPositions = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        dotPositions.push({
          x: col * 60 + 30,
          y: row * 60 + 30,
          visible: false
        });
      }
    }
    setDots(dotPositions);

    // Animation sequence
    const timer1 = setTimeout(() => {
      setDots(prev => prev.map(dot => ({ ...dot, visible: true })));
    }, 500);

    const timer2 = setTimeout(() => setStage(1), 1500);
    const timer3 = setTimeout(() => setStage(2), 2500);
    const timer4 = setTimeout(() => setStage(3), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-orange-200 rounded-xl bg-white shadow-lg">
          {/* Dots */}
          {dots.map((dot, index) => (
            <circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r="4"
              fill="#f97316"
              opacity={dot.visible ? 1 : 0}
              className="transition-opacity duration-500"
            />
          ))}

          {/* Stage 1: Outer square */}
          {stage >= 1 && (
            <path
              d="M 30 30 L 270 30 L 270 270 L 30 270 Z"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-draw"
            />
          )}

          {/* Stage 2: Inner diamond */}
          {stage >= 2 && (
            <path
              d="M 150 30 L 270 150 L 150 270 L 30 150 Z"
              fill="none"
              stroke="#059669"
              strokeWidth="3"
              strokeDasharray="800"
              strokeDashoffset="800"
              className="animate-draw"
              style={{ animationDelay: '0.5s' }}
            />
          )}

          {/* Stage 3: Central lotus pattern */}
          {stage >= 3 && (
            <>
              <circle
                cx="150"
                cy="150"
                r="60"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                strokeDasharray="400"
                strokeDashoffset="400"
                className="animate-draw"
                style={{ animationDelay: '1s' }}
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <path
                  key={i}
                  d={`M 150 150 L ${150 + 40 * Math.cos(angle * Math.PI / 180)} ${150 + 40 * Math.sin(angle * Math.PI / 180)}`}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  opacity="0"
                  className="animate-fade-in"
                  style={{ animationDelay: `${1.2 + i * 0.1}s` }}
                />
              ))}
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

export default AnimatedKolam;