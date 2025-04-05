import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-primary-600';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-soft py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">PS</span>
            </div>
            <span className={`text-2xl font-display font-bold ${scrolled ? 'text-primary-600' : 'text-white'}`}>
              Project Setu
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/work" className={`${isActive('/work')} transition-colors duration-200 font-medium`}>
              Our Work
            </Link>
            <Link to="/blog" className={`${isActive('/blog')} transition-colors duration-200 font-medium`}>
              Blog
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors duration-200 font-medium`}>
              Contact
            </Link>
            <Link
              to="/donate"
              className="btn btn-primary"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-primary-600 transition-colors`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
            <div className="px-4 py-5 space-y-4">
              <Link
                to="/work"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Our Work
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/donate"
                className="block w-full btn btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;