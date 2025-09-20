import React, { useState } from "react";
import { Play, CheckCircle } from "lucide-react";

const Tutorials: React.FC = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const quizQuestions = [
    {
      question: "What is the traditional material used to draw Kolams?",
      options: ["Chalk powder", "Rice flour", "Sand", "Paint"],
      correct: 1,
    },
    {
      question: "Which mathematical concept is most prominent in Kolam patterns?",
      options: ["Algebra", "Calculus", "Symmetry", "Statistics"],
      correct: 2,
    },
    {
      question: "When are Kolams traditionally drawn?",
      options: ["Evening", "Afternoon", "Dawn", "Night"],
      correct: 2,
    },
  ];

  const handleQuizAnswer = (selectedIndex: number) => {
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore((prev) => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowQuizResults(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Step-by-Step Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Basic Dot Patterns", difficulty: "Beginner", duration: "10 min" },
          { title: "Simple Geometric Shapes", difficulty: "Beginner", duration: "15 min" },
          { title: "Connecting Lines", difficulty: "Intermediate", duration: "20 min" },
          { title: "Symmetrical Designs", difficulty: "Intermediate", duration: "25 min" },
          { title: "Complex Loop Patterns", difficulty: "Advanced", duration: "35 min" },
          { title: "Festival Kolams", difficulty: "Advanced", duration: "45 min" },
        ].map((tutorial, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  tutorial.difficulty === "Beginner"
                    ? "bg-green-100 text-green-800"
                    : tutorial.difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tutorial.difficulty}
              </span>
              <span className="text-sm text-gray-500">{tutorial.duration}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{tutorial.title}</h3>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-md transition-all duration-300">
              <Play className="h-4 w-4 mr-2" />
              Watch Tutorial
            </button>
          </div>
        ))}
      </div>

      {/* Quiz Section */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Test Your Knowledge
        </h3>
        {!showQuizResults ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Score: {quizScore}/{quizQuestions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {quizQuestions[currentQuestion].question}
              </h4>
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h4>
              <p className="text-lg text-gray-600 mb-4">
                You scored {quizScore} out of {quizQuestions.length}
              </p>
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-2">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(quizScore / quizQuestions.length) * 283} 283`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                    <text
                      x="50"
                      y="55"
                      textAnchor="middle"
                      className="text-lg font-bold fill-gray-700"
                    >
                      {Math.round((quizScore / quizQuestions.length) * 100)}%
                    </text>
                  </svg>
                </div>
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Take Quiz Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
