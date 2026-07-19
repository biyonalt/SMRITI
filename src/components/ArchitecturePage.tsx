/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrainCircuit,
  Workflow,
  Cpu,
  Layers,
  Search,
  Database,
  Terminal,
  Activity,
  ArrowRight,
  Sparkles,
  Server,
  UserCheck,
  RotateCw,
  GitBranch,
  Settings,
  Flame,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Map,
  Volume2,
  FileImage,
  FileText,
  Clock,
  ShieldCheck,
  Network,
  ChevronRight,
  Sliders,
  ThumbsUp,
  XCircle,
  Zap,
} from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card, CardContent } from "./ui/Card";

interface ArchitecturePageProps {
  onBackToLanding: () => void;
  onEnterApp: () => void;
  onEnterKnowledge?: () => void;
  onEnterDemo?: () => void;
  id?: string;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({
  onBackToLanding,
  onEnterApp,
  onEnterKnowledge,
  onEnterDemo,
  id,
}) => {
  // Navigation & Simulation States
  const [activeSegment, setActiveSegment] = useState<string>("overall");
  const [activeReasoningStep, setActiveReasoningStep] = useState<number>(0);
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>("Machine");
  const [retrievalStatus, setRetrievalStatus] = useState<"idle" | "searching" | "found">("searching");
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);
  const [incidentInput, setIncidentInput] = useState<string>("");

