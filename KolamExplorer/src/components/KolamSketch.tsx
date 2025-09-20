// src/components/KolamSketch.tsx
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import sketch from '../p5/sketch';

const KolamSketch: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let myp5: p5 | null = null;
    if (sketchRef.current) {
      myp5 = new p5(sketch, sketchRef.current);
    }
    return () => {
      if (myp5) myp5.remove();
    };
  }, []);

  return <div ref={sketchRef} className="w-full h-full" />;
};

export default KolamSketch;
