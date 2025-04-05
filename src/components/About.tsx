import React from 'react';
import { Users, BookOpen, Heart, Cpu } from 'lucide-react';

const About = () => {
  const team = [
    { 
      name: 'Aditya', 
      role: 'Tech Lead',
      image: '',
      social: '@aditya'
    },
    { 
      name: 'Arohi', 
      role: 'Community Relations',
      image: '',
      social: '@arohi'
    },
    { 
      name: 'Ayush', 
      role: 'Founder & Project Manager',
      image: '',
      social: '@ayush'
    },
    { 
      name: 'Vipul', 
      role: 'Operations Head',
      image: '',
      social: '@vipul'
    },
      { 
        name: 'Ananya Panday', 
        role: 'Operations Team',
        image: '',
        social: '@ananya'
    },
    { 
      name: 'Ananya Gupta', 
      role: 'Marketing Team',
      image: '',
      social: '@ananya'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <span className="text-primary-600 font-medium">WHO WE ARE</span>
          <h2 className="section-title mt-2">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-16">
            Project Setu aims to bridge the digital divide by bringing technological solutions
            and digital literacy to rural communities across India.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <div className="p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-shadow duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
              <Users className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community First</h3>
            <p className="text-gray-600">Building solutions that address real community needs and challenges.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-shadow duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
              <BookOpen className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Digital Literacy</h3>
            <p className="text-gray-600">Empowering through education and technological knowledge transfer.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-shadow duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
              <Heart className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainable Impact</h3>
            <p className="text-gray-600">Creating lasting change through sustainable technological solutions.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-shadow duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
              <Cpu className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tech Innovation</h3>
            <p className="text-gray-600">Deploying cutting-edge solutions adapted for rural environments.</p>
          </div>
        </div>

        <div className="bg-secondary-50 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#0284C7" d="M42.8,-57.2C55.9,-47.3,67.1,-34.4,73.4,-18.6C79.7,-2.8,81.2,15.8,74.1,30.3C67.1,44.7,51.6,55,35.2,62.6C18.8,70.3,1.5,75.2,-15.8,73.2C-33.2,71.2,-50.5,62.3,-62.4,48.1C-74.2,34,-80.5,14.7,-78.5,-3.2C-76.5,-21.1,-66.2,-37.6,-52.5,-47.7C-38.9,-57.8,-22.8,-61.5,-7,-59.9C8.8,-58.4,29.7,-67.2,42.8,-57.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <span className="text-primary-600 font-medium">MEET THE TEAM</span>
            <h2 className="text-3xl font-bold mt-1 mb-10">The People Behind Project Setu</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <p className="text-primary-600 text-sm">{member.social}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;