/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Clock,
  User,
  Activity,
  Upload,
  Mic,
  Camera,
  CheckCircle,
  FileText,
  Search,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  Settings,
  ShieldAlert,
  Server,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface DemoPageProps {
  onBackToLanding: () => void;
  onEnterApp: () => void;
  id?: string;
}

export const DemoPage: React.FC<DemoPageProps> = ({ onBackToLanding, onEnterApp, id }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Step 2 specific states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcriptionIndex, setTranscriptionIndex] = useState<number>(0);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>("");

  // Step 7 validation state
  const [validationState, setValidationState] = useState<"pending" | "approved" | "modified" | "rejected">("pending");

  const totalSteps = 10; // 0 to 9, where 9 is the Final Screen

  // Auto-play interval timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 2; // Increments to transition every ~5 seconds
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  // Reset autoplay progress on step change
  useEffect(() => {
    setProgress(0);
  }, [currentStep]);

  // Voice note auto-transcriber effect for Step 2
  useEffect(() => {
    let textInterval: NodeJS.Timeout;
    const fullTranscript = "The spindle motor is overheating again. Temperature crossed ninety-two degrees. Excessive vibration detected.";
    if (isRecording) {
      textInterval = setInterval(() => {
        setTranscriptionIndex((prev) => {
          if (prev >= fullTranscript.length) {
            setIsRecording(false);
            clearInterval(textInterval);
            return fullTranscript.length;
          }
          return prev + 1.5;
        });
      }, 50);
    }
    return () => clearInterval(textInterval);
  }, [isRecording]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setProgress(0);
    setIsRecording(false);
    setTranscriptionIndex(0);
    setHasPhoto(false);
    setDescriptionText("");
    setValidationState("pending");
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Dynamic status bar details
  const getStepTitle = (stepNum: number) => {
    const titles = [
      "Title Screen",
      "Step 1: Problem Occurs",
      "Step 2: Incident Capture",
      "Step 3: Automatic Context Collection",
      "Step 4: Knowledge Retrieval",
      "Step 5: AI Operational Reasoning",
      "Step 6: Dynamic Recommendation",
      "Step 7: Engineer Validation",
      "Step 8: Repair Outcome",
      "Step 9: Continuous Learning & Memory",
    ];
    return titles[stepNum] || "";
  };

  return (
    <div
      id={id || "interactive-demo-root"}
      className="min-h-screen bg-[#07090b] text-industrial-50 font-sans selection:bg-brand-500 selection:text-white flex flex-col justify-between overflow-hidden relative"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- DEMO NAVBAR --- */}
      <nav className="border-b border-industrial-850 px-6 py-4 flex items-center justify-between bg-[#07090b]/90 backdrop-blur-md relative z-40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToLanding}>
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <BrainCircuit className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-widest leading-none">SMRITI</span>
            <span className="text-[7px] font-mono tracking-widest text-brand-400 font-bold uppercase mt-0.5">GUIDED WALKTHROUGH</span>
          </div>
        </div>

        {/* Center Progress Steps Tracker */}
        {currentStep > 0 && (
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-industrial-400">
            {Array.from({ length: totalSteps - 1 }).map((_, idx) => {
              const stepIdx = idx + 1;
              return (
                <div key={stepIdx} className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentStep(stepIdx)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center font-bold transition-all ${
                      currentStep === stepIdx
                        ? "bg-brand-500 text-white shadow-sm"
                        : currentStep > stepIdx
                        ? "bg-industrial-800 text-brand-400"
                        : "bg-industrial-900 hover:bg-industrial-800 text-industrial-500"
                    }`}
                  >
                    {stepIdx}
                  </button>
                  {stepIdx < totalSteps - 1 && <span className="text-industrial-700">/</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Right CTA / Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLanding}
            className="text-xs font-semibold text-industrial-400 hover:text-white px-3 py-1.5 transition-colors"
          >
            Back to Landing
          </button>
          <button
            onClick={onEnterApp}
            className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Open App</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* --- MAIN STEP CHANGER AREA (FULL SCREEN CANVAS) --- */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 py-10 relative z-10 w-full max-w-[1400px] mx-auto min-h-[550px]">
        <AnimatePresence mode="wait">
          {/* STEP 0: TITLE SCREEN */}
          {currentStep === 0 && (
            <motion.div
              key="step-0-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl space-y-8"
            >
              <div className="flex justify-center">
                <Badge variant="gold">INTERACTIVE FLUID DEMO</Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white leading-none">
                  Interactive Operational <br />
                  <span className="bg-gradient-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent">
                    Learning Workflow
                  </span>
                </h1>
                <p className="text-sm text-industrial-400 max-w-lg mx-auto leading-relaxed">
                  Experience how SMRITI converts everyday physical incidents into permanent organizational intelligence. No static spreadsheets, no empty logs. Watch the factory learn in real time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-extrabold tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>START GUIDED DEMO</span>
                  <Play className="w-4 h-4 fill-white" />
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(true);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-8 py-4 border border-industrial-800 bg-industrial-900/40 hover:bg-industrial-800 text-industrial-300 hover:text-white rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>AUTOPLAY EXPERIENCE</span>
                </button>
              </div>

              {/* Showcase SMRITI Difference tagline */}
              <div className="pt-8 border-t border-industrial-900/60 max-w-md mx-auto">
                <p className="text-[10px] font-mono tracking-wider text-industrial-500">
                  SMRITI: SMART MANUFACTURING REASONING & INTELLIGENCE THROUGH ITERATIVE LEARNING
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 1: PROBLEM OCCURS */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="error">01 / PRODUCTION DEVIATION</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  A High-Severity Machine Incident Occurs.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  During high-speed operations on CNC Lathe Station B, spindle temperature spikes beyond permissible calibration safety targets.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-mono">CRITICAL SAFETY SHUTDOWN TRIGGERED</span>
                  </div>
                  <p className="text-[11px] text-industrial-500 leading-relaxed">
                    SMRITI isolates the physical station block and opens an active incident file dynamically. Click Continue below to capture the floor details.
                  </p>
                </div>
              </div>

              {/* Animated CNC Terminal Box */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-red-950/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                {/* Simulated danger grid flashing red */}
                <div className="absolute inset-0 bg-red-500/[0.02] animate-pulse pointer-events-none" />
                <div className="flex items-center justify-between pb-3 border-b border-red-950/40 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500 animate-bounce" />
                    <span className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-widest">
                      STATION DEVIATION REPORT
                    </span>
                  </div>
                  <Badge variant="error" className="animate-pulse">CRITICAL OVERHEAT</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 bg-red-950/15 border border-red-900/20 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono">MACHINE ID</span>
                    <h4 className="text-sm font-bold font-display text-white mt-1">CNC-01 LATHE</h4>
                  </div>
                  <div className="p-3.5 bg-red-950/15 border border-red-900/20 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono">CURRENT STATUS</span>
                    <h4 className="text-sm font-bold font-display text-red-400 mt-1">92°C OVER LIMIT</h4>
                  </div>
                  <div className="p-3.5 bg-industrial-900/30 border border-industrial-850 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono">ASSIGNED OPERATOR</span>
                    <h4 className="text-sm font-bold font-display text-white mt-1">Rahul Menon</h4>
                  </div>
                  <div className="p-3.5 bg-industrial-900/30 border border-industrial-850 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono">INCIDENT TIMESTAMP</span>
                    <h4 className="text-sm font-bold font-display text-white mt-1">09:42 AM (CURRENT)</h4>
                  </div>
                </div>

                {/* Animated graphic of lathe spindle turning red */}
                <div className="h-28 bg-[#07090b] rounded-xl border border-red-950/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-red-500/10 to-transparent animate-pulse" />
                  {/* Rotating CNC Spindle Outline */}
                  <div className="relative flex items-center justify-center gap-6">
                    <div className="w-12 h-12 rounded-full border-4 border-dashed border-red-500/40 animate-spin flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500 animate-ping" />
                    </div>
                    <div className="text-left font-mono">
                      <p className="text-[11px] font-bold text-red-400">AXIS-A: 8450 RPM</p>
                      <p className="text-[9px] text-industrial-400 mt-0.5">VIBRATION: 4.8 G (LIMIT: 1.5G)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: INCIDENT CAPTURE */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="warning">02 / OPERATIONAL INCIDENT CAPTURE</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Operator Logs Live Floor Parameters.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  Instead of filling out tedious physical logs at shift's end, the operator quickly captures the incident parameters using a tablet with audio recordings and raw attachments.
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-brand-400 font-mono font-bold uppercase tracking-wider">
                    INTERACTIVE ACTIONS:
                  </p>
                  <p className="text-[11px] text-industrial-500">
                    Interact with the options on the right to simulate live capturing of the spindle damage state on the workstation tablet.
                  </p>
                </div>
              </div>

              {/* Operator Tablet Capture Simulation */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
                  <span className="font-mono text-[10px] text-industrial-400">OPERATOR INPUT PANEL</span>
                  <span className="text-[9px] font-mono text-amber-500 animate-pulse">RECORDING ACTIVE</span>
                </div>

                {/* 3 Input Attachments */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Photo attachment trigger */}
                  <button
                    onClick={() => setHasPhoto(true)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
                      hasPhoto
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                        : "bg-industrial-900/40 border-industrial-800 hover:border-industrial-700 text-industrial-400"
                    }`}
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[9px] font-bold uppercase font-mono tracking-wider">
                      {hasPhoto ? "THERMO CAPTURED" : "SNAP THERMO"}
                    </span>
                  </button>

                  {/* Voice Note transcription trigger */}
                  <button
                    onClick={() => {
                      setIsRecording(true);
                      setTranscriptionIndex(0);
                    }}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
                      isRecording
                        ? "bg-red-950/20 border-red-500/40 text-red-400 animate-pulse"
                        : transcriptionIndex > 0
                        ? "bg-brand-950/20 border-brand-500/40 text-brand-400"
                        : "bg-industrial-900/40 border-industrial-800 hover:border-industrial-700 text-industrial-400"
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                    <span className="text-[9px] font-bold uppercase font-mono tracking-wider">
                      {isRecording ? "RECORDING..." : transcriptionIndex > 0 ? "RE-RECORD NOTE" : "TAP VOICE NOTE"}
                    </span>
                  </button>

                  {/* Short description auto filler */}
                  <button
                    onClick={() => setDescriptionText("Excessive grinding sounds from Lathe B main spindle drive.")}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
                      descriptionText
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                        : "bg-industrial-900/40 border-industrial-800 hover:border-industrial-700 text-industrial-400"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span className="text-[9px] font-bold uppercase font-mono tracking-wider">
                      {descriptionText ? "TEXT LOGGED" : "ADD NOTE"}
                    </span>
                  </button>
                </div>

                {/* Simulated thermographic display preview */}
                {hasPhoto && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 bg-[#07090b] rounded-xl border border-emerald-950/40 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 flex items-center justify-center text-white font-black text-[10px] shrink-0 font-mono">
                      HOT
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400 font-mono uppercase">CNC-01_THERM_0942.PNG</p>
                      <p className="text-[9px] text-industrial-450 mt-0.5">Spindle bearing casing peak heat signature detected at 92.4°C.</p>
                    </div>
                  </motion.div>
                )}

                {/* Transcription typing logger */}
                {(isRecording || transcriptionIndex > 0) && (
                  <div className="p-3 bg-[#07090b] rounded-xl border border-industrial-850 text-[11px] font-mono space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] text-industrial-500 font-bold uppercase">
                      <span>VOICE TRANSCRIPTION</span>
                      <span className="text-brand-400">AUTO-TRANSCRIBING</span>
                    </div>
                    <p className="text-industrial-200 leading-relaxed italic">
                      "{ "The spindle motor is overheating again. Temperature crossed ninety-two degrees. Excessive vibration detected.".slice(0, Math.floor(transcriptionIndex)) }"
                      {isRecording && <span className="animate-pulse bg-brand-400 text-transparent ml-0.5">|</span>}
                    </p>
                  </div>
                )}

                {/* Short manual log preview */}
                {descriptionText && (
                  <div className="p-3 bg-industrial-900/30 rounded-xl border border-industrial-850 text-xs">
                    <span className="text-[9px] text-industrial-500 font-bold font-mono uppercase block mb-1">MANUAL NOTES</span>
                    <p className="text-industrial-300 font-mono text-[11px]">{descriptionText}</p>
                  </div>
                )}

                {/* Upload Status */}
                <div className="p-3.5 bg-brand-950/20 border border-brand-900/20 rounded-xl flex items-center justify-between text-brand-400 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-brand-400 animate-bounce" />
                    <span>Transmitting packet metadata...</span>
                  </div>
                  <span>92% ENCRYPTED</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: AUTOMATIC CONTEXT COLLECTION */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="info">03 / CONTEXT ENGINE COMPILATION</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Autonomous Context Aggregation.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  SMRITI avoids the human error of dry typing. The context collection engine instantly harvests external factory sensors, recent shift records, machine history parameters, and components.
                </p>
                <div className="p-4 bg-emerald-950/15 border border-emerald-900/20 rounded-2xl flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-400 font-mono tracking-wide leading-snug">
                    Context Successfully Collected
                  </span>
                </div>
              </div>

              {/* Grid block of compiled data parameters */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850 mb-6">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-400" />
                    <span className="font-mono text-[10px] text-industrial-300 font-bold uppercase tracking-widest">
                      HARVESTED PACKET LOG: #INC-3029
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">SYNCED OK</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parameter cards */}
                  {[
                    { label: "Target Station", val: "CNC-01 LATHE" },
                    { label: "Active Shift", val: "Morning Shift (06:00 - 14:00)" },
                    { label: "Operator Assigned", val: "Rahul Menon (Level 3 Lathe Spec)" },
                    { label: "Spindle Peak Heat", val: "92.4°C" },
                    { label: "Historical Repairs", val: "2 (Bearing replacement 6mo ago)" },
                    { label: "Last Maintenance Date", val: "12 days ago (Routine inspection)" },
                    { label: "Lathe Brand Supplier", val: "PrecisionTools India Ltd" },
                    { label: "Workshop Location", val: "Line B - Milling Dept" },
                  ].map((param, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3 bg-[#07090b] border border-industrial-850 rounded-xl"
                    >
                      <span className="text-[9px] text-industrial-500 font-mono block uppercase tracking-wider">
                        {param.label}
                      </span>
                      <h4 className="text-xs font-bold font-display text-white mt-1">
                        {param.val}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: KNOWLEDGE RETRIEVAL */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="gold">04 / KNOWLEDGE GRAPH RETRIEVAL</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Instantly Queries Factory Memory.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  SMRITI scans thousands of active calibration files, older physical checklists, and past engineering tickets to pull up semantic correlations to this spindle heat spike.
                </p>
                <div className="p-4 bg-brand-950/20 border border-brand-900/30 rounded-2xl">
                  <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-bold">
                    <Search className="w-4.5 h-4.5 text-brand-400 animate-spin" />
                    <span>3 Similar Incidents Found</span>
                  </div>
                </div>
              </div>

              {/* Historical search simulation */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-brand-400" />
                    <span className="font-mono text-[10px] text-industrial-400 uppercase font-bold">
                      COGNITIVE RECALL VECTORS
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-400">SEARCHING MEMORY...</span>
                </div>

                {/* Animated searching line */}
                <div className="h-1 w-full bg-industrial-850 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-brand-500 rounded-full animate-infinite-slide" />
                </div>

                {/* Historical results with connecting visual lines */}
                <div className="space-y-3 relative">
                  {[
                    { id: "#172", title: "Motor Overheating (CNC Lathe)", resolution: "Replace seal ring gasket & recalibrate axis.", confidence: "94% similarity" },
                    { id: "#231", title: "Bearing Wear (CNC-01)", resolution: "Tightened axle bolt, greased casing.", confidence: "89% similarity" },
                    { id: "#301", title: "Cooling Fan Failure", resolution: "Swapped damaged filter element.", confidence: "74% similarity" },
                  ].map((inc, index) => (
                    <motion.div
                      key={inc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl relative group hover:border-brand-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-brand-400 font-mono font-bold">Incident {inc.id}</span>
                        <Badge variant="success">RESOLVED</Badge>
                      </div>
                      <h4 className="text-xs font-bold text-white font-display">{inc.title}</h4>
                      <p className="text-[11px] text-industrial-400 mt-1">Resolution: {inc.resolution}</p>
                      <div className="mt-2 pt-1.5 border-t border-industrial-900/60 flex justify-between items-center text-[10px] text-industrial-500 font-mono">
                        <span>CONFIDENCE SCORE</span>
                        <span className="text-gold-400 font-bold">{inc.confidence}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: AI OPERATIONAL REASONING */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="success">05 / AI OPERATIONAL REASONING</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Translates Deviations to Root Causes.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  Instead of generic GPT answers, SMRITI leverages customized manufacturing logic models to synthesize history metrics and pinpoint physical root failures.
                </p>
                <div className="p-4 bg-[#0c0e11] border border-industrial-850 rounded-2xl">
                  <span className="text-[9px] text-industrial-500 font-mono uppercase block">SMRITI COGNITION SCORE</span>
                  <div className="text-2xl font-bold font-display text-white mt-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
                    <span>91% Certainty</span>
                  </div>
                </div>
              </div>

              {/* SMRITI AI Diagnostic Panel */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-brand-500/20 rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-500 to-emerald-500" />
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-brand-400" />
                    <span className="font-mono text-[10px] text-industrial-300 font-bold uppercase tracking-wider">
                      SMRITI AI CORE DIAGNOSTIC
                    </span>
                  </div>
                  <Badge variant="gold">ANALYSIS COMPLETE</Badge>
                </div>

                {/* Primary diagnostic result */}
                <div className="p-4 bg-brand-950/15 border border-brand-900/20 rounded-xl space-y-1">
                  <span className="text-[9px] text-brand-400 font-mono font-bold uppercase tracking-wider">
                    SUSPECTED ROOT CAUSE
                  </span>
                  <h3 className="text-sm font-bold text-white font-display leading-snug">
                    Bearing Wear due to Insufficient Lubrication (SOP-CNC-01)
                  </h3>
                  <p className="text-xs text-industrial-400 mt-1 leading-relaxed">
                    Excessive high-speed pressure has compromised the outer sleeve rings, leading to friction-induced temperature rise (currently 92.4°C).
                  </p>
                </div>

                {/* Checklist Supporting Evidence */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono text-industrial-500 uppercase font-bold block mb-1">
                    SUPPORTING COGNITIVE EVIDENCE:
                  </span>
                  {[
                    { label: "Temperature Pattern Match", desc: "Thermal spike corresponds exactly to bearing failure signature.", checked: true },
                    { label: "Historical Similarity", desc: "Matches Incident #231 (CNC-01 Lathe Motor Heat deviation).", checked: true },
                    { label: "Maintenance History", desc: "Lubrication cycle scheduled on CNC-01 was bypassed last Tuesday.", checked: true },
                    { label: "Vibration Pattern", desc: "Raw current Draw and 4.8 G vibrations match worn bearing sleeves.", checked: true },
                  ].map((evidence, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className="w-4 h-4 rounded-full bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h5 className="font-semibold text-industrial-200">{evidence.label}</h5>
                        <p className="text-[10px] text-industrial-450 mt-0.5">{evidence.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: DYNAMIC RECOMMENDATION */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="gold">06 / MITIGATION RECOMMENDATION</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Formulates Direct Corrective Actions.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  Instead of leaving operators to guess, SMRITI parses the exact diagnostic outcome and serves verified mitigation cards containing specific spare-part indices.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-industrial-900/40 border border-industrial-850 rounded-xl">
                    <span className="text-[9px] text-industrial-500 font-mono uppercase block">EST. DOWNTIME</span>
                    <span className="text-xs font-bold font-mono text-white mt-1 block">38 Minutes</span>
                  </div>
                  <div className="p-3 bg-industrial-900/40 border border-industrial-850 rounded-xl">
                    <span className="text-[9px] text-industrial-500 font-mono uppercase block">COST SAVED</span>
                    <span className="text-xs font-bold font-mono text-emerald-400 mt-1 block">₹12,500</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Cards Stack */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
                  <span className="font-mono text-[10px] text-industrial-400 uppercase font-bold">
                    RECOMMENDED ACTIONS CATALOG
                  </span>
                  <Badge variant="success">91% SUCCESS PROBABILITY</Badge>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Replace Bearing Rings", action: "Apply Part Model B-4029. Verify calibration sleeve fits safely.", duration: "25 min" },
                    { title: "Lubricate Spindle Core Casing", action: "Apply grade high-temp Mobilgrease 28 onto CNC lathe housing.", duration: "8 min" },
                    { title: "Inspect Cooling Fan Ventilation", action: "Verify exhaust slots are clear of dust build-up.", duration: "5 min" },
                  ].map((rec, idx) => (
                    <div key={idx} className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl hover:border-brand-500/40 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold text-white font-display">{rec.title}</h4>
                        <span className="text-[10px] font-mono text-industrial-500">{rec.duration}</span>
                      </div>
                      <p className="text-[11px] text-industrial-400 leading-relaxed">{rec.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 7: ENGINEER VALIDATION */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="warning">07 / SUPERVISOR VALIDATION</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  The Critical Human Validation Loop.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  SMRITI is never a pure black-box AI. It requires engineering sign-offs to confirm repairs. Click Accept on the supervisor console to approve the diagnostic.
                </p>
                {validationState !== "pending" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-950/15 border border-emerald-500/30 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-emerald-400 font-mono tracking-wide leading-snug">
                      Engineer Approved Recommendation
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Engineer validation interaction panel */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
                  <span className="font-mono text-[10px] text-industrial-400 uppercase font-bold">
                    PLANT SUPERVISOR PANEL
                  </span>
                  <span className="text-[9px] font-mono text-brand-400">PENDING AUDIT REVIEW</span>
                </div>

                <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white font-display">
                    <User className="w-4 h-4 text-brand-400" />
                    <span>Reviewer: Shift Lead Biyonal T.</span>
                  </div>
                  <p className="text-xs text-industrial-400 leading-relaxed">
                    Confirming recommended replacement of Part B-4029 bearing sleeves and torque realignment protocol SOP-CNC-01.
                  </p>
                </div>

                {/* Validation Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setValidationState("approved")}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      validationState === "approved"
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-industrial-900 border border-industrial-800 text-industrial-300 hover:text-white hover:border-industrial-700"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>ACCEPT</span>
                  </button>

                  <button
                    onClick={() => setValidationState("modified")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                      validationState === "modified"
                        ? "bg-amber-600 text-white border-transparent"
                        : "bg-industrial-900/40 border-industrial-800 text-industrial-400 hover:text-white"
                    }`}
                  >
                    MODIFY
                  </button>

                  <button
                    onClick={() => setValidationState("rejected")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                      validationState === "rejected"
                        ? "bg-red-600 text-white border-transparent"
                        : "bg-industrial-900/40 border-industrial-800 text-industrial-400 hover:text-white"
                    }`}
                  >
                    REJECT
                  </button>
                </div>

                {/* Visual feedback validation stamp */}
                {validationState === "approved" && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-[#07090b]/90 rounded-2xl flex flex-col justify-center items-center text-center p-6 space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-950/30 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 animate-pulse">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">RECOMMENDATION APPROVED</h4>
                      <p className="text-xs text-industrial-400 mt-0.5">SOP dispatched to on-floor technician table screens.</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(8)}
                      className="mt-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-[10px] font-bold uppercase font-mono tracking-wider"
                    >
                      CONTINUE TO OUTCOME
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 8: REPAIR OUTCOME */}
          {currentStep === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="success">08 / REPAIR COMPLETION</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Technician Executes Guided Repairs.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed">
                  Following approved diagnostic cards, the technician finishes axis alignment and core casing lubrication smoothly in record time.
                </p>
                <div className="p-4 bg-emerald-950/15 border border-emerald-900/20 rounded-2xl">
                  <span className="text-[9px] text-industrial-500 font-mono uppercase block">DOWNTIME AVOIDED</span>
                  <span className="text-2xl font-bold font-display text-emerald-400 mt-0.5">2 Hours</span>
                </div>
              </div>

              {/* Complete repair summary cards */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
                <div className="flex items-center justify-between pb-3 border-b border-industrial-850 mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-[10px] text-industrial-400 uppercase font-bold">
                      REPAIR LOG CONFIRMED
                    </span>
                  </div>
                  <Badge variant="success">STATION OPERATIONAL</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono block uppercase">REPAIR TIMELINE</span>
                    <h4 className="text-sm font-bold text-white font-display mt-1">36 Minutes</h4>
                    <p className="text-[10px] text-industrial-450 mt-0.5">Within estimated 38 min target.</p>
                  </div>

                  <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono block uppercase">CONFIRMED ROOT CAUSE</span>
                    <h4 className="text-sm font-bold text-white font-display mt-1">Bearing Wear</h4>
                    <p className="text-[10px] text-industrial-450 mt-0.5">Sleeve fatigue confirmed.</p>
                  </div>

                  <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono block uppercase">SPARE PARTS LOGGED</span>
                    <h4 className="text-sm font-bold text-white font-display mt-1">Part B-4029</h4>
                    <p className="text-[10px] text-industrial-450 mt-0.5">Spare inventory catalog updated.</p>
                  </div>

                  <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl">
                    <span className="text-[10px] text-industrial-500 font-mono block uppercase">STATION HEALTH INDEX</span>
                    <h4 className="text-sm font-bold text-emerald-400 font-display mt-1">98.5%</h4>
                    <p className="text-[10px] text-industrial-450 mt-0.5">Vibrations stabilized back to 1.1G.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 9: CONTINUOUS LEARNING */}
          {currentStep === 9 && (
            <motion.div
              key="step-9"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="gold">09 / THE CONTINUOUS LEARNING ENGINE</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Because Experience Should Never Be Forgotten.
                </h2>
                <p className="text-xs sm:text-sm text-industrial-450 leading-relaxed font-sans">
                  The SMRITI continuous operational ledger takes the validated repair logs and dynamically updates active standard operating files.
                </p>
                <div className="p-4 bg-brand-950/20 border border-brand-900/30 rounded-2xl">
                  <span className="text-xs text-brand-400 font-mono font-bold leading-normal block">
                    ✔ Central Knowledge Ledger Successfully Written & Backed Up
                  </span>
                </div>
              </div>

              {/* Glowing continuous learning updates simulation */}
              <div className="lg:col-span-7 bg-[#0c0e11] border border-brand-500/30 rounded-2xl p-6 shadow-2xl relative space-y-6 overflow-hidden">
                {/* Glowing neon element */}
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-brand-500/20 rounded-full blur-[40px] pointer-events-none" />

                <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-industrial-300 font-bold uppercase tracking-wider">
                      ORGANIZATIONAL INTEL UPDATE
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-400">LEDGER STATE SAVED</span>
                </div>

                <div className="space-y-4">
                  {/* Ledger Item 1 */}
                  <div className="p-4 bg-[#07090b] border border-brand-900/20 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-industrial-500 font-mono block">AI REASONING PRECISION</span>
                      <h4 className="text-sm font-bold text-white font-display mt-0.5">Recommendation Accuracy</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-industrial-500 line-through">78%</span>
                      <span className="text-xs font-mono font-bold text-brand-400 ml-2">➔ 91%</span>
                    </div>
                  </div>

                  {/* Ledger Item 2 */}
                  <div className="p-4 bg-[#07090b] border border-brand-900/20 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-industrial-500 font-mono block">KNOWLEDGE CATALOG SIZE</span>
                      <h4 className="text-sm font-bold text-white font-display mt-0.5">Active Knowledge Entries</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-industrial-500 line-through">481</span>
                      <span className="text-xs font-mono font-bold text-brand-400 ml-2">➔ 482</span>
                    </div>
                  </div>

                  {/* Ledger Item 3 */}
                  <div className="p-4 bg-[#07090b] border border-brand-900/20 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-industrial-500 font-mono block">FACTORY CAPABILITY SCORE</span>
                      <h4 className="text-sm font-bold text-white font-display mt-0.5">Factory Learning Index</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-industrial-500 line-through">86</span>
                      <span className="text-xs font-mono font-bold text-brand-400 ml-2">➔ 87</span>
                    </div>
                  </div>
                </div>

                {/* Micro learning log detail */}
                <div className="p-3 bg-brand-950/15 border border-brand-900/20 rounded-xl text-[10px] text-industrial-400 font-mono">
                  &gt; [SUCCESS] Index update finalized. Machine learning vector has permanently optimized calibration paths for the CNC-01 station.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- BOTTOM CONTROLS & TIMELINE INDICATOR BAR --- */}
      <footer className="border-t border-industrial-850 py-5 bg-[#07090b]/95 backdrop-blur-md relative z-40">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="p-2.5 rounded-xl border border-industrial-800 bg-industrial-900/40 hover:bg-industrial-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isPlaying
                  ? "bg-brand-600/20 border-brand-500/40 text-brand-400"
                  : "border-industrial-800 bg-industrial-900/40 hover:bg-industrial-800 hover:text-white"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-brand-400" /> : <Play className="w-4 h-4 fill-white" />}
              <span className="text-xs font-bold font-mono tracking-wider uppercase px-1">
                {isPlaying ? "PAUSE AUTOPLAY" : "AUTOPLAY"}
              </span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-industrial-800 bg-industrial-900/40 hover:bg-industrial-800 hover:text-white transition-colors cursor-pointer"
              title="Reset Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Center Title Indicator */}
          <div className="text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-industrial-400">
              {getStepTitle(currentStep)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-industrial-450 mr-2">
              {currentStep + 1} / {totalSteps}
            </span>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onEnterApp}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ENTER DASHBOARD</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic progress bar underneath */}
        {isPlaying && (
          <div className="h-1 bg-industrial-900 w-full mt-4 overflow-hidden">
            <div className="h-full bg-brand-500" style={{ width: `${progress}%` }} />
          </div>
        )}
      </footer>

      {/* --- STEP 10: FULL SCREEN COMPARISON FINAL OUTCOME OVERVIEW --- */}
      {currentStep === totalSteps - 1 && (
        <div className="absolute inset-0 bg-[#07090b] z-50 flex flex-col justify-between overflow-y-auto pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto space-y-12 w-full">
            {/* Header Title */}
            <div className="text-center space-y-4">
              <Badge variant="success">DEMO COMPLETION SUMMARY</Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                Your Factory Just Became Smarter.
              </h1>
              <p className="text-sm text-industrial-400 max-w-xl mx-auto leading-relaxed">
                Every validated operational incident permanently improves future decisions, cutting downtimes and securing expertise.
              </p>
            </div>

            {/* Loop Diagram */}
            <div className="p-6 bg-[#0c0e11] border border-industrial-850 rounded-2xl relative">
              <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
                {[
                  { name: "Problem Occurs", desc: "Heat deviation caught" },
                  { name: "Operator Log", desc: "Fast captures filed" },
                  { name: "Graph Recall", desc: "Queried plant files" },
                  { name: "AI Diagnostics", desc: "Formulated sleeves fits" },
                  { name: "Validation", desc: "Engineer confirmed SOP" },
                  { name: "Smarter Factory", desc: "Permanent memory update" },
                ].map((step, idx) => (
                  <div key={idx} className="p-3 bg-[#07090b] border border-industrial-850 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-brand-400 font-bold uppercase tracking-wider block">
                      {idx + 1}
                    </span>
                    <h5 className="text-[11px] font-bold text-white font-display">{step.name}</h5>
                    <p className="text-[9px] text-industrial-500 leading-normal">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Traditional vs SMRITI */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold font-mono tracking-widest text-industrial-400 uppercase text-center">
                What makes SMRITI different?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional */}
                <div className="p-6 bg-[#0c0e11] border border-industrial-850 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold font-mono text-industrial-500 uppercase">
                    Traditional Systems (CMMS/ERP/Checklists)
                  </h4>
                  <ul className="space-y-3.5 text-xs text-industrial-400">
                    <li className="flex gap-2.5 items-start">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Passive Storage: Store maintenance logs as dry documents workers rarely consult.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Records History: Documents what broke in past months without helping prevent it today.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Static Files: Sinks knowledge into spreadsheets and local drives with zero cross-linking.</span>
                    </li>
                  </ul>
                </div>

                {/* SMRITI */}
                <div className="p-6 bg-brand-950/10 border border-brand-900/30 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold font-mono text-brand-400 uppercase">
                    SMRITI Platform (Continuous Intelligence)
                  </h4>
                  <ul className="space-y-3.5 text-xs text-industrial-300">
                    <li className="flex gap-2.5 items-start">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className="text-white">Active Tutor: Learns dynamically from every single validated incident repair log.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className="text-white">Improves Future Decisions: Recommends precise parts and torques live on-floor.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className="text-white">Continuously Evolving Memory: Elevates overall machine training indexes with shift metrics.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={onEnterApp}
                className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-extrabold tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OPEN OPERATIONS DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-4 border border-industrial-800 bg-[#07090b] hover:bg-industrial-900 text-industrial-400 hover:text-white rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>REPLAY WALKTHROUGH</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