  // Automated step sequences for Context, Retrieval, and Learning Loops
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLooping) {
      interval = setInterval(() => {
        setActiveLoopStep((prev) => (prev + 1) % 7);
        setActiveReasoningStep((prev) => (prev + 1) % 7);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLooping]);

  // Automated search loop simulation for Section 4
  useEffect(() => {
    const searchStages = ["searching", "found"];
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 2;
      setRetrievalStatus(searchStages[count] as any);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Section 1: Overall Architecture Nodes mapping
  const architectureNodes = [
    { id: "users", label: "Factory Users", desc: "Engineers, operators, and supervisors accessing mobile/tablet dashboards." },
    { id: "web_platform", label: "SMRITI Web Platform", desc: "React-Vite frontend serves unified interface with low latency." },
    { id: "capture_engine", label: "Incident Capture Engine", desc: "Ingests raw text, uploaded repair PDFs, or recorded speech voice memos." },
    { id: "context_layer", label: "Context Collection Layer", desc: "Auto-correlates shift roster, sensor temperatures, machine telemetry." },
    { id: "retrieval_engine", label: "Knowledge Retrieval", desc: "Executes dense vector similarity matches against saved resolution SOPs." },
    { id: "ai_reasoning", label: "AI Operational Reasoning", desc: "Analyzes systemic hazards and outputs clear root cause hypotheses." },
    { id: "engineer_val", label: "Engineer Validation", desc: "Supervisor validates, modifies, or signs off recommendation with digital sign-off." },
    { id: "learning_engine", label: "Learning Engine", desc: "Reinforces model parameters and compiles verified outcomes back to DB." },
    { id: "knowledge_graph", label: "Knowledge Graph", desc: "Maps structural nodes: Machine → Component → Root Cause → Resolution." },
    { id: "analytics_engine", label: "Analytics Engine", desc: "Parses cumulative training minutes and compliant action matrices." },
    { id: "improvement", label: "Continuous Improvement", desc: "Compounded intelligence that guarantees the plant never pays twice to learn the same lesson." },
  ];

  // Section 5: AI Operational Reasoning Details
  const reasoningSteps = [
    { title: "1. Raw Incident Input", desc: "Unstructured audio voice memo, machine error log, or supervisor text.", status: "Raw Audio / Log Ingest" },
    { title: "2. Context Understanding", desc: "Pulls shift roster, department metrics, active calibration states.", status: "Synthesizing Metadata" },
    { title: "3. Historical Comparison", desc: "Vector search queries previous incidents with high semantic alignment.", status: "Dense Vector Scoring" },
    { title: "4. Root Cause Analysis", desc: "Generative LLM compares telemetry discrepancies with proven repair guides.", status: "Failure Mapping" },
    { title: "5. Recommendation Generation", desc: "Synthesizes tailored SOP checklist for immediate engineer deployment.", status: "Checklist Synthesis" },
    { title: "6. Confidence Calculation", desc: "Outputs a metric scoring the contextual reliability of the resolution.", status: "Predictive Analytics" },
    { title: "7. AI Explainability", desc: "Supplies citations and source references back to the original logged incidents.", status: "Citation Matrix" },
  ];

  // Section 8: Ontology Knowledge Graph Nodes
  const graphNodes = [
    { id: "Machine", label: "Lathe CNC-01", type: "machine", linkText: "Spindle high heat logs", desc: "Stationed high-speed lathe unit." },
    { id: "Component", label: "Spindle Bearing", type: "component", linkText: "High friction friction coefficients", desc: "Stainless core bearing assemblies." },
    { id: "Problem", label: "Vibration Deviation", type: "problem", linkText: "Excessive axial play", desc: "Vibration spectrum out of limits." },
    { id: "RootCause", label: "Lubricant Burnout", type: "rootcause", linkText: "Thermal degradation", desc: "Standard grease thermal limits breached." },
    { id: "Solution", label: "Synthetic Grease SOP", type: "solution", linkText: "Mobilgrease Mobil-28", desc: "Verified temperature-stable replacement SOP." },
    { id: "Engineer", label: "Rahul Menon (L3)", type: "engineer", linkText: "Verified on July 14", desc: "Certified maintenance supervisor." },
    { id: "Outcome", label: "Downtime Prevented", type: "outcome", linkText: "Saved 4.5 operational hours", desc: "Averted catastrophic mechanical jam." },
    { id: "Lessons", label: "Seal Calibration Check", type: "lessons", linkText: "Revised daily inspection checklist", desc: "Added grease retention seal audits." },
    { id: "FutureRec", label: "Pre-emptive Matching", type: "future", linkText: "98% Confidence prediction score", desc: "Continuous prediction index for CNC-02." },
  ];

  // Section 10: Future Roadmap Steps
  const roadmapSteps = [
    { phase: "PHASE 1", title: "Interactive Prototype", status: "Active MVP", desc: "Mock visual dashboard, vector schemas, design token libraries, and verification workflows." },
    { phase: "PHASE 2", title: "Factory Pilot Deployment", status: "Q3 2026", desc: "On-site trial at localized CNC lathe workshop syncing 15 manual workstation stations." },
    { phase: "PHASE 3", title: "ERP & CMMS Integration", status: "Q4 2026", desc: "Automating live sync pipelines into ERP catalogs and Upkeep maintenance ledgers." },
    { phase: "PHASE 4", title: "Predictive AI Intelligence", status: "Q1 2027", desc: "Embedding pre-failure anomaly triggers into live SCADA vibration and thermal sensors." },
    { phase: "PHASE 5", title: "Multi-Factory Learning", status: "Q2 2027", desc: "Federated cross-plant knowledge graphs supporting decentralized operations safely." },
  ];

  const activeGraphNodeData = graphNodes.find((n) => n.id === selectedGraphNode) || graphNodes[0];

  return (
    <div
      id={id || "smriti-architecture-page"}
      className="min-h-screen bg-[#07090b] text-industrial-100 font-sans selection:bg-brand-500 selection:text-white flex flex-col relative overflow-x-hidden"
    >
      {/* Dynamic Grid Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-brand-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* --- PREMIUM STICKY HEADER --- */}
      <header className="border-b border-industrial-850 px-6 py-4 flex items-center justify-between bg-[#07090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToLanding}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-600 flex items-center justify-center text-white">
            <Server className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-xs font-black tracking-widest leading-none block text-white">SMRITI</span>
            <span className="text-[7px] font-mono tracking-widest text-brand-400 font-bold uppercase block mt-0.5">
              SYSTEM ARCHITECTURE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="gold" className="font-mono text-[9px] tracking-wider py-1">
            TECHNICAL DOCUMENTATION PORTAL
          </Badge>
          
          <button
            onClick={onEnterApp}
            className="px-4 py-2 bg-industrial-900 hover:bg-industrial-850 border border-industrial-800 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
          >
            <span>Open Sandbox</span>
          </button>
        </div>
      </header>

      {/* --- PAGE HERO HEADER --- */}
      <section className="px-6 py-12 border-b border-industrial-850/60 bg-[#090c0f]/40">
        <div className="max-w-[1400px] mx-auto text-center space-y-4">
          <Badge variant="info" className="text-[9px] tracking-widest px-3 py-1 uppercase">
            Internal Blueprint & Operational Ontologies
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight max-w-4xl mx-auto">
            SMRITI System Architecture
          </h1>
          <p className="text-xs md:text-sm text-industrial-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, interactive overview of the continuous operational learning loop that parses unstructured shopfloor incidents into permanent organizational intelligence.
          </p>
        </div>
      </section>

      {/* --- SECTION 1: OVERALL ARCHITECTURE --- */}
      <section className="px-6 py-12 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="gold">MODULE 01 / FULL DIAGRAM</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              End-to-End Operational Pipeline
            </h2>
            <p className="text-xs text-industrial-400 max-w-xl mx-auto">
              Follow how an incident travels through capture, context extraction, vector validation, graph mapping, and analytics feedback.
            </p>
          </div>

          {/* Interactive Flowchart Diagram */}
          <div className="bg-[#0b0e12]/60 border border-industrial-800 rounded-2xl p-6 relative">
            <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-11 gap-3 relative z-10">
              {architectureNodes.map((node, idx) => {
                const isSelected = activeSegment === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveSegment(node.id)}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col justify-between h-[150px] relative overflow-hidden group ${
                      isSelected
                        ? "bg-brand-950/20 border-brand-500 shadow-md shadow-brand-500/10"
                        : "bg-[#07090b]/80 border-industrial-850 hover:border-industrial-750"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-industrial-500 font-bold block uppercase">
                        STEP {idx + 1}
                      </span>
                      <h4 className="text-[11px] font-black font-display text-white group-hover:text-brand-400 transition-colors leading-tight">
                        {node.label}
                      </h4>
                    </div>

                    {/* Minimal Connecting Arrow in columns inside grid */}
                    {idx < architectureNodes.length - 1 && (
                      <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-20 text-industrial-600">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Micro status indicator */}
                    <div className="flex justify-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-brand-400 animate-pulse" : "bg-industrial-800"}`} />
                    </div>

                    {isSelected && (
                      <motion.div
                        layoutId="active-segment-glow"
                        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-500 to-cyan-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Node Details Box */}
            <AnimatePresence mode="wait">
              {activeSegment && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-industrial-950/80 border border-industrial-850 rounded-xl space-y-2 text-center max-w-2xl mx-auto"
                >
                  <span className="text-[9px] font-mono text-brand-400 uppercase font-bold tracking-wider">
                    MODULE DETAILS
                  </span>
                  <h3 className="text-sm font-bold text-white font-display">
                    {architectureNodes.find((n) => n.id === activeSegment)?.label}
                  </h3>
                  <p className="text-xs text-industrial-400 leading-relaxed">
                    {architectureNodes.find((n) => n.id === activeSegment)?.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: INCIDENT CAPTURE LAYER --- */}
      <section className="px-6 py-12 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="info">MODULE 02 / INPUT MULTI-MODAL CHANNELS</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              Flexible Multi-Modal Incident Ingestion
            </h2>
            <p className="text-xs text-industrial-400 max-w-xl mx-auto">
              SMRITI supports varied inputs from shopfloor operators, preventing administrative friction and encouraging real-time captures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { icon: Volume2, title: "Voice Memos", desc: "Speaks incident reports on the move; automatically transcribed by AI Speech-to-Text." },
              { icon: FileImage, title: "Image Upload", desc: "Captures machine damage or wear patterns for instant vision context checks." },
              { icon: FileText, title: "Manual Forms", desc: "Structured, minimal text inputs for high-legibility operator documentation." },
              { icon: Activity, title: "IoT Sensor logs", desc: "Collects continuous SCADA alerts, vibration drifts, and thermal threshold overrides." },
              { icon: Clock, title: "Maintenance Logs", desc: "Scans past physical paper files or supervisor shift summaries with OCR accuracy." },
              { icon: Server, title: "ERP Sync", desc: "Continuous connectivity with SAP or Oracle manufacturing workflows." },
              { icon: Sliders, title: "CMMS Pipeline", desc: "Automated work-order triggers matching active Fiix or Upkeep tickets." },
            ].map((channel, idx) => (
              <div key={idx} className="p-4 bg-[#0c0e11] border border-industrial-800 rounded-xl space-y-3 hover:border-brand-500/30 transition-all text-center">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto">
                  <channel.icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white font-display">{channel.title}</h4>
                <p className="text-[10px] text-industrial-450 leading-relaxed">{channel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CONTEXT ENGINE --- */}
      <section className="px-6 py-12 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4 text-left">
            <Badge variant="gold">MODULE 03 / METADATA ENRICHMENT</Badge>
            <h2 className="text-xl md:text-3xl font-black text-white font-display tracking-tight">
              SMRITI Automatic Context Engine
            </h2>
            <p className="text-xs md:text-sm text-industrial-400 leading-relaxed">
              Unstructured reports are immediately mapped to physical and organizational variables. SMRITI automatically queries shift registers, environmental temperature logs, and supplier maintenance records to form a holistic operational state.
            </p>
          </div>

          {/* Context Enrichment Animation Visual */}
          <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 relative overflow-hidden h-[300px] flex items-center justify-center">
            
            {/* Pulsing Central Hub */}
            <div className="w-24 h-24 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center animate-pulse z-20 relative">
              <BrainCircuit className="w-10 h-10 text-brand-400" />
              <div className="absolute inset-0 rounded-full bg-brand-500/5 animate-ping" />
            </div>

            {/* Orbiting contextual details */}
            {[
              { label: "Machine ID", x: "15%", y: "20%" },
              { label: "Operator Cert", x: "80%", y: "15%" },
              { label: "Dept Temperature", x: "12%", y: "75%" },
              { label: "Shift Roster", x: "85%", y: "70%" },
              { label: "Supplier Warranty", x: "48%", y: "12%" },
              { label: "Production Line ID", x: "50%", y: "85%" },
            ].map((node, idx) => (
              <motion.div
                key={idx}
                style={{ left: node.x, top: node.y }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3 + idx,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bg-industrial-950/90 border border-industrial-800 px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold text-white shadow-md flex items-center gap-1.5 z-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{node.label}</span>
              </motion.div>
            ))}

            {/* Glowing Flowing Connector Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="15%" y1="20%" x2="50%" y2="50%" className="stroke-brand-500/20 stroke-1 stroke-dasharray-[4]" />
              <line x1="80%" y1="15%" x2="50%" y2="50%" className="stroke-brand-500/20 stroke-1 stroke-dasharray-[4]" />
              <line x1="12%" y1="75%" x2="50%" y2="50%" className="stroke-brand-500/20 stroke-1 stroke-dasharray-[4]" />
              <line x1="85%" y1="70%" x2="50%" y2="50%" className="stroke-brand-500/20 stroke-1 stroke-dasharray-[4]" />
              <line x1="48%" y1="12%" x2="50%" y2="50%" className="stroke-brand-500/20 stroke-1 stroke-dasharray-[4]" />
              <line x1="50%" y1="85%" x2="50%" y2="50%" className="stroke-brand-500/20 stroke-1 stroke-dasharray-[4]" />
            </svg>

          </div>
        </div>
      </section>

      {/* --- SECTION 4: KNOWLEDGE RETRIEVAL --- */}
      <section className="px-6 py-12 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 relative overflow-hidden min-h-[250px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
              <span className="text-[9px] font-mono text-industrial-400 uppercase font-bold">
                KNOWLEDGE VECTOR MATCH PROCESSOR
              </span>
              <Badge variant={retrievalStatus === "searching" ? "warning" : "success"}>
                {retrievalStatus === "searching" ? "DENSE SCANNING" : "MATCH ACCORDED"}
              </Badge>
            </div>

            {/* Retrieval Status Stages */}
            <div className="space-y-3 py-6 max-w-md mx-auto w-full">
              {[
                { label: "Scanning Previous Incidents Embedding Vectors...", active: retrievalStatus === "searching" },
                { label: "Searching Historical Maintenance PDF logs...", active: retrievalStatus === "searching" },
                { label: "Correlating Lessons Learned Ontology nodes...", active: retrievalStatus === "searching" },
                { label: "Searching Similar High-Vibration Failures...", active: retrievalStatus === "searching" },
              ].map((stage, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${stage.active ? "border-brand-500 animate-spin text-brand-400" : "border-emerald-500 text-emerald-400"}`}>
                    {stage.active ? "✦" : "✓"}
                  </div>
                  <span className={`text-xs font-mono ${stage.active ? "text-brand-400" : "text-industrial-400"}`}>
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Match success banner */}
            <AnimatePresence mode="wait">
              {retrievalStatus === "found" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white font-display">
                      3 Similar Historical Incidents Found!
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">
                    Confidence: 91%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 space-y-4 text-left">
            <Badge variant="info">MODULE 04 / DENSE RETRIEVAL</Badge>
            <h2 className="text-xl md:text-3xl font-black text-white font-display tracking-tight">
              Dense Semantic Retrieval
            </h2>
            <p className="text-xs md:text-sm text-industrial-400 leading-relaxed">
              Instead of matching basic raw keywords, SMRITI maps the unstructured semantic meaning of operator reports into vector spaces, surfacing deep similarities across unrelated workstations.
            </p>
          </div>

        </div>
      </section>

      {/* --- SECTION 5: AI OPERATIONAL REASONING --- */}
      <section className="px-6 py-12 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="gold">MODULE 05 / COGNITIVE ANALYSIS</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              SMRITI Reasoning Pipeline
            </h2>
            <p className="text-xs text-industrial-400 max-w-xl mx-auto">
              How Gemini operationalizes contextual inputs into verifiable root cause analytics step-by-step.
            </p>
          </div>

          {/* Reasoning Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {reasoningSteps.map((step, idx) => {
              const isActive = idx === activeReasoningStep;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveReasoningStep(idx)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between h-[155px] ${
                    isActive
                      ? "bg-brand-950/20 border-brand-500/50 shadow-md shadow-brand-500/5"
                      : "bg-[#0b0e12]/60 border-industrial-850 hover:border-industrial-750"
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-industrial-500 font-bold block uppercase">
                      PIPELINE NODE 0{idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white font-display">
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-industrial-450 leading-relaxed line-clamp-3">
                      {step.desc}
                    </p>
                  </div>
                  <span className="text-[8px] font-mono text-brand-400 uppercase font-bold mt-2">
                    {step.status}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="active-reasoning-glow"
                      className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-500 to-cyan-500"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: HUMAN-IN-THE-LOOP VALIDATION --- */}
      <section className="px-6 py-12 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4 text-left">
            <Badge variant="gold">MODULE 06 / SUPERVISED LEARNING</Badge>
            <h2 className="text-xl md:text-3xl font-black text-white font-display tracking-tight">
              Human-in-the-Loop Validation
            </h2>
            <p className="text-xs md:text-sm text-industrial-400 leading-relaxed">
              No resolution goes live without expert approval. Maintenance leads validate or modify every generated SOP. Approved solutions build organizational memories, while rejected ideas refine vector matching algorithms.
            </p>
          </div>

          {/* Validation Process Card Flow */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Accept Resolution", icon: ThumbsUp, color: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-500/20", desc: "The recommendation resolves the fault. SOP is flagged as certified and indexed permanently." },
              { title: "Modify Checklist", icon: Sliders, color: "text-amber-400", bg: "bg-amber-950/20", border: "border-amber-500/20", desc: "Engineer modifies steps matching specific floor details. SMRITI relearns the calibration changes." },
              { title: "Reject Suggestion", icon: XCircle, color: "text-red-400", bg: "bg-red-950/20", border: "border-red-500/20", desc: "SOP is irrelevant for this failure. logged to avoid similar mismatch profiles in future vectors." },
            ].map((action, idx) => (
              <div key={idx} className={`p-5 bg-[#0c0e11] border rounded-xl hover:border-brand-500/30 transition-all space-y-4 flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className={`w-8 h-8 rounded-lg ${action.bg} ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-display">{action.title}</h4>
                  <p className="text-[10px] text-industrial-450 leading-relaxed">{action.desc}</p>
                </div>
                <div className="pt-2 border-t border-industrial-900">
                  <span className="text-[8px] font-mono text-industrial-500 font-bold uppercase">
                    SUPERVISOR CONTROL
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 7: CONTINUOUS LEARNING LOOP --- */}
      <section className="px-6 py-12 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 relative overflow-hidden h-[320px] flex items-center justify-center">
            
            {/* Infinite looping visual pathways */}
            <div className="absolute inset-0 bg-radial-gradient-white pointer-events-none" />

            <div className="relative w-48 h-48 rounded-full border border-dashed border-brand-500/20 flex items-center justify-center">
              {/* Loop node dots */}
              {[
                { label: "Incident", angle: 0 },
                { label: "SOP Rec", angle: 60 },
                { label: "Validation", angle: 120 },
                { label: "Outcome", angle: 180 },
                { label: "Saved Logs", angle: 240 },
                { label: "Graph Update", angle: 300 },
              ].map((dot, idx) => {
                const rad = (dot.angle * Math.PI) / 180;
                const x = 50 + 40 * Math.cos(rad);
                const y = 50 + 40 * Math.sin(rad);
                const isCurrent = idx === activeLoopStep % 6;
                return (
                  <div
                    key={idx}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isCurrent ? "bg-brand-500 border-white text-white scale-110" : "bg-[#07090b] border-industrial-700 text-industrial-500"}`}>
                      <span className="text-[7px] font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-[8px] font-mono text-industrial-400 mt-1 whitespace-nowrap bg-[#07090b] px-1 rounded">
                      {dot.label}
                    </span>
                  </div>
                );
              })}

              {/* Central text indicator */}
              <div className="text-center">
                <RotateCw className="w-6 h-6 text-brand-400 mx-auto animate-spin" />
                <span className="text-[8px] font-mono text-industrial-500 uppercase mt-1 block">
                  Continuous Loop
                </span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 space-y-4 text-left">
            <Badge variant="info">MODULE 07 / REINFORCEMENT FLYWHEEL</Badge>
            <h2 className="text-xl md:text-3xl font-black text-white font-display tracking-tight">
              Self-Improving Learning Loops
            </h2>
            <p className="text-xs md:text-sm text-industrial-400 leading-relaxed">
              Every approved resolution automatically increases the prediction confidence index score. As database size compounds, recommendation matching accuracy improves, guaranteeing faster shopfloor fixes month-on-month.
            </p>
          </div>

        </div>
      </section>

      {/* --- SECTION 8: INTERACTIVE KNOWLEDGE GRAPH --- */}
      <section className="px-6 py-12 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-850 mb-6">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-brand-400" />
                <span className="font-mono text-[9px] text-industrial-300 font-bold uppercase">
                  ONTOLOGICAL GRAPH EXPLORER
                </span>
              </div>
              <Badge variant="success">9 NODES MAPPED</Badge>
            </div>

            {/* Simulated Interactive Graph Schema mapping */}
            <div className="h-[300px] bg-[#07090b] rounded-xl border border-industrial-850 relative overflow-hidden flex flex-wrap gap-4 items-center justify-center p-4">
              {graphNodes.map((node) => {
                const isSelected = selectedGraphNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedGraphNode(node.id)}
                    className={`p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                      isSelected
                        ? "bg-brand-500 border-white text-white scale-105 shadow-lg shadow-brand-500/10"
                        : "bg-[#0c0e11] border-industrial-850 text-industrial-300 hover:border-industrial-700"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white animate-ping" : "bg-brand-500"}`} />
                    <span>{node.label}</span>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-3 text-[8px] font-mono text-industrial-600">
                CLICK NODES TO VIEW ONTOLOGY SCHEMA CONNECTIONS
              </div>
            </div>
          </div>

          {/* Ontological inspector */}
          <div className="lg:col-span-5 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <span className="text-[9px] font-mono text-brand-400 font-bold block uppercase">
              ONTOLOGY NODE METADATA
            </span>
            <h3 className="text-sm font-bold font-display text-white">
              {activeGraphNodeData.label} ({activeGraphNodeData.type.toUpperCase()})
            </h3>
            <p className="text-xs text-industrial-400 leading-relaxed">
              {activeGraphNodeData.desc}
            </p>

            <div className="pt-4 border-t border-industrial-900 space-y-2">
              <span className="text-[9px] font-mono text-industrial-500 uppercase font-bold">
                MAPPED PATHWAY:
              </span>
              <div className="p-2 bg-[#07090b] border border-industrial-850 rounded-lg flex items-center justify-between text-[11px] font-mono">
                <span className="text-brand-400 font-bold">{activeGraphNodeData.linkText}</span>
                <ChevronRight className="w-3.5 h-3.5 text-industrial-500" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 9: TECHNOLOGY STACK --- */}
      <section className="px-6 py-12 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="info">ARCHITECTURE TECH-STACK</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              The Engineering Foundation
            </h2>
            <p className="text-xs text-industrial-400 max-w-xl mx-auto">
              SMRITI is engineered on reliable, high-performance web frameworks and vector semantic indexing algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: "Frontend Framework", label: "React / Vite", tech: "TypeScript • TailwindCSS • shadcn/ui • Framer Motion", desc: "Renders smooth responsive layouts, sub-millisecond route shifts, and real-time interactive SVG canvas." },
              { title: "Backend Services", label: "FastAPI / Python", tech: "Asynchronous Pipelines • OpenAPI Spec", desc: "Handles low-latency JSON requests and integrates multi-modal audio/image preprocessing." },
              { title: "Database Layer", label: "PostgreSQL", tech: "Relational Tables • Indexing", desc: "Stores structured shift registers, supervisor logins, and certified shopfloor SOP matrices securely." },
              { title: "Intelligence Indexes", label: "Vector Embeddings", tech: "Neo4j Knowledge Graph • Dense Vectors", desc: "Executes cosine-similarity search patterns across high-dimensional incident embeddings." },
              { title: "Deployment Core", label: "Docker Containers", tech: "Cloud Run Container ingress • Cloud Storage", desc: "Ensures containerized deployment scaling and encrypted media file storage." },
            ].map((stack, idx) => (
              <div key={idx} className="p-5 bg-[#0b0e12]/60 border border-industrial-850 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-industrial-500 uppercase font-bold">
                    {stack.title}
                  </span>
                  <h4 className="text-sm font-bold text-white font-display">{stack.label}</h4>
                  <p className="text-[10px] text-brand-400 font-mono font-bold leading-tight">{stack.tech}</p>
                  <p className="text-[10px] text-industrial-450 leading-relaxed pt-2 border-t border-industrial-900">
                    {stack.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 10: ROADMAP TIMELINE --- */}
      <section className="px-6 py-12 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="gold">SYSTEM ROADMAP</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              Continuous Intelligence Progression
            </h2>
            <p className="text-xs text-industrial-400 max-w-xl mx-auto">
              Our continuous timeline of development stages scaling SMRITI from standalone prototype to federated multi-factory networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-[#0c0e11] border border-industrial-800 rounded-xl space-y-3 text-left hover:border-brand-500/30 transition-all">
                <div className="flex justify-between items-center">
                  <Badge variant="info" className="text-[8px] font-mono">
                    {step.phase}
                  </Badge>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{step.status}</span>
                </div>
                <h4 className="text-xs font-bold text-white font-display">{step.title}</h4>
                <p className="text-[10px] text-industrial-450 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CONVINCING CALLOUT SECTION --- */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-8 relative z-20">
        <div className="flex justify-center">
          <Badge variant="gold" className="text-[9px] tracking-widest px-3 py-1">SMRITI PARADIGM</Badge>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            Built for the Future of Manufacturing Intelligence.
          </h2>
          <p className="text-xs md:text-sm text-industrial-400 leading-relaxed max-w-xl mx-auto">
            SMRITI continuously transforms operational experience into organizational knowledge, enabling manufacturing MSMEs to learn faster, reduce repeated investigations and improve operational excellence.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={onEnterDemo || onEnterApp}
            className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-extrabold tracking-widest shadow-lg shadow-brand-500/10 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>EXPLORE INTERACTIVE DEMO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 border-t border-industrial-900/60 max-w-xs mx-auto">
          <p className="text-[9px] font-mono text-industrial-500 tracking-wider">
            SMRITI // BECAUSE EXPERIENCE SHOULD NEVER BE FORGOTTEN
          </p>
        </div>
      </section>

    </div>
  );
};
