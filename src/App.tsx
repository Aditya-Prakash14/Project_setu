import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import WorkPage from './pages/WorkPage';
import ComponentDemo from './pages/ComponentDemo';
import AnimationExample from './examples/AnimationExample';
import { initializePageAnimations } from './utils/initAnimations';
import { initializeTheme } from './utils/darkMode';

// Layout component that includes Navbar and Footer
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    // Initialize dark mode
    initializeTheme();
    
    // Initialize animations
    initializePageAnimations();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Standalone Routes */}
        <Route path="/ui-components" element={<ComponentDemo />} />
        <Route path="/animation-examples" element={<AnimationExample />} />
        
        {/* Main Site Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/components" element={<ComponentDemo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;