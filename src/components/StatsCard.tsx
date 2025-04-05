import React, { useState, useEffect, useRef } from 'react';

interface StatsCardProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  duration?: number;
  formatValue?: (value: number) => string;
  prefix?: string;
  suffix?: string;
  backgroundColor?: string;
  className?: string;
  animateOnScroll?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  icon,
  duration = 2000,
  formatValue,
  prefix = '',
  suffix = '',
  backgroundColor = 'bg-white',
  className = '',
  animateOnScroll = true,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isInView, setIsInView] = useState(!animateOnScroll);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Observer setup for scroll animation
  useEffect(() => {
    if (!animateOnScroll || !elementRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );
    
    observer.observe(elementRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [animateOnScroll]);
  
  // Animation effect for counting up
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;
    const totalChange = endValue - startValue;
    
    // Ease-out animation function
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOut(progress);
      
      setDisplayValue(Math.floor(startValue + easedProgress * totalChange));
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);
  
  // Format the display value
  const formattedValue = formatValue 
    ? formatValue(displayValue)
    : `${prefix}${displayValue}${suffix}`;
  
  return (
    <div 
      ref={elementRef}
      className={`p-6 rounded-xl shadow-soft ${backgroundColor} ${className} transition-all duration-500 transform ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-3xl md:text-4xl font-bold mb-2">
          {formattedValue}
        </span>
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
      </div>
    </div>
  );
};

export default StatsCard; 