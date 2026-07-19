/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  FolderTree,
  Palette,
  Atom,
  ChevronRight,
  FileCode,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Eye,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/Card";
import { Table } from "./ui/Table";
import { Timeline } from "./ui/Timeline";
import { ChartWrapper } from "./ui/ChartWrapper";
import { LoadingSpinner, SkeletonCard, SkeletonTable } from "./ui/Loading";
import { Modal } from "./ui/Modal";
import { TableColumn, TimelineItem } from "../types";
import { mockSOPs, mockWorkers, mockAuditLogs, analyticsHistory } from "../mockData";

export const ArchitectureExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"structure" | "design" | "sandbox">("structure");

  // Code Visualizer State
  const [selectedFile, setSelectedFile] = useState<string>("src/types.ts");

  // Sandbox State
  const [selectedBadgeVariant, setSelectedBadgeVariant] = useState<"default" | "success" | "warning" | "error" | "info" | "gold">("success");
  const [selectedCardAccent, setSelectedCardAccent] = useState<"success" | "warning" | "error" | "info" | "gold" | "none">("success");
  const [selectedChartType, setSelectedChartType] = useState<"line" | "bar" | "area">("area");
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [sandboxLoadingState, setSandboxLoadingState] = useState<"none" | "spinner" | "card" | "table">("none");

  // Structure Data
  const fileStructure = [
    {
      path: "src/types.ts",
      title: "Core Domain Enums & Interfaces",
      desc: "Centralized TypeScript contracts for Workers, Standard Operating Procedures (SOPs), Audit logs, priorities, and standard UI prop models. Absolute type safety guarantee.",
      code: `export enum WorkerLevel { Apprentice = "Apprentice", Operator = "Operator", Specialist = "Specialist", Master = "Master" }
export enum SOPStatus { Draft = "Draft", UnderReview = "Under Review", Active = "Active", RevisionRequired = "Revision Required" }
export interface Worker {
  id: string; name: string; employeeId: string; station: string; level: WorkerLevel;
  complianceScore: number; skills: { [skillName: string]: number }; lastActive: string;
}`,
    },
    {
      path: "src/hooks/useTheme.tsx",
      title: "Dynamic Theme Context",
      desc: "Theme provider monitoring system media preferences, managing localStorage states, and appending class toggles (.dark) on the document element safely.",
      code: `const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("smriti-theme");
    return (saved as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light);
  });
  // Safely synchronizes document element styles...
}`,
    },
    {
      path: "src/components/ui/Badge.tsx",
      title: "Badge Component",
      desc: "A clean micro-label supporting six enterprise semantic variants, automatic alignment padding, and custom pulse status dot markers matching machine workstation status.",
      code: `export const Badge: React.FC<BadgeProps> = ({ variant = "default", children }) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full font-mono";
  const variants = {
    success: "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950/40 dark:text-brand-400",
    warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40...",
  };
  return <span className={\`\${baseStyles} \${variants[variant]}\`}>{children}</span>;
}`,
    },
    {
      path: "src/components/ui/Card.tsx",
      title: "Card Grid System",
      desc: "Robust composable layouts including structured card divisions (Header, Title, Description, Content, Footer) with left-hand dynamic color status bands.",
      code: `export const Card: React.FC<CardProps> = ({ children, statusAccent = "none" }) => {
  const accentStyles = {
    success: "border-l-4 border-l-brand-500",
    warning: "border-l-4 border-l-amber-500",
    error: "border-l-4 border-l-red-500",
  };
  return <div className={\`bg-white dark:bg-industrial-900 border rounded-xl overflow-hidden \${accentStyles[statusAccent]}\`}>{children}</div>;
}`,
    },
    {
      path: "src/components/ui/Table.tsx",
      title: "Generic Data Table",
      desc: "Type-safe paginated sorting table. Seamlessly supports search matching, directional asc/desc column toggles, custom layout cells, and responsive boundaries.",
      code: `export function Table<T extends { id: string | number }>({ data, columns, itemsPerPage = 5 }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const sortedData = useMemo(() => { /* strict type column sort and search matching... */ });
  // Dynamic pagination state calculations...
}`,
    },
    {
      path: "src/components/ui/Timeline.tsx",
      title: "Micro-learning Timeline",
      desc: "Framer-motion powered operational audit line displaying SOP revisions, hazard logs, and verification checks. Staggered load effects included.",
      code: `export const Timeline: React.FC<TimelineProps> = ({ items, animate = true }) => {
  const containerVariants = { show: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };
  return <motion.div variants={containerVariants} initial="hidden" animate="show" className="border-l-2 pl-6">...</motion.div>;
}`,
    },
    {
      path: "src/components/ui/ChartWrapper.tsx",
      title: "Theme-adaptive Recharts Wrapper",
      desc: "Centralized responsive charts. Features auto-scaling, dynamic grid lines that contrast in light/dark transitions, and beautiful customized tooltip templates.",
      code: `export const ChartWrapper: React.FC<ChartWrapperProps> = ({ data, type = "line", dataKeys }) => {
  const { theme } = useTheme();
  const themeColors = useMemo(() => ({
    grid: theme === Theme.Dark ? "#2d3748" : "#f1f5f9",
    text: theme === Theme.Dark ? "#9ca3af" : "#64748b"
  }), [theme]);
  // Renders responsive Line, Bar, or Area SVG layers...
}`,
    },
    {
      path: "src/components/ui/Loading.tsx",
      title: "Layout Skeleton Builders",
      desc: "Smooth skeleton card blocks and table rows that pulsate to maintain visual stability during lazy loads or background network synchronization.",
      code: `export const SkeletonCard: React.FC = () => (
  <div className="border rounded-xl bg-white animate-pulse space-y-4 p-5">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-industrial-200 rounded-md w-3/4" />
    </div>
  </div>
);`,
    },
    {
      path: "src/components/ui/Modal.tsx",
      title: "Interactive Dialog Modals",
      desc: "Blurry glass-backdrops, automatic focus restraints, escape keylisteners, and spring-loaded scaling entrance framer-motion setups for quizzes and checklist inputs.",
      code: `export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);
  return <AnimatePresence>{isOpen && <motion.div>...</motion.div>}</AnimatePresence>;
}`,
    },
    {
      path: "src/components/layout/Shell.tsx",
      title: "Main Composable Shell",
      desc: "Responsive parent frame wrapping the Collapsible Sidebar drawer and the Global Action Header Navbar to maintain an elegant, unified layout aspect ratio.",
      code: `export const Shell: React.FC<ShellProps> = ({ children, activeItem, onSelectActiveItem }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-industrial-50 dark:bg-[#090b0d]">
      <Sidebar isCollapsed={isSidebarCollapsed} ... />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={...} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}`,
    },
  ];

  const currentFileObject = fileStructure.find((f) => f.path === selectedFile) || fileStructure[0];

  // Table Columns Setup for Worker Skills
  const workerTableColumns: TableColumn<(typeof mockWorkers)[0]>[] = [
    {
      header: "Employee ID",
      accessor: "employeeId",
      sortable: true,
      className: "font-mono font-medium text-xs text-industrial-500",
    },
    {
      header: "Worker Name",
      accessor: "name",
      sortable: true,
      className: "font-semibold text-industrial-900 dark:text-white",
    },
    {
      header: "Active Station",
      accessor: (row) => (
        <span className="font-semibold text-industrial-600 dark:text-industrial-300">
          {row.station}
        </span>
      ),
    },
    {
      header: "Credential Level",
      accessor: (row) => {
        const variants: Record<string, "default" | "success" | "warning" | "gold"> = {
          Apprentice: "default",
          Operator: "success",
          Specialist: "warning",
          Master: "gold",
        };
        return <Badge variant={variants[row.level] || "default"}>{row.level}</Badge>;
      },
      sortable: true,
    },
    {
      header: "SOP Compliance",
      accessor: (row) => {
        const color =
          row.complianceScore >= 95
            ? "text-brand-600 dark:text-brand-400"
            : row.complianceScore >= 90
            ? "text-amber-600 dark:text-amber-400"
            : "text-red-500";
        return (
          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold ${color}`}>{row.complianceScore}%</span>
            <div className="w-16 h-1.5 bg-industrial-100 dark:bg-industrial-800 rounded-full overflow-hidden hidden sm:block">
              <div
                className={`h-full ${
                  row.complianceScore >= 95
                    ? "bg-brand-500"
                    : row.complianceScore >= 90
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${row.complianceScore}%` }}
              />
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      header: "Activity State",
      accessor: "lastActive",
      className: "text-xs font-mono text-industrial-400 dark:text-industrial-500",
    },
  ];

  // Timeline Adaptation
  const timelineData: TimelineItem[] = mockAuditLogs.map((log) => {
    const logVariants: Record<string, "success" | "warning" | "error" | "info"> = {
      success: "success",
      pending: "info",
      warning: "warning",
      alert: "error",
    };
    return {
      id: log.id,
      title: log.title,
      subtitle: `${log.category} • PRIORITY: ${log.priority}`,
      description: log.description,
      timestamp: log.timestamp,
      badge: {
        text: log.status.toUpperCase(),
        variant: logVariants[log.status] || "default",
      },
      highlight: log.status === "alert",
    };
  });

  return (
    <div id="architecture-explorer-container" className="space-y-8 pb-12">
      {/* 1. Header Hero section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-industrial-100 dark:border-industrial-800">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Badge variant="gold">SYSTEM CONFIGURATION MODE</Badge>
            <span className="text-xs font-mono font-medium text-industrial-400 dark:text-industrial-500">
              CWD: /
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-industrial-900 dark:text-white">
            SMRITI Architectural System
          </h1>
          <p className="text-sm text-industrial-500 dark:text-industrial-400 mt-1">
            Enterprise Continuous Operational Learning scaffolding engineered for high-concurrency manufacturing MSME environments.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-white dark:bg-industrial-900 p-1 rounded-xl border border-industrial-150 dark:border-industrial-800 shadow-sm shrink-0">
          <button
            onClick={() => setActiveTab("structure")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "structure"
                ? "bg-brand-500 text-white dark:bg-brand-600 shadow-sm"
                : "text-industrial-500 hover:text-industrial-800 dark:hover:text-industrial-200"
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Folder Structure</span>
          </button>
          <button
            onClick={() => setActiveTab("design")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "design"
                ? "bg-brand-500 text-white dark:bg-brand-600 shadow-sm"
                : "text-industrial-500 hover:text-industrial-800 dark:hover:text-industrial-200"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design Tokens</span>
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "sandbox"
                ? "bg-brand-500 text-white dark:bg-brand-600 shadow-sm"
                : "text-industrial-500 hover:text-industrial-800 dark:hover:text-industrial-200"
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>Component Sandbox</span>
          </button>
        </div>
      </div>

      {/* 2. TAB: FOLDER STRUCTURE EXPLORER */}
      {activeTab === "structure" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* File Trees List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold font-display text-industrial-800 dark:text-industrial-200 uppercase tracking-wide flex items-center gap-2 pl-1 select-none">
              <Layers className="w-4 h-4 text-brand-500" />
              <span>Project Scaffold Directory</span>
            </h3>
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-2">
              {fileStructure.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file.path)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group relative ${
                    selectedFile === file.path
                      ? "bg-brand-50/20 dark:bg-brand-950/10 border-brand-200 dark:border-brand-900/50 shadow-sm"
                      : "bg-white dark:bg-industrial-900 border-industrial-100 dark:border-industrial-800 hover:border-industrial-200 dark:hover:border-industrial-700"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    selectedFile === file.path
                      ? "bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400"
                      : "bg-industrial-50 text-industrial-400 dark:bg-industrial-950 dark:text-industrial-500 group-hover:scale-105 transition-all"
                  }`}>
                    <FileCode className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-industrial-800 dark:text-white leading-none block">
                      {file.path}
                    </span>
                    <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 font-display block mt-1 uppercase tracking-wide">
                      {file.title}
                    </span>
                    <p className="text-xs text-industrial-450 dark:text-industrial-400 mt-1.5 leading-relaxed">
                      {file.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Inspector Frame */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
            <div className="bg-industrial-950 dark:bg-[#060809] border border-industrial-800 rounded-xl overflow-hidden flex-1 flex flex-col shadow-lg">
              {/* Top Inspector Bar */}
              <div className="px-5 py-3 border-b border-industrial-800 flex items-center justify-between bg-industrial-950/40 shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-xs font-semibold text-industrial-300">
                    CODE INSPECTOR
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500/80" />
                </div>
              </div>

              {/* Code Meta Header */}
              <div className="p-4 bg-industrial-900/30 border-b border-industrial-800 flex items-center justify-between shrink-0">
                <div className="font-mono text-xs text-industrial-300">
                  FILE: <span className="text-brand-400 font-bold">{currentFileObject.path}</span>
                </div>
                <Badge variant="gold" className="text-[10px]">React 19 Validated</Badge>
              </div>

              {/* File Content Display */}
              <div className="flex-1 p-5 overflow-auto font-mono text-xs text-industrial-100 leading-relaxed max-h-[420px] bg-industrial-950">
                <pre className="whitespace-pre-wrap select-text">{currentFileObject.code}</pre>
              </div>

              {/* Code Footer */}
              <div className="p-4 bg-industrial-900/30 border-t border-industrial-800 text-[11px] text-industrial-400 font-sans flex items-center justify-between shrink-0">
                <span>Architecture Verified</span>
                <span className="font-mono text-[10px] text-brand-500">✔ COMPILES GREEN</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: DESIGN SYSTEM TOKENS */}
      {activeTab === "design" && (
        <div className="space-y-8 animate-fade-in">
          {/* Colors Panel */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Color Palette Tokens</CardTitle>
                <CardDescription>
                  Standardized high-contrast, eye-safe colors calibrated for low-light shop floors and high-glare tablet screens.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Industrial Slate */}
              <div>
                <h4 className="text-xs font-bold font-mono text-industrial-400 uppercase tracking-widest mb-3">
                  Industrial Base (Dark Slate Steel)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((val) => (
                    <div key={val} className="space-y-1">
                      <div
                        className={`h-12 rounded-lg border border-industrial-200 dark:border-industrial-700 flex items-end p-2`}
                        style={{
                          backgroundColor:
                            val === 950 ? "var(--color-industrial-950)" : `var(--color-industrial-${val})`,
                        }}
                      >
                        <span className="text-[9px] font-mono font-bold text-white bg-black/40 px-1 rounded">
                          {val}
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-industrial-400 font-medium text-center">
                        industrial-{val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand green */}
              <div>
                <h4 className="text-xs font-bold font-mono text-industrial-400 uppercase tracking-widest mb-3">
                  Brand Accent (Active Compliance Green)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((val) => (
                    <div key={val} className="space-y-1">
                      <div
                        className={`h-12 rounded-lg border border-industrial-200 dark:border-industrial-700 flex items-end p-2`}
                        style={{
                          backgroundColor:
                            val === 950 ? "var(--color-brand-950)" : `var(--color-brand-${val})`,
                        }}
                      >
                        <span className="text-[9px] font-mono font-bold text-white bg-black/40 px-1 rounded">
                          {val}
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-industrial-400 font-medium text-center">
                        brand-{val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gold warning */}
              <div>
                <h4 className="text-xs font-bold font-mono text-industrial-400 uppercase tracking-widest mb-3">
                  Verification Accent (Alert / Revision Gold)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((val) => (
                    <div key={val} className="space-y-1">
                      <div
                        className={`h-12 rounded-lg border border-industrial-200 dark:border-industrial-700 flex items-end p-2`}
                        style={{
                          backgroundColor:
                            val === 950 ? "var(--color-gold-950)" : `var(--color-gold-${val})`,
                        }}
                      >
                        <span className="text-[9px] font-mono font-bold text-white bg-black/40 px-1 rounded">
                          {val}
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-industrial-400 font-medium text-center">
                        gold-{val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography & Spacing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Typography */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Typography System</CardTitle>
                  <CardDescription>Standard font configuration using strict font scale hierarchies.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-industrial-100 dark:bg-industrial-800 px-2 py-0.5 rounded text-industrial-600 dark:text-industrial-300">
                    Font Display (Space Grotesk)
                  </span>
                  <div className="mt-2 space-y-1.5">
                    <p className="font-display font-bold text-2xl text-industrial-950 dark:text-white tracking-tight">
                      SMRITI Operations 2xl
                    </p>
                    <p className="font-display font-semibold text-lg text-industrial-850 dark:text-industrial-200">
                      Standard Module Heading lg
                    </p>
                  </div>
                </div>

                <div className="border-t border-industrial-50 dark:border-industrial-850 pt-4">
                  <span className="text-[10px] font-mono font-bold bg-industrial-100 dark:bg-industrial-800 px-2 py-0.5 rounded text-industrial-600 dark:text-industrial-300">
                    Font Sans (Inter UI)
                  </span>
                  <div className="mt-2 space-y-1.5">
                    <p className="font-sans text-sm font-medium text-industrial-800 dark:text-industrial-200">
                      Primary body text. Highly legible under standard industrial lighting. Clean kerning, standard weight.
                    </p>
                    <p className="font-sans text-xs text-industrial-400">
                      Secondary layout meta labels. Compact structure, 12px height.
                    </p>
                  </div>
                </div>

                <div className="border-t border-industrial-50 dark:border-industrial-850 pt-4">
                  <span className="text-[10px] font-mono font-bold bg-industrial-100 dark:bg-industrial-800 px-2 py-0.5 rounded text-industrial-600 dark:text-industrial-300">
                    Font Mono (JetBrains Mono)
                  </span>
                  <div className="mt-2 space-y-1.5">
                    <p className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">
                      SOP-CNC-302 // COMPLIANCE_SECURE_ONLINE
                    </p>
                    <p className="font-mono text-[10px] text-industrial-500">
                      0.00.42.091_SYNCED_OK
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spacing Rail */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Proportional Spacing System</CardTitle>
                  <CardDescription>Proportional grid constraints supporting strict rhythm alignment.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { token: "sp-1", val: "4px", size: "h-1" },
                    { token: "sp-2", val: "8px", size: "h-2" },
                    { token: "sp-3", val: "12px", size: "h-3" },
                    { token: "sp-4", val: "16px", size: "h-4" },
                    { token: "sp-6", val: "24px", size: "h-6" },
                    { token: "sp-8", val: "32px", size: "h-8" },
                    { token: "sp-12", val: "48px", size: "h-12" },
                  ].map((s) => (
                    <div key={s.token} className="flex items-center gap-4 text-xs font-sans">
                      <span className="w-16 font-mono font-bold text-industrial-500">{s.token}</span>
                      <span className="w-12 font-mono text-industrial-450">{s.val}</span>
                      <div className="flex-1 bg-industrial-100 dark:bg-industrial-800 rounded overflow-hidden">
                        <div className={`bg-brand-500 dark:bg-brand-600 ${s.size} w-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 4. TAB: COMPONENT PLAYGROUNDS */}
      {activeTab === "sandbox" && (
        <div className="space-y-8">
          {/* Badge & Card Playground controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Badge interactive station */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Badge Playground</CardTitle>
                  <CardDescription>Preview badge states with automatic workstation signals.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Variant toggles */}
                <div className="flex flex-wrap gap-2">
                  {(["default", "success", "warning", "error", "info", "gold"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedBadgeVariant(v)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold font-mono border transition-all ${
                        selectedBadgeVariant === v
                          ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                          : "bg-white dark:bg-industrial-950 text-industrial-600 dark:text-industrial-300 border-industrial-100 dark:border-industrial-800 hover:border-industrial-350"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="p-6 rounded-xl border border-dashed border-industrial-100 dark:border-industrial-800 flex items-center justify-center bg-industrial-50/50 dark:bg-industrial-950/20">
                  <div className="text-center">
                    <p className="text-xs text-industrial-450 dark:text-industrial-500 mb-3 font-sans">
                      Active Badge Render
                    </p>
                    <Badge variant={selectedBadgeVariant}>
                      SOP {selectedBadgeVariant.toUpperCase()} STATE
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card interactive station */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Card Component Sandbox</CardTitle>
                  <CardDescription>Modify left accent indicators in real time.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {(["none", "success", "warning", "error", "info", "gold"] as const).map((acc) => (
                    <button
                      key={acc}
                      onClick={() => setSelectedCardAccent(acc)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        selectedCardAccent === acc
                          ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                          : "bg-white dark:bg-industrial-950 text-industrial-600 dark:text-industrial-300 border-industrial-100 dark:border-industrial-800 hover:border-industrial-350"
                      }`}
                    >
                      Accent: {acc}
                    </button>
                  ))}
                </div>

                <Card statusAccent={selectedCardAccent}>
                  <CardHeader>
                    <div>
                      <CardTitle>Active CNC Machine calibration</CardTitle>
                      <CardDescription>SOP verification check logged for Station 4</CardDescription>
                    </div>
                    <Badge variant={selectedCardAccent === "none" ? "default" : selectedCardAccent}>
                      {selectedCardAccent.toUpperCase()}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-industrial-600 dark:text-industrial-300 leading-relaxed font-sans">
                      All machine calibrations must conform strictly to micro-guidelines established in SOP-CNC-302 to maintain high precision.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <span className="text-[10px] font-mono text-industrial-400">OPERATOR RAHUL SHARMA</span>
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">97.8% PASS</span>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Table Interactive Demo */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Workers Skills Matrix (Generic Table Implementation)</CardTitle>
                <CardDescription>
                  Shows SMRITI's robust generic table populated with active shop-floor operator data. Sort, search, and paginate dynamically.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table
                data={mockWorkers}
                columns={workerTableColumns}
                searchKeys={["name", "station", "level"]}
                searchPlaceholder="Search workers, stations, or level..."
                itemsPerPage={3}
                zebra
              />
            </CardContent>
          </Card>

          {/* Timeline and Charts Playground */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recharts Adaptive Chart Wrapper */}
            <div className="lg:col-span-7">
              <Card className="h-full flex flex-col justify-between">
                <CardHeader>
                  <div>
                    <CardTitle>Analytical Data Feeds (Recharts Wrapper)</CardTitle>
                    <CardDescription>Dynamic light/dark themes, tooltips, and custom curves.</CardDescription>
                  </div>
                  <div className="flex gap-1.5 bg-industrial-50 dark:bg-industrial-950 p-1 rounded-lg border border-industrial-100 dark:border-industrial-800">
                    {(["line", "bar", "area"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedChartType(t)}
                        className={`px-2.5 py-1 text-[10px] font-semibold uppercase rounded-md transition-all ${
                          selectedChartType === t
                            ? "bg-white dark:bg-industrial-800 text-industrial-950 dark:text-white shadow-sm font-bold"
                            : "text-industrial-400 hover:text-industrial-700 dark:hover:text-industrial-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="h-[250px] mt-4">
                    <ChartWrapper
                      data={analyticsHistory}
                      type={selectedChartType}
                      dataKeys={["complianceRate", "trainingMinutes"]}
                      colors={["#22c55e", "#6c8896"]}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Micro-learning timeline */}
            <div className="lg:col-span-5">
              <Card className="h-full">
                <CardHeader>
                  <div>
                    <CardTitle>Operational Logging (Timeline Implementation)</CardTitle>
                    <CardDescription>SOP revisions, compliance checks, and machine audits.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="max-h-[350px] overflow-y-auto pr-2">
                  <Timeline items={timelineData} animate />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Modals and Loading Skeletons controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dialog Trigger Sandbox */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Dialog Modals (Framer Motion Modal)</CardTitle>
                  <CardDescription>Interactive spring animation triggers with escape-close listener.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-industrial-500 dark:text-industrial-400 font-sans leading-relaxed">
                  Enterprise SMRITI triggers dynamic verification overlays for operators before commencing workstation shifts. Try triggering the modal below.
                </p>
                <button
                  onClick={() => setIsSandboxModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Shift Micro-Quiz verification</span>
                </button>

                {/* SMRITI Micro Quiz Modal content */}
                <Modal
                  isOpen={isSandboxModalOpen}
                  onClose={() => setIsSandboxModalOpen(false)}
                  title="Shift Verification: SOP-CNC-302"
                >
                  <div className="space-y-4 font-sans">
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-450 leading-relaxed">
                        CRITICAL SAFETY STEP: You are initializing the high-speed laser cutter. Please complete the continuous memory validation check.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-industrial-800 dark:text-industrial-100">
                        1. Which optical cleaning agent is certified for the Laser Lens array?
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          "Option A: Dry compressed standard clean floor air.",
                          "Option B: 99.9% Anhydrous Isopropyl Alcohol with lint-free swabs.",
                          "Option C: Demineralized plant safety faucet water.",
                        ].map((opt, idx) => (
                          <label
                            key={idx}
                            className="p-3 border border-industrial-100 dark:border-industrial-800 hover:border-brand-500 rounded-xl flex items-center gap-3 cursor-pointer transition-all hover:bg-brand-50/5 dark:hover:bg-brand-950/5 group text-xs text-industrial-600 dark:text-industrial-300"
                          >
                            <input
                              type="radio"
                              name="sop-quiz"
                              className="accent-brand-500"
                              defaultChecked={idx === 1}
                            />
                            <span className="group-hover:text-industrial-900 dark:group-hover:text-white transition-colors">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-4 border-t border-industrial-50 dark:border-industrial-850">
                      <button
                        onClick={() => setIsSandboxModalOpen(false)}
                        className="px-4 py-2 border border-industrial-100 dark:border-industrial-800 hover:bg-industrial-50 dark:hover:bg-industrial-850 rounded-xl text-xs font-semibold text-industrial-600 dark:text-industrial-300"
                      >
                        Cancel Shift Setup
                      </button>
                      <button
                        onClick={() => {
                          setIsSandboxModalOpen(false);
                          alert("Memory verification logs updated in SMRITI ledger!");
                        }}
                        className="px-4 py-2 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
                      >
                        Log Verification & Unlock Machine
                      </button>
                    </div>
                  </div>
                </Modal>
              </CardContent>
            </Card>

            {/* Skeleton / Spinners sandbox */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Asynchronous Load Visualizers (Loading Component)</CardTitle>
                  <CardDescription>Preview spinners and structural layout skeletal states.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    { state: "none", label: "Clear State" },
                    { state: "spinner", label: "Show Spinner" },
                    { state: "card", label: "Show Card Skeleton" },
                    { state: "table", label: "Show Table Skeleton" },
                  ].map((item) => (
                    <button
                      key={item.state}
                      onClick={() => setSandboxLoadingState(item.state as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        sandboxLoadingState === item.state
                          ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                          : "bg-white dark:bg-industrial-950 text-industrial-600 dark:text-industrial-300 border-industrial-100 dark:border-industrial-800 hover:border-industrial-350"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-dashed border-industrial-100 dark:border-industrial-800 bg-industrial-50/20 dark:bg-industrial-950/10 min-h-[160px] flex items-center justify-center transition-all duration-300">
                  {sandboxLoadingState === "none" && (
                    <span className="text-xs text-industrial-400 dark:text-industrial-500 font-sans">
                      Select a loading state above to trigger layout replacement.
                    </span>
                  )}
                  {sandboxLoadingState === "spinner" && (
                    <div className="text-center space-y-2">
                      <LoadingSpinner size="lg" className="mx-auto" />
                      <p className="text-[10px] font-mono text-industrial-400 animate-pulse uppercase tracking-widest pt-2">
                        SYNCHRONIZING LEDGER RECORDS...
                      </p>
                    </div>
                  )}
                  {sandboxLoadingState === "card" && (
                    <div className="w-full">
                      <SkeletonCard />
                    </div>
                  )}
                  {sandboxLoadingState === "table" && (
                    <div className="w-full">
                      <SkeletonTable rows={2} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
