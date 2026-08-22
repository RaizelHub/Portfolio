import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { FloatingContactModal } from './components/ui/FloatingContactModal';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { AdminAnalytics } from './pages/AdminAnalytics';

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
          <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text-primary)] font-sans transition-colors duration-150">
            <ScrollProgress />
            <Navbar />

            <main className="flex-grow">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetails />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>

            <Footer />
            <FloatingContactModal />
          </div>
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
