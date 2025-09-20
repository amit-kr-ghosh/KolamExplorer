import React, { useState } from "react";

const Mathematics: React.FC = () => {
  const mathConcepts = [
    {
      title: "Symmetry",
      description: `Kolams exhibit rotational, reflective, and translational symmetry, creating visually harmonious patterns.`,
      formula: "f(x, y) = f(-x, y) or f(x, y) = f(y, x)",
      svg: (hovered: boolean) => (
        <svg viewBox="0 0 100 100" className="w-full h-48">
          {/* Reflective symmetry along vertical axis */}
          <circle
            cx="30"
            cy="50"
            r="3"
            fill={hovered ? "#1D4ED8" : "#3B82F6"}
          />
          <circle
            cx="70"
            cy="50"
            r="3"
            fill={hovered ? "#1D4ED8" : "#3B82F6"}
          />
          <line
            x1="30"
            y1="50"
            x2="70"
            y2="50"
            stroke={hovered ? "#1D4ED8" : "#3B82F6"}
            strokeWidth={hovered ? 3 : 2}
          />
          {/* Rotational symmetry example */}
          <circle
            cx="50"
            cy="30"
            r="3"
            fill={hovered ? "#1E40AF" : "#2563EB"}
          />
          <circle
            cx="50"
            cy="70"
            r="3"
            fill={hovered ? "#1E40AF" : "#2563EB"}
          />
          <line
            x1="50"
            y1="30"
            x2="50"
            y2="70"
            stroke={hovered ? "#1E40AF" : "#2563EB"}
            strokeWidth={hovered ? 3 : 2}
          />
        </svg>
      ),
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-800",
    },
    {
      title: "Graph Theory",
      description: `Dots are vertices and lines are edges; many Kolams follow Eulerian paths connecting every vertex exactly once.`,
      formula: "Euler's path: #odd-degree vertices = 0 or 2",
      svg: (hovered: boolean) => (
        <svg viewBox="0 0 100 100" className="w-full h-48">
          <circle cx="20" cy="20" r="3" fill={hovered ? "#047857" : "#10B981"} />
          <circle cx="80" cy="20" r="3" fill={hovered ? "#047857" : "#10B981"} />
          <circle cx="50" cy="80" r="3" fill={hovered ? "#047857" : "#10B981"} />
          <line
            x1="20"
            y1="20"
            x2="80"
            y2="20"
            stroke={hovered ? "#065F46" : "#059669"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="80"
            y1="20"
            x2="50"
            y2="80"
            stroke={hovered ? "#065F46" : "#059669"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="50"
            y1="80"
            x2="20"
            y2="20"
            stroke={hovered ? "#065F46" : "#059669"}
            strokeWidth={hovered ? 3 : 2}
          />
        </svg>
      ),
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-800",
    },
    {
      title: "Fractals",
      description: `Self-similar patterns appear at multiple scales, forming infinitely intricate designs.`,
      formula: "f(x) = r * f(x) + c",
      svg: (hovered: boolean) => (
        <svg viewBox="0 0 100 100" className="w-full h-48">
          <line
            x1="50"
            y1="90"
            x2="50"
            y2="60"
            stroke={hovered ? "#6B21A8" : "#8B5CF6"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="50"
            y1="60"
            x2="35"
            y2="45"
            stroke={hovered ? "#6B21A8" : "#8B5CF6"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="50"
            y1="60"
            x2="65"
            y2="45"
            stroke={hovered ? "#6B21A8" : "#8B5CF6"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="35"
            y1="45"
            x2="28"
            y2="35"
            stroke={hovered ? "#6B21A8" : "#8B5CF6"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="65"
            y1="45"
            x2="72"
            y2="35"
            stroke={hovered ? "#6B21A8" : "#8B5CF6"}
            strokeWidth={hovered ? 3 : 2}
          />
        </svg>
      ),
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-800",
    },
    {
      title: "Combinatorics",
      description: `Permutations and combinations determine the number of unique Kolam arrangements.`,
      formula: "nPr = n! / (n-r)!",
      svg: (hovered: boolean) => (
        <svg viewBox="0 0 100 100" className="w-full h-48">
          <circle cx="20" cy="20" r="3" fill={hovered ? "#B45309" : "#F59E0B"} />
          <circle cx="50" cy="20" r="3" fill={hovered ? "#B45309" : "#F59E0B"} />
          <circle cx="80" cy="20" r="3" fill={hovered ? "#B45309" : "#F59E0B"} />
          <circle cx="35" cy="50" r="3" fill={hovered ? "#B45309" : "#FBBF24"} />
          <circle cx="65" cy="50" r="3" fill={hovered ? "#B45309" : "#FBBF24"} />
          <line
            x1="20"
            y1="20"
            x2="50"
            y2="20"
            stroke={hovered ? "#92400E" : "#D97706"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="50"
            y1="20"
            x2="80"
            y2="20"
            stroke={hovered ? "#92400E" : "#D97706"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="35"
            y1="50"
            x2="65"
            y2="50"
            stroke={hovered ? "#92400E" : "#D97706"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="20"
            y1="20"
            x2="35"
            y2="50"
            stroke={hovered ? "#92400E" : "#D97706"}
            strokeWidth={hovered ? 2 : 1}
            strokeDasharray="2,2"
          />
          <line
            x1="50"
            y1="20"
            x2="65"
            y2="50"
            stroke={hovered ? "#92400E" : "#D97706"}
            strokeWidth={hovered ? 2 : 1}
            strokeDasharray="2,2"
          />
        </svg>
      ),
      bgColor: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      title: "Topology",
      description: `Kolams often form continuous loops, which can be studied using concepts from knot theory and continuous mappings.`,
      formula: "Loop: f: S¹ → R²",
      svg: (hovered: boolean) => (
        <svg viewBox="0 0 100 100" className="w-full h-48">
          <path
            d="M20,50 Q50,10 80,50 Q50,90 20,50"
            fill="none"
            stroke={hovered ? "#DB2777" : "#EC4899"}
            strokeWidth={hovered ? 4 : 3}
          />
          <circle cx="50" cy="50" r="3" fill={hovered ? "#DB2777" : "#EC4899"} />
        </svg>
      ),
      bgColor: "from-pink-50 to-pink-100",
      textColor: "text-pink-800",
    },
    {
      title: "Algorithmic Generation",
      description: `Kolams can be created algorithmically, using recursive rules to generate complex patterns.`,
      formula: "Kolam(n) = Kolam(n-1) + ruleset",
      svg: (hovered: boolean) => (
        <svg viewBox="0 0 100 100" className="w-full h-48">
          <line
            x1="50"
            y1="80"
            x2="50"
            y2="50"
            stroke={hovered ? "#4338CA" : "#6366F1"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="50"
            y1="50"
            x2="35"
            y2="35"
            stroke={hovered ? "#4338CA" : "#6366F1"}
            strokeWidth={hovered ? 3 : 2}
          />
          <line
            x1="50"
            y1="50"
            x2="65"
            y2="35"
            stroke={hovered ? "#4338CA" : "#6366F1"}
            strokeWidth={hovered ? 3 : 2}
          />
          <circle cx="50" cy="80" r="3" fill={hovered ? "#3730A3" : "#4F46E5"} />
          <circle cx="35" cy="35" r="3" fill={hovered ? "#3730A3" : "#4F46E5"} />
          <circle cx="65" cy="35" r="3" fill={hovered ? "#3730A3" : "#4F46E5"} />
        </svg>
      ),
      bgColor: "from-indigo-50 to-indigo-100",
      textColor: "text-indigo-800",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Mathematics Behind Kolams
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mathConcepts.map((concept, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${concept.bgColor} p-6 rounded-xl shadow-lg transition-all duration-300`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h3 className={`text-xl font-semibold ${concept.textColor} mb-3`}>
              {concept.title}
            </h3>
            <p className="text-gray-700 mb-3">{concept.description}</p>
            <p className="text-gray-800 font-mono mb-4">{concept.formula}</p>
            <div className="w-full h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden">
              {concept.svg(hoveredIndex === idx)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mathematics;
