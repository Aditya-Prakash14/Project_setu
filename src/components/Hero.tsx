import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/2464066/pexels-photo-2464066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Rural India"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Bridging Rural India <span className="text-primary-400">with Technology</span>
            </h1>
            <p className="text-xl text-white mb-8">
              Empowering communities through digital literacy, technological solutions, and sustainable development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary group">
                Get Involved
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slide-up">
              <h3 className="text-white text-xl font-medium mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-300 mb-2">2</div>
                  <div className="text-gray-300 font-medium">Villagers visit</div>
                </div>
                
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-300 mb-2">5</div>
                  <div className="text-gray-300 font-medium">Villages Problem</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 animate-bounce-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;