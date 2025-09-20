import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Palette, Search, ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Learn',
      description: 'Discover Kolam history and its mathematical beauty',
      path: '/learn',
      gradient: 'bg-gradient-to-tr from-blue-500 to-blue-600'
    },
    {
      icon: Image,
      title: 'Gallery',
      description: 'Explore curated traditional and contemporary Kolams',
      path: '/gallery',
      gradient: 'bg-gradient-to-tr from-emerald-500 to-emerald-600'
    },
    {
      icon: Palette,
      title: 'Create',
      description: 'Design your own Kolams with interactive tools',
      path: '/create',
      gradient: 'bg-gradient-to-tr from-purple-500 to-purple-600'
    },
    {
      icon: Search,
      title: 'Analyse',
      description: 'Understand structure and cultural significance',
      path: '/analyse',
      gradient: 'bg-gradient-to-tr from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="relative font-sans overflow-x-hidden bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 overflow-hidden bg-gradient-to-tr from-orange-50 via-red-50 to-yellow-50">
        {/* Animated background blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-orange-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-red-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>

        {/* Text */}
        <div className={`relative z-10 max-w-lg transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 leading-tight mb-6">
            Kolam Explorer
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-8">
            Where Art Meets Mathematics — Explore, Create, and Analyse intricate Kolam patterns.
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Kolam GIF instead of AnimatedKolam */}
        <div className={`relative z-10 mt-12 lg:mt-0 lg:ml-24 w-full max-w-lg transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <img
            src="/images/kolam_red.gif"
            alt="Kolam Animation"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Discover Features</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in Kolams through learning, creating, and analyzing patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <Link
              key={feature.path}
              to={feature.path}
              className={`relative group p-8 rounded-3xl shadow-2xl ${feature.gradient} text-white hover:scale-105 hover:shadow-3xl transition-all duration-500`}
            >
              <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-white bg-opacity-20">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/90">{feature.description}</p>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="relative py-24 px-6 lg:px-24 bg-gradient-to-tr from-gray-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-orange-500" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Cultural Heritage</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Kolams are drawn with rice flour, traditionally by women at dawn. They represent prosperity, welcome guests, and connect communities to cultural roots.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Kolams also showcase complex mathematical concepts like symmetry, fractals, graph theory, and topology — blending art with mathematics.
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src="/images/kolam1.jpg"
                alt="Kolam design"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
