// Gallery.tsx
import React, { useState, useMemo } from "react";
import { Search, Download, Eye, Grid, List } from "lucide-react";
import { kolamData, Kolam } from "../data/kolamData";

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplexity, setSelectedComplexity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedKolam, setSelectedKolam] = useState<Kolam | null>(null);

  const filteredKolams = useMemo(() => {
    return kolamData.filter((kolam) => {
      const matchesSearch =
        kolam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kolam.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesComplexity =
        !selectedComplexity || kolam.complexity === selectedComplexity;
      const matchesRegion = !selectedRegion || kolam.region === selectedRegion;

      return matchesSearch && matchesComplexity && matchesRegion;
    });
  }, [searchTerm, selectedComplexity, selectedRegion]);

  const regions = [...new Set(kolamData.map((k) => k.region))];
  const complexities: Kolam["complexity"][] = [
    "Beginner",
    "Intermediate",
    "Expert",
  ];

  // ---- Download handler for PNG ----
  const handleDownloadPNG = (kolam: Kolam) => {
    const link = document.createElement("a");
    link.href = kolam.image;
    link.download = `${kolam.title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kolam Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of traditional and contemporary Kolam
            patterns from across South India
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Kolams by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 items-center">
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Complexities</option>
                {complexities.map((complexity) => (
                  <option key={complexity} value={complexity}>
                    {complexity}
                  </option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Regions</option>
                {regions.map(
                  (region) =>
                    region && (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    )
                )}
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredKolams.length} of {kolamData.length} Kolam patterns
          </p>
        </div>

        {/* Gallery Grid/List View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKolams.map((kolam) => (
              <div
                key={kolam.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedKolam(kolam)}
              >
                <div className="relative">
                  <img
                    src={kolam.image}
                    alt={kolam.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        kolam.complexity === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : kolam.complexity === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {kolam.complexity}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {kolam.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{kolam.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {kolam.region}
                    </span>
                    {kolam.theme && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {kolam.theme}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredKolams.map((kolam) => (
              <div
                key={kolam.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedKolam(kolam)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={kolam.image}
                      alt={kolam.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {kolam.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          kolam.complexity === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : kolam.complexity === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {kolam.complexity}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{kolam.description}</p>
                    <div className="flex items-center space-x-6 mb-4">
                      <span className="text-sm text-gray-500">
                        <strong>Region:</strong> {kolam.region}
                      </span>
                      {kolam.dotPattern && (
                        <span className="text-sm text-gray-500">
                          <strong>Dot Pattern:</strong> {kolam.dotPattern}
                        </span>
                      )}
                      {kolam.theme && (
                        <span className="text-sm text-gray-500">
                          <strong>Theme:</strong> {kolam.theme}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPNG(kolam);
                        }}
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Kolam Details */}
        {selectedKolam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedKolam.image}
                  alt={selectedKolam.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedKolam(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  ✕
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedKolam.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {selectedKolam.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Region:</strong> {selectedKolam.region}
                      </p>
                      <p>
                        <strong>Complexity:</strong>{" "}
                        {selectedKolam.complexity}
                      </p>
                      {selectedKolam.dotPattern && (
                        <p>
                          <strong>Dot Pattern:</strong>{" "}
                          {selectedKolam.dotPattern}
                        </p>
                      )}
                      {selectedKolam.theme && (
                        <p>
                          <strong>Theme:</strong> {selectedKolam.theme}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    onClick={() => handleDownloadPNG(selectedKolam)}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download PNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
