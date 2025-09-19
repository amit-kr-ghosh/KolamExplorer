import React, { useState, useRef } from 'react';
import { Upload, Camera, BarChart3, Zap, Download, Eye, Grid, Target } from 'lucide-react';

interface AnalysisResult {
  dotCount: number;
  complexity: 'Simple' | 'Intermediate' | 'Complex';
  symmetryLines: number;
  loopCount: number;
  culturalContext: string;
  mathematicalProperties: {
    symmetryType: string[];
    graphTheory: string;
    fractaldimension?: number;
  };
  completionTime?: number;
}

const Analyse: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample Kolam patterns for demonstration
  const sampleKolams = [
    {
      id: 'sample1',
      name: 'Traditional 13-dot Kolam',
      imageUrl: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg',
      previewResult: {
        dotCount: 13,
        complexity: 'Intermediate' as const,
        symmetryLines: 4,
        loopCount: 3,
        culturalContext: 'Tamil Nadu festival pattern symbolizing prosperity',
        mathematicalProperties: {
          symmetryType: ['Rotational (4-fold)', 'Reflective'],
          graphTheory: 'Eulerian path with 3 connected components',
          fractaldimension: 1.26
        }
      }
    },
    {
      id: 'sample2',
      name: 'Simple 9-dot Pattern',
      imageUrl: 'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg',
      previewResult: {
        dotCount: 9,
        complexity: 'Simple' as const,
        symmetryLines: 2,
        loopCount: 1,
        culturalContext: 'Basic household Kolam for daily practice',
        mathematicalProperties: {
          symmetryType: ['Reflective (horizontal)', 'Reflective (vertical)'],
          graphTheory: 'Simple cycle graph with degree 2 vertices'
        }
      }
    },
    {
      id: 'sample3',
      name: 'Complex Mandala Kolam',
      imageUrl: 'https://images.pexels.com/photos/2693207/pexels-photo-2693207.jpeg',
      previewResult: {
        dotCount: 49,
        complexity: 'Complex' as const,
        symmetryLines: 8,
        loopCount: 7,
        culturalContext: 'Ceremonial Kolam for major festivals like Pongal',
        mathematicalProperties: {
          symmetryType: ['Rotational (8-fold)', 'Reflective', 'Point symmetry'],
          graphTheory: 'Multi-component graph with nested cycles',
          fractaldimension: 1.68
        }
      }
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setSelectedSample(null);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleSelect = (sample: typeof sampleKolams[0]) => {
    setSelectedImage(sample.imageUrl);
    setSelectedSample(sample.id);
    setAnalysisResult(null);
  };

  const analyzeKolam = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // If it's a sample, use the preview result
    if (selectedSample) {
      const sample = sampleKolams.find(s => s.id === selectedSample);
      if (sample) {
        setAnalysisResult({
          ...sample.previewResult,
          completionTime: 2.8
        });
      }
    } else {
      // For uploaded images, provide a generic analysis
      setAnalysisResult({
        dotCount: Math.floor(Math.random() * 30) + 9,
        complexity: ['Simple', 'Intermediate', 'Complex'][Math.floor(Math.random() * 3)] as any,
        symmetryLines: Math.floor(Math.random() * 6) + 1,
        loopCount: Math.floor(Math.random() * 5) + 1,
        culturalContext: 'Traditional South Indian Kolam pattern with regional variations',
        mathematicalProperties: {
          symmetryType: ['Reflective', 'Rotational'],
          graphTheory: 'Connected graph with multiple cycles'
        },
        completionTime: 3.2
      });
    }
    
    setIsAnalyzing(false);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'from-green-500 to-emerald-500';
      case 'Intermediate': return 'from-yellow-500 to-orange-500';
      case 'Complex': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getComplexityScore = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 25;
      case 'Intermediate': return 60;
      case 'Complex': return 90;
      default: return 0;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analyse Kolam Patterns
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your Kolam design or select a sample to discover its mathematical properties and cultural significance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload/Select Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Kolam to Analyse</h2>
              
              {/* Upload Area */}
              <div className="mb-8">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-orange-300 rounded-xl p-12 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-300"
                >
                  <Upload className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Your Kolam</p>
                  <p className="text-gray-600">Click to browse or drag and drop an image</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="text-center text-gray-500 mb-6">or</div>

              {/* Sample Kolams */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Sample Pattern</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sampleKolams.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => handleSampleSelect(sample)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedSample === sample.id 
                          ? 'border-orange-500 shadow-lg' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <img
                        src={sample.imageUrl}
                        alt={sample.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{sample.name}</p>
                      </div>
                      {selectedSample === sample.id && (
                        <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                          <div className="bg-orange-500 text-white rounded-full p-1">
                            <Eye className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Kolam</h3>
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected Kolam"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={analyzeKolam}
                    disabled={isAnalyzing}
                    className="absolute bottom-4 right-4 flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Analyse Pattern
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results Section */}
          <div className="space-y-8">
            {analysisResult ? (
              <>
                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{analysisResult.dotCount}</div>
                      <div className="text-sm text-gray-600">Dots Detected</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                      <Grid className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{analysisResult.symmetryLines}</div>
                      <div className="text-sm text-gray-600">Symmetry Lines</div>
                    </div>
                  </div>

                  {/* Complexity Meter */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Complexity Level</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getComplexityColor(analysisResult.complexity)} text-white`}>
                        {analysisResult.complexity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getComplexityColor(analysisResult.complexity)} transition-all duration-1000`}
                        style={{ width: `${getComplexityScore(analysisResult.complexity)}%` }}
                      ></div>
                    </div>
                  </div>

                  {analysisResult.completionTime && (
                    <div className="text-center text-sm text-gray-500">
                      Analysis completed in {analysisResult.completionTime}s
                    </div>
                  )}
                </div>

                {/* Mathematical Properties */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
                    Mathematical Properties
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Symmetry Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.mathematicalProperties.symmetryType.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-green-200 text-green-800 text-sm rounded-full">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Graph Theory Analysis</h4>
                      <p className="text-blue-700 text-sm">{analysisResult.mathematicalProperties.graphTheory}</p>
                    </div>
                    
                    {analysisResult.mathematicalProperties.fractaldimension && (
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Fractal Properties</h4>
                        <p className="text-purple-700 text-sm">
                          Fractal dimension: {analysisResult.mathematicalProperties.fractaldimension}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cultural Context */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Cultural Significance</h3>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{analysisResult.culturalContext}</p>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{analysisResult.loopCount}</div>
                      <div className="text-sm text-gray-600">Loop Structures</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{analysisResult.symmetryLines}</div>
                      <div className="text-sm text-gray-600">Symmetry Axes</div>
                    </div>
                  </div>
                </div>

                {/* Export Results */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                    <Download className="h-5 w-5 mr-2" />
                    Export Analysis Report
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyse</h3>
                <p className="text-gray-600">
                  Select or upload a Kolam pattern to see its mathematical properties and cultural significance
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyse;