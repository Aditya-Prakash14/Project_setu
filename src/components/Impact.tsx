import React from 'react';
import { Check, Users, School, Monitor, MapPin } from 'lucide-react';

const Impact = () => {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-medium">OUR IMPACT</span>
          <h2 className="section-title mt-2">Transforming Rural Communities</h2>
          <p className="text-lg text-gray-600">
            We are creating lasting change through digital literacy and sustainable technological solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Village Visit"
                className="rounded-lg shadow-soft hover:shadow-md transition-shadow duration-300 object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-soft">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary-600" size={20} />
                  <span className="font-medium">Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="text-earth-700 text-sm font-medium bg-earth-100 px-3 py-1 rounded-full">FIRST INITIATIVE</span>
            <h3 className="text-2xl font-semibold mt-3 mb-4">Digital Literacy Campaign</h3>
            <p className="text-gray-600 mb-6">
              Our journey began with a visit to a remote village in Maharashtra, where we
              identified key challenges in digital literacy and access to technology.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <Check size={16} />
                </span>
                <span>Going to Conduct digital literacy workshops for 10+ villagers</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <Check size={16} />
                </span>
                <span>Providing computer learning Portal for under developed schools </span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <Check size={16} />
                </span>
                <span>Trained 5 local youth as digital ambassadors</span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-secondary-700 text-sm font-medium bg-secondary-100 px-3 py-1 rounded-full">NEXT STEPS</span>
            <h3 className="text-2xl font-semibold mt-3 mb-4">Expanding Our Reach</h3>
            <p className="text-gray-600 mb-6">
              With the success of our initial programs, we're now expanding to more villages and introducing advanced technological solutions.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-600">
                <h4 className="font-medium">Skill Development Programs</h4>
                <p className="text-gray-600 text-sm mt-1">Advanced training for employment opportunities</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-600">
                <h4 className="font-medium">Technology Hub Creation</h4>
                <p className="text-gray-600 text-sm mt-1">Central digital resource centers in 10 new villages</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-600">
                <h4 className="font-medium">Mobile Learning Application</h4>
                <p className="text-gray-600 text-sm mt-1">Developing a learning app for areas with mobile coverage</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/7009485/pexels-photo-7009485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Future Plans"
              className="rounded-lg shadow-soft"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-sm font-medium">Coming Soon</span>
              <h4 className="text-xl font-semibold">10 New Villages in 2025-26</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;