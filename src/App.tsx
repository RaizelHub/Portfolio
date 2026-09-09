import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { BentoSidebar } from './components/bento/BentoSidebar';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { FloatingContactModal } from './components/ui/FloatingContactModal';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { ServicesPage } from './pages/ServicesPage';
import { TechnologiesPage } from './pages/TechnologiesPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminAnalytics } from './pages/AdminAnalytics';

function PortfolioShell() {
  const location = useLocation();

  // Automatically scroll to top on route change to keep layout strictly fixed
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-[#eef1f5] dark:bg-[#0c0e12] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200 flex flex-col lg:flex-row">
      {/* Left Sidebar (Desktop Flush Dock / Mobile Drawer) */}
      <BentoSidebar />

      {/* Right Main Content Showcase (Full Screen Width) */}
      <main className="flex-1 min-w-0 w-full px-3.5 sm:px-5 lg:px-6 xl:px-8 py-2.5 sm:py-3 lg:py-3.5 flex flex-col justify-start">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center text-sm text-neutral-400">
                Loading showcase...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/tools" element={<TechnologiesPage />} />
              <Route path="/technologies" element={<Navigate to="/tools" replace />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
              <Route path="/collab" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Interactive Contact Modal */}
      <FloatingContactModal />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
          <PortfolioShell />
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
