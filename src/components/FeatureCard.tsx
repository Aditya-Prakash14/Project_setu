import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  linkText?: string;
  linkUrl?: string;
  className?: string;
  variant?: 'default' | 'horizontal' | 'minimal' | 'boxed';
  onClick?: () => void;
  backgroundColor?: string;
  hoverEffect?: boolean;
  isNew?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  linkText,
  linkUrl,
  className = '',
  variant = 'default',
  onClick,
  backgroundColor = 'bg-white dark:bg-gray-800',
  hoverEffect = true,
  isNew = false,
}) => {
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (linkUrl) {
      window.location.href = linkUrl;
    }
  };

  const isClickable = onClick || linkUrl;
  
  const getHoverClasses = () => {
    if (!hoverEffect || !isClickable) return '';
    return 'transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md';
  };

  const renderLink = () => {
    if (!linkText) return null;
    
    return (
      <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium">
        {linkText}
        <ArrowRight size={16} className="ml-1" />
      </div>
    );
  };

  const renderCard = () => {
    switch (variant) {
      case 'horizontal':
        return (
          <div 
            className={`flex ${backgroundColor} rounded-xl overflow-hidden ${getHoverClasses()} ${className} ${isClickable ? 'cursor-pointer' : ''}`}
            onClick={isClickable ? handleClick : undefined}
          >
            {image && (
              <div className="w-1/3 md:w-1/4">
                <img src={image} alt={title} className="h-full w-full object-cover" />
              </div>
            )}
            
            <div className={`p-6 ${image ? 'w-2/3 md:w-3/4' : 'w-full'}`}>
              <div className="flex items-start">
                {icon && <div className="mr-4 text-primary-500 mt-1">{icon}</div>}
                
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    {isNew && (
                      <span className="ml-2 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{description}</p>
                  {renderLink()}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'minimal':
        return (
          <div 
            className={`p-4 ${getHoverClasses()} ${className} ${isClickable ? 'cursor-pointer' : ''}`}
            onClick={isClickable ? handleClick : undefined}
          >
            <div className="flex items-start">
              {icon && <div className="mr-4 text-primary-500">{icon}</div>}
              
              <div>
                <div className="flex items-center mb-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
                  {isNew && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
                {renderLink()}
              </div>
            </div>
          </div>
        );
      
      case 'boxed':
        return (
          <div 
            className={`p-6 border border-gray-200 dark:border-gray-700 rounded-xl ${backgroundColor} ${getHoverClasses()} ${className} ${isClickable ? 'cursor-pointer' : ''}`}
            onClick={isClickable ? handleClick : undefined}
          >
            {icon && (
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-lg mb-4">
                {icon}
              </div>
            )}
            
            {image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
              </div>
            )}
            
            <div className="flex items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              {isNew && (
                <span className="ml-2 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full font-medium">
                  New
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
            {renderLink()}
          </div>
        );
      
      case 'default':
      default:
        return (
          <div 
            className={`p-6 ${backgroundColor} rounded-xl ${getHoverClasses()} ${className} ${isClickable ? 'cursor-pointer' : ''}`}
            onClick={isClickable ? handleClick : undefined}
          >
            {icon && <div className="text-primary-500 mb-4">{icon}</div>}
            
            {image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
              </div>
            )}
            
            <div className="flex items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              {isNew && (
                <span className="ml-2 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full font-medium">
                  New
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
            {renderLink()}
          </div>
        );
    }
  };

  return renderCard();
};

export default FeatureCard; 