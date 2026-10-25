import type { IconType } from "react-icons";
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiVite,
  SiLaravel, SiPhp, SiNodedotjs, SiExpress, SiPython, SiDjango,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiExpo, SiFlutter,
  SiN8N, SiSupabase, SiCloudflareworkers, SiDocker, SiGit, SiGithub,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

const icons: Record<string, { icon: IconType; color?: string }> = {
  React: { icon: SiReact, color: "#149eca" },
  "React Native": { icon: SiReact, color: "#149eca" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  JavaScript: { icon: SiJavascript, color: "#b59a00" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#0891b2" },
  Vite: { icon: SiVite, color: "#9563ed" },
  Laravel: { icon: SiLaravel, color: "#f05340" },
  PHP: { icon: SiPhp, color: "#8a8ebf" },
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  Express: { icon: SiExpress },
  Python: { icon: SiPython, color: "#4584b6" },
  Django: { icon: SiDjango },
  PostgreSQL: { icon: SiPostgresql, color: "#5382a9" },
  MySQL: { icon: SiMysql, color: "#4488a0" },
  MongoDB: { icon: SiMongodb, color: "#47a248" },
  SQLite: { icon: SiSqlite, color: "#399bd3" },
  "SQL Server": { icon: DiMsqlServer, color: "#cc4545" },
  Expo: { icon: SiExpo },
  Flutter: { icon: SiFlutter, color: "#027dfd" },
  n8n: { icon: SiN8N, color: "#ea4b71" },
  Supabase: { icon: SiSupabase, color: "#299e72" },
  "Cloudflare Workers": { icon: SiCloudflareworkers, color: "#e87722" },
  Docker: { icon: SiDocker, color: "#2496ed" },
  Git: { icon: SiGit, color: "#f05032" },
  GitHub: { icon: SiGithub },
};

export function TechnologyIcon({ name }: { name: string }) {
  const entry = icons[name];
  // The installed icon set has no Groq mark; use its name rather than an unrelated logo.
  if (!entry) return name === "Groq AI" ? <span className="technology-wordmark" aria-hidden="true">groq</span> : null;
  const Icon = entry.icon;
  return <Icon className="technology-icon" style={{ color: entry.color }} aria-hidden="true" focusable="false" />;
}
