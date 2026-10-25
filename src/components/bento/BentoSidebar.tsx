import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  Menu,
  Sun,
  Moon,
  Layers,
  Download,
} from "lucide-react";
import { profile } from "../../data/profile";
import { useTheme } from "../../context/ThemeContext";
import { Dialog } from "../ui/Dialog";
const groups = [
  {
    title: "Main",
    items: [
      { label: "Home", path: "/", icon: Home },
      { label: "About", path: "/about", icon: User },
      { label: "Projects", path: "/projects", icon: FolderKanban },
    ],
  },
  {
    title: "Career",
    items: [
      { label: "Skills", path: "/tools", icon: Wrench },
      { label: "Experience", path: "/experience", icon: Briefcase },
      { label: "Certifications", path: "/certifications", icon: Award },
      { label: "Services", path: "/services", icon: Layers },
    ],
  },
];
export function BentoSidebar() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const panel = (
    <div className="sidebar-panel">
      <Link className="identity" to="/" onClick={() => setOpen(false)}>
        <img src={profile.profileImage} width="44" height="44" alt="" />
        <span>
          <strong>{profile.name}</strong>
          <small>Full-Stack Developer</small>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        {groups.map((group) => (
          <div className="nav-group" key={group.title}>
            <p className="eyebrow">{group.title}</p>
            {group.items.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "is-active" : ""}`
                }
              >
                <Icon size={17} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
        <div className="nav-group">
          <p className="eyebrow">Connect</p>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-item ${isActive ? "is-active" : ""}`
            }
            onClick={() => setOpen(false)}
          >
            <Mail size={17} />
            Contact
          </NavLink>
          <a
            className="nav-item"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} />
            GitHub<span className="external-mark">↗</span>
          </a>
          <a
            className="nav-item"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={17} />
            LinkedIn<span className="external-mark">↗</span>
          </a>
        </div>
      </nav>
      <div className="sidebar-bottom">
        <a href={profile.resumeUrl} download className="button full-width">
          <Download size={16} />
          Download resume
        </a>
        <div className="sidebar-preferences">
          <span>Bukidnon, Philippines</span>
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <header className="mobile-header">
        <Link to="/">{profile.name}</Link>
        <button
          className="icon-button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </header>
      <aside className="desktop-sidebar">{panel}</aside>
      {open && (
        <Dialog
          label="navigation"
          onClose={() => setOpen(false)}
          className="drawer"
        >
          {panel}
        </Dialog>
      )}
    </>
  );
}
