import React, { useEffect, useRef } from 'react';
import { useAnimation, useStaggeredAnimation } from '../hooks/useAnimation';
import { animateCounter, typewriterEffect } from '../utils/animations';

const AnimationExample: React.FC = () => {
  // Using the useAnimation hook for basic animation
  const fadeInUp = useAnimation({ type: 'fade-in-up', delay: 100 });
  const fadeInDown = useAnimation({ type: 'fade-in-down', delay: 200 });
  const fadeInLeft = useAnimation({ type: 'fade-in-left', delay: 300 });
  const fadeInRight = useAnimation({ type: 'fade-in-right', delay: 400 });
  const scaleIn = useAnimation({ type: 'scale-in', delay: 500 });
  const flipX = useAnimation({ type: 'flip-x', delay: 600 });
  const flipY = useAnimation({ type: 'flip-y', delay: 700 });
  
  // Using the useStaggeredAnimation hook for a list
  const staggeredItems = [
    "First item with staggered animation",
    "Second item appears after a delay",
    "Third item follows the sequence",
    "Fourth item continues the pattern",
    "Fifth item completes the staggered effect"
  ];
  
  const staggered = useStaggeredAnimation({
    staggerDelay: 100,
    initialDelay: 800,
    animationType: 'fade-in-up'
  });
  
  // References for DOM elements that will use the utility functions
  const counterRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply counter animation when component mounts
    if (counterRef.current) {
      animateCounter(
        counterRef.current,
        0,
        3548,
        2000,
        (value) => value.toLocaleString()
      );
    }
    
    // Apply typewriter effect when component mounts
    if (typewriterRef.current) {
      typewriterEffect(
        typewriterRef.current,
        "This text is typed one character at a time, simulating a typewriter effect.",
        50,
        800
      );
    }
  }, []);
  
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Animation Examples</h1>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Basic Animations with useAnimation Hook</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            ref={fadeInUp.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Fade In Up</h3>
            <p>This element fades in while moving up.</p>
          </div>
          
          <div 
            ref={fadeInDown.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Fade In Down</h3>
            <p>This element fades in while moving down.</p>
          </div>
          
          <div 
            ref={fadeInLeft.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Fade In Left</h3>
            <p>This element fades in while moving from the left.</p>
          </div>
          
          <div 
            ref={fadeInRight.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Fade In Right</h3>
            <p>This element fades in while moving from the right.</p>
          </div>
          
          <div 
            ref={scaleIn.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Scale In</h3>
            <p>This element fades in while scaling up.</p>
          </div>
          
          <div 
            ref={flipX.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Flip X</h3>
            <p>This element flips along the X axis.</p>
          </div>
          
          <div 
            ref={flipY.ref as React.RefObject<HTMLDivElement>} 
            className="p-6 bg-white shadow-md rounded-lg col-span-1 md:col-span-2"
          >
            <h3 className="text-xl font-medium mb-2">Flip Y</h3>
            <p>This element flips along the Y axis.</p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Staggered Animations</h2>
        
        <ul 
          ref={staggered.containerRef as React.RefObject<HTMLUListElement>} 
          className="space-y-4"
        >
          {staggeredItems.map((item, index) => (
            <li 
              key={index}
              ref={
                (element: HTMLLIElement | null) => {
                  // This is a workaround to apply animations to list items
                  if (!element) return;
                  
                  const { delay, duration } = staggered.getAnimationProps(index);
                  
                  element.style.opacity = staggered.isVisible ? '1' : '0';
                  element.style.transform = staggered.isVisible ? 'translateY(0)' : 'translateY(20px)';
                  element.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
                  element.style.transitionDelay = `${delay}ms`;
                }
              }
              className="p-4 bg-white shadow-md rounded-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Utility Function Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-medium mb-2">Counter Animation</h3>
            <div ref={counterRef} className="text-4xl font-bold text-primary-600">0</div>
            <p className="mt-2 text-gray-600">This number counts up from 0 to 3,548</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-medium mb-2">Typewriter Effect</h3>
            <div ref={typewriterRef} className="min-h-[60px] text-gray-800"></div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">CSS Animation Classes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full pulse"></div>
            <p className="mt-4 text-center">Pulse Animation</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            <button 
              className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 shake"
              onClick={(e) => e.currentTarget.classList.add('shake')}
            >
              Click Me
            </button>
            <p className="mt-4 text-center">Shake Animation</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full bounce"></div>
            <p className="mt-4 text-center">Bounce Animation</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Hover Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg hover-lift">
            <h3 className="text-xl font-medium mb-2">Hover Lift</h3>
            <p>This card lifts up on hover.</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg hover-scale">
            <h3 className="text-xl font-medium mb-2">Hover Scale</h3>
            <p>This card scales up on hover.</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg hover-rotate">
            <h3 className="text-xl font-medium mb-2">Hover Rotate</h3>
            <p>This card rotates slightly on hover.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimationExample; 