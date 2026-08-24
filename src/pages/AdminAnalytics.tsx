import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Eye,
  RotateCcw,
  Search,
  ArrowLeft,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Clock,
  ShieldCheck,
  Filter,
  ChevronRight,
  X,
  Layers,
  History,
  Sparkles,
  Activity,
  Download,
  Copy,
  Check,
  LayoutGrid,
  List,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { VisitorAvatar } from '../components/ui/VisitorAvatar';
import {
  fetchAnalyticsDashboard,
  type AnalyticsSummary,
  type VisitorProfileRecord,
} from '../lib/analytics/portfolioVisitors';
import { useSound } from '../context/SoundContext';

function formatRelativeTime(isoDateString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDateString).getTime();
    if (diffMs < 0 || isNaN(diffMs)) return 'just now';

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  } catch {
    return 'recently';
  }
}

function formatDate(isoDateString: string): string {
  try {
    return new Date(isoDateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoDateString;
  }
}

export const AdminAnalytics: React.FC = () => {
  const { playHover, playClick } = useSound();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'returning'>('all');
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'desktop' | 'mobile'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorProfileRecord | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const summary = await fetchAnalyticsDashboard();
      setData(summary);
    } catch {
      // Fallback handled in analytics lib
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (text: string) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleExportJson = () => {
    playClick();
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-telemetry-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredVisitors = useMemo(() => {
    if (!data?.recentVisitors) return [];

    return data.recentVisitors.filter((visitor) => {
      const matchesSearch =
        visitor.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.shortId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.browser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (visitor.pagesViewed && visitor.pagesViewed.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'returning' && visitor.visitCount > 1) ||
        (statusFilter === 'new' && visitor.visitCount <= 1);

      const matchesDevice =
        deviceFilter === 'all' || visitor.deviceType === deviceFilter;

      return matchesSearch && matchesStatus && matchesDevice;
    });
  }, [data, searchQuery, statusFilter, deviceFilter]);

  // Derived Telemetry Distribution
  const { topReferrers, osBreakdown, returningRatio } = useMemo(() => {
    if (!data?.recentVisitors || data.recentVisitors.length === 0) {
      return { topReferrers: [], osBreakdown: [], returningRatio: 0 };
    }

    const refMap: Record<string, number> = {};
    const osMap: Record<string, number> = {};
    let returningCount = 0;

    data.recentVisitors.forEach((v) => {
      refMap[v.referrer] = (refMap[v.referrer] || 0) + 1;
      osMap[v.os] = (osMap[v.os] || 0) + 1;
      if (v.visitCount > 1) returningCount++;
    });

    const topRefs = Object.entries(refMap).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const osArr = Object.entries(osMap).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const ratio = data.profiledVisitors > 0 ? Math.round((data.returningVisitors / data.profiledVisitors) * 100) : 0;

    return { topReferrers: topRefs, osBreakdown: osArr, returningRatio: ratio };
  }, [data]);

  return (
    <main className="analytics-page relative min-h-screen bg-[#F8FAFC] pb-24 pt-6 font-sans text-[#0F172A] antialiased transition-colors dark:bg-[#0B0E14] dark:text-[#F8FAFC]">
      <div className="relative z-10 mx-auto w-full max-w-[var(--content-width)] space-y-8 px-[var(--page-gutter)]">
        {/* ── Top HUD Navigation Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#1E2735] pb-5">
          <div className="space-y-1.5">
            <Link
              to="/"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] hover:text-[#F59E0B] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B] group-hover:-translate-x-1 transition-transform" />
              <span>Return to Portfolio</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F5F9] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] text-[11px] font-mono text-[#F59E0B]">
                <span className="font-semibold uppercase tracking-wider">Telemetry Stream</span>
              </div>
              <span className="text-xs font-mono text-[#64748B] hidden md:inline">
                8.156° N, 125.127° E &bull; Bukidnon, PH
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJson}
              onMouseEnter={playHover}
              className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#06B6D4] text-xs font-mono text-[#64748B] dark:text-[#94A3B8] hover:text-[#06B6D4] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Export Telemetry JSON report"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={() => {
                playClick();
                loadData();
              }}
              onMouseEnter={playHover}
              className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#F59E0B] text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className={`w-3.5 h-3.5 text-[#F59E0B] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* ── Headline Banner with Privacy Framework ── */}
        <div className="relative overflow-hidden rounded-2xl bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B] font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>Deterministic Persona &amp; Telemetry Architecture</span>
            </div>

            <h1 className="section-heading font-display text-[#0F172A] dark:text-[#F8FAFC]">
              Anonymous Visitor Intelligence
            </h1>

            <p className="body-copy text-[#475569] dark:text-[#94A3B8]">
              Real-time traffic sessions resolved into deterministic <span className="text-[#F59E0B] font-mono font-semibold">Adjective + Animal</span> personas with illustrated cartoon avatars. Full historical counts are 100% preserved without scraping personal identities.
            </p>
          </div>
        </div>

        {/* ── Primary KPI Metrics Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Cumulative Traffic Volume */}
          <div className="group relative bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#F59E0B]/50 rounded-xl p-5 shadow-xs transition-all space-y-3">
            <div className="flex min-w-0 items-start justify-between gap-3 font-mono text-xs text-[#64748B]">
              <span className="break-safe uppercase font-semibold tracking-wider">Total Traffic Volume</span>
              <div className="p-1.5 rounded-md bg-[#F59E0B]/10 text-[#F59E0B]">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
              {data ? data.totalVisits.toLocaleString() : '—'}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F59E0B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>100% Historical Continuity</span>
            </div>
          </div>

          {/* KPI 2: Profiled Anonymous Personas */}
          <div className="group relative bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#06B6D4]/50 rounded-xl p-5 shadow-xs transition-all space-y-3">
            <div className="flex min-w-0 items-start justify-between gap-3 font-mono text-xs text-[#64748B]">
              <span className="break-safe uppercase font-semibold tracking-wider">Profiled Personas</span>
              <div className="p-1.5 rounded-md bg-[#06B6D4]/10 text-[#06B6D4]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
              {data ? data.profiledVisitors.toLocaleString() : '—'}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#06B6D4]">
              <Sparkles className="w-3 h-3 text-[#06B6D4]" />
              <span>Unique Generated Identities</span>
            </div>
          </div>

          {/* KPI 3: Returning Visitor Engagement */}
          <div className="group relative bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#10B981]/50 rounded-xl p-5 shadow-xs transition-all space-y-3">
            <div className="flex min-w-0 items-start justify-between gap-3 font-mono text-xs text-[#64748B]">
              <span className="break-safe uppercase font-semibold tracking-wider">Returning Visitors</span>
              <div className="p-1.5 rounded-md bg-[#10B981]/10 text-[#10B981]">
                <RotateCcw className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
              {data ? data.returningVisitors.toLocaleString() : '—'}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#10B981]">
              <Activity className="w-3 h-3 text-[#10B981]" />
              <span>{returningRatio}% Repeat Retention Rate</span>
            </div>
          </div>

          {/* KPI 4: Historical Traffic Baseline */}
          <div className="group relative bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#8B5CF6]/50 rounded-xl p-5 shadow-xs transition-all space-y-3">
            <div className="flex min-w-0 items-start justify-between gap-3 font-mono text-xs text-[#64748B]">
              <span className="break-safe uppercase font-semibold tracking-wider">Historical Baseline</span>
              <div className="p-1.5 rounded-md bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <History className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
              {data ? data.historicalVisits.toLocaleString() : '—'}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#64748B]">
              <Layers className="w-3 h-3 text-[#8B5CF6]" />
              <span>Pre-Profile Traffic Count</span>
            </div>
          </div>
        </div>

        {/* ── Environment & Origin Breakdown Gauges ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Top Referrers */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-[#64748B] border-b border-[#E2E8F0] dark:border-[#1E2735] pb-2.5">
              <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
                Traffic Ingestion Sources
              </span>
              <span>Distribution</span>
            </div>
            <div className="space-y-2">
              {topReferrers.length > 0 ? (
                topReferrers.map(([ref, count]) => (
                  <div key={ref} className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-2 dark:border-[#1E2735] dark:bg-[#0E1218]">
                    <span className="break-safe font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{ref}</span>
                    <span className="px-2 py-0.5 rounded bg-[#F59E0B]/15 text-[#F59E0B] font-bold text-[11px]">
                      {count} session{count > 1 ? 's' : ''}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-[#64748B]">Awaiting live referral streams...</span>
              )}
            </div>
          </div>

          {/* Operating Systems & Platforms */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-[#64748B] border-b border-[#E2E8F0] dark:border-[#1E2735] pb-2.5">
              <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-[#06B6D4]" />
                Client Operating Systems
              </span>
              <span>Telemetry</span>
            </div>
            <div className="space-y-2">
              {osBreakdown.length > 0 ? (
                osBreakdown.map(([osName, count]) => (
                  <div key={osName} className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-2 dark:border-[#1E2735] dark:bg-[#0E1218]">
                    <span className="break-safe font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{osName}</span>
                    <span className="px-2 py-0.5 rounded bg-[#06B6D4]/15 text-[#06B6D4] font-bold text-[11px]">
                      {count} client{count > 1 ? 's' : ''}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-[#64748B]">Detecting client architectures...</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Search, Filtering & View Switcher Bar ── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] p-4 rounded-xl shadow-xs">
          {/* Status and device filter pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#64748B] text-[11px] uppercase mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#F59E0B]" /> Segment:
            </span>
            {(['all', 'new', 'returning'] as const).map((st) => (
              <button
                key={st}
                onClick={() => {
                  playClick();
                  setStatusFilter(st);
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all capitalize cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#F59E0B] text-[#080A0E] border-[#F59E0B] font-bold shadow-xs'
                    : 'bg-[#F8FAFC] dark:bg-[#0E1218] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#F59E0B]'
                }`}
              >
                {st === 'all' ? 'All Personas' : st === 'returning' ? 'Returning (2+)' : '1st Ingestion'}
              </button>
            ))}

            <span className="text-[#64748B] text-[11px] uppercase ml-3 mr-1">Device:</span>
            {(['all', 'desktop', 'mobile'] as const).map((dev) => (
              <button
                key={dev}
                onClick={() => {
                  playClick();
                  setDeviceFilter(dev);
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all capitalize cursor-pointer ${
                  deviceFilter === dev
                    ? 'bg-[#06B6D4] text-[#080A0E] border-[#06B6D4] font-bold shadow-xs'
                    : 'bg-[#F8FAFC] dark:bg-[#0E1218] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#06B6D4]'
                }`}
              >
                {dev}
              </button>
            ))}
          </div>

          {/* Search bar & Grid/Table Switcher */}
          <div className="flex min-w-0 w-full items-center gap-2 md:max-w-md">
            <div className="relative min-w-0 flex-grow">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search persona (e.g. Quiet Falcon, #A82D, Vocara)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#0E1218] border border-[#E2E8F0] dark:border-[#1E2735] focus:border-[#F59E0B] text-[#0F172A] dark:text-[#F8FAFC] rounded-lg pl-9 pr-4 py-2 text-xs font-mono focus:outline-none transition-colors placeholder:text-[#64748B]"
              />
            </div>

            <div className="flex items-center border border-[#E2E8F0] dark:border-[#1E2735] rounded-lg p-1 bg-[#F8FAFC] dark:bg-[#0E1218] shrink-0">
              <button
                onClick={() => {
                  playClick();
                  setViewMode('grid');
                }}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  viewMode === 'grid' ? 'bg-[#F59E0B] text-[#080A0E]' : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playClick();
                  setViewMode('table');
                }}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  viewMode === 'table' ? 'bg-[#F59E0B] text-[#080A0E]' : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
                title="Telemetry Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Active Personas Stream ── */}
        <div className="space-y-4">
          <div className="flex min-w-0 flex-col items-start justify-between gap-2 font-mono text-xs text-[#64748B] sm:flex-row sm:flex-wrap sm:items-center">
            <span className="font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC]">
              Active Anonymous Personas ({filteredVisitors.length})
            </span>
            <span className="text-[#F59E0B]">Click any card to inspect full session audit</span>
          </div>

          {filteredVisitors.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVisitors.map((visitor) => {
                  const DeviceIcon =
                    visitor.deviceType === 'mobile'
                      ? Smartphone
                      : visitor.deviceType === 'tablet'
                      ? Tablet
                      : Monitor;

                  return (
                    <motion.div
                      key={visitor.anonymousId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        playClick();
                        setSelectedVisitor(visitor);
                      }}
                      className="group relative bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] hover:border-[#F59E0B]/60 p-5 rounded-xl shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md"
                    >
                      {/* Top Header: Avatar, Name, Short ID */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <VisitorAvatar
                            displayName={visitor.displayName}
                            avatarUrl={visitor.avatarUrl}
                            avatarSeed={visitor.avatarSeed}
                            size="md"
                            className="rounded-full ring-2 ring-[#F59E0B]/30 group-hover:ring-[#F59E0B] transition-all"
                          />
                          <div className="min-w-0">
                            <h3 className="break-safe font-display text-sm font-semibold text-[#0F172A] transition-colors group-hover:text-[#F59E0B] dark:text-[#F8FAFC]">
                              {visitor.displayName}
                            </h3>
                            <span className="font-mono text-xs text-[#64748B]">
                              Persona {visitor.shortId}
                            </span>
                          </div>
                        </div>

                        {/* Status Tag */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 border ${
                            visitor.visitCount > 1
                              ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                              : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                          }`}
                        >
                          {visitor.visitCount > 1 ? `${visitor.visitCount} visits` : '1st Ingestion'}
                        </span>
                      </div>

                      {/* Middle: Device & Origin */}
                      <div className="grid grid-cols-1 gap-2 border-t border-[#E2E8F0] pt-2 font-mono text-xs text-[#64748B] dark:border-[#1E2735] dark:text-[#94A3B8] sm:grid-cols-2">
                        <div className="flex min-w-0 items-start gap-1.5">
                          <DeviceIcon className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                          <span className="break-safe">{visitor.browser} on {visitor.os}</span>
                        </div>

                        <div className="flex min-w-0 items-start gap-1.5 sm:justify-end">
                          <Globe className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                          <span className="break-safe text-[#0F172A] dark:text-[#F8FAFC]">{visitor.referrer}</span>
                        </div>
                      </div>

                      {/* Footer: Timeline & Visited Projects */}
                      <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[11px] text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#64748B]" />
                          {formatRelativeTime(visitor.lastSeenAt)}
                        </span>

                        <div className="flex items-center gap-1 text-[#06B6D4] group-hover:underline">
                          <span>{visitor.pagesViewed?.length || 1} project{visitor.pagesViewed?.length === 1 ? '' : 's'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Telemetry Table View */
              <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E2735] bg-[#FFFFFF] dark:bg-[#141A23] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-[#F8FAFC] dark:bg-[#0E1218] border-b border-[#E2E8F0] dark:border-[#1E2735] text-[#64748B] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Persona</th>
                        <th className="py-3 px-4">Short ID</th>
                        <th className="py-3 px-4">Visits</th>
                        <th className="py-3 px-4">Environment</th>
                        <th className="py-3 px-4">Referrer</th>
                        <th className="py-3 px-4">Last Seen</th>
                        <th className="py-3 px-4 text-right">Audit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E2735]">
                      {filteredVisitors.map((visitor) => (
                        <tr
                          key={visitor.anonymousId}
                          onClick={() => {
                            playClick();
                            setSelectedVisitor(visitor);
                          }}
                          className="hover:bg-[#F8FAFC] dark:hover:bg-[#0E1218] transition-colors cursor-pointer"
                        >
                          <td className="py-3 px-4 flex items-center gap-2.5">
                            <VisitorAvatar
                              displayName={visitor.displayName}
                              avatarUrl={visitor.avatarUrl}
                              avatarSeed={visitor.avatarSeed}
                              size="xs"
                              className="rounded-full"
                            />
                            <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">{visitor.displayName}</span>
                          </td>
                          <td className="py-3 px-4 text-[#64748B]">{visitor.shortId}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                visitor.visitCount > 1
                                  ? 'bg-[#10B981]/15 text-[#10B981]'
                                  : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              }`}
                            >
                              {visitor.visitCount}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#475569] dark:text-[#94A3B8]">{visitor.browser} / {visitor.os}</td>
                          <td className="py-3 px-4 text-[#F59E0B]">{visitor.referrer}</td>
                          <td className="py-3 px-4 text-[#64748B]">{formatRelativeTime(visitor.lastSeenAt)}</td>
                          <td className="py-3 px-4 text-right text-[#06B6D4]">
                            <ChevronRight className="w-4 h-4 inline" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] rounded-xl p-8 font-mono space-y-2">
              <Users className="w-10 h-10 text-[#64748B] mx-auto mb-2" />
              <h3 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] uppercase">
                No matching anonymous personas detected
              </h3>
              <p className="text-xs text-[#64748B]">
                Try adjusting search keywords or clearing segment filters.
              </p>
            </div>
          )}
        </div>

        {/* ── Historical Continuity Info Banner ── */}
        <div className="p-6 rounded-xl bg-[#FFFFFF] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] shadow-xs space-y-2 font-mono text-xs text-[#64748B]">
          <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase">
            <Layers className="w-4 h-4 text-[#8B5CF6]" />
            Historical Continuity Guarantee
          </div>
          <p className="body-copy text-[#475569] dark:text-[#94A3B8]">
            {data ? data.historicalVisits.toLocaleString() : '0'} visits occurred before generated anonymous visitor profiles were introduced. 
            These historical records remain 100% counted toward the public total visit counter, without fabricating fake retrospective identities.
          </p>
        </div>
      </div>

      {/* ── Persona Detailed Audit Modal ── */}
      <AnimatePresence>
        {selectedVisitor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            onClick={() => setSelectedVisitor(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg space-y-6 overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 font-mono text-xs shadow-2xl dark:border-[#1E2735] dark:bg-[#0E1218] sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#1E2735] pb-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <VisitorAvatar
                    displayName={selectedVisitor.displayName}
                    avatarUrl={selectedVisitor.avatarUrl}
                    avatarSeed={selectedVisitor.avatarSeed}
                    size="lg"
                    className="rounded-2xl ring-4 ring-[#F59E0B]/30"
                  />
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="break-safe font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC] sm:text-xl">
                        {selectedVisitor.displayName}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 font-bold">
                        {selectedVisitor.shortId}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Deterministic Anonymous Persona
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVisitor(null)}
                  className="p-1 rounded-md text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Anonymous UUID with Quick Copy */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-[#64748B] uppercase font-bold">
                  <span>Anonymous Identifier</span>
                  <button
                    onClick={() => handleCopy(selectedVisitor.anonymousId)}
                    className="text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-[#F59E0B]" />}
                    <span>{copiedId ? 'Copied' : 'Copy UUID'}</span>
                  </button>
                </div>
                <p className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] text-[11px] text-[#0F172A] dark:text-[#F8FAFC] break-all select-all font-mono">
                  {selectedVisitor.anonymousId}
                </p>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] space-y-1">
                  <span className="text-[10px] text-[#64748B] uppercase block">Cumulative Visits</span>
                  <span className="text-base font-bold text-[#F59E0B]">
                    {selectedVisitor.visitCount} {selectedVisitor.visitCount === 1 ? 'Session' : 'Sessions'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] space-y-1">
                  <span className="text-[10px] text-[#64748B] uppercase block">Identity Classification</span>
                  <span className="text-base font-bold text-[#10B981]">
                    {selectedVisitor.visitCount > 1 ? 'Returning' : 'First-time'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] space-y-1">
                  <span className="text-[10px] text-[#64748B] uppercase block">First Ingestion</span>
                  <span className="text-[11px] text-[#0F172A] dark:text-[#F8FAFC] block">
                    {formatDate(selectedVisitor.firstSeenAt)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] space-y-1">
                  <span className="text-[10px] text-[#64748B] uppercase block">Latest Telemetry</span>
                  <span className="text-[11px] text-[#0F172A] dark:text-[#F8FAFC] block">
                    {formatDate(selectedVisitor.lastSeenAt)}
                  </span>
                </div>
              </div>

              {/* Environment Parameters */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Session Environment</span>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Browser &amp; OS:</span>
                    <span className="text-[#0F172A] dark:text-[#F8FAFC] font-semibold">{selectedVisitor.browser} on {selectedVisitor.os}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Device Factor:</span>
                    <span className="text-[#06B6D4] capitalize font-semibold">{selectedVisitor.deviceType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Channel Origin:</span>
                    <span className="text-[#F59E0B] font-semibold">{selectedVisitor.referrer}</span>
                  </div>
                </div>
              </div>

              {/* Visited Projects Stream */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Explored Projects &amp; Case Studies</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVisitor.pagesViewed && selectedVisitor.pagesViewed.length > 0 ? (
                    selectedVisitor.pagesViewed.map((page, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md bg-[#F8FAFC] dark:bg-[#141A23] border border-[#E2E8F0] dark:border-[#1E2735] text-[#0F172A] dark:text-[#F8FAFC] text-[11px] font-semibold"
                      >
                        {page === '/' ? 'Portfolio Home (/)' : page}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#64748B]">Homepage Overview (/)</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
