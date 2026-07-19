/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./hooks/useTheme";
import { Shell } from "./components/layout/Shell";
import { ArchitectureExplorer } from "./components/ArchitectureExplorer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { BookOpen, Compass, Users2, CalendarCheck2, BarChart3, Settings2 } from "lucide-react";
import { LandingPage } from "./components/LandingPage";
import { DemoPage } from "./components/DemoPage";
import { KnowledgeBasePage } from "./components/KnowledgeBasePage";
import { MemoryPage } from "./components/MemoryPage";
import { ArchitecturePage } from "./components/ArchitecturePage";

export default function App() {
  const [viewMode, setViewMode] = useState<"landing" | "dashboard" | "demo" | "knowledge" | "memory" | "architecture">(() => {
    if (window.location.hash === "#/demo" || window.location.pathname === "/demo") {
      return "demo";
    }
    if (window.location.hash === "#/knowledge" || window.location.pathname === "/knowledge") {
      return "knowledge";
    }
    if (window.location.hash === "#/memory" || window.location.pathname === "/memory") {
      return "memory";
    }
    if (window.location.hash === "#/architecture" || window.location.pathname === "/architecture") {
      return "architecture";
    }
    return "landing";
  });
  const [activeItem, setActiveItem] = useState("overview");

  useEffect(() => {
    const handleUrlChange = () => {
      if (window.location.hash === "#/demo" || window.location.pathname === "/demo") {
        setViewMode("demo");
      } else if (window.location.hash === "#/knowledge" || window.location.pathname === "/knowledge") {
        setViewMode("knowledge");
      } else if (window.location.hash === "#/memory" || window.location.pathname === "/memory") {
        setViewMode("memory");
      } else if (window.location.hash === "#/architecture" || window.location.pathname === "/architecture") {
        setViewMode("architecture");
      } else if (window.location.hash === "" && window.location.pathname === "/") {
        setViewMode("landing");
      }
    };
    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return <ArchitectureExplorer />;

      case "sops":
        return (
          <div className="space-y-6">
            <div className="pb-6 border-b border-industrial-100 dark:border-industrial-800">
              <Badge variant="success">SOP CATALOG PREVIEW</Badge>
              <h1 className="text-2xl font-bold font-display text-industrial-900 dark:text-white mt-2">
                Standard Operating Procedures Catalog
              </h1>
              <p className="text-sm text-industrial-500 dark:text-industrial-400 mt-1">
                Workspace scaffold placeholder for active plant learning procedures. Focus only on architecture is active.
              </p>
            </div>
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-industrial-300 dark:text-industrial-700 mx-auto mb-4 animate-bounce" />
                <h3 className="text-base font-semibold font-display text-industrial-800 dark:text-white">
                  SOP Repository Module Scaffolding
                </h3>
                <p className="text-xs text-industrial-450 dark:text-industrial-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  The reusable layout, cards, badges, and table are ready. The database models and router endpoints are fully declared to support live content in the next phase.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <div className="pb-6 border-b border-industrial-100 dark:border-industrial-800">
              <Badge variant="warning">SKILLS GAP PREVIEW</Badge>
              <h1 className="text-2xl font-bold font-display text-industrial-900 dark:text-white mt-2">
                Workers Skill Matrix Hub
              </h1>
              <p className="text-sm text-industrial-500 dark:text-industrial-400 mt-1">
                Workspace scaffold placeholder for individual operator compliance scoreboards.
              </p>
            </div>
            <Card>
              <CardContent className="py-12 text-center">
                <Users2 className="w-12 h-12 text-industrial-300 dark:text-industrial-700 mx-auto mb-4" />
                <h3 className="text-base font-semibold font-display text-industrial-800 dark:text-white">
                  Skills Matrix Scaffolding Loaded
                </h3>
                <p className="text-xs text-industrial-450 dark:text-industrial-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  Interactive generic table handles full workers listing under the "Operations Panel" tab. Filter or sort worker records live.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "verifications":
        return (
          <div className="space-y-6">
            <div className="pb-6 border-b border-industrial-100 dark:border-industrial-800">
              <Badge variant="gold">VERIFICATIONS MODULE PREVIEW</Badge>
              <h1 className="text-2xl font-bold font-display text-industrial-900 dark:text-white mt-2">
                Shift SOP Audits Ledger
              </h1>
              <p className="text-sm text-industrial-500 dark:text-industrial-400 mt-1">
                Scaffold placeholder for shift handovers and micro-quiz validations.
              </p>
            </div>
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarCheck2 className="w-12 h-12 text-industrial-300 dark:text-industrial-700 mx-auto mb-4" />
                <h3 className="text-base font-semibold font-display text-industrial-800 dark:text-white">
                  Verification Records System Active
                </h3>
                <p className="text-xs text-industrial-450 dark:text-industrial-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  Framer Motion timelines are ready in the Operations Panel to log verification records seamlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="pb-6 border-b border-industrial-100 dark:border-industrial-800">
              <Badge variant="info">COMPLIANCE METRICS PREVIEW</Badge>
              <h1 className="text-2xl font-bold font-display text-industrial-900 dark:text-white mt-2">
                Compliance & Training Analytics
              </h1>
              <p className="text-sm text-industrial-500 dark:text-industrial-400 mt-1">
                Scaffold placeholder for overall micro-learning metrics.
              </p>
            </div>
            <Card>
              <CardContent className="py-12 text-center">
                <BarChart3 className="w-12 h-12 text-industrial-300 dark:text-industrial-700 mx-auto mb-4" />
                <h3 className="text-base font-semibold font-display text-industrial-800 dark:text-white">
                  Data Visualizers Fully Mapped
                </h3>
                <p className="text-xs text-industrial-450 dark:text-industrial-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  Adaptive Area, Bar, and Line Recharts visual components are instantiated in the main Operations Panel to handle compliance reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="pb-6 border-b border-industrial-100 dark:border-industrial-800">
              <Badge variant="default">SYSTEM CONFIG PREVIEW</Badge>
              <h1 className="text-2xl font-bold font-display text-industrial-900 dark:text-white mt-2">
                Plant Setup & Global Configurations
              </h1>
              <p className="text-sm text-industrial-500 dark:text-industrial-400 mt-1">
                Operational learning parameters, roles, and machine stations setup.
              </p>
            </div>
            <Card>
              <CardContent className="py-12 text-center">
                <Settings2 className="w-12 h-12 text-industrial-300 dark:text-industrial-700 mx-auto mb-4" />
                <h3 className="text-base font-semibold font-display text-industrial-800 dark:text-white">
                  System Configuration Infrastructure
                </h3>
                <p className="text-xs text-industrial-450 dark:text-industrial-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  Plant variables and configuration models are mapped in types.ts.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <ArchitectureExplorer />;
    }
  };

  if (viewMode === "demo") {
    return (
      <ThemeProvider>
        <DemoPage
          onBackToLanding={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("landing");
          }}
          onEnterApp={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("dashboard");
          }}
        />
      </ThemeProvider>
    );
  }

  if (viewMode === "knowledge") {
    return (
      <ThemeProvider>
        <KnowledgeBasePage
          onBackToLanding={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("landing");
          }}
          onEnterApp={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("dashboard");
          }}
        />
      </ThemeProvider>
    );
  }

  if (viewMode === "memory") {
    return (
      <ThemeProvider>
        <MemoryPage
          onBackToLanding={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("landing");
          }}
          onEnterApp={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("dashboard");
          }}
          onEnterKnowledge={() => {
            window.history.pushState(null, "", "/knowledge");
            window.location.hash = "#/knowledge";
            setViewMode("knowledge");
          }}
        />
      </ThemeProvider>
    );
  }

  if (viewMode === "architecture") {
    return (
      <ThemeProvider>
        <ArchitecturePage
          onBackToLanding={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("landing");
          }}
          onEnterApp={() => {
            window.history.pushState(null, "", "/");
            window.location.hash = "";
            setViewMode("dashboard");
          }}
          onEnterKnowledge={() => {
            window.history.pushState(null, "", "/knowledge");
            window.location.hash = "#/knowledge";
            setViewMode("knowledge");
          }}
          onEnterDemo={() => {
            window.history.pushState(null, "", "/demo");
            window.location.hash = "#/demo";
            setViewMode("demo");
          }}
        />
      </ThemeProvider>
    );
  }

  if (viewMode === "landing") {
    return (
      <ThemeProvider>
        <LandingPage
          onEnterApp={() => setViewMode("dashboard")}
          onEnterDemo={() => {
            window.history.pushState(null, "", "/demo");
            setViewMode("demo");
          }}
          onEnterKnowledge={() => {
            window.history.pushState(null, "", "/knowledge");
            window.location.hash = "#/knowledge";
            setViewMode("knowledge");
          }}
          onEnterMemory={() => {
            window.history.pushState(null, "", "/memory");
            window.location.hash = "#/memory";
            setViewMode("memory");
          }}
          onEnterArchitecture={() => {
            window.history.pushState(null, "", "/architecture");
            window.location.hash = "#/architecture";
            setViewMode("architecture");
          }}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Shell
        activeItem={activeItem}
        onSelectActiveItem={(id) => {
          if (id === "knowledge") {
            window.history.pushState(null, "", "/knowledge");
            window.location.hash = "#/knowledge";
            setViewMode("knowledge");
          } else if (id === "memory") {
            window.history.pushState(null, "", "/memory");
            window.location.hash = "#/memory";
            setViewMode("memory");
          } else if (id === "architecture") {
            window.history.pushState(null, "", "/architecture");
            window.location.hash = "#/architecture";
            setViewMode("architecture");
          } else {
            setActiveItem(id);
          }
        }}
        onExitToLanding={() => setViewMode("landing")}
      >
        {renderContent()}
      </Shell>
    </ThemeProvider>
  );
}
