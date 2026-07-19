/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sun, Moon, Bell, Shield, ShieldCheck, Activity, BrainCircuit } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../types";

interface NavbarProps {
  onToggleSidebar: () => void;
  id?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, id }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications for continuous operational learning
  const notifications = [
    {
      id: "1",
      title: "Critical SOP Updated",
      desc: "CNC-302 Laser Cutter safety protocols revised.",
      time: "10m ago",
      unread: true,
    },
    {
      id: "2",
      title: "Skills Gap Verified",
      desc: "Worker Rahul S. passed Operator certification.",
      time: "1h ago",
      unread: true,
    },
    {
      id: "3",
      title: "System Audit Pending",
      desc: "Monthly training checklist compliance check.",
      time: "24h ago",
      unread: false,
    },
  ];

  return (
    <header
      id={id || "global-navbar"}
      className="h-16 border-b border-industrial-100 dark:border-industrial-800 bg-white dark:bg-industrial-900 px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-200 shadow-sm"
    >
      {/* Left side: Hamburger, platform category */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg hover:bg-industrial-50 dark:hover:bg-industrial-850 text-industrial-600 dark:text-industrial-300 md:hidden focus:outline-none"
          title="Toggle Sidebar Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Manufacturing Operations Shield Status */}
        <div className="hidden sm:flex items-center gap-2 bg-brand-50 dark:bg-brand-950/20 px-3 py-1 rounded-full border border-brand-100 dark:border-brand-900/30">
          <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span className="text-xs font-semibold text-brand-700 dark:text-brand-400 font-mono">
            COMPLIANCE SECURE • 97.4%
          </span>
        </div>
      </div>

      {/* Right side: Actions, Theme, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Real-time sync heart beat */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-industrial-400 dark:text-industrial-500 bg-industrial-50 dark:bg-industrial-950/40 border border-industrial-100 dark:border-industrial-800 rounded-lg">
          <Activity className="w-3 h-3 text-brand-500 animate-pulse" />
          <span>SMRITI ENGINE ONLINE</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-industrial-100 dark:border-industrial-800 hover:bg-industrial-50 dark:hover:bg-industrial-850 text-industrial-500 dark:text-industrial-400 hover:text-industrial-800 dark:hover:text-industrial-200 transition-all duration-150"
          title={theme === Theme.Dark ? "Activate Light Theme" : "Activate Dark Theme"}
        >
          {theme === Theme.Dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification bell dropdown control */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg border border-industrial-100 dark:border-industrial-800 hover:bg-industrial-50 dark:hover:bg-industrial-850 text-industrial-500 dark:text-industrial-400 hover:text-industrial-800 dark:hover:text-industrial-200 transition-all duration-150 relative"
            title="SMRITI Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-industrial-900 animate-bounce" />
          </button>

          {showNotifications && (
            <>
              {/* Backing dismiss overlay */}
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-800 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                <div className="px-4 py-2.5 border-b border-industrial-50 dark:border-industrial-850 flex items-center justify-between">
                  <span className="text-xs font-semibold text-industrial-800 dark:text-white font-display uppercase tracking-wide">
                    Operational Alerts
                  </span>
                  <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 px-1.5 py-0.5 rounded-full font-mono">
                    2 UNREAD
                  </span>
                </div>
                <div className="divide-y divide-industrial-50 dark:divide-industrial-850 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 hover:bg-industrial-50/50 dark:hover:bg-industrial-850/20 transition-colors ${
                        n.unread ? "bg-brand-50/5 dark:bg-brand-950/5" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-semibold text-industrial-850 dark:text-industrial-200">
                          {n.title}
                        </span>
                        <span className="text-[9px] font-mono text-industrial-400 dark:text-industrial-500 shrink-0">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-industrial-500 dark:text-industrial-400 mt-1">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Identity Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-industrial-100 dark:border-industrial-800">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-industrial-850 dark:text-industrial-150 leading-none">
              Biyonal T.
            </span>
            <span className="text-[10px] text-industrial-400 dark:text-industrial-500 font-mono mt-0.5">
              PLANT SUPERVISOR
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-industrial-200 dark:bg-industrial-800 flex items-center justify-center font-bold text-xs text-industrial-700 dark:text-industrial-200 border border-industrial-300 dark:border-industrial-700 font-mono select-none">
            BT
          </div>
        </div>
      </div>
    </header>
  );
};
