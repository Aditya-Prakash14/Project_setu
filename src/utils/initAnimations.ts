import { initScrollAnimations, initLazyImages } from './animations';

/**
 * Initializes all animations and interactive UI features
 */
export const initializePageAnimations = (): void => {
  // Initialize scroll-triggered animations
  initScrollAnimations();
  
  // Initialize lazy-loaded images with fade-in effect
  initLazyImages('.lazy-image', 'fade-in');
  
  // Add ripple effect to buttons
  setupRippleEffect();
  
  // Setup staggered animations
  setupStaggeredAnimations();
};

/**
 * Adds ripple effect to buttons with the .ripple-effect class
 */
const setupRippleEffect = (): void => {
  const rippleButtons = document.querySelectorAll('.ripple-effect');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(this: HTMLElement, e: Event) {
      const event = e as MouseEvent;
      const rect = this.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('animate-ripple');
      ripple.style.top = `${y}px`;
      ripple.style.left = `${x}px`;
      
      this.appendChild(ripple);
      
      // Remove the ripple element after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
};

/**
 * Sets up staggered animations for elements with .stagger-children class
 */
const setupStaggeredAnimations = (): void => {
  const staggerContainers = document.querySelectorAll('.stagger-children');
  
  // Check if elements are in viewport on page load
  checkStaggeredElements(staggerContainers);
  
  // Add scroll event listener to check for new elements entering viewport
  window.addEventListener('scroll', () => {
    checkStaggeredElements(staggerContainers);
  }, { passive: true });
};

/**
 * Checks if staggered elements are in the viewport
 */
const checkStaggeredElements = (elements: NodeListOf<Element>): void => {
  elements.forEach(element => {
    if (isElementInViewport(element as HTMLElement) && !element.classList.contains('animated')) {
      element.classList.add('animated');
    }
  });
};

/**
 * Check if an element is in the viewport
 */
const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Element is considered in viewport if it's top is below the top edge
  // and its bottom is above the bottom edge of the viewport
  return (
    rect.top <= windowHeight * 0.9 && 
    rect.bottom >= 0
  );
}; 