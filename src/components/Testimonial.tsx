import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
  company?: string;
  companyLogo?: string;
  className?: string;
  variant?: 'card' | 'minimal' | 'featured';
  showQuoteIcon?: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  avatar,
  rating,
  company,
  companyLogo,
  className = '',
  variant = 'card',
  showQuoteIcon = true,
}) => {
  // Function to render stars based on rating
  const renderStars = () => {
    if (!rating) return null;
    
    return (
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i}
            size={18}
            className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} mr-1`}
          />
        ))}
      </div>
    );
  };

  // Render testimonial based on variant
  const renderTestimonial = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className={`p-4 ${className}`}>
            {showQuoteIcon && (
              <Quote size={24} className="text-gray-400 mb-2" />
            )}
            <blockquote className="text-gray-700 dark:text-gray-300 italic mb-3">
              "{quote}"
            </blockquote>
            <div className="flex items-center">
              {avatar && (
                <img 
                  src={avatar} 
                  alt={author}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{author}</p>
                {role && <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>}
              </div>
            </div>
          </div>
        );

      case 'featured':
        return (
          <div className={`p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl shadow-soft ${className}`}>
            {renderStars()}
            
            <div className="relative">
              {showQuoteIcon && (
                <Quote size={48} className="absolute -left-2 -top-2 text-primary-200 dark:text-primary-800 opacity-50" />
              )}
              
              <blockquote className="relative z-10 text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-6 pl-6">
                "{quote}"
              </blockquote>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {avatar && (
                  <img 
                    src={avatar} 
                    alt={author}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                  />
                )}
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{author}</p>
                  {role && <p className="text-gray-600 dark:text-gray-400">{role}</p>}
                  {company && !companyLogo && (
                    <p className="text-sm text-primary-600 dark:text-primary-400">{company}</p>
                  )}
                </div>
              </div>
              
              {companyLogo && (
                <img 
                  src={companyLogo} 
                  alt={company || 'Company logo'}
                  className="h-8 object-contain"
                />
              )}
            </div>
          </div>
        );

      case 'card':
      default:
        return (
          <div className={`p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
            {renderStars()}
            
            {showQuoteIcon && (
              <Quote size={24} className="text-gray-300 dark:text-gray-600 mb-2" />
            )}
            
            <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
              "{quote}"
            </blockquote>
            
            <div className="flex items-center border-t border-gray-100 dark:border-gray-700 pt-4">
              {avatar && (
                <img 
                  src={avatar} 
                  alt={author}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{author}</p>
                <div className="flex items-center">
                  {role && <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>}
                  {role && company && <span className="mx-1 text-gray-400">•</span>}
                  {company && <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderTestimonial();
};

export default Testimonial; 