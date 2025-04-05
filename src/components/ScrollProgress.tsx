import React, { useEffect, useRef } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  zIndex?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = '#16a34a', // primary-600
  height = 3,
  position = 'top',
  zIndex = 50,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    // Initial update
    updateProgress();
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);
  
  return (
    <div 
      className="fixed left-0 right-0 w-full pointer-events-none transition-transform duration-300"
      style={{
        [position]: 0,
        zIndex,
        transform: `scaleX(${window.scrollY > 100 ? 1 : 0})`,
        transformOrigin: 'left',
      }}
    >
      <div 
        ref={progressBarRef} 
        className="h-full" 
        style={{ 
          backgroundColor: color, 
          height: `${height}px`, 
          width: '0%',
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default ScrollProgress; 