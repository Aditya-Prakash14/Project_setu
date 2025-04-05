import React, { useState, useEffect } from 'react';

interface GalleryItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
  description?: string;
  url?: string;
}

interface FilterableGalleryProps {
  items: GalleryItem[];
  categories?: string[];
  showFilters?: boolean;
  columns?: 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
  showCaptions?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  hoverEffect?: 'zoom' | 'darken' | 'lighten' | 'none';
  onItemClick?: (item: GalleryItem) => void;
  gridLayout?: 'uniform' | 'masonry';
  animationType?: 'fade' | 'slide' | 'none';
}

const FilterableGallery: React.FC<FilterableGalleryProps> = ({
  items,
  categories = [],
  showFilters = true,
  columns = 3,
  gap = 'medium',
  className = '',
  showCaptions = true,
  aspectRatio = 'square',
  hoverEffect = 'zoom',
  onItemClick,
  gridLayout = 'uniform',
  animationType = 'fade',
}) => {
  // Extract unique categories if not provided
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(items);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Extract unique categories if not provided
  useEffect(() => {
    if (categories.length > 0) {
      setAllCategories(['all', ...categories]);
    } else {
      const uniqueCategories = ['all', ...Array.from(new Set(items.map(item => item.category)))];
      setAllCategories(uniqueCategories);
    }
  }, [items, categories]);

  // Filter items when active category changes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = window.setTimeout(() => {
      if (activeCategory === 'all') {
        setFilteredItems(items);
      } else {
        setFilteredItems(items.filter(item => item.category === activeCategory));
      }
      
      const showTimer = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      
      return () => window.clearTimeout(showTimer);
    }, 300);
    
    return () => window.clearTimeout(timer);
  }, [activeCategory, items]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Get grid layout classes
  const getGridClasses = () => {
    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };
    
    const gapClasses = {
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-6'
    };
    
    return `${columnClasses[columns]} ${gapClasses[gap]}`;
  };

  // Get aspect ratio classes
  const getAspectRatioClass = () => {
    if (gridLayout === 'masonry') return '';
    
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      case 'portrait': return 'aspect-[3/4]';
      case 'auto': return '';
      default: return 'aspect-square';
    }
  };

  // Get hover effect classes
  const getHoverEffectClasses = () => {
    switch (hoverEffect) {
      case 'zoom': return 'transition-transform duration-500 group-hover:scale-110';
      case 'darken': return 'transition-all duration-500 group-hover:brightness-75';
      case 'lighten': return 'transition-all duration-500 group-hover:brightness-125';
      case 'none': 
      default: return '';
    }
  };

  // Get animation classes
  const getAnimationClasses = () => {
    if (isTransitioning) {
      switch (animationType) {
        case 'fade': return 'opacity-0';
        case 'slide': return 'opacity-0 translate-y-4';
        case 'none': 
        default: return '';
      }
    } else {
      switch (animationType) {
        case 'fade': return 'opacity-100 transition-opacity duration-500';
        case 'slide': return 'opacity-100 translate-y-0 transition-all duration-500';
        case 'none': 
        default: return '';
      }
    }
  };

  return (
    <div className={className}>
      {/* Filter buttons */}
      {showFilters && allCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      <div className={`grid ${getGridClasses()} ${getAnimationClasses()}`}>
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`overflow-hidden rounded-lg group relative ${gridLayout === 'uniform' ? getAspectRatioClass() : ''}`}
            onClick={() => onItemClick && onItemClick(item)}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className={`w-full h-full object-cover ${getHoverEffectClasses()} ${onItemClick ? 'cursor-pointer' : ''}`}
            />
            
            {showCaptions && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white transition-all duration-300 group-hover:bg-opacity-70">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.description && <p className="text-sm text-gray-200">{item.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredItems.length === 0 && !isTransitioning && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default FilterableGallery; 