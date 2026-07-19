/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  BrainCircuit,
  Compass,
  FileSpreadsheet,
  Users2,
  CalendarCheck2,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Settings2,
  HelpCircle,
  LogOut,
  History,
  Server,
} from "lucide-react";
import { SidebarItem } from "../../types";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeItem: string;
  onSelectActiveItem: (id: string) => void;
  onExitToLanding?: () => void;
  id?: string;
}

interface SidebarItemInternal {
  id: string;
  label: string;
  icon: any;
  category: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeItem,
  onSelectActiveItem,
  onExitToLanding,
  id,
}) => {
  // SMRITI high-level SaaS continuous learning modules
  const navigationItems: SidebarItemInternal[] = [
    { id: "overview", label: "Operations Panel", icon: Compass, category: "SMRITI ENGINE" },
    { id: "knowledge", label: "Knowledge Base", icon: BrainCircuit, category: "SMRITI ENGINE" },
    { id: "memory", label: "Factory Memory", icon: History, category: "SMRITI ENGINE" },
    { id: "sops", label: "SOP Repository", icon: BookOpen, category: "SMRITI ENGINE" },
    { id: "skills", label: "Workers Skill Matrix", icon: Users2, category: "LEARNING HUB" },
    { id: "verifications", label: "Shift Verifications", icon: CalendarCheck2, category: "LEARNING HUB" },
    { id: "analytics", label: "Compliance Center", icon: BarChart3, category: "METRICS" },
    { id: "settings", label: "Plant Setup", icon: Settings2, category: "SYSTEM" },
    { id: "architecture", label: "System Architecture", icon: Server, category: "SYSTEM" },
  ];

  // Grouped by Category for Expanded Mode
  const groupedCategories = navigationItems.reduce((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  return (
    <aside
      id={id || "app-sidebar"}
      className={`h-screen border-r border-industrial-100 dark:border-industrial-800 bg-white dark:bg-industrial-900 flex flex-col justify-between transition-all duration-300 relative z-40 shrink-0 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-industrial-100 dark:border-industrial-800 bg-industrial-50/50 dark:bg-industrial-950/20">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col select-none">
                <span className="text-sm font-bold font-display tracking-wider text-industrial-900 dark:text-white leading-none">
                  SMRITI
                </span>
                <span className="text-[9px] font-mono font-medium text-brand-600 dark:text-brand-400 tracking-widest uppercase mt-0.5">
                  OPERATIONAL LEARNING
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Categories and Items */}
        <div className="flex-1 py-4 overflow-y-auto max-h-[calc(100vh-120px)] px-3 space-y-4">
          {Object.entries(groupedCategories).map(([category, items]) => (
            <div key={category} className="space-y-1">
              {!isCollapsed && (
                <h5 className="text-[10px] font-mono font-semibold text-industrial-400 dark:text-industrial-500 uppercase tracking-widest px-3 mb-2 pt-1 select-none">
                  {category}
                </h5>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectActiveItem(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 group relative ${
                      isActive
                        ? "bg-brand-500 text-white dark:bg-brand-600 shadow-sm"
                        : "text-industrial-600 dark:text-industrial-300 hover:bg-industrial-50 dark:hover:bg-industrial-850 hover:text-industrial-900 dark:hover:text-white"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                      isActive ? "text-white" : "text-industrial-400 dark:text-industrial-500 group-hover:scale-110"
                    }`} />
                    {!isCollapsed && (
                      <span className="truncate leading-none">{item.label}</span>
                    )}

                    {/* Tooltip on Collapsed Mode */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-2 py-1 bg-industrial-950 text-white rounded text-[10px] font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {onExitToLanding && (
        <div className="px-3 py-2 border-t border-industrial-50 dark:border-industrial-850">
          <button
            onClick={onExitToLanding}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-industrial-500 hover:text-industrial-900 dark:hover:text-white hover:bg-industrial-50 dark:hover:bg-industrial-850 transition-all duration-150 group relative"
            title={isCollapsed ? "Exit to Landing Page" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0 text-industrial-450 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="truncate leading-none">Exit to Landing</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2 py-1 bg-industrial-950 text-white rounded text-[10px] font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50">
                Exit to Landing
              </div>
            )}
          </button>
        </div>
      )}

      {/* Sidebar Footer and Collapse Handle */}
      <div className="p-3 border-t border-industrial-100 dark:border-industrial-800 bg-industrial-50/10 dark:bg-industrial-950/10">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          {!isCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <HelpCircle className="w-4 h-4 text-industrial-400 dark:text-industrial-500 shrink-0" />
              <span className="text-[10px] font-mono text-industrial-500 dark:text-industrial-400 truncate">
                VER. 1.15.4-SaaS
              </span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-md border border-industrial-100 dark:border-industrial-800 bg-white dark:bg-industrial-900 hover:bg-industrial-50 dark:hover:bg-industrial-850 text-industrial-500 hover:text-industrial-700 dark:hover:text-industrial-300 transition-all shadow-sm ${
              isCollapsed ? "mx-auto" : ""
            }`}
            title={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar Menu"}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
