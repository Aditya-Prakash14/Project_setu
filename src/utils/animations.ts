/**
 * Animation utilities for scroll-triggered animations
 */

/**
 * Initialize scroll animations by adding event listeners to handle animation triggers
 */
export const initScrollAnimations = (): void => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Initial check on page load
  checkElementsInView(animatedElements);
  
  // Add scroll event listener
  window.addEventListener('scroll', () => {
    checkElementsInView(animatedElements);
  }, { passive: true });
};

/**
 * Check which elements are in the viewport and animate them
 */
const checkElementsInView = (elements: NodeListOf<Element>): void => {
  elements.forEach(element => {
    if (isElementInViewport(element as HTMLElement)) {
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
  
  // Element is considered in viewport if it's top is below 20% of the screen
  // and its bottom is above 80% of the screen
  return (
    rect.top <= windowHeight * 0.8 && 
    rect.bottom >= windowHeight * 0.2
  );
};

/**
 * Add parallax effect to an element
 * @param element The element to apply parallax to
 * @param speed Speed factor (between 0 and 1, where 0.5 is standard)
 */
export const applyParallax = (element: HTMLElement, speed: number = 0.5): void => {
  const initialOffset = window.scrollY;
  
  const handleScroll = () => {
    const scrollDifference = window.scrollY - initialOffset;
    const translateY = scrollDifference * speed;
    
    // Apply transformation using translate3d for better performance
    element.style.transform = `translate3d(0, ${translateY}px, 0)`;
  };
  
  // Add event listener with passive option for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
};

/**
 * Create a scroll-based progress tracker
 * @param progressElement Element to update with progress value
 * @param startElement Starting element for tracking
 * @param endElement Ending element for tracking
 * @param updateCallback Optional callback function to execute with progress value
 */
export const createScrollProgressTracker = (
  progressElement: HTMLElement,
  startElement: HTMLElement,
  endElement: HTMLElement,
  updateCallback?: (progress: number) => void
): void => {
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    
    const startOffset = startRect.top + window.scrollY;
    const endOffset = endRect.bottom + window.scrollY;
    const totalScrollDistance = endOffset - startOffset - windowHeight;
    
    // Calculate current progress ratio
    const currentScroll = window.scrollY - startOffset + windowHeight;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));
    
    // Update progress element style
    progressElement.style.width = `${progress * 100}%`;
    
    // Call callback if provided
    if (updateCallback) {
      updateCallback(progress);
    }
  };
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  
  // Initial calculation
  updateProgress();
};

/**
 * Apply staggered animation to a set of elements
 * @param elements Array of elements to animate
 * @param className Class to add
 * @param delay Delay between each element in ms
 */
export const applyStaggeredAnimation = (
  elements: HTMLElement[],
  className: string,
  delay: number = 100
): void => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(className);
    }, index * delay);
  });
};

/**
 * Initialize lazy-loaded images that fade in when they come into view
 * @param imageSelector CSS selector for images to lazy load
 * @param fadeInClass Class to add when the image is loaded
 */
export const initLazyImages = (
  imageSelector: string = '.lazy-image',
  fadeInClass: string = 'fade-in'
): void => {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            
            lazyImage.onload = () => {
              lazyImage.classList.add(fadeInClass);
              lazyImage.removeAttribute('data-src');
            };
          }
          
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll(imageSelector);
    lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    const lazyImages = document.querySelectorAll(imageSelector);
    
    lazyImages.forEach(image => {
      const img = image as HTMLImageElement;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add(fadeInClass);
        img.removeAttribute('data-src');
      }
    });
  }
};

/**
 * Add counter animation to a numeric element
 * @param element Element to animate
 * @param startValue Starting value
 * @param endValue Target value
 * @param duration Animation duration in ms
 * @param formatter Optional function to format the number (e.g., add commas)
 */
export const animateCounter = (
  element: HTMLElement,
  startValue: number,
  endValue: number,
  duration: number = 2000,
  formatter?: (value: number) => string
): void => {
  let startTime: number | null = null;
  const change = endValue - startValue;
  
  // Easing function for smooth animation
  const easeOutQuad = (t: number) => t * (2 - t);
  
  const updateCounter = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const currentValue = Math.floor(startValue + change * easedProgress);
    
    element.textContent = formatter ? formatter(currentValue) : currentValue.toString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = formatter ? formatter(endValue) : endValue.toString();
    }
  };
  
  requestAnimationFrame(updateCounter);
};

/**
 * Create a typewriter effect for text
 * @param element Element to apply the effect to
 * @param text Text to type
 * @param speed Typing speed in ms per character
 * @param startDelay Delay before starting in ms
 * @param onComplete Callback function when typing is complete
 */
export const typewriterEffect = (
  element: HTMLElement,
  text: string,
  speed: number = 50,
  startDelay: number = 0,
  onComplete?: () => void
): void => {
  element.textContent = '';
  
  setTimeout(() => {
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (onComplete) {
        onComplete();
      }
    };
    
    type();
  }, startDelay);
}; 