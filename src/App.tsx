import { Suspense, lazy, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BentoSidebar } from "./components/bento/BentoSidebar";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { SoundProvider } from "./context/SoundContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Home } from "./pages/Home";
const Projects = lazy(() =>
  import("./pages/Projects").then((m) => ({ default: m.Projects })),
);
const ProjectDetails = lazy(() =>
  import("./pages/ProjectDetails").then((m) => ({ default: m.ProjectDetails })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ExperiencePage = lazy(() =>
  import("./pages/ExperiencePage").then((m) => ({ default: m.ExperiencePage })),
);
const TechnologiesPage = lazy(() =>
  import("./pages/TechnologiesPage").then((m) => ({
    default: m.TechnologiesPage,
  })),
);
const CertificationsPage = lazy(() =>
  import("./pages/CertificationsPage").then((m) => ({
    default: m.CertificationsPage,
  })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const ServicesPage = lazy(() =>
  import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })),
);
const AdminAnalytics = lazy(() =>
  import("./pages/AdminAnalytics").then((m) => ({ default: m.AdminAnalytics })),
);
function PortfolioShell() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void import("./lib/analytics/portfolioVisitors")
        .then((m) => m.registerPortfolioVisit())
        .catch(() => {});
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const legacySections: Record<string, string> = {
      "#about": "/about",
      "#experience": "/experience",
      "#contact": "/contact",
      "#technologies": "/tools",
      "#services": "/services",
      "#certifications": "/certifications",
    };
    if (
      (location.pathname === "/" && legacySections[location.hash]) ||
      (location.pathname === "/about" && location.hash === "#certifications")
    ) {
      navigate(legacySections[location.hash], { replace: true });
      return;
    }
    if (location.hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    main.current?.focus({ preventScroll: true });
  }, [location.pathname, location.hash, navigate]);
  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <BentoSidebar />
      <main id="main-content" ref={main} tabIndex={-1} className="main-content">
        <div className="page-topline">
          <span>JANMARK SUELTO / PORTFOLIO</span>
          <span>Web · Mobile · Automation</span>
        </div>
        <ErrorBoundary>
          <Suspense
            fallback={
              <p className="empty-state" role="status">
                Loading page…
              </p>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/tools" element={<TechnologiesPage />} />
              <Route
                path="/technologies"
                element={<Navigate to="/tools" replace />}
              />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route
                path="/analytics"
                element={<Navigate to="/admin/analytics" replace />}
              />
              <Route path="/collab" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Janmark Suelto</span>
          <span>Built with React & TypeScript</span>
        </footer>
      </main>
    </div>
  );
}
export default function App() {
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
