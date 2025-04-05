import React from 'react';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "Digital Literacy Workshop Success in Maharashtra",
      excerpt: "Over 100 villagers participated in our recent digital literacy program, marking a significant milestone in our mission.",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80",
      category: "Education",
      readTime: "5 min read"
    },
    {
      title: "Empowering Rural Youth Through Technology",
      excerpt: "Meet the young digital ambassadors who are leading the technological revolution in their villages.",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
      category: "Community",
      readTime: "4 min read"
    },
    {
      title: "Partnership Spotlight: Tech Giants Join Our Cause",
      excerpt: "Major technology companies pledge support for Project Setu's rural digitalization initiative.",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      category: "Partnerships",
      readTime: "3 min read"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="mb-6 md:mb-0">
            <span className="text-primary-600 font-medium">OUR BLOG</span>
            <h2 className="section-title mt-2">Latest Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Stories and insights from our journey of digital empowerment across rural India.
            </p>
          </div>
          <a 
            href="#" 
            className="btn btn-outline group flex items-center"
          >
            View All Posts
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index} 
              className="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-md group border border-gray-100"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                >
                  Read More
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 md:p-12 shadow-soft">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 mb-6">
                Stay updated with our latest stories, impact reports, and upcoming events.
              </p>
              <form className="flex max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button className="bg-primary-600 text-white px-6 py-3 rounded-r-lg hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1512626120412-faf41adb4874?auto=format&fit=crop&q=80" 
                alt="Newsletter" 
                className="w-full max-w-xs mx-auto rounded-lg shadow-soft"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;