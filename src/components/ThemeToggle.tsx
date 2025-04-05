import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { getThemePreference, toggleTheme, ThemeMode } from '../utils/darkMode';

const ThemeToggle: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');
  
  useEffect(() => {
    // Initialize theme state
    setCurrentTheme(getThemePreference());
    
    // Add event listener for theme changes from other sources
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'project-setu-theme') {
        setCurrentTheme(e.newValue as ThemeMode || 'light');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };
  
  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
      aria-label="Toggle dark mode"
    >
      {currentTheme === 'light' && <Sun size={20} className="text-yellow-500" />}
      {currentTheme === 'dark' && <Moon size={18} className="text-blue-400" />}
      {currentTheme === 'system' && <Monitor size={18} className="text-gray-600 dark:text-gray-400" />}
    </button>
  );
};

export default ThemeToggle; 