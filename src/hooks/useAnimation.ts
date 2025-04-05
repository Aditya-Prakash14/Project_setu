import { useEffect, useState, useRef } from 'react';

type AnimationType = 
  | 'fade-in'
  | 'fade-in-up'
  | 'fade-in-down'
  | 'fade-in-left'
  | 'fade-in-right'
  | 'scale-in'
  | 'flip-x'
  | 'flip-y';

interface UseAnimationProps {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  threshold?: number;
  disabled?: boolean;
}

/**
 * Custom hook to apply CSS animations when an element enters the viewport
 */
export const useAnimation = ({
  type = 'fade-in-up',
  delay = 0,
  duration = 600,
  triggerOnce = true,
  threshold = 0.1,
  disabled = false
}: UseAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }
    
    const element = elementRef.current;
    if (!element) return;
    
    // Set initial styles
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
    element.style.transitionDelay = `${delay}ms`;
    
    // Set initial transform based on animation type
    switch (type) {
      case 'fade-in-up':
        element.style.transform = 'translateY(20px)';
        break;
      case 'fade-in-down':
        element.style.transform = 'translateY(-20px)';
        break;
      case 'fade-in-left':
        element.style.transform = 'translateX(-20px)';
        break;
      case 'fade-in-right':
        element.style.transform = 'translateX(20px)';
        break;
      case 'scale-in':
        element.style.transform = 'scale(0.9)';
        break;
      case 'flip-x':
        element.style.transform = 'perspective(400px) rotateX(90deg)';
        break;
      case 'flip-y':
        element.style.transform = 'perspective(400px) rotateY(90deg)';
        break;
      default:
        // Simple fade-in doesn't need transform
        break;
    }
    
    // Create an intersection observer to detect when the element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [type, delay, duration, triggerOnce, threshold, disabled]);
  
  // Apply animation styles when element becomes visible
  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled) return;
    
    if (isVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translate(0) scale(1) rotate(0) perspective(400px)';
    } else {
      // Reset to initial state if not triggerOnce
      element.style.opacity = '0';
      
      // Reset transform based on animation type
      switch (type) {
        case 'fade-in-up':
          element.style.transform = 'translateY(20px)';
          break;
        case 'fade-in-down':
          element.style.transform = 'translateY(-20px)';
          break;
        case 'fade-in-left':
          element.style.transform = 'translateX(-20px)';
          break;
        case 'fade-in-right':
          element.style.transform = 'translateX(20px)';
          break;
        case 'scale-in':
          element.style.transform = 'scale(0.9)';
          break;
        case 'flip-x':
          element.style.transform = 'perspective(400px) rotateX(90deg)';
          break;
        case 'flip-y':
          element.style.transform = 'perspective(400px) rotateY(90deg)';
          break;
        default:
          break;
      }
    }
  }, [isVisible, type, disabled]);
  
  return { ref: elementRef, isVisible };
};

/**
 * Custom hook to apply staggered animations to a list of elements
 */
export const useStaggeredAnimation = ({
  staggerDelay = 100,
  initialDelay = 0,
  animationType = 'fade-in-up',
  threshold = 0.1,
  triggerOnce = true,
  disabled = false
}: {
  staggerDelay?: number;
  initialDelay?: number;
  animationType?: AnimationType;
  threshold?: number;
  triggerOnce?: boolean;
  disabled?: boolean;
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Create an array of delay times for each child element
  const getDelayForIndex = (index: number) => initialDelay + (index * staggerDelay);
  
  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }
    
    const container = containerRef.current;
    if (!container) return;
    
    // Create an intersection observer to detect when the container is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (triggerOnce) {
            observer.unobserve(container);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    
    observer.observe(container);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, disabled]);
  
  // Calculate the animation delay for each item
  const getAnimationProps = (index: number) => ({
    type: animationType,
    delay: getDelayForIndex(index),
    duration: 600,
    disabled: !isVisible,
  });
  
  return { containerRef, getAnimationProps, isVisible };
}; 