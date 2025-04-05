import React from 'react';
import { Users, BookOpen, Heart, Laptop, GraduationCap, Stethoscope, ArrowRight, FileText, Download } from 'lucide-react';

const WorkPage = () => {
  const impactMetrics = [
    { number: '1', label: 'Village Reached' },
    { number: '2', label: 'Schools Impacted' },
    { number: '4', label: 'Team Members' },
    { number: '350+', label: 'Lives Impacted' }
  ];

  const achievements = [
    {
      icon: <GraduationCap className="text-emerald-600" size={32} />,
      title: 'Digital Education',
      description: 'Set up computer labs and digital learning programs in both primary and secondary schools.',
      impact: 'Over 200 students now have access to digital learning resources'
    },
    {
      icon: <Laptop className="text-emerald-600" size={32} />,
      title: 'Digital Literacy',
      description: 'Conducted workshops for teachers and students on basic computer skills and digital tools.',
      impact: 'Trained 20 teachers and 100+ students in digital literacy'
    },
    {
      icon: <Stethoscope className="text-emerald-600" size={32} />,
      title: 'Healthcare Access',
      description: 'Initiated telemedicine pilot program to connect villagers with healthcare professionals.',
      impact: '50+ villagers have accessed healthcare services through telemedicine'
    }
  ];

  const upcomingProjects = [
    {
      title: 'Digital Skills Training',
      description: 'Launching comprehensive digital skills training program for youth',
      status: 'In Progress'
    },
    {
      title: 'Smart Agriculture',
      description: 'Implementing weather forecasting and market access tools for farmers',
      status: 'Planning'
    },
    {
      title: 'Women Empowerment',
      description: 'Digital literacy and online business training for women',
      status: 'Planning'
    }
  ];

  const resources = [
    {
      title: "Project Overview",
      description: "A comprehensive overview of Project Setu's mission, vision, and impact.",
      fileName: "project-setu-overview.pdf",
      fileSize: "2.4 MB"
    },
    {
      title: "Annual Report 2023",
      description: "Detailed report of our activities, achievements, and financial transparency.",
      fileName: "annual-report-2023.pdf",
      fileSize: "3.8 MB"
    },
    {
      title: "Impact Assessment",
      description: "Independent evaluation of our programs and their effectiveness.",
      fileName: "impact-assessment.pdf",
      fileSize: "1.7 MB"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Our Impact</h1>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Project Setu is making a difference in rural communities by bringing technology education and digital solutions to villages.
          </p>
          <div className="mt-8">
            <a 
              href="#resources" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              View Our Resources
              <FileText className="ml-2 -mr-1 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {impactMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{metric.number}</div>
              <div className="text-black">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Our Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center hover:transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{achievement.title}</h3>
                <p className="text-black mb-4">{achievement.description}</p>
                <p className="text-emerald-600 font-medium">{achievement.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div id="resources" className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Resources & Documentation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                  <FileText className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{resource.title}</h3>
                <p className="text-black mb-4">{resource.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-black">{resource.fileSize}</span>
                  <a 
                    href={`/resources/${resource.fileName}`} 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-100 rounded-md hover:bg-emerald-200"
                    download
                  >
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Projects */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Upcoming Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingProjects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-black mb-2">{project.title}</h3>
                <p className="text-black mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-600">{project.status}</span>
                  <ArrowRight className="text-emerald-600" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Community First</h3>
              <p className="text-black">
                Engaging with local leaders and villagers to understand their needs and challenges.
              </p>
            </div>
            <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Sustainable Solutions</h3>
              <p className="text-black">
                Creating lasting impact through technology education and infrastructure development.
              </p>
            </div>
            <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Holistic Development</h3>
              <p className="text-black">
                Addressing education, employment, and healthcare needs comprehensively.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Whether you're interested in volunteering, donating, or partnering with us, your support can help bridge the digital divide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Contact Us
            </a>
            <a 
              href="/donate" 
              className="inline-flex items-center px-6 py-3 border border-emerald-600 text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Support Our Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;