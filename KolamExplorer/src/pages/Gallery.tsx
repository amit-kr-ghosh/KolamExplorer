import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Grid, List, Star } from 'lucide-react';

interface KolamData {
  id: number;
  title: string;
  region: string;
  dotCount: number;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  imageUrl: string;
  tags: string[];
  rating: number;
}

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedKolam, setSelectedKolam] = useState<KolamData | null>(null);

  // Mock data for Kolam patterns
  const kolamData: KolamData[] = [
    {
      id: 1,
      title: 'Traditional Lotus Pattern',
      region: 'Tamil Nadu',
      dotCount: 13,
      complexity: 'Intermediate',
      description: 'A beautiful lotus-inspired Kolam representing purity and prosperity.',
      imageUrl: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg',
      tags: ['lotus', 'traditional', 'festival'],
      rating: 4.8
    },
    {
      id: 2,
      title: 'Simple Geometric Grid',
      region: 'Karnataka',
      dotCount: 9,
      complexity: 'Beginner',
      description: 'A basic geometric pattern perfect for learning Kolam fundamentals.',
      imageUrl: 'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg',
      tags: ['geometric', 'beginner', 'simple'],
      rating: 4.5
    },
    {
      id: 3,
      title: 'Elaborate Festival Design',
      region: 'Andhra Pradesh',
      dotCount: 25,
      complexity: 'Advanced',
      description: 'An intricate festival Kolam with complex symmetrical patterns.',
      imageUrl: 'https://images.pexels.com/photos/2693207/pexels-photo-2693207.jpeg',
      tags: ['festival', 'complex', 'symmetrical'],
      rating: 4.9
    },
    {
      id: 4,
      title: 'Peacock Motif Kolam',
      region: 'Tamil Nadu',
      dotCount: 16,
      complexity: 'Intermediate',
      description: 'A graceful peacock-inspired design symbolizing beauty and grace.',
      imageUrl: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg',
      tags: ['peacock', 'motif', 'traditional'],
      rating: 4.7
    },
    {
      id: 5,
      title: 'Diya Pattern',
      region: 'Karnataka',
      dotCount: 11,
      complexity: 'Beginner',
      description: 'A simple yet elegant lamp (diya) pattern for Diwali celebrations.',
      imageUrl: 'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg',
      tags: ['diya', 'diwali', 'lamp'],
      rating: 4.4
    },
    {
      id: 6,
      title: 'Complex Mandala Kolam',
      region: 'Andhra Pradesh',
      dotCount: 49,
      complexity: 'Advanced',
      description: 'A sophisticated mandala-style Kolam with intricate mathematical precision.',
      imageUrl: 'https://images.pexels.com/photos/2693207/pexels-photo-2693207.jpeg',
      tags: ['mandala', 'complex', 'mathematical'],
      rating: 4.9
    }
  ];

  const filteredKolams = useMemo(() => {
    return kolamData.filter(kolam => {
      const matchesSearch = kolam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kolam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kolam.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesComplexity = !selectedComplexity || kolam.complexity === selectedComplexity;
      const matchesRegion = !selectedRegion || kolam.region === selectedRegion;
      
      return matchesSearch && matchesComplexity && matchesRegion;
    });
  }, [searchTerm, selectedComplexity, selectedRegion]);

  const regions = [...new Set(kolamData.map(k => k.region))];
  const complexities = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kolam Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of traditional and contemporary Kolam patterns from across South India
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Kolams by name, description, or tags..."
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
                {complexities.map(complexity => (
                  <option key={complexity} value={complexity}>{complexity}</option>
                ))}
              </select>
              
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
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
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKolams.map((kolam) => (
              <div
                key={kolam.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedKolam(kolam)}
              >
                <div className="relative">
                  <img
                    src={kolam.imageUrl}
                    alt={kolam.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      kolam.complexity === 'Beginner' ? 'bg-green-100 text-green-800' :
                      kolam.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {kolam.complexity}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{kolam.title}</h3>
                  <p className="text-gray-600 mb-3">{kolam.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{kolam.region}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{kolam.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600">
                      {kolam.dotCount} dots
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
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
                      src={kolam.imageUrl}
                      alt={kolam.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{kolam.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        kolam.complexity === 'Beginner' ? 'bg-green-100 text-green-800' :
                        kolam.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {kolam.complexity}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{kolam.description}</p>
                    <div className="flex items-center space-x-6 mb-4">
                      <span className="text-sm text-gray-500">
                        <strong>Region:</strong> {kolam.region}
                      </span>
                      <span className="text-sm text-gray-500">
                        <strong>Dots:</strong> {kolam.dotCount}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-600">{kolam.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {kolam.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
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
                  src={selectedKolam.imageUrl}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedKolam.title}</h2>
                <p className="text-gray-600 mb-6">{selectedKolam.description}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Region:</strong> {selectedKolam.region}</p>
                      <p><strong>Dot Count:</strong> {selectedKolam.dotCount}</p>
                      <p><strong>Complexity:</strong> {selectedKolam.complexity}</p>
                      <div className="flex items-center">
                        <strong>Rating:</strong>
                        <div className="flex items-center ml-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{selectedKolam.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedKolam.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                    <Download className="h-5 w-5 mr-2" />
                    Download PNG
                  </button>
                  <button className="flex-1 flex items-center justify-center px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Download className="h-5 w-5 mr-2" />
                    Download SVG
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