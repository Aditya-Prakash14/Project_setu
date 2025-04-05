/**
 * Dark mode utilities for handling theme switching
 */

export type ThemeMode = 'light' | 'dark' | 'system';

// Store the theme preference in local storage
const THEME_STORAGE_KEY = 'project-setu-theme';

/**
 * Get the current theme preference
 */
export const getThemePreference = (): ThemeMode => {
  // Check if a preference is stored in localStorage
  const storedPreference = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  
  if (storedPreference) {
    return storedPreference;
  }
  
  // If no preference is stored, check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'system';
  }
  
  // Default to light mode
  return 'light';
};

/**
 * Apply the theme to the document
 */
export const applyTheme = (theme: ThemeMode): void => {
  if (theme === 'system') {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    updateDocumentClass(systemPreference);
  } else {
    updateDocumentClass(theme);
  }
};

/**
 * Update the document class based on the theme
 */
const updateDocumentClass = (theme: 'light' | 'dark'): void => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Save the theme preference to localStorage
 */
export const saveThemePreference = (theme: ThemeMode): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

/**
 * Toggle between light and dark themes
 */
export const toggleTheme = (): ThemeMode => {
  const currentTheme = getThemePreference();
  let newTheme: ThemeMode;
  
  if (currentTheme === 'light') {
    newTheme = 'dark';
  } else if (currentTheme === 'dark') {
    newTheme = 'system';
  } else {
    newTheme = 'light';
  }
  
  saveThemePreference(newTheme);
  applyTheme(newTheme);
  
  return newTheme;
};

/**
 * Initialize theme on page load
 */
export const initializeTheme = (): void => {
  const theme = getThemePreference();
  applyTheme(theme);
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (getThemePreference() === 'system') {
      updateDocumentClass(event.matches ? 'dark' : 'light');
    }
  });
}; 