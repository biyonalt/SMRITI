/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  FileText,
  AlertTriangle,
  RotateCw,
  Search,
  CheckCircle2,
  Settings,
  Flame,
  Binary,
  Clock,
  Compass,
  Database,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Eye,
} from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card, CardContent } from "./ui/Card";

interface LandingPageProps {
  onEnterApp: () => void;
  onEnterDemo?: () => void;
  onEnterKnowledge?: () => void;
  onEnterMemory?: () => void;
  onEnterArchitecture?: () => void;
  id?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onEnterDemo,
  onEnterKnowledge,
  onEnterMemory,
  onEnterArchitecture,
  id,
}) => {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeInteractiveStep, setActiveInteractiveStep] = useState(0);

  // Monitor scroll for transparent navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interval timer for the hero section workflow simulation (right side)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev + 1) % 6);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Workflow steps definition
  const heroWorkflowSteps = [
    {
      id: 0,
      label: "Problem Detected",
      desc: "Thermal sensor alerts deviation of ±4.5°C in spindle casing CNC-302.",
      color: "border-red-500 text-red-500 bg-red-500/10",
      icon: AlertTriangle,
    },
    {
      id: 1,
      label: "Incident Captured",
      desc: "Operator captures fault logs, pressure state, and video snapshot in 30 seconds.",
      color: "border-amber-500 text-amber-500 bg-amber-500/10",
      icon: CameraIconCustom,
    },
    {
      id: 2,
      label: "AI Analysis",
      desc: "SMRITI matches logs against historical motor-lock incident (August 2025).",
      color: "border-brand-500 text-brand-500 bg-brand-500/10",
      icon: BrainCircuit,
    },
    {
      id: 3,
      label: "Engineer Validation",
      desc: "Plant specialist confirms recommended gasket replacement and torque alignment.",
      color: "border-sky-500 text-sky-500 bg-sky-500/10",
      icon: ShieldCheck,
    },
    {
      id: 4,
      label: "Knowledge Updated",
      desc: "SOP-CNC-302 updated instantly with critical corrective lubrication steps.",
      color: "border-gold-500 text-gold-500 bg-gold-500/10",
      icon: FileText,
    },
    {
      id: 5,
      label: "Future Recommendation Improved",
      desc: "AI recommendation confidence scores increase from 74% to 98% for similar faults.",
      color: "border-purple-500 text-purple-500 bg-purple-500/10",
      icon: RotateCw,
    },
  ];

  return (
    <div
      id={id || "landing-page-root"}
      className="min-h-screen bg-slate-50 dark:bg-[#07090b] text-industrial-950 dark:text-industrial-50 font-sans selection:bg-brand-500 selection:text-white overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gold-500/5 dark:bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* --- NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/80 dark:bg-[#07090b]/80 backdrop-blur-md py-4 border-industrial-100 dark:border-industrial-850 shadow-sm"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold font-display tracking-widest leading-none text-industrial-900 dark:text-white">
                SMRITI
              </span>
              <span className="text-[8px] font-mono font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mt-0.5">
                OPERATIONAL LEARNING
              </span>
            </div>
          </div>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-industrial-600 dark:text-industrial-300">
            {["Home", "Features", "Workflow", "Knowledge Base", "Factory Memory", "Architecture", "Demo", "About"].map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                  else if (link === "Demo" && onEnterDemo) onEnterDemo();
                  else if (link === "Knowledge Base" && onEnterKnowledge) onEnterKnowledge();
                  else if (link === "Factory Memory" && onEnterMemory) onEnterMemory();
                  else if (link === "Architecture" && onEnterArchitecture) onEnterArchitecture();
                  else scrollToSection(link.toLowerCase());
                }}
                className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Enter App Callout */}
          <div>
            <button
              onClick={onEnterApp}
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl text-xs font-bold tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Side Content */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div>
            <Badge variant="gold" className="mb-4">
              Continuous Operational Learning Platform
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-industrial-900 dark:text-white leading-[1.1]">
              Because Experience <br />
              <span className="bg-gradient-to-r from-brand-500 to-emerald-400 bg-clip-text text-transparent">
                Should Never Be Forgotten.
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-industrial-500 dark:text-industrial-450 leading-relaxed font-sans max-w-xl">
            Manufacturing MSMEs repeatedly solve the same operational problems because valuable knowledge disappears after every incident. SMRITI captures every lesson, preserves every solution, and continuously improves future decision-making.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onEnterApp}
              className="px-7 py-3.5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl text-xs font-bold tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterKnowledge}
              className="px-7 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Knowledge Base</span>
            </button>
            <button
              onClick={onEnterMemory}
              className="px-7 py-3.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Factory Memory</span>
            </button>
            <button
              onClick={() => scrollToSection("workflow")}
              className="px-7 py-3.5 border border-industrial-200 dark:border-industrial-800 bg-white/50 dark:bg-industrial-900/40 backdrop-blur-sm text-industrial-700 dark:text-industrial-300 hover:text-industrial-900 dark:hover:text-white hover:border-industrial-300 dark:hover:border-industrial-700 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2.5"
            >
              <span>Watch Workflow</span>
            </button>
          </div>
        </div>

        {/* Right Side: Animated Workflow Visualization */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[480px]">
          <div className="w-full max-w-md bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-500 to-gold-500" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-industrial-50 dark:border-industrial-850">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-industrial-800 dark:text-white">
                  SMRITI CONTINUOUS ENGINE
                </span>
              </div>
              <span className="text-[10px] font-mono font-medium text-industrial-450 dark:text-industrial-500">
                LATEST LEDGER EVENT
              </span>
            </div>

            {/* Loop rendering step lines */}
            <div className="space-y-4 relative">
              {/* Vertical dotted track line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-industrial-100 dark:border-industrial-850" />

              {heroWorkflowSteps.map((step, idx) => {
                const isActive = activeWorkflowStep === idx;
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 transition-all duration-300 ${
                      isActive ? "opacity-100 scale-[1.02]" : "opacity-40 scale-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 z-10 transition-colors ${
                        isActive
                          ? step.color
                          : "border-industrial-100 dark:border-industrial-850 text-industrial-400 bg-white dark:bg-[#0c0e11]"
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h4 className="text-xs font-bold font-display text-industrial-900 dark:text-white">
                        {step.label}
                      </h4>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[11px] text-industrial-500 dark:text-industrial-400 mt-1 leading-relaxed"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST SECTION --- */}
      <section className="py-16 bg-white dark:bg-industrial-950/20 border-y border-industrial-100 dark:border-industrial-850/60 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <div className="p-6 bg-slate-50 dark:bg-industrial-900/40 border border-industrial-100 dark:border-industrial-850 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-brand-500 dark:text-brand-400">
                500+
              </span>
              <div className="mt-4">
                <h4 className="text-xs font-bold font-mono tracking-wider text-industrial-400 uppercase">
                  Manufacturing MSMEs
                </h4>
                <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-1 leading-relaxed">
                  Targeted plant integrations designed specifically for small-to-medium shop floor sizes.
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 bg-slate-50 dark:bg-industrial-900/40 border border-industrial-100 dark:border-industrial-850 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-gold-500 dark:text-gold-400">
                90%
              </span>
              <div className="mt-4">
                <h4 className="text-xs font-bold font-mono tracking-wider text-industrial-400 uppercase">
                  Investigation Reduction
                </h4>
                <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-1 leading-relaxed">
                  Prototype goal to eliminate repeated investigations on similar machinery faults.
                </p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 bg-slate-50 dark:bg-industrial-900/40 border border-industrial-100 dark:border-industrial-850 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-500">
                Continuous
              </span>
              <div className="mt-4">
                <h4 className="text-xs font-bold font-mono tracking-wider text-industrial-400 uppercase">
                  Learning After Every Incident
                </h4>
                <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-1 leading-relaxed">
                  Every solved problem updates the central organizational memory bank in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROBLEM SECTION --- */}
      <section id="about" className="py-24 max-w-[1400px] mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="error" className="mb-4">
            THE MSME KNOWLEDGE GAP
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-industrial-900 dark:text-white">
            Manufacturing Knowledge Should Never Be Lost.
          </h2>
          <p className="text-xs sm:text-sm text-industrial-500 dark:text-industrial-450 mt-3 leading-relaxed">
            Unstructured logs, worker transitions, and disjointed safety checklists lead to repeated errors, extended machinery downtime, and wasted operations engineering resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-800 rounded-2xl shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-950/40 transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Machine Breakdowns
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Sensory deviations and critical temperature peaks go unnoticed without automated pre-SOP calibration verification protocols.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-800 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-200 dark:hover:border-amber-950/40 transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Repeated Investigations
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Operators spend shifts diagnosing identical motor faults because historical resolution data sits in static paper logs or scattered spreadsheets.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gold-200 dark:hover:border-gold-950/40 transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl bg-gold-50 dark:bg-gold-950/20 text-gold-550 dark:text-gold-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Knowledge Loss
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              When master engineers retire or switch plants, valuable specialized calibration settings disappear, creating immediate skills gaps.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-800 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-950/40 transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Production Downtime
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              A single uncalibrated alignment incident cascades across downstream stations, halting lines while manual audits occur.
            </p>
          </div>
        </div>
      </section>

      {/* --- HOW SMRITI WORKS --- */}
      <section id="workflow" className="py-24 bg-white dark:bg-[#090b0d] border-y border-industrial-100 dark:border-industrial-850/60 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="success" className="mb-4">
              INTERACTIVE PIPELINE
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-industrial-900 dark:text-white">
              The SMRITI Continuous Loop
            </h2>
            <p className="text-xs sm:text-sm text-industrial-500 dark:text-industrial-450 mt-3 leading-relaxed">
              Standardize, capture, diagnose, validate, and update. Watch how a single on-floor incident accelerates factory learning.
            </p>
          </div>

          {/* Horizontal Interactive Rails */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step triggers left side */}
            <div className="lg:col-span-5 space-y-3">
              {[
                {
                  id: 0,
                  num: "1",
                  title: "Incident Reported",
                  summary: "Sensor deviations are logged instantly using high-contrast operational touch interfaces.",
                },
                {
                  id: 1,
                  num: "2",
                  title: "Context Captured",
                  summary: "Ambient parameters, recent calibrations, pressure variables, and station ID are appended.",
                },
                {
                  id: 2,
                  num: "3",
                  title: "Previous Incidents Retrieved",
                  summary: "Semantic retrieval index searches thousands of active records to find similar lathe heat anomalies.",
                },
                {
                  id: 3,
                  num: "4",
                  title: "AI Root Cause Analysis",
                  summary: "Analytical reasoning traces error logs to identify seal failure probabilities.",
                },
                {
                  id: 4,
                  num: "5",
                  title: "Engineer Validation",
                  summary: "Plant supervisor checks recommendations on a streamlined dashboard to avoid machine damage.",
                },
                {
                  id: 5,
                  num: "6",
                  title: "Knowledge Updated",
                  summary: "Central database updates active calibration procedures and flags similar stations.",
                },
                {
                  id: 6,
                  num: "7",
                  title: "Factory Learns",
                  summary: "Other workstation tablet terminals synchronize immediately to prevent similar breakdowns.",
                },
              ].map((step) => {
                const isActive = activeInteractiveStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveInteractiveStep(step.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex gap-4 cursor-pointer ${
                      isActive
                        ? "bg-brand-50/20 dark:bg-brand-950/10 border-brand-200 dark:border-brand-900/40 shadow-sm"
                        : "bg-transparent border-transparent hover:bg-industrial-50/50 dark:hover:bg-industrial-900/30"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isActive
                        ? "bg-brand-500 text-white"
                        : "bg-industrial-100 dark:bg-industrial-800 text-industrial-500"
                    }`}>
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold font-display text-industrial-900 dark:text-white">
                        {step.title}
                      </h4>
                      {isActive && (
                        <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-1 leading-relaxed">
                          {step.summary}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated Live Terminal right side */}
            <div className="lg:col-span-7 bg-industrial-950 border border-industrial-800 rounded-2xl p-6 shadow-xl font-mono text-xs text-industrial-200 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
              <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-industrial-400 tracking-wider">
                    SMRITI_SIMULATOR_V1.15
                  </span>
                </div>
                <Badge variant="gold" className="text-[9px]">ACTIVE NODE RUNNING</Badge>
              </div>

              {/* Console log simulation based on active steps */}
              <div className="flex-1 py-6 space-y-4 overflow-y-auto max-h-[300px]">
                {activeInteractiveStep >= 0 && (
                  <p className="text-brand-400">
                    &gt; [SYSTEM] Initializing telemetry listener for Workstation CNC-3... [OK]
                  </p>
                )}
                {activeInteractiveStep >= 1 && (
                  <div className="space-y-1 pl-4 border-l-2 border-industrial-850">
                    <p className="text-industrial-400">
                      ID: CNC-302_MOTOR_HEAT
                    </p>
                    <p className="text-industrial-400">
                      DEV: MOTOR TEMPERATURE EXCEDED 84C LIMIT
                    </p>
                    <p className="text-industrial-400">
                      STATE: PRESSURE: 3.2 BAR // CURRENT DRAW: 14.5A
                    </p>
                  </div>
                )}
                {activeInteractiveStep >= 2 && (
                  <p className="text-sky-400">
                    &gt; [RETRIEVER] Scanning vectors. Found 1 similar historic log (SOP-CNC-302_REV2).
                  </p>
                )}
                {activeInteractiveStep >= 3 && (
                  <p className="text-amber-400">
                    &gt; [REASONER] AI analysis suspects worn gasket seals or axis counterweight torque. Confidence score: 89%.
                  </p>
                )}
                {activeInteractiveStep >= 4 && (
                  <p className="text-brand-400">
                    &gt; [VERIFICATION] Alert dispatched to Shift Supervisor Biyonal T. Validation confirmed.
                  </p>
                )}
                {activeInteractiveStep >= 5 && (
                  <p className="text-gold-400">
                    &gt; [K_BASE] Upgraded SOP-CNC-302 to Revision 5. Logged optic clean instructions.
                  </p>
                )}
                {activeInteractiveStep >= 6 && (
                  <div className="p-3 bg-brand-950/40 border border-brand-900/30 rounded-xl text-brand-400">
                    ✔ [SUCCESS] Factory learning model synchronized across all 14 terminals on the floor!
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-industrial-800 text-[10px] text-industrial-450 flex items-center justify-between">
                <span>SIMULATION ACTIVE</span>
                <span>STEP {activeInteractiveStep + 1} OF 7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 max-w-[1400px] mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="info" className="mb-4">
            PLATFORM CAPABILITIES
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-industrial-900 dark:text-white">
            Engineered For High-Fidelity Factory Learning.
          </h2>
          <p className="text-xs sm:text-sm text-industrial-500 dark:text-industrial-450 mt-3 leading-relaxed">
            SMRITI blends real-time shop floor captures with continuous engineering reviews to build operational memory that grows stronger with every shift.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Incident Capture
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Streamlined, high-contrast touch interfaces allowing workshop operators to log pressure spikes or motor heat peaks in under 30 seconds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Context Collection
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Automatic collection of machine variables, calibration logs, recent shift metrics, and raw current draw states to build perfect diagnostic files.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Knowledge Retrieval
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Vector index searching over thousands of active manufacturing files to locate past solutions, expert notes, and relevant gasket profiles instantly.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              AI Reasoning
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Diagnostic engines processing log discrepancies to pinpoint potential gasket wear, lubrication deficiencies, or axle micro-misalignments.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Human Validation
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Streamlined engineering sign-off flows that verify AI recommendations before any data changes or hardware procedures are finalized.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 bg-white dark:bg-[#0c0e11] border border-industrial-100 dark:border-industrial-800/80 rounded-2xl hover:shadow-md hover:border-brand-200 dark:hover:border-brand-900/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/20 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <RotateCw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-industrial-900 dark:text-white">
              Continuous Learning
            </h3>
            <p className="text-xs text-industrial-500 dark:text-industrial-400 mt-2 leading-relaxed">
              Automatic upgrading of target calibration SOPs. Learning scores update live to reflect improved factory outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE PREVIEW --- */}
      <section id="architecture" className="py-24 bg-white dark:bg-[#090b0d] border-y border-industrial-100 dark:border-industrial-850/60 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="mb-4">
              SYSTEM ARCHITECTURE
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-industrial-900 dark:text-white">
              The Smriti Block Diagram
            </h2>
            <p className="text-xs sm:text-sm text-industrial-500 dark:text-industrial-450 mt-3 leading-relaxed">
              SMRITI's pipeline maps operational logs from raw physical actions to permanent cognitive improvements.
            </p>
          </div>

          {/* Animated block diagram */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {[
              { id: "factory_user", name: "Factory User", desc: "Logs mechanical faults" },
              { id: "incident_capture", name: "Incident Capture", desc: "Builds structured records" },
              { id: "context_engine", name: "Context Engine", desc: "Pulls workstation states" },
              { id: "knowledge_engine", name: "Knowledge Engine", desc: "Indexes historical files" },
              { id: "ai_reasoning", name: "AI Reasoning", desc: "Traces failing components" },
              { id: "engineer_validation", name: "Engineer Validation", desc: "Confirms diagnostic fits" },
              { id: "knowledge_base", name: "Knowledge Base", desc: "Upgrades active SOP catalog" },
              { id: "continuous_learning", name: "Continuous Learning", desc: "Syncs tablet terminals" },
              { id: "smarter_factory", name: "Smarter Factory", desc: "Maintains peak performance" },
            ].map((block, idx) => (
              <div
                key={block.id}
                className="p-5 bg-slate-50 dark:bg-industrial-900/40 border border-industrial-100 dark:border-industrial-850 rounded-xl flex flex-col justify-between hover:border-brand-300 dark:hover:border-brand-900/50 hover:shadow-md transition-all duration-200 relative group"
              >
                {/* Visual connectors inside cards */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-850 flex items-center justify-center text-[10px] font-mono font-bold text-industrial-400">
                  {idx + 1}
                </div>
                <div className="pt-2">
                  <h4 className="text-xs font-bold font-display text-industrial-900 dark:text-white">
                    {block.name}
                  </h4>
                  <p className="text-[11px] text-industrial-500 dark:text-industrial-400 mt-1 leading-relaxed">
                    {block.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY SMRITI COMPASS COMPARISON --- */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="success" className="mb-4">
            COMPETITIVE COMPARISON
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-industrial-900 dark:text-white">
            Contrast the SMRITI Engine Difference
          </h2>
          <p className="text-xs sm:text-sm text-industrial-500 dark:text-industrial-450 mt-3 leading-relaxed">
            See how SMRITI fundamentally elevates standard manufacturing systems from passive log storage to active plant-wide tutors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Systems */}
          <div className="p-8 bg-white dark:bg-industrial-950/20 border border-industrial-100 dark:border-industrial-850 rounded-2xl relative">
            <h3 className="text-base font-bold font-display text-industrial-400 mb-6">
              Traditional Systems (Static & Disjointed)
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Store Data", desc: "Saves raw logs without linking related incidents together." },
                { label: "Static Records", desc: "Manual PDF checklists that workers rarely inspect." },
                { label: "Past Incidents Forgotten", desc: "No permanent recall. The same spindle fault requires diagnostics from scratch every month." },
                { label: "Manual Investigation", desc: "Extended downtime waiting for external technical support." },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start text-xs">
                  <span className="w-5 h-5 rounded-full bg-industrial-100 dark:bg-industrial-800 text-industrial-400 flex items-center justify-center shrink-0">
                    ✕
                  </span>
                  <div>
                    <h4 className="font-semibold text-industrial-700 dark:text-industrial-300">
                      {item.label}
                    </h4>
                    <p className="text-industrial-450 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* SMRITI */}
          <div className="p-8 bg-brand-50/10 dark:bg-brand-950/5 border border-brand-200 dark:border-brand-900/30 rounded-2xl relative">
            <div className="absolute top-4 right-4">
              <Badge variant="success">ADVANCED COGNITIVE</Badge>
            </div>
            <h3 className="text-base font-bold font-display text-brand-600 dark:text-brand-400 mb-6">
              SMRITI (Cognitive & Adaptive)
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Learns Continuously", desc: "Translates on-floor resolutions directly into cognitive organizational steps." },
                { label: "Captures Knowledge", desc: "Extracts expertise from specialists before they transition roles." },
                { label: "Finds Similar Incidents", desc: "Binds sensor alerts to historically successful torque and calibrating steps instantly." },
                { label: "Improves Every Recommendation", desc: "Confidence levels adjust dynamically through continuous supervisor validation loops." },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start text-xs">
                  <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-650 dark:text-brand-400 flex items-center justify-center shrink-0">
                    ✔
                  </span>
                  <div>
                    <h4 className="font-bold text-industrial-900 dark:text-white">
                      {item.label}
                    </h4>
                    <p className="text-industrial-500 dark:text-industrial-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section id="demo" className="py-24 max-w-[1400px] mx-auto px-6 relative">
        <div className="p-8 sm:p-12 md:p-16 bg-gradient-to-br from-industrial-900 to-industrial-950 border border-industrial-800 rounded-3xl relative overflow-hidden text-center shadow-xl">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <Badge variant="gold">INTERACTIVE PILOT PHASE</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Start Building Smarter Factories.
            </h2>
            <p className="text-xs sm:text-sm text-industrial-400 leading-relaxed max-w-xl mx-auto">
              Every solved operational problem becomes permanent organizational intelligence. Align your team, secure specialized knowledge, and eliminate expensive downtime.
            </p>
            <div className="pt-4">
              <button
                onClick={onEnterDemo || onEnterApp}
                className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl text-xs font-bold tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
              >
                <span>Open Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-[#07090b] border-t border-industrial-100 dark:border-industrial-850 py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo Brand Left */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <BrainCircuit className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-black font-display tracking-wider text-industrial-900 dark:text-white">
                SMRITI
              </span>
            </div>
            <p className="text-xs text-industrial-450 dark:text-industrial-500 max-w-sm leading-relaxed">
              Smart Manufacturing Reasoning & Intelligence Through Iterative Learning. Because Experience Should Never Be Forgotten.
            </p>
            <p className="text-[10px] font-mono text-industrial-400">
              © 2026 SMRITI SAAS CO. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Quick Links Right */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-industrial-400 dark:text-industrial-500">
                About
              </h5>
              <div className="flex flex-col gap-2 text-xs text-industrial-500 dark:text-industrial-400">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-brand-500 transition-colors text-left">Overview</button>
                <button onClick={() => scrollToSection("features")} className="hover:text-brand-500 transition-colors text-left">Capabilities</button>
                <button onClick={() => scrollToSection("workflow")} className="hover:text-brand-500 transition-colors text-left">Workflow Loop</button>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-industrial-400 dark:text-industrial-500">
                Documentation
              </h5>
              <div className="flex flex-col gap-2 text-xs text-industrial-500 dark:text-industrial-400">
                <button onClick={onEnterArchitecture} className="hover:text-brand-500 transition-colors text-left">System Architecture</button>
                <span className="cursor-not-allowed">Standard SOP Guide</span>
                <span className="cursor-not-allowed">Calibration API</span>
                <span className="cursor-not-allowed">Admin Setup</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-industrial-400 dark:text-industrial-500">
                Contact
              </h5>
              <div className="flex flex-col gap-2 text-xs text-industrial-500 dark:text-industrial-400 font-mono">
                <a href="mailto:support@smriti.io" className="hover:text-brand-500 transition-colors">support@smriti.io</a>
                <span className="text-industrial-400">MSME Support Portal</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-industrial-400 dark:text-industrial-500">
                GitHub
              </h5>
              <div className="flex flex-col gap-2 text-xs text-industrial-500 dark:text-industrial-400">
                <span className="cursor-not-allowed">Repository</span>
                <span className="cursor-not-allowed">Drizzle Schemas</span>
                <span className="cursor-not-allowed">React 19 Shell</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Simple custom inline SVG components to avoid layout discrepancies
const CameraIconCustom = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
