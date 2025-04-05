import React, { useState } from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  animation?: 'pulse' | 'bounce' | 'scale' | 'shine' | 'ripple' | 'none';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  animation = 'none',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  target,
  type = 'button',
  ariaLabel,
  rounded = 'md',
}) => {
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [isRippling, setIsRippling] = useState(false);

  // Define variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white';
      case 'outline':
        return 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 dark:text-primary-400 dark:border-primary-500';
      case 'text':
        return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-600 dark:text-primary-400';
      case 'glass':
        return 'bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white border border-white/30 shadow-lg';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white';
    }
  };

  // Define size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-2 px-3';
      case 'md':
        return 'text-sm py-2.5 px-5';
      case 'lg':
        return 'text-base py-3 px-6';
      default:
        return 'text-sm py-2.5 px-5';
    }
  };

  // Define animation classes
  const getAnimationClasses = () => {
    if (disabled || loading) return '';
    
    switch (animation) {
      case 'pulse':
        return 'transition-all hover:animate-pulse';
      case 'bounce':
        return 'transition-transform hover:animate-bounce';
      case 'scale':
        return 'transition-transform hover:scale-105 active:scale-95';
      case 'shine':
        return 'relative overflow-hidden shine-effect';
      case 'ripple':
        return 'ripple-effect relative overflow-hidden';
      case 'none':
      default:
        return 'transition-all duration-200';
    }
  };

  // Define rounded classes
  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'full': return 'rounded-full';
      default: return 'rounded-md';
    }
  };

  // Handle ripple animation
  const handleRipple = (e: React.MouseEvent<HTMLElement>) => {
    if (animation !== 'ripple' || disabled || loading) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    setRippleStyle({
      width: `${size}px`,
      height: `${size}px`,
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
    });
    
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
  };

  // Handle click event
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    handleRipple(e);
    
    if (onClick) {
      onClick();
    }
  };

  // Construct the button classes
  const buttonClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${getRoundedClasses()}
    ${getAnimationClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    font-medium inline-flex items-center justify-center
    ${variant !== 'text' ? 'shadow-sm' : ''}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
    ${className}
  `;

  // Render button content
  const renderContent = () => (
    <>
      {/* Icon on left */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {/* Loading spinner */}
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {/* Button text */}
      <span>{loading ? loadingText : children}</span>
      
      {/* Icon on right */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
      
      {/* Ripple effect */}
      {animation === 'ripple' && isRippling && (
        <span 
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={rippleStyle}
        ></span>
      )}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={handleClick}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {renderContent()}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {renderContent()}
    </button>
  );
};

export default AnimatedButton; 