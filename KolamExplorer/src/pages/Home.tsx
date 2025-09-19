import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Palette, Search, ArrowRight, Star } from 'lucide-react';
import AnimatedKolam from '../components/AnimatedKolam';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Learn',
      description: 'Discover the rich history and mathematical beauty of Kolam patterns',
      path: '/learn',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: Image,
      title: 'Gallery',
      description: 'Explore a curated collection of traditional and contemporary Kolams',
      path: '/gallery',
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
    },
    {
      icon: Palette,
      title: 'Create',
      description: 'Design your own Kolam patterns with our interactive tools',
      path: '/create',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      icon: Search,
      title: 'Analyse',
      description: 'Understand the mathematical structure and cultural significance',
      path: '/analyse',
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                Kolam Explorer
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Where Art Meets Mathematics
              </p>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Discover the ancient Indian tradition of Kolam patterns - intricate designs that blend cultural heritage with mathematical beauty
              </p>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <AnimatedKolam />
            </div>
            
            <div className={`transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/learn"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Kolam Patterns</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in the world of Kolams through learning, creating, and analyzing these beautiful patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={feature.path}
                to={feature.path}
                className={`group relative p-8 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg hover:shadow-2xl ${feature.hoverColor} transition-all duration-300 transform hover:scale-105`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-white">
                  <feature.icon className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed">{feature.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Star className="h-8 w-8 text-orange-500 mr-3" />
                <h2 className="text-4xl font-bold text-gray-900">Cultural Heritage</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Kolams are intricate patterns drawn with rice flour on the ground, traditionally created by women at dawn in front of their homes. These geometric designs are not just decorative - they represent prosperity, welcome guests, and connect communities to their cultural roots.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Beyond their cultural significance, Kolams embody complex mathematical concepts including symmetry, fractals, graph theory, and topology. Each pattern tells a story while demonstrating the beautiful relationship between art and mathematics.
              </p>
              <Link
                to="/learn"
                className="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="relative p-8 bg-white rounded-2xl shadow-xl">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <path
                      d="M20 20 L80 20 L80 80 L20 80 Z M50 50 m -20 0 a 20 20 0 0 1 40 0 a 20 20 0 0 1 -40 0"
                      fill="none"
                      stroke="rgb(251 146 60)"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;