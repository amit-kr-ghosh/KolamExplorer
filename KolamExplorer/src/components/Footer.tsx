import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Kolam Explorer
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Discover the beautiful intersection of art and mathematics through the ancient Indian tradition of Kolam. 
              Learn, create, and explore these intricate patterns that have adorned doorsteps for centuries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/learn" className="text-gray-300 hover:text-white transition-colors duration-300">Learn Kolam</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-white transition-colors duration-300">Gallery</a></li>
              <li><a href="/create" className="text-gray-300 hover:text-white transition-colors duration-300">Create Patterns</a></li>
              <li><a href="/analyse" className="text-gray-300 hover:text-white transition-colors duration-300">Analyse Designs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Cultural Heritage</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Mathematical Beauty</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> for preserving cultural heritage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;