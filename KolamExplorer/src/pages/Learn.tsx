import React, { useState } from "react";
import { BookOpen, Play, Award } from "lucide-react";
import History from "../components/Learn/History";
import Mathematics from "../components/Learn/Mathematics";
import Tutorials from "../components/Learn/Tutorials";

const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "History & Culture", icon: BookOpen },
    { id: "mathematics", label: "Mathematics", icon: Award },
    { id: "tutorials", label: "Tutorials", icon: Play },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learn About Kolams
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich cultural heritage and mathematical beauty behind
            these ancient patterns
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 mx-2 mb-4 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {activeTab === "history" && <History />}
          {activeTab === "mathematics" && <Mathematics />}
          {activeTab === "tutorials" && <Tutorials />}
        </div>
      </div>
    </div>
  );
};

export default Learn;
