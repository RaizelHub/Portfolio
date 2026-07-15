import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-navy-900 text-slate-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer info */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
