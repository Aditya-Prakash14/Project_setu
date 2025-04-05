/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        earth: {
          50: '#f8f9f0',
          100: '#f1f2e1',
          200: '#e3e6c3',
          300: '#d1d59d',
          400: '#bac076',
          500: '#a8ad5a',
          600: '#868941',
          700: '#666936',
          800: '#4e5030',
          900: '#404229',
          950: '#222413',
        },
        terracotta: {
          50: '#fdf4f0',
          100: '#fbe8e0',
          200: '#f7d0bc',
          300: '#f2b496',
          400: '#ec906d',
          500: '#e56b44',
          600: '#d34d2c',
          700: '#b03a22',
          800: '#8f3220',
          900: '#752e1f',
          950: '#3f150e',
        },
        clay: {
          50: '#fcf8f0',
          100: '#f8eeda',
          200: '#f0dbb7',
          300: '#e8c38d',
          400: '#dda465',
          500: '#d5884c',
          600: '#c36b3a',
          700: '#a25132',
          800: '#82432f',
          900: '#693a2b',
          950: '#391b14',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'fade-in-left': 'fadeInLeft 0.7s ease-out',
        'fade-in-right': 'fadeInRight 0.7s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'ripple': 'ripple 0.6s linear forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'texture-dots': "url('/images/textures/dots.svg')",
        'texture-lines': "url('/images/textures/lines.svg')",
        'hero-pattern': "url('/images/hero-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [
    (function() {
      try {
        return require('@tailwindcss/typography');
      } catch (e) {
        console.warn('[@tailwindcss/typography] plugin is missing. Some typography styles may not be applied.');
        return {};
      }
    })(),
    (function() {
      try {
        return require('@tailwindcss/forms');
      } catch (e) {
        console.warn('[@tailwindcss/forms] plugin is missing. Some form styles may not be applied.');
        return {};
      }
    })(),
    (function() {
      try {
        return require('@tailwindcss/aspect-ratio');
      } catch (e) {
        console.warn('[@tailwindcss/aspect-ratio] plugin is missing. Aspect ratio utilities may not work properly.');
        return {};
      }
    })(),
  ],
  darkMode: 'class',
};
