import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-navy-900 text-slate-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        <ScrollProgress />
        <Sidebar />

        <div className="flex-grow lg:pl-64 pt-16 lg:pt-0 flex flex-col justify-between">
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;