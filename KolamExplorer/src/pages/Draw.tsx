import React, { useState, useRef, useEffect } from "react";

interface Dot {
  x: number;
  y: number;
}
interface Line {
  start: Dot;
  end: Dot;
  cp?: Dot;
}

const CANVAS_SIZE = 600;
const DOT_RADIUS = 5;
const CENTER = CANVAS_SIZE / 2;

const Draw: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [symmetryCount, setSymmetryCount] = useState<number>(8); // edges
  const [ringCount, setRingCount] = useState<number>(6); // circles
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    generateRadialGrid(symmetryCount, ringCount);
    setLines([]); // clear old patterns when edges/rings change
    setCurrentLine(null);
  }, [symmetryCount, ringCount]);

  const generateRadialGrid = (count: number, rings: number) => {
    const tempDots: Dot[] = [];
    const spacing = (CANVAS_SIZE / 2 - 40) / rings;
    for (let i = 1; i <= rings; i++) {
      const radius = i * spacing;
      for (let s = 0; s < count; s++) {
        const angle = (2 * Math.PI * s) / count;
        tempDots.push({
          x: CENTER + radius * Math.cos(angle),
          y: CENTER + radius * Math.sin(angle),
        });
      }
    }
    setDots(tempDots);
  };

  const getClosestDot = (x: number, y: number) => {
    let closest = dots[0];
    let minDist = Infinity;
    for (const dot of dots) {
      const dist = Math.hypot(dot.x - x, dot.y - y);
      if (dist < minDist) {
        minDist = dist;
        closest = dot;
      }
    }
    return closest;
  };

  const rotatePoint = (dot: Dot, angle: number) => {
    const dx = dot.x - CENTER;
    const dy = dot.y - CENTER;
    const r = Math.hypot(dx, dy);
    const a = Math.atan2(dy, dx) + angle;
    return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) };
  };

  const generateRadialLines = (line: Line) => {
    const radialLines: Line[] = [];
    const angleStep = (2 * Math.PI) / symmetryCount;
    for (let i = 0; i < symmetryCount; i++) {
      const angle = i * angleStep;
      radialLines.push({
        start: rotatePoint(line.start, angle),
        end: rotatePoint(line.end, angle),
        cp: rotatePoint(
          line.cp || {
            x: (line.start.x + line.end.x) / 2,
            y: (line.start.y + line.end.y) / 2,
          },
          angle
        ),
      });
    }
    return radialLines;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const startDot = getClosestDot(x, y);
    setCurrentLine({ start: startDot, end: startDot });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!currentLine || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const endDot = getClosestDot(x, y);

    const dx = endDot.x - currentLine.start.x;
    const dy = endDot.y - currentLine.start.y;
    const distance = Math.hypot(dx, dy);
    const scale = Math.min(0.4, distance / 200);
    const cp = {
      x: (currentLine.start.x + endDot.x) / 2 - dy * scale,
      y: (currentLine.start.y + endDot.y) / 2 + dx * scale,
    };

    setCurrentLine({ start: currentLine.start, end: endDot, cp });
  };

  const handleMouseUp = () => {
    if (!currentLine) return;
    let newLines: Line[] = generateRadialLines(currentLine);
    setLines([...lines, ...newLines]);
    setCurrentLine(null);
  };

  const handleClear = () => setLines([]);

  const generateCurvePath = (line: Line) => {
    const cp = line.cp || {
      x: (line.start.x + line.end.x) / 2,
      y: (line.start.y + line.end.y) / 2,
    };
    return `M ${line.start.x} ${line.start.y} Q ${cp.x} ${cp.y} ${line.end.x} ${line.end.y}`;
  };

  const handleExport = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = "kolam.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Radial / Mandala Kolam Drawing</h1>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 items-center">
        {/* Edges */}
        <div className="flex items-center gap-4">
          <label className="font-medium">Number of Edges:</label>
          <input
            type="range"
            min={2}
            max={24}
            value={symmetryCount}
            onChange={(e) => setSymmetryCount(parseInt(e.target.value))}
            className="w-48"
          />
          <input
            type="number"
            min={2}
            max={24}
            value={symmetryCount}
            onChange={(e) => setSymmetryCount(parseInt(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1"
          />
        </div>

        {/* Rings */}
        <div className="flex items-center gap-4">
          <label className="font-medium">Number of Rings:</label>
          <input
            type="range"
            min={1}
            max={12}
            value={ringCount}
            onChange={(e) => setRingCount(parseInt(e.target.value))}
            className="w-48"
          />
          <input
            type="number"
            min={1}
            max={12}
            value={ringCount}
            onChange={(e) => setRingCount(parseInt(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Drawing Board */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 overflow-auto">
        <svg
          ref={svgRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {dots.map((dot, idx) => (
            <circle key={idx} cx={dot.x} cy={dot.y} r={DOT_RADIUS} fill="#FF6A00" />
          ))}

          {lines.map((line, idx) => (
            <path
              key={idx}
              d={generateCurvePath(line)}
              stroke="#FF6A00"
              strokeWidth={2}
              fill="none"
            />
          ))}

          {currentLine && (
            <path
              d={generateCurvePath(currentLine)}
              stroke="#FF6A00"
              strokeWidth={2}
              fill="none"
            />
          )}
        </svg>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Clear
        </button>
        <button
          onClick={handleExport}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Export as PNG
        </button>
      </div>
    </div>
  );
};

export default Draw;
