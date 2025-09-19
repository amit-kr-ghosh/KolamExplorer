import React, { useCallback, useEffect, useRef, useState } from "react";
import { KolamPattern } from "../types/kolam";
import { KolamGenerator } from "../utils/kolamGenerator";
import { KolamDisplay } from "./KolamDisplay";
import html2canvas from "html2canvas-pro";

// Convert speed (1-10) to animation duration
const speedToDuration = (speed: number) => {
  const minMs = 7500;
  const maxMs = 15000;
  const normalized = (speed - 1) / 9;
  const inverted = 1 - normalized;
  return Math.round(minMs + (maxMs - minMs) * inverted);
};

// PNG export helper
const exportPNG = async (element: HTMLElement, filename: string) => {
  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
  });
  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const KolamEditor: React.FC = () => {
  const [pattern, setPattern] = useState<KolamPattern | null>(null);
  const [size, setSize] = useState(7);
  const [speed, setSpeed] = useState(5);
  const [duration, setDuration] = useState(speedToDuration(5));
  const [animating, setAnimating] = useState(false);

  const kolamRef = useRef<HTMLDivElement>(null);

  // Update duration when speed changes
  useEffect(() => {
    setDuration(speedToDuration(speed));
  }, [speed]);

  // Stop animation automatically when duration ends
  useEffect(() => {
    if (animating && pattern) {
      const timer = setTimeout(() => setAnimating(false), duration);
      return () => clearTimeout(timer);
    }
  }, [animating, pattern, duration]);

  // Function to generate static Kolam
  const generatePattern = useCallback(() => {
    try {
      const newPattern = KolamGenerator.generateKolam1D(size);
      setPattern(newPattern);
      setAnimating(false); // always static initially
    } catch (err) {
      alert(
        `Error generating pattern: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }, [size]);

  // Regenerate static Kolam whenever grid size changes
  useEffect(() => {
    generatePattern();
  }, [size, generatePattern]);

  const handleDownload = () => {
    if (pattern && kolamRef.current) exportPNG(kolamRef.current, pattern.name);
  };

  return (
    <div className="min-h-screen bg-amber-100 flex flex-col items-center p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-amber-900">
          Zen Kolam Generator
        </h1>
        <p className="text-lg text-amber-800 mt-1">
          Beautiful traditional South Indian geometric patterns
        </p>
      </header>

      <div className="bg-amber-900 p-6 rounded-2xl shadow-lg w-full max-w-4xl">
        {/* Kolam Display */}
        <div
          ref={kolamRef}
          className="bg-amber-800 p-4 rounded-lg mb-6 flex justify-center items-center min-h-[300px]"
        >
          {pattern ? (
            <KolamDisplay
              pattern={pattern}
              animate={animating}
              animationTiming={duration}
            />
          ) : (
            <p className="text-amber-100">Generate your first kolam!</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Grid Size */}
          <div className="flex flex-col items-center">
            <label className="text-amber-100 mb-1">Grid Size</label>
            <input
              type="range"
              min={3}
              max={15}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-40"
            />
            <span className="text-amber-100 mt-1">
              {size}x{size}
            </span>
          </div>

          {/* Animation Speed */}
          <div className="flex flex-col items-center">
            <label className="text-amber-100 mb-1">Animation Speed</label>
            <input
              type="range"
              min={1}
              max={10}
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-40"
            />
            <span className="text-amber-100 mt-1">
              {(duration / 1000).toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={generatePattern}
            className="px-6 py-2 bg-amber-500 text-amber-900 rounded-lg font-semibold hover:bg-amber-400"
          >
            Generate Kolam
          </button>

          {pattern && (
            <>
              <button
                onClick={() => setAnimating(!animating)}
                className="px-6 py-2 bg-amber-500 text-amber-900 rounded-lg font-semibold hover:bg-amber-400"
              >
                {animating ? "⏹️ Pause Animation" : "▶️ Play Animation"}
              </button>

              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-amber-500 text-amber-900 rounded-lg font-semibold hover:bg-amber-400"
              >
                💾 Download PNG
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
