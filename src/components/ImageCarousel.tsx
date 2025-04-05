import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  height?: string;
  aspectRatio?: string;
  showCaptions?: boolean;
  onImageChange?: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className = '',
  height = 'h-80',
  aspectRatio = 'aspect-video',
  showCaptions = false,
  onImageChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalImages = images.length;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Auto play functionality
  useEffect(() => {
    let intervalId: number | null = null;
    
    if (autoPlay) {
      intervalId = window.setInterval(goToNext, interval);
    }
    
    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [autoPlay, interval, goToNext]);

  // Call onImageChange callback
  useEffect(() => {
    if (onImageChange) {
      onImageChange(currentIndex);
    }
    
    // Reset transition state after animation completes
    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the CSS transition duration
    
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentIndex, onImageChange]);

  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden ${height} ${aspectRatio} ${className}`}>
      {/* Image container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full w-full"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${totalImages * 100}%` 
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative" style={{ width: `${100 / totalImages}%` }}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 text-center">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && totalImages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none transition-all duration-300 z-10"
            aria-label="Previous image"
            disabled={isTransitioning}
          >
            <ChevronLeft className="text-gray-800 w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none transition-all duration-300 z-10"
            aria-label="Next image"
            disabled={isTransitioning}
          >
            <ChevronRight className="text-gray-800 w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && totalImages > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalImages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel; 