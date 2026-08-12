import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { FloatingContactModal } from './components/ui/FloatingContactModal';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#F4F1EA] dark:bg-[#151411] text-[#171717] dark:text-[#F2EEE6] font-sans selection:bg-[#C7462D] dark:selection:bg-[#E25235] selection:text-[#F4F1EA] dark:selection:text-[#151411] transition-colors duration-200">
            <ScrollProgress />
            <Sidebar />

            <main className="flex-grow pt-16 xl:ml-60 xl:pt-0">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetails />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <div className="xl:ml-60">
              <Footer />
            </div>
            <FloatingContactModal />
          </div>
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
