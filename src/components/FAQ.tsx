import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';

interface FAQItem {
  id: string | number;
  question: string;
  answer: React.ReactNode;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  showSearch?: boolean;
  categories?: string[];
  title?: string;
  description?: string;
  className?: string;
  defaultOpenIndex?: number;
  accordionMode?: boolean;
  searchPlaceholder?: string;
  noCategoriesLabel?: string;
  noResultsLabel?: string;
}

const FAQ: React.FC<FAQProps> = ({
  items,
  showSearch = true,
  categories = [],
  title = 'Frequently Asked Questions',
  description,
  className = '',
  defaultOpenIndex = -1,
  accordionMode = true,
  searchPlaceholder = 'Search FAQs...',
  noCategoriesLabel = 'General',
  noResultsLabel = 'No FAQs found matching your search.',
}) => {
  // Extract unique categories if not provided
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<FAQItem[]>(items);
  const [openItems, setOpenItems] = useState<Set<string | number>>(new Set());
  
  // Initialize open items based on defaultOpenIndex
  useEffect(() => {
    if (defaultOpenIndex >= 0 && defaultOpenIndex < items.length) {
      setOpenItems(new Set([items[defaultOpenIndex].id]));
    }
  }, [defaultOpenIndex, items]);
  
  // Extract categories
  useEffect(() => {
    if (categories.length > 0) {
      setAllCategories(['all', ...categories]);
    } else {
      const uniqueCategories = Array.from(new Set(items.map(item => item.category || noCategoriesLabel)));
      setAllCategories(['all', ...uniqueCategories]);
    }
  }, [items, categories, noCategoriesLabel]);
  
  // Filter items based on search query and active category
  const filterItems = useCallback(() => {
    let filtered = items;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => 
        (item.category || noCategoriesLabel) === activeCategory
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(query) || 
        (typeof item.answer === 'string' && item.answer.toLowerCase().includes(query))
      );
    }
    
    setFilteredItems(filtered);
  }, [activeCategory, items, noCategoriesLabel, searchQuery]);
  
  // Update filtered items when dependencies change
  useEffect(() => {
    filterItems();
  }, [filterItems]);
  
  // Toggle item open/closed state
  const toggleItem = (id: string | number) => {
    setOpenItems(prevOpenItems => {
      const newOpenItems = new Set(prevOpenItems);
      
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        if (accordionMode) {
          newOpenItems.clear();
        }
        newOpenItems.add(id);
      }
      
      return newOpenItems;
    });
  };
  
  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
        </div>
      )}
      
      {/* Search and categories */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        {showSearch && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10 pr-10 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <X size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
        )}
        
        {/* Categories */}
        {allCategories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* FAQ items */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div 
              key={item.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex justify-between items-center w-full px-4 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{item.question}</h3>
                {openItems.has(item.id) ? (
                  <ChevronUp className="flex-shrink-0 text-gray-500 dark:text-gray-400" size={20} />
                ) : (
                  <ChevronDown className="flex-shrink-0 text-gray-500 dark:text-gray-400" size={20} />
                )}
              </button>
              
              <div 
                className={`px-4 overflow-hidden transition-all duration-300 ${
                  openItems.has(item.id) 
                    ? 'max-h-96 pb-4 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                {typeof item.answer === 'string' ? (
                  <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">{noResultsLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ; 