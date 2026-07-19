/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface ShellProps {
  children: React.ReactNode;
  activeItem: string;
  onSelectActiveItem: (id: string) => void;
  onExitToLanding?: () => void;
  id?: string;
}

export const Shell: React.FC<ShellProps> = ({
  children,
  activeItem,
  onSelectActiveItem,
  onExitToLanding,
  id,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div
      id={id || "app-shell-root"}
      className="flex h-screen w-screen overflow-hidden bg-industrial-50 dark:bg-[#090b0d] text-industrial-950 dark:text-industrial-50 font-sans antialiased"
    >
      {/* 1. Desktop Sidebar Menu */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeItem={activeItem}
          onSelectActiveItem={onSelectActiveItem}
          onExitToLanding={onExitToLanding}
        />
      </div>

      {/* 2. Mobile Responsive Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop dismiss overlay */}
          <div
            className="fixed inset-0 bg-industrial-950/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <Sidebar
              isCollapsed={false}
              onToggleCollapse={() => setIsMobileSidebarOpen(false)}
              activeItem={activeItem}
              onSelectActiveItem={(id) => {
                onSelectActiveItem(id);
                setIsMobileSidebarOpen(false); // Close mobile drawer
              }}
              onExitToLanding={onExitToLanding}
            />
          </div>
        </>
      )}

      {/* 3. Main Viewport Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Global Navigation header */}
        <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

        {/* Scalable main content wrapper */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
