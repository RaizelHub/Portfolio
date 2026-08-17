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
          <div className="flex flex-col min-h-screen bg-[#F7F8FA] dark:bg-[#0B0D10] text-[#111318] dark:text-[#F4F6F8] font-sans selection:bg-[#2563EB] selection:text-white dark:selection:bg-[#3B82F6] dark:selection:text-[#0B0D10] transition-colors duration-150">
            <ScrollProgress />
            <Sidebar />

            <main className="flex-grow pt-16 xl:ml-64 xl:pt-0">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetails />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <div className="xl:ml-64">
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
