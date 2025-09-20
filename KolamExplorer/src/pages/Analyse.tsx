import React, { useState, useRef } from "react";
import { Upload, Camera, Zap, Eye, MapPin } from "lucide-react";
import axios from "axios";

interface PredictionResponse {
  prediction: "bird" | "dot" | "floral";
  confidence: number;
}

const KOLAM_DETAILS: Record<
  string,
  { fullName: string; example: string; state: string; description: string }
> = {
  bird: {
    fullName: "Bird Kolam",
    example: "/images/kolam_dataset_all/bird/bird1.jpg",
    state: "Tamil Nadu",
    description:
      "Bird Kolams are intricate designs depicting birds, symbolizing nature and prosperity. Often drawn in front of houses during festivals.",
  },
  dot: {
    fullName: "Dot Kolam",
    example: "/images/kolam_dataset_all/dot/dot1.jpg",
    state: "Tamil Nadu, Karnataka",
    description:
      "Dot Kolams are made by connecting dots in symmetric patterns. They are simple yet elegant, often seen daily outside homes.",
  },
  floral: {
    fullName: "Floral Kolam",
    example: "/images/kolam_dataset_all/floral/floral1.jpg",
    state: "Kerala, Tamil Nadu",
    description:
      "Floral Kolams depict flowers and petals. They are drawn during auspicious occasions and represent beauty and welcoming guests.",
  },
};

const Analyse: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPrediction(null);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const analyzeKolam = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post<PredictionResponse>(
        "http://127.0.0.1:8000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setPrediction(res.data);
    } catch (error) {
      console.error("Error analyzing kolam:", error);
      setPrediction(null);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analyse Kolam Patterns
          </h1>
          <p className="text-lg text-gray-600">
            Upload your Kolam design to classify it and learn about its type,
            origin, and cultural significance.
          </p>
        </div>

        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Upload & Analyze */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
            {/* Upload Section */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-orange-300 rounded-xl p-12 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 mb-8"
            >
              <Upload className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Upload Your Kolam
              </p>
              <p className="text-gray-600">
                Click to browse or drag and drop an image
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Preview & Analyse */}
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected Kolam"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <button
                  onClick={analyzeKolam}
                  disabled={isAnalyzing}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
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
            ) : (
              <div className="bg-gray-100 rounded-2xl p-12 text-center">
                <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Analyse
                </h3>
                <p className="text-gray-600">
                  Upload a Kolam pattern to get its classification.
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Result */}
          <div className="lg:w-1/2">
            {prediction && KOLAM_DETAILS[prediction.prediction] && (
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Model Prediction
                  </h3>
                  <p className="text-lg text-gray-700">
                    Predicted Type:{" "}
                    <span className="font-semibold">
                      {KOLAM_DETAILS[prediction.prediction].fullName}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Confidence: {(prediction.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="mt-4 flex-1 grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={KOLAM_DETAILS[prediction.prediction].example}
                      alt={KOLAM_DETAILS[prediction.prediction].fullName}
                      className="w-full h-64 object-cover rounded-lg shadow"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        About {KOLAM_DETAILS[prediction.prediction].fullName}
                      </h4>
                      <p className="text-gray-700 mb-4">
                        {KOLAM_DETAILS[prediction.prediction].description}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                        Typical State/Region:{" "}
                        {KOLAM_DETAILS[prediction.prediction].state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyse;
