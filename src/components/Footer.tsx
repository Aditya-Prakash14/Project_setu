import React, { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-x-12 gap-y-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <span className="text-2xl font-display font-bold text-white">
                Project Setu
              </span>
            </div>
            <p className="text-gray-400">
              Bridging the digital divide and empowering rural communities through technology and education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary-600"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#work" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Our Work
                </a>
              </li>
              <li>
                <a href="#involved" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Get Involved
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary-600"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400 group">
                <Mail size={16} className="mr-3 text-primary-500" />
                <a href="mailto:info@projectsetu.org" className="hover:text-white transition-colors">
                  info@projectsetu.org
                </a>
              </li>
              <li className="flex items-center text-gray-400 group">
                <Phone size={16} className="mr-3 text-primary-500" />
                <a href="tel:+911234567890" className="hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={16} className="mr-3 mt-1 text-primary-500" />
                <span>123 Tech Hub, Andheri East,<br />Mumbai, Maharashtra 400069</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary-600"></span>
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on our work and impact.
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white px-4 py-3 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                ) : null}
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                {!isSubmitting && !isSubscribed && <ArrowRight size={16} className="ml-2" />}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Project Setu. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;