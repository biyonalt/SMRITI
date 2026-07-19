/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrainCircuit,
  Activity,
  Cpu,
  User,
  Zap,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Database,
  ThumbsUp,
  RotateCcw,
  Plus,
  Play,
  Pause,
  ChevronRight,
  ArrowUpRight,
  Workflow,
  History,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface MemoryPageProps {
  onBackToLanding: () => void;
  onEnterApp: () => void;
  onEnterKnowledge?: () => void;
  id?: string;
}

export const MemoryPage: React.FC<MemoryPageProps> = ({
  onBackToLanding,
  onEnterApp,
  onEnterKnowledge,
  id,
}) => {
  // Navigation & Interactive states
  const [activeNetworkNode, setActiveNetworkNode] = useState<string>("Brain");
  const [activeEvolutionStep, setActiveEvolutionStep] = useState<number>(0);
  const [isSimulatingLearning, setIsSimulatingLearning] = useState<boolean>(true);
  const [simulatedIncidentsCount, setSimulatedIncidentsCount] = useState<number>(482);
  const [learningIndex, setLearningIndex] = useState<number>(87);

  // Auto-simulation of knowledge compounding
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulatingLearning) {
      interval = setInterval(() => {
        // Subtle trigger loops to simulate incoming intelligence
        setActiveEvolutionStep((prev) => (prev + 1) % 7);
        if (Math.random() > 0.8) {
          setSimulatedIncidentsCount((c) => c + (Math.random() > 0.5 ? 1 : 0));
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isSimulatingLearning]);

  // Network node specifications for the interactive visualizer
  const networkNodes = [
    { id: "Brain", label: "SMRITI Core Brain", type: "core", x: 50, y: 50, desc: "SMRITI centralized vector database holding continuous neural embeddings of all physical procedures." },
    { id: "CNC-01", label: "CNC-01 Station", type: "machine", x: 15, y: 25, desc: "Monitored axis high-speed lathe station experiencing heat deviations." },
    { id: "Press-03", label: "Hydraulic Press 03", type: "machine", x: 80, y: 20, desc: "120-ton industrial hydraulic press with automated pressure monitoring." },
    { id: "SOP-302", label: "SOP-CNC-302 Protocol", type: "solution", x: 50, y: 15, desc: "Verified sleeve alignment and bearing torque calibration protocol." },
    { id: "Rahul", label: "Rahul Menon", type: "engineer", x: 20, y: 75, desc: "Level 3 CNC Lathe specialist on shift floor." },
    { id: "Anita", label: "Anita Deshmukh", type: "engineer", x: 82, y: 72, desc: "Senior hydraulic system validation lead." },
    { id: "Lubrication", label: "Mobilgrease 28 Catalyst", type: "component", x: 32, y: 45, desc: "Lubricant compound used to treat recurring overheating on Lathe spindles." },
    { id: "SealRing", label: "Viton Sealing Rings", type: "component", x: 68, y: 48, desc: "Polymerized Viton-E9 seals calibrated for continuous high-temperature presses." },
  ];

  const networkConnections = [
    { from: "CNC-01", to: "Brain" },
    { from: "Press-03", to: "Brain" },
    { from: "SOP-302", to: "Brain" },
    { from: "Rahul", to: "CNC-01" },
    { from: "Anita", to: "Press-03" },
    { from: "Lubrication", to: "CNC-01" },
    { from: "SealRing", to: "Press-03" },
    { from: "SOP-302", to: "Lubrication" },
  ];

  // Evolution workflow steps
  const evolutionTimeline = [
    { stage: "Original Incident", title: "CNC Overheating Logged", desc: "SMRITI records initial 92°C thermal spike, casing friction vibration offsets, and operator's descriptive voice file.", status: "completed" },
    { stage: "Engineer Validation", title: "Lessons Digitally Approved", desc: "Plant lead Biyonal T. reviews recommended bearing replacement actions and signs off the new preventive SOP.", status: "completed" },
    { stage: "Knowledge Stored", title: "Permanent Intelligence Embedding", desc: "The verified resolution is transformed into high-dimensional vectors and saved securely in SMRITI database.", status: "completed" },
    { stage: "Second Similar Incident", title: "Friction Detected on Lathe-02", desc: "Four months later, a parallel thermal drift registers on a separate milling department station.", status: "completed" },
    { stage: "Recommendation Generated", title: "Automatic SOP Match", desc: "SMRITI instantly identifies CNC-01 history logs and maps the proven lubricant instructions to the operator's tablet.", status: "active" },
    { stage: "Faster Resolution", title: "Saved 2 Hours Downtime", desc: "The diagnostic is executed in 14 minutes, completely averting prolonged root cause investigation cycles.", status: "pending" },
    { stage: "Smarter Factory Tomorrow", title: "Learning Feedback Completed", desc: "Continuous feedback updates success confidence from 78% to 91% automatically.", status: "pending" },
  ];

  // Milestones timeline
  const milestones = [
    { month: "January", title: "First Knowledge Entry", desc: "SMRITI engine deployed across assembly line stations.", index: "Score: 61" },
    { month: "February", title: "50 Incidents Learned", desc: "Critical sensor drift logs compiled without human keying.", index: "Score: 68" },
    { month: "March", title: "Recommendation Accuracy: 80%", desc: "Autonomous matching validation rate reaches 80% successfully.", index: "Score: 74" },
    { month: "April", title: "Knowledge Graph Integration", desc: "Cross-department structural mappings are visualised in real-time.", index: "Score: 81" },
    { month: "May", title: "100 Successful Recommendation Reuses", desc: "Saved over ₹1,80,000 in redundant physical evaluations.", index: "Score: 84" },
    { month: "June", title: "Factory Learning Index reaches 87", desc: "Verified knowledge reuse index reaches record high safety metrics.", index: "Score: 87" },
  ];

  const activeNodeData = networkNodes.find((n) => n.id === activeNetworkNode) || networkNodes[0];

  return (
    <div
      id={id || "smriti-factory-memory-page"}
      className="min-h-screen bg-[#07090b] text-industrial-100 font-sans selection:bg-brand-500 selection:text-white flex flex-col relative overflow-x-hidden"
    >
      {/* Background Grid Pattern & Radial Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* --- MEMORY NAVBAR --- */}
      <header className="border-b border-industrial-850 px-6 py-4 flex items-center justify-between bg-[#07090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToLanding}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-emerald-600 flex items-center justify-center text-white">
            <BrainCircuit className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black tracking-widest leading-none block text-white">SMRITI</span>
            <span className="text-[7px] font-mono tracking-widest text-emerald-400 font-bold uppercase block mt-0.5">
              ORGANIZATIONAL INTEL
            </span>
          </div>
        </div>

        {/* Dynamic header items */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 bg-[#0c0f12] px-3 py-1.5 rounded-xl border border-industrial-850">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] font-mono text-industrial-300 font-bold tracking-wider uppercase">
              Factory Learning Network Connected
            </span>
          </div>

          <button
            onClick={onEnterKnowledge}
            className="px-4 py-2 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Explore Knowledge Base
          </button>
          
          <button
            onClick={onEnterApp}
            className="px-4 py-2 bg-industrial-900 hover:bg-industrial-850 border border-industrial-800 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
          >
            <span>Open Shell</span>
          </button>
        </div>
      </header>

      {/* --- HERO HEADER / CIRCULAR INDICATOR SECTION --- */}
      <section className="px-6 py-8 border-b border-industrial-850/60 bg-[#090c0f]/40">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          
          <div className="xl:col-span-8 space-y-3">
            <Badge variant="gold" className="text-[9px] tracking-widest">CONTINUOUS COGNITIVE GROWTH</Badge>
            <h1 className="text-3xl md:text-4xl font-black text-white font-display tracking-tight leading-tight">
              Factory Memory Network
            </h1>
            <p className="text-xs md:text-sm text-industrial-400 leading-relaxed max-w-2xl">
              Every solved operational bottleneck feeds back into SMRITI's dynamic knowledge graph. Instead of paying twice to learn the same lesson, your factory compounds intelligence automatically over time.
            </p>
          </div>

          {/* Animated Learning Index Circular Indicator */}
          <div className="xl:col-span-4 flex items-center justify-center xl:justify-end">
            <div className="bg-[#0b0e12]/60 border border-industrial-850 p-5 rounded-2xl flex items-center gap-5 relative overflow-hidden group hover:border-brand-500/30 transition-all max-w-sm w-full">
              {/* Radial background pulse */}
              <div className="absolute inset-0 bg-brand-500/[0.01] group-hover:bg-brand-500/[0.02] transition-colors" />

              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                {/* SVG Circle indicator */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-industrial-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-brand-500"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * learningIndex) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black font-display text-white">{learningIndex}</span>
                  <span className="text-[7px] text-industrial-500 font-mono">INDEX</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">
                  FACTORY LEARNING INDEX
                </span>
                <h4 className="text-xs font-bold text-white font-display">
                  Continuous Memory Health
                </h4>
                <p className="text-[10px] text-industrial-450 leading-relaxed">
                  Your shopfloor operations have successfully achieved <strong>91% prediction confidence</strong> metrics.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CORE VISUALIZATION: FACTORY BRAIN & GLOWING NETWORK GRAPH --- */}
      <section className="px-6 py-10 border-b border-industrial-850/40">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Graph Box (7 Cols) */}
          <div className="lg:col-span-8 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
            
            <div className="flex items-center justify-between pb-3 border-b border-industrial-850 mb-6">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-brand-400" />
                <span className="font-mono text-[10px] text-industrial-300 font-bold uppercase tracking-wider">
                  ACTIVE INTELLIGENCE NEURAL COUPLINGS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSimulatingLearning(!isSimulatingLearning)}
                  className="p-1 bg-industrial-900 border border-industrial-800 text-industrial-400 hover:text-white rounded transition-colors text-[9px] font-mono px-2"
                >
                  {isSimulatingLearning ? "PAUSE LIVE PATHS" : "RESUME LIVE PATHS"}
                </button>
                <Badge variant="success">GRAPH EXPANDING</Badge>
              </div>
            </div>

            {/* Interactive SVG Graph Area */}
            <div className="h-[400px] bg-[#07090b] rounded-xl border border-industrial-850 relative overflow-hidden flex items-center justify-center">
              
              {/* Connected svg pathways */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {networkConnections.map((conn, idx) => {
                  const sourceNode = networkNodes.find((n) => n.id === conn.from);
                  const targetNode = networkNodes.find((n) => n.id === conn.to);
                  if (!sourceNode || !targetNode) return null;

                  const isLinkedToActive = conn.from === activeNetworkNode || conn.to === activeNetworkNode;

                  return (
                    <g key={idx}>
                      {/* Base connection line */}
                      <line
                        x1={`${sourceNode.x}%`}
                        y1={`${sourceNode.y}%`}
                        x2={`${targetNode.x}%`}
                        y2={`${targetNode.y}%`}
                        className={`transition-all duration-300 ${
                          isLinkedToActive
                            ? "stroke-brand-500 stroke-[2.5]"
                            : "stroke-industrial-800 stroke-[1]"
                        }`}
                      />
                      {/* Animated traveling signal particle */}
                      {isSimulatingLearning && (
                        <circle r="3.5" className="fill-brand-400">
                          <animateMotion
                            dur={`${3 + Math.random() * 2}s`}
                            repeatCount="indefinite"
                            path={`M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`}
                            keyPoints="0;1"
                            keyTimes="0;1"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Graphical Nodes */}
              {networkNodes.map((node) => {
                const isActive = node.id === activeNetworkNode;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNetworkNode(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group outline-none"
                  >
                    {/* Outer animated halo ring */}
                    <span
                      className={`absolute inset-0 rounded-full blur-[6px] transition-all duration-300 ${
                        isActive
                          ? "bg-brand-500/50 scale-150 animate-ping"
                          : "bg-industrial-700/0 group-hover:bg-brand-500/20 scale-125"
                      }`}
                      style={{ width: "24px", height: "24px" }}
                    />

                    {/* Central Interactive Node button */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 relative border ${
                        isActive
                          ? "bg-brand-500 border-white text-white shadow-lg scale-110"
                          : node.type === "core"
                          ? "bg-purple-950/40 border-purple-500 text-purple-400"
                          : node.type === "machine"
                          ? "bg-red-950/40 border-red-500 text-red-400"
                          : node.type === "solution"
                          ? "bg-emerald-950/40 border-emerald-500 text-emerald-400"
                          : "bg-industrial-900 border-industrial-700 text-industrial-400"
                      }`}
                    >
                      <BrainCircuit className="w-3.5 h-3.5" />
                    </div>

                    {/* Inline small indicator hover tooltip */}
                    <span className="absolute left-1/2 -translate-x-1/2 top-7 whitespace-nowrap bg-[#0b0e12]/95 border border-industrial-800 text-[9px] font-mono font-bold py-0.5 px-1.5 rounded text-white shadow-lg pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                      {node.label}
                    </span>
                  </button>
                );
              })}

              {/* Watermark in graph background */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-industrial-600">
                SMRITI NEURAL MAP v2.9 // CLICK NODES TO INSPECT CONNECTIVITY
              </div>
            </div>
          </div>

          {/* Node Inspector Details Box (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0c0e11] border border-industrial-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-850">
              <span className="text-[10px] font-mono text-industrial-400 uppercase font-bold">
                COGNITIVE MAP INSPECTOR
              </span>
              <Badge variant="gold">LIVE RELATION</Badge>
            </div>

            {/* Inspector content */}
            <div className="space-y-4">
              <div className="p-4 bg-industrial-950/50 border border-industrial-850 rounded-xl space-y-2">
                <span className="text-[9px] font-mono text-brand-400 uppercase block font-bold">
                  {activeNodeData.type} RELATIONSHIP VALUE
                </span>
                <h3 className="text-sm font-bold text-white font-display">
                  {activeNodeData.label}
                </h3>
                <p className="text-xs text-industrial-400 leading-relaxed">
                  {activeNodeData.desc}
                </p>
              </div>

              {/* Relationship connections mapping list */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-industrial-500 uppercase font-bold block mb-1">
                  DIRECT CONNECTIONS (RELATIONAL COUPLINGS):
                </span>
                {networkConnections
                  .filter((c) => c.from === activeNetworkNode || c.to === activeNetworkNode)
                  .map((conn, idx) => {
                    const linkedId = conn.from === activeNetworkNode ? conn.to : conn.from;
                    const linkedNode = networkNodes.find((n) => n.id === linkedId);
                    if (!linkedNode) return null;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveNetworkNode(linkedNode.id)}
                        className="p-2.5 bg-[#07090b] border border-industrial-850 hover:border-brand-500/40 rounded-lg flex items-center justify-between text-xs cursor-pointer group transition-all"
                      >
                        <span className="text-industrial-300 font-semibold group-hover:text-brand-400 transition-colors">
                          {linkedNode.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-mono text-industrial-500 uppercase">
                            {linkedNode.type}
                          </span>
                          <ChevronRight className="w-3 h-3 text-industrial-500" />
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="pt-4 border-t border-industrial-850 text-center">
                <button
                  onClick={onEnterKnowledge}
                  className="text-xs font-bold text-brand-400 hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Query complete index vector logs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- TIMELINE: KNOWLEDGE EVOLUTION CHRONOLOGY --- */}
      <section className="px-6 py-10 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1500px] mx-auto space-y-8">
          <div className="space-y-1">
            <Badge variant="info" className="text-[9px] tracking-widest">CONTINUOUS EVOLUTION LOG</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              Chronological Intelligence Compounding
            </h2>
            <p className="text-xs text-industrial-400 max-w-2xl">
              Chronicle showing how a single incident of spindle thermal drift evolves continuously from floor captures, validations, and storage into self-improving operational decisions.
            </p>
          </div>

          {/* Animated Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative">
            
            {evolutionTimeline.map((step, idx) => {
              const isActive = idx === activeEvolutionStep;
              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveEvolutionStep(idx)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between h-[155px] ${
                    isActive
                      ? "bg-brand-950/20 border-brand-500/50 shadow-md shadow-brand-500/5"
                      : "bg-[#0b0e12]/60 border-industrial-850 hover:border-industrial-700"
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-industrial-500 font-bold uppercase block">
                      STAGED EVENT {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white font-display group-hover:text-brand-400 transition-colors">
                      {step.stage}
                    </h4>
                    <p className="text-[10px] text-industrial-450 leading-relaxed line-clamp-3">
                      {step.desc}
                    </p>
                  </div>

                  {/* Active highlight indicators */}
                  {isActive && (
                    <motion.div
                      layoutId="active-evolution-glow"
                      className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-500 to-emerald-500"
                    />
                  )}
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* --- METRIC COUNTERS: ORGANIZATIONAL MEMORY SAVINGS --- */}
      <section className="px-6 py-10 border-b border-industrial-850/40">
        <div className="max-w-[1500px] mx-auto space-y-8">
          <div className="space-y-1">
            <Badge variant="gold">SAVINGS IMPACT SHEET</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              Financial Impact of Reusable Knowledge
            </h2>
            <p className="text-xs text-industrial-400 max-w-lg">
              SMRITI doesn't just reduce mean-time-to-repair; it mitigates redundant engineer diagnostic workloads directly.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { val: simulatedIncidentsCount, label: "Knowledge Created", desc: "Successfully mapped procedures" },
              { val: "921", label: "Lessons Learned", desc: "Automated insights parsed" },
              { val: "458", label: "Validated Solutions", desc: "Certified shopfloor guidelines" },
              { val: "72%", label: "Knowledge Reuse", desc: "Averaging 12-time recycle rate" },
              { val: "+18", label: "Learning Growth", desc: "Newly embedded this month" },
              { val: "91%", label: "Accuracy Score", desc: "Recommendation certainty" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0b0e12]/60 border border-industrial-850 p-4 rounded-xl flex flex-col justify-between">
                <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block">
                  {stat.label}
                </span>
                <div className="mt-4">
                  <span className="text-2xl font-black font-display text-brand-400">
                    {stat.val}
                  </span>
                  <p className="text-[10px] text-industrial-450 mt-1">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MIDDLE INTERACTIVE MODULES: SUCCESS STORIES & AI INSIGHTS --- */}
      <section className="px-6 py-10 bg-[#090c0f]/35 border-b border-industrial-850/40">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Success Story Cards (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <Badge variant="success">SUCCESS CASE REGISTERS</Badge>
              <h3 className="text-xl font-bold font-display text-white">
                Proven Knowledge Applications
              </h3>
              <p className="text-xs text-industrial-400">
                Validated stories of incidents resolved seamlessly using existing cognitive vectors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Motor Overheating", reuse: "12 times", saved: "18 investigation hours", desc: "Spindle casing friction matching." },
                { title: "Hydraulic Pressure Loss", reuse: "8 times", saved: "24 diagnostics hours", desc: "Cylinder ring rubber degradation." },
                { title: "Cooling Fan Failure", reuse: "15 times", saved: "12 diagnostics hours", desc: "Obstructed vent metal chip cleanings." },
                { title: "Bearing Wear", reuse: "22 times", saved: "34 investigation hours", desc: "SOP sleeve alignment application." },
              ].map((story, idx) => (
                <div key={idx} className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl space-y-3 hover:border-brand-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white font-display">{story.title}</h4>
                    <Badge variant="success">SOLVED</Badge>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-industrial-500">KNOWLEDGE REUSED:</span>
                      <span className="text-white font-bold">{story.reuse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-industrial-500">SAVED EFFORT:</span>
                      <span className="text-emerald-400 font-bold">{story.saved}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-industrial-450 italic mt-1 leading-snug border-t border-industrial-900 pt-1.5">
                    {story.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights & Department Learning Map (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <Badge variant="info">COGNITIVE SUMMARY</Badge>
              <h3 className="text-xl font-bold font-display text-white">
                Live AI Organizational Insights
              </h3>
              <p className="text-xs text-industrial-400">
                Active synthesis of shopfloor metadata highlights systemic anomalies on plant layouts.
              </p>
            </div>

            {/* AI Insights Panel */}
            <div className="p-5 bg-brand-950/10 border border-brand-500/20 rounded-2xl space-y-4">
              {[
                "Bearing-related incidents have reduced by 42% after implementing SMRITI automated preventive lubrication schedules.",
                "Average shopfloor investigation duration has decreased by 31.4% since deploying cross-department SOP references.",
                "Knowledge database reuse score continues to step up by 4% month over month with human supervisor signoffs.",
              ].map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs text-industrial-200 leading-relaxed font-mono">
                    {insight}
                  </p>
                </div>
              ))}
            </div>

            {/* Learning Map Visual Grid */}
            <div className="bg-[#0c0e11] border border-industrial-800 p-5 rounded-2xl space-y-3">
              <span className="text-[9px] font-mono text-industrial-500 uppercase font-bold block">
                DEPARTMENT SHRED LEARNING FEED
              </span>
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                {["Maintenance", "Production", "Quality", "Engineering"].map((dept, idx) => (
                  <div key={idx} className="p-2 bg-[#07090b] border border-industrial-850 rounded-lg text-center flex-1">
                    <span className="text-[10px] text-white block font-bold">{dept}</span>
                    <span className="text-[8px] text-emerald-400 mt-0.5 block">SYNCED OK</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- MILESTONES: FACTORY INTEL GROWTH HISTORY --- */}
      <section className="px-6 py-10 border-b border-industrial-850/40">
        <div className="max-w-[1500px] mx-auto space-y-8">
          <div className="space-y-1">
            <Badge variant="gold">ORGANIZATIONAL MILESTONES</Badge>
            <h2 className="text-xl md:text-2xl font-black text-white font-display">
              The Learning Journey Chronology
            </h2>
            <p className="text-xs text-industrial-400 max-w-xl">
              Chronological milestones tracking the compounding index score of SMRITI deployed throughout active shop floor stations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {milestones.map((ms, idx) => (
              <div key={idx} className="p-4 bg-[#0c0e11] border border-industrial-800 rounded-xl space-y-2 relative group hover:border-brand-500/40 transition-colors text-left">
                <div className="flex justify-between items-center">
                  <Badge variant="info" className="text-[8px] font-mono uppercase font-bold">
                    {ms.month}
                  </Badge>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{ms.index}</span>
                </div>
                <h4 className="text-xs font-bold text-white font-display mt-2">{ms.title}</h4>
                <p className="text-[10px] text-industrial-450 leading-relaxed">{ms.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CALLOUT / SIGNATURE DECLARATION --- */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-8 relative z-20">
        <div className="flex justify-center">
          <Badge variant="gold" className="text-[9px] tracking-widest px-3 py-1">SMRITI PARADIGM</Badge>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            Your Factory Never Forgets.
          </h2>
          <p className="text-xs md:text-sm text-industrial-400 leading-relaxed max-w-xl mx-auto">
            SMRITI ensures that every solved operational problem becomes permanent organizational intelligence, allowing future engineers to benefit from previous experience instead of repeating investigations.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={onEnterKnowledge}
            className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-extrabold tracking-widest shadow-lg shadow-brand-500/10 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>EXPLORE KNOWLEDGE BASE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 border-t border-industrial-900/60 max-w-xs mx-auto">
          <p className="text-[9px] font-mono text-industrial-500 tracking-wider">
            SMRITI // PRESERVING INTELLECTUAL CAPITAL OF MANUFACTURING MSMEs
          </p>
        </div>
      </section>

    </div>
  );
};
