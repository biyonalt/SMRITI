/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  BrainCircuit,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Database,
  ThumbsUp,
  Download,
  Plus,
  Compass,
  LayoutGrid,
  ChevronDown,
  X,
  Layers,
  Activity,
  FileText,
  Paperclip,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  UserCheck,
  Zap,
  Cpu,
  Share2,
  Calendar,
  Settings,
  History,
  Workflow,
  Eye,
  Minimize2,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";

// --- INTERFACES ---
interface IncidentKnowledge {
  id: string;
  code: string;
  title: string;
  machine: string;
  department: string;
  problemType: "Thermal" | "Mechanical" | "Electrical" | "Software" | "Calibration";
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Resolved" | "Pending Verification" | "Under Review";
  engineer: string;
  supplier: string;
  date: string;
  confidence: number;
  timesReused: number;
  savings: string;
  summary: string;
  symptoms: string[];
  rootCause: string;
  supportingEvidence: { label: string; desc: string }[];
  repairPerformed: string;
  outcome: {
    downtimeSaved: string;
    costSaved: string;
    resolutionTime: string;
  };
  lessonsLearned: string[];
  preventiveMeasures: string[];
  relatedMachines: string[];
  relatedComponents: string[];
  relatedIncidents: string[];
  documents: { name: string; type: string; size: string }[];
  versions: { version: string; date: string; confidence: number; note: string }[];
}

interface KnowledgeBasePageProps {
  onBackToLanding?: () => void;
  onEnterApp?: () => void;
  id?: string;
}

export const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({
  onBackToLanding,
  onEnterApp,
  id,
}) => {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<string | null>("inc-1"); // Default opened for instant showcase
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeGraphNode, setActiveGraphNode] = useState<string>("Lubrication");
  const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "evidence" | "evolution">("overview");

  // Filters state
  const [selectedMachine, setSelectedMachine] = useState<string>("All");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedProblemType, setSelectedProblemType] = useState<string>("All");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Mock Form State for "New Incident"
  const [newIncidentTitle, setNewIncidentTitle] = useState("");
  const [newIncidentMachine, setNewIncidentMachine] = useState("CNC-01");
  const [newIncidentType, setNewIncidentType] = useState<"Thermal" | "Mechanical" | "Electrical">("Thermal");
  const [newIncidentDesc, setNewIncidentDesc] = useState("");

  // --- RICH MOCK KNOWLEDGE BASE ---
  const [incidents, setIncidents] = useState<IncidentKnowledge[]>([
    {
      id: "inc-1",
      code: "INC-3029",
      title: "CNC Spindle Motor Thermal Runaway",
      machine: "CNC-01 Lathe",
      department: "Milling",
      problemType: "Thermal",
      severity: "High",
      status: "Resolved",
      engineer: "Rahul Menon",
      supplier: "PrecisionTools India Ltd",
      date: "2026-07-19",
      confidence: 91,
      timesReused: 12,
      savings: "₹84,000",
      summary: "High-speed spindle torque resistance triggered an immediate automatic safety block due to motor case thermal levels exceeding 92°C with 4.8 G casing vibrations.",
      symptoms: [
        "Spindle thermal readout crossed 92°C",
        "Axis micro-vibrations logged above 4.8 G safety threshold",
        "Abnormal high-pitch humming during lathe operation cycle"
      ],
      rootCause: "Sleeve Bearing Wear due to Insufficient Lubrication",
      supportingEvidence: [
        { label: "Thermal Pattern Match", desc: "Spindle temperature rise matches bearing seizure signature at 91.2% overlap." },
        { label: "Historical Simplicity", desc: "Matches patterns observed on CNC Lathe B incident #231." },
        { label: "Lubrication Bypass", desc: "Digital inspection registers bypass of routine Tuesday maintenance schedule." },
        { label: "Telemetry Waveform", desc: "Axis spindle currents showed high torque drag spikes before shutdown." }
      ],
      repairPerformed: "Disassembled spindle drive casing. Replaced seal rings & sleeve bearings with Part B-4029. Re-applied high-temp lubrication grease and aligned axis torque balance.",
      outcome: {
        downtimeSaved: "2 Hours",
        costSaved: "₹12,500",
        resolutionTime: "36 Minutes"
      },
      lessonsLearned: [
        "Always inspect spindle lubrication levels before diagnosing electrical motor drive parameters.",
        "Cooling air intake filters should be vacuumed weekly to prevent micro-metal chip obstruction.",
        "Temperature sensor calibration should be validated during monthly PM audits.",
        "Bearing sleeves require preemptive inspection or overhaul after approximately 400 continuous operating hours."
      ],
      preventiveMeasures: [
        "Added automatic grease injector routine on active operating cycle intervals.",
        "Updated SCADA limit warning trigger threshold from 95°C to 88°C for early notice.",
        "Initiated mandatory 5-minute pre-shift lubrication checklist for CNC Lathe operators."
      ],
      relatedMachines: ["CNC-01 Lathe", "CNC-02 Lathe", "Multi-Axis Station B"],
      relatedComponents: ["Spindle Motor Drive", "Bearing Sleeves B-4029", "Lubrication Valve"],
      relatedIncidents: ["INC-172: Motor High Temp", "INC-231: Bearing Wear Leak", "INC-301: Fan Failure"],
      documents: [
        { name: "CNC_Lathe_Thermal_Profile.pdf", type: "PDF Document", size: "2.4 MB" },
        { name: "SOP-CNC-302_Sleeve_Align.xlsx", type: "Excel Sheet", size: "1.1 MB" },
        { name: "Workstation_Thermal_Hotspot.png", type: "Image File", size: "4.8 MB" },
        { name: "Rahul_Operator_Voice_Note.mp3", type: "Audio Log", size: "820 KB" }
      ],
      versions: [
        { version: "v1.0", date: "2026-02-12", confidence: 64, note: "Initial capture from CNC Lathe B failure record. Lacked vibration validation." },
        { version: "v2.0", date: "2026-05-20", confidence: 79, note: "Updated after Incident #231. Validated lubrication delay signature." },
        { version: "v3.0", date: "2026-07-19", confidence: 91, note: "Current fully validated record. Validated with high-precision telemetry and engineer review." }
      ]
    },
    {
      id: "inc-2",
      code: "INC-2841",
      title: "Hydraulic Cylinder Seal Failure",
      machine: "Hydraulic Press-03",
      department: "Machining",
      problemType: "Mechanical",
      severity: "Critical",
      status: "Resolved",
      engineer: "Anita Deshmukh",
      supplier: "FluidDyne Hydralics",
      date: "2026-07-12",
      confidence: 88,
      timesReused: 8,
      savings: "₹42,000",
      summary: "Pressure degradation in the main press actuator cylinder resulted in plate alignment slippage during 120-ton stamping cycles.",
      symptoms: [
        "Actuator pressure drop below 140 bar threshold",
        "Visible micro-leakage of hydraulic oil around cylinder seal rings",
        "Stamping depth variation of +0.3mm outside target tolerance limit"
      ],
      rootCause: "Elastomer Seal Polymerization under continuous 180°C operation",
      supportingEvidence: [
        { label: "Leak Profile Match", desc: "Pressure drop pattern corresponds to micro-extrusion of elastomer rings." },
        { label: "Cycle Count Alert", desc: "Cylinder reached 22,000 presses without hydraulic seal change." }
      ],
      repairPerformed: "Purged hydraulic lines. Swapped out polymerized rings with heavy-duty nitrile rubber seals (Viton-E9). Re-pressurized cylinder and calibrated cycle pressure metrics.",
      outcome: {
        downtimeSaved: "4 Hours",
        costSaved: "₹18,000",
        resolutionTime: "52 Minutes"
      },
      lessonsLearned: [
        "Standard nitrile seals degrade rapidly if process temperature rises above 150°C during heavy continuous stamping.",
        "Always use viton core seals for stamps holding temperatures above normal margins."
      ],
      preventiveMeasures: [
        "Upgraded default stamping seal specification to viton core in local component register.",
        "Installed secondary cooling ring around cylinder housing."
      ],
      relatedMachines: ["Hydraulic Press-03", "Stamping Station 1"],
      relatedComponents: ["Piston Seals", "Pressure Regulator Valve", "Hydraulic Actuator Cylinders"],
      relatedIncidents: ["INC-104: Pressure Drift", "INC-218: Actuator Seal Tear"],
      documents: [
        { name: "Seal_Wear_Analysis_Viton.pdf", type: "PDF Report", size: "3.1 MB" },
        { name: "Pressure_Calibration_Logs.csv", type: "Data Log", size: "880 KB" }
      ],
      versions: [
        { version: "v1.0", date: "2026-04-11", confidence: 72, note: "Initial document capture. Changed standard rubber seal." },
        { version: "v2.0", date: "2026-07-12", confidence: 88, note: "Upgraded Viton sealing parameters with real operational results." }
      ]
    },
    {
      id: "inc-3",
      code: "INC-2510",
      title: "Laser Lens Focal Drift",
      machine: "Laser Cutter-02",
      department: "Tooling",
      problemType: "Calibration",
      severity: "Medium",
      status: "Resolved",
      engineer: "Elena Vance",
      supplier: "OptoMax Optics Ltd",
      date: "2026-06-25",
      confidence: 94,
      timesReused: 5,
      savings: "₹31,000",
      summary: "Microscopic debris accumulation on target focusing mirrors caused refraction aberration, leading to irregular metal cutting margins.",
      symptoms: [
        "Unclean cut borders with noticeable metal slag deposits",
        "Optical focal offset registered at +0.25mm deviation",
        "Reflected laser light power sensor triggered alarm"
      ],
      rootCause: "Exhaust Fan Filter Clogging causing back-draft lens pollution",
      supportingEvidence: [
        { label: "Focal Offset Pattern", desc: "Refraction profile matches dust particle scatter index." },
        { label: "Filter Lifetime Check", desc: "Exhaust ventilation cartridge was active for 180 hours beyond replacement limit." }
      ],
      repairPerformed: "Cleaned focusing optics with high-purity isopropyl alcohol and microfiber swaps. Replaced exhaust fan HEPA filter cartridge and ran laser path re-alignment routine.",
      outcome: {
        downtimeSaved: "1.5 Hours",
        costSaved: "₹11,000",
        resolutionTime: "24 Minutes"
      },
      lessonsLearned: [
        "A dirty laser exhaust filter causes instant lens contamination within 8 running hours.",
        "Never use standard shop air to blow dust off sensitive optical elements."
      ],
      preventiveMeasures: [
        "Wrote weekly inspection cycle for laser exhaust ventilation into SMRITI SOP-CNC-302.",
        "Locked laser cutter operation if exhaust filter life indicator drops below 5%."
      ],
      relatedMachines: ["Laser Cutter-02", "Laser Engraver 01"],
      relatedComponents: ["Optic Mirror Lens", "HEPA Exhaust Filter", "Laser Tube Core"],
      relatedIncidents: ["INC-092: Slag Build-up", "INC-188: Lens Dust Distortion"],
      documents: [
        { name: "Laser_Optics_Cleaning_SOP.pdf", type: "PDF Guideline", size: "1.8 MB" }
      ],
      versions: [
        { version: "v1.0", date: "2026-06-25", confidence: 94, note: "Fully mapped standard cleaning and HEPA filter correlation." }
      ]
    },
    {
      id: "inc-4",
      code: "INC-1980",
      title: "Solder Paste Print Slump Deviation",
      machine: "Assembly Line Solder-05",
      department: "Assembly",
      problemType: "Electrical",
      severity: "High",
      status: "Under Review",
      engineer: "Vikram Rathore",
      supplier: "SMT-Tech Machines",
      date: "2026-07-05",
      confidence: 76,
      timesReused: 9,
      savings: "₹55,000",
      summary: "Solder paste viscosity drops, leading to solder slump and bridge circuit short defects during surface mount reflow assembly.",
      symptoms: [
        "PCB bridge shorts flagged by Automated Optical Inspection (AOI)",
        "Solder paste thickness variance exceeds 15 microns",
        "Squeegee pressure control deviation logged on SMT terminal"
      ],
      rootCause: "Ambient Workshop Humidity Spike exceeding 65% target margin",
      supportingEvidence: [
        { label: "Weather Station Telemetry", desc: "Workshop AC de-humidifier logged cooling cycle fault." },
        { label: "Slump Correlation", desc: "Water molecule absorption profile matches viscosity reduction curves." }
      ],
      repairPerformed: "Recalibrated squeegee print pressure targets. Replaced dehumidifier compressor relay switch. Purged and re-loaded dry solder paste onto printer stencil plate.",
      outcome: {
        downtimeSaved: "3 Hours",
        costSaved: "₹24,000",
        resolutionTime: "45 Minutes"
      },
      lessonsLearned: [
        "Dehumidification failure leads to irreversible paste viscosity degradation within 3 hours on an open stencil stencil.",
        "Solder paste must be stored strictly in 4-8°C refrigeration before loading."
      ],
      preventiveMeasures: [
        "Installed SMRITI ambient IoT sensors for continuous workshop humidity reporting.",
        "Wrote digital locking trigger into SMT printer system if local humidity logs go beyond 60%."
      ],
      relatedMachines: ["Solder-05 SMT Printer", "Reflow Oven 1"],
      relatedComponents: ["SMT Stencil Blade", "Dehumidifier Unit", "Paste Refrigeration Unit"],
      relatedIncidents: ["INC-043: Reflow Bridging", "INC-122: Paste Dryness Warning"],
      documents: [
        { name: "SMT_Viscosity_Humidity_Chart.pdf", type: "PDF Specification", size: "2.9 MB" }
      ],
      versions: [
        { version: "v1.0", date: "2026-07-05", confidence: 76, note: "Initial evaluation registered. Under review pending monthly humidity profile correlation." }
      ]
    }
  ]);

  // --- KNOWLEDGE GRAPH RELATIONAL MODEL ---
  const graphNodes = [
    { id: "CNC-01", type: "Machine", label: "CNC-01 Lathe", details: "Active Machine Station", x: 10, y: 15 },
    { id: "Bearing", type: "Component", label: "Bearing Sleeve B-4029", details: "Core Spindle Element", x: 30, y: 45 },
    { id: "Lubrication", type: "Parameter", label: "Lubrication Level", details: "Delayed Audit (Tuesday)", x: 50, y: 15 },
    { id: "Temperature", type: "Anomaly", label: "Thermal Readout 92.4°C", details: "Deviation Trigger", x: 70, y: 45 },
    { id: "Rahul", type: "Operator", label: "Operator Rahul Menon", details: "Level 3 Lathe Operator", x: 20, y: 80 },
    { id: "Vibration", type: "Sensor", label: "Vibration 4.8 G", details: "High Drag Warning", x: 45, y: 80 },
    { id: "SOP-302", type: "Solution", label: "SOP-CNC-302 Protocol", details: "Validated Action Plan", x: 65, y: 80 },
    { id: "Outcome", type: "Impact", label: "₹84,000 Saved", details: "Total Reused Value", x: 85, y: 30 },
  ];

  const graphLinks = [
    { source: "CNC-01", target: "Bearing" },
    { source: "Bearing", target: "Lubrication" },
    { source: "Lubrication", target: "Temperature" },
    { source: "Bearing", target: "Vibration" },
    { source: "Rahul", target: "CNC-01" },
    { source: "Temperature", target: "SOP-302" },
    { source: "Vibration", target: "SOP-302" },
    { source: "SOP-302", target: "Outcome" },
  ];

  // --- INTERACTIVE METHODS ---
  const handleAddNewIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentTitle) return;

    const newInc: IncidentKnowledge = {
      id: `inc-${incidents.length + 1}`,
      code: `INC-${3000 + Math.floor(Math.random() * 9000)}`,
      title: newIncidentTitle,
      machine: newIncidentMachine,
      department: newIncidentMachine.includes("CNC") ? "Milling" : "Assembly",
      problemType: newIncidentType as any,
      severity: "High",
      status: "Pending Verification",
      engineer: "Biyonal T.",
      supplier: "Custom Workshop",
      date: new Date().toISOString().split("T")[0],
      confidence: 72,
      timesReused: 0,
      savings: "₹0",
      summary: newIncidentDesc || "Operational anomaly captured on the machine workstation. Automatically opening incident for review.",
      symptoms: ["Deviation flagged in sensor log", "High variance recorded by plant monitor"],
      rootCause: "Under active investigation by on-floor engineering team.",
      supportingEvidence: [{ label: "Context Signal", desc: "Incident captured via new incident creation flow." }],
      repairPerformed: "Diagnostics run, pending site supervisor validation.",
      outcome: { downtimeSaved: "Pending", costSaved: "Pending", resolutionTime: "Pending" },
      lessonsLearned: ["Awaiting human-in-the-loop validation to form lessons learned models."],
      preventiveMeasures: ["Under review."],
      relatedMachines: [newIncidentMachine],
      relatedComponents: ["Core Actuator", "Power Coupling"],
      relatedIncidents: [],
      documents: [{ name: "Automated_Sensor_Snapshot.pdf", type: "PDF Document", size: "410 KB" }],
      versions: [{ version: "v1.0", date: new Date().toISOString().split("T")[0], confidence: 72, note: "Initial operator capture." }]
    };

    setIncidents([newInc, ...incidents]);
    setSelectedIncident(newInc.id);
    setShowAddModal(false);
    // Reset Form
    setNewIncidentTitle("");
    setNewIncidentDesc("");
  };

  // --- FILTERING LOGIC ---
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      // Search Box Filter
      const matchSearch =
        inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.rootCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.code.toLowerCase().includes(searchQuery.toLowerCase());

      // Drops Filters
      const matchMachine = selectedMachine === "All" || inc.machine.includes(selectedMachine);
      const matchDept = selectedDepartment === "All" || inc.department === selectedDepartment;
      const matchType = selectedProblemType === "All" || inc.problemType === selectedProblemType;
      const matchSeverity = selectedSeverity === "All" || inc.severity === selectedSeverity;
      const matchStatus = selectedStatus === "All" || inc.status === selectedStatus;

      return matchSearch && matchMachine && matchDept && matchType && matchSeverity && matchStatus;
    });
  }, [incidents, searchQuery, selectedMachine, selectedDepartment, selectedProblemType, selectedSeverity, selectedStatus]);

  // Active expanded incident details
  const activeIncident = useMemo(() => {
    return incidents.find((i) => i.id === selectedIncident) || incidents[0];
  }, [incidents, selectedIncident]);

  return (
    <div
      id={id || "smriti-knowledge-workspace"}
      className="min-h-screen bg-[#07090b] text-industrial-100 font-sans selection:bg-brand-500 selection:text-white flex flex-col relative overflow-x-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-brand-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* --- KNOWLEDGE NAVBAR --- */}
      <header className="border-b border-industrial-850 px-6 py-4 flex items-center justify-between bg-[#07090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToLanding}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-emerald-600 flex items-center justify-center text-white">
            <BrainCircuit className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-xs font-black tracking-widest leading-none block text-white">SMRITI</span>
            <span className="text-[7px] font-mono tracking-widest text-emerald-400 font-bold uppercase block mt-0.5">
              Knowledge Memory
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-brand-500/10 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Incident</span>
          </button>
          <button
            onClick={() => alert("Knowledge Base Report Export Initiated. Syncing with factory registers...")}
            className="px-4 py-2 border border-industrial-800 bg-industrial-900/40 hover:bg-industrial-800 text-industrial-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button
            onClick={onEnterApp}
            className="px-4 py-2 bg-industrial-900 hover:bg-industrial-850 border border-industrial-800 text-brand-400 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>SaaS App</span>
          </button>
        </div>
      </header>

      {/* --- HERO AREA / KPI DASHBOARD --- */}
      <section className="px-6 py-8 border-b border-industrial-850/60 bg-[#090c0f]/40">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          {/* Header titles */}
          <div className="xl:col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold" className="text-[9px] tracking-widest">ORGANIZATIONAL LEARNING</Badge>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Sync Active
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-display tracking-tight">
              Factory Knowledge Base
            </h1>
            <p className="text-xs text-industrial-400 leading-relaxed max-w-sm">
              SMRITI doesn't just archive incidents. It continuously compiles every validated shop floor failure into permanent, structured organizational intelligence.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0b0e12]/60 border border-industrial-850 p-4 rounded-xl flex flex-col justify-between relative group hover:border-brand-500/30 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase">KNOWLEDGE ENTRIES</span>
                <span className="text-[9px] font-mono text-emerald-400 font-bold">+18 This Month</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black font-display text-white">482</span>
                <p className="text-[10px] text-industrial-450 mt-1">Validated operational cases</p>
              </div>
            </div>

            <div className="bg-[#0b0e12]/60 border border-industrial-850 p-4 rounded-xl flex flex-col justify-between relative group hover:border-brand-500/30 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase">ROOT CAUSES DETECTED</span>
                <Badge variant="success" className="text-[8px] font-mono">100% VALID</Badge>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black font-display text-white">176</span>
                <p className="text-[10px] text-industrial-450 mt-1">Unique mechanical anomalies</p>
              </div>
            </div>

            <div className="bg-[#0b0e12]/60 border border-industrial-850 p-4 rounded-xl flex flex-col justify-between relative group hover:border-emerald-500/30 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase">REUSE EFFICIENCY</span>
                <span className="text-[9px] font-mono text-brand-400 font-bold">12x Multiplier</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black font-display text-white">72%</span>
                <p className="text-[10px] text-industrial-450 mt-1">Automatic resolution rate</p>
              </div>
            </div>

            <div className="bg-brand-950/10 border border-brand-500/20 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-brand-400 font-bold uppercase">KNOWLEDGE HEALTH</span>
                <Badge variant="gold">91% SCORE</Badge>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black font-display text-white">91%</span>
                <p className="text-[10px] text-brand-400/80 mt-1">Verification Confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN INTERACTIVE WORKSPACE --- */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* --- LEFT HAND SEARCH, FILTER & LIST (5 COLS) --- */}
        <section className="xl:col-span-5 space-y-6">
          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-industrial-550" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search incidents, machines, root causes, engineers, suppliers..."
              className="w-full pl-10 pr-10 py-3 bg-[#0c0f12] border border-industrial-800 rounded-xl text-xs text-white placeholder-industrial-500 focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 p-0.5 hover:bg-industrial-800 rounded text-industrial-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* DYNAMIC FILTERS DROPDOWNS */}
          <div className="bg-[#0b0e12]/60 border border-industrial-850 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-industrial-850">
              <span className="text-[10px] font-mono text-industrial-400 font-bold uppercase flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-brand-400" />
                <span>Search Filters</span>
              </span>
              <button
                onClick={() => {
                  setSelectedMachine("All");
                  setSelectedDepartment("All");
                  setSelectedProblemType("All");
                  setSelectedSeverity("All");
                  setSelectedStatus("All");
                }}
                className="text-[9px] font-mono text-industrial-500 hover:text-brand-400 transition-colors"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-3">
              {/* Machine Filter */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-industrial-500 uppercase block">Machine</span>
                <div className="relative">
                  <select
                    value={selectedMachine}
                    onChange={(e) => setSelectedMachine(e.target.value)}
                    className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-brand-500/50 appearance-none font-mono"
                  >
                    <option value="All">All Stations</option>
                    <option value="CNC">CNC Lathes</option>
                    <option value="Press">Hydraulic Presses</option>
                    <option value="Laser">Laser Cutters</option>
                    <option value="Solder">Solder Line</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-industrial-500 pointer-events-none" />
                </div>
              </div>

              {/* Department Filter */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-industrial-500 uppercase block">Department</span>
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-brand-500/50 appearance-none font-mono"
                  >
                    <option value="All">All Departments</option>
                    <option value="Milling">Milling</option>
                    <option value="Machining">Machining</option>
                    <option value="Tooling">Tooling</option>
                    <option value="Assembly">Assembly</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-industrial-500 pointer-events-none" />
                </div>
              </div>

              {/* Problem Type Filter */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-industrial-500 uppercase block">Anomaly Type</span>
                <div className="relative">
                  <select
                    value={selectedProblemType}
                    onChange={(e) => setSelectedProblemType(e.target.value)}
                    className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-brand-500/50 appearance-none font-mono"
                  >
                    <option value="All">All Types</option>
                    <option value="Thermal">Thermal</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Calibration">Calibration</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-industrial-500 pointer-events-none" />
                </div>
              </div>

              {/* Severity Filter */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-industrial-500 uppercase block">Severity</span>
                <div className="relative">
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-brand-500/50 appearance-none font-mono"
                  >
                    <option value="All">All Severities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-industrial-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC LIST OF INCIDENT CARDS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-industrial-400 font-mono">
              <span>FOUND {filteredIncidents.length} LEARNING CASES</span>
              <span>SORTED BY RECENT</span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredIncidents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center bg-[#0b0e12]/40 border border-industrial-850 rounded-xl"
                >
                  <HelpCircle className="w-10 h-10 text-industrial-600 mx-auto mb-3" />
                  <p className="text-xs font-bold text-white font-display">No Knowledge Records Found</p>
                  <p className="text-[10px] text-industrial-500 mt-1 max-w-xs mx-auto">
                    Try adjusting your filter parameters or search queries. SMRITI supports semantic text mapping.
                  </p>
                </motion.div>
              ) : (
                filteredIncidents.map((inc) => {
                  const isSelected = selectedIncident === inc.id;
                  return (
                    <motion.div
                      key={inc.id}
                      layoutId={`incident-card-layout-${inc.id}`}
                      onClick={() => {
                        setSelectedIncident(inc.id);
                        setActiveTab("overview");
                      }}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left relative overflow-hidden group ${
                        isSelected
                          ? "bg-brand-950/20 border-brand-500/50 shadow-md shadow-brand-500/5"
                          : "bg-[#0b0e12]/60 border-industrial-850 hover:bg-[#0f1217]/80 hover:border-industrial-700"
                      }`}
                    >
                      {/* Ambient Left highlight bar */}
                      {isSelected && (
                        <div className="absolute left-0 inset-y-0 w-1 bg-brand-500" />
                      )}

                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[9px] font-mono font-bold text-industrial-400 uppercase tracking-widest">
                          {inc.code}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={
                              inc.severity === "Critical"
                                ? "error"
                                : inc.severity === "High"
                                ? "warning"
                                : "info"
                            }
                            className="text-[8px] px-1.5 py-0"
                          >
                            {inc.severity}
                          </Badge>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-900/30">
                            {inc.confidence}% Conf
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xs font-bold font-display text-white mb-2 tracking-tight group-hover:text-brand-400 transition-colors">
                        {inc.title}
                      </h3>

                      <div className="flex items-center justify-between text-[10px] font-mono text-industrial-500 pt-2 border-t border-industrial-850/50">
                        <div className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-industrial-450" />
                          <span className="text-industrial-300 font-semibold">{inc.machine}</span>
                        </div>
                        <span>Reused {inc.timesReused}x</span>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* --- RIGHT HAND EXPANDED WORKSPACE VIEW (7 COLS) --- */}
        <section className="xl:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {activeIncident ? (
              <motion.div
                key={activeIncident.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0b0e12]/80 border border-industrial-800 rounded-2xl p-6 shadow-2xl relative"
              >
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 pb-4 border-b border-industrial-850">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-brand-400 tracking-wider">
                        {activeIncident.code} / VALIDATED KNOWLEDGE ENTRY
                      </span>
                      <Badge variant="success">RESOLVED & VERIFIED</Badge>
                    </div>
                    <h2 className="text-lg font-black text-white font-display leading-tight">
                      {activeIncident.title}
                    </h2>
                    <p className="text-[11px] text-industrial-400 flex items-center gap-2">
                      <span>Station: <strong>{activeIncident.machine}</strong></span>
                      <span className="text-industrial-700">•</span>
                      <span>Department: <strong>{activeIncident.department}</strong></span>
                    </p>
                  </div>

                  {/* Actions / Export details */}
                  <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                    <button
                      onClick={() => alert(`Sharing Incident code ${activeIncident.code} to shopfloor boards...`)}
                      className="p-2 border border-industrial-800 hover:border-industrial-700 bg-[#07090b] hover:bg-industrial-850 text-industrial-300 rounded-lg transition-all"
                      title="Share Knowledge Entry"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`Exporting localized SOP for ${activeIncident.machine}...`)}
                      className="px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>MAKE SOP</span>
                    </button>
                  </div>
                </div>

                {/* --- INNER SEGMENTED NAVIGATION TABS --- */}
                <div className="flex border-b border-industrial-850/60 font-mono text-[10px] mt-4 overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview & Evidence" },
                    { id: "lessons", label: "Lessons Learned & Actions" },
                    { id: "evidence", label: "AI Graph & Relations" },
                    { id: "evolution", label: "Evolution History" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2.5 font-bold border-b-2 tracking-wide transition-all ${
                        activeTab === tab.id
                          ? "border-brand-500 text-white bg-brand-500/[0.02]"
                          : "border-transparent text-industrial-450 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* --- TAB CONTENT RENDERERS --- */}
                <div className="py-6 space-y-6">
                  {/* TAB 1: OVERVIEW & EVIDENCE */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      {/* AI Knowledge Summary Callout */}
                      <div className="p-4 bg-brand-500/[0.02] border border-brand-500/20 rounded-xl space-y-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/[0.02] rounded-full blur-xl pointer-events-none" />
                        <div className="flex items-center gap-2 text-brand-400 font-mono text-[10px] font-bold">
                          <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
                          <span>AI EXECUTIVE KNOWLEDGE SUMMARY</span>
                        </div>
                        <p className="text-xs text-industrial-200 leading-relaxed italic">
                          "Motor overheating anomalies on CNC mill stations correlate heavily to rapid cylinder sleeve wear caused by localized bypass of scheduled lubrication cycles. Re-applying heavy-duty lubricant prevents 92% of recurrences."
                        </p>
                      </div>

                      {/* Problem Summary Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#07090b] border border-industrial-850 p-4 rounded-xl">
                          <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block mb-1.5">
                            PROBLEM SUMMARY & DEVIATION
                          </span>
                          <p className="text-xs text-industrial-350 leading-relaxed">
                            {activeIncident.summary}
                          </p>
                        </div>

                        <div className="bg-[#07090b] border border-industrial-850 p-4 rounded-xl space-y-2">
                          <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block">
                            OBSERVED CRITICAL SYMPTOMS
                          </span>
                          <div className="space-y-1.5">
                            {activeIncident.symptoms.map((sym, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-[11px]">
                                <span className="text-red-400 font-bold mt-0.5">•</span>
                                <span className="text-industrial-300 font-mono">{sym}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Root Cause & Diagnostic block */}
                      <div className="bg-[#07090b] border border-brand-500/10 p-5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-brand-400 font-bold uppercase">
                            IDENTIFIED ROOT CAUSE
                          </span>
                          <span className="text-[10px] font-mono text-industrial-450">
                            Approved by: <strong>{activeIncident.engineer}</strong>
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-display">
                          {activeIncident.rootCause}
                        </h4>
                        <p className="text-xs text-industrial-400 leading-relaxed">
                          SMRITI compiled raw sensor vibration offsets and matched them with Incident #231 to pinpoint internal sleeves attrition.
                        </p>
                      </div>

                      {/* Supporting Evidence Items */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase block">
                          DIAGNOSTIC EVIDENCE PACKET:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeIncident.supportingEvidence.map((ev, idx) => (
                            <div key={idx} className="p-3 bg-industrial-900/30 border border-industrial-850 rounded-lg space-y-1">
                              <h5 className="text-[11px] font-bold text-industrial-200 flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{ev.label}</span>
                              </h5>
                              <p className="text-[10px] text-industrial-450 leading-relaxed">{ev.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Associated Documents */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase block">
                          ASSOCIATED FLOOR ATTACHMENTS & LOGS
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                          {activeIncident.documents.map((doc, idx) => (
                            <div
                              key={idx}
                              onClick={() => alert(`Downloading document ${doc.name} to device...`)}
                              className="p-3 bg-[#07090b] border border-industrial-850 hover:border-brand-500/40 rounded-xl flex items-center justify-between cursor-pointer group transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <Paperclip className="w-4 h-4 text-industrial-500 group-hover:text-brand-400 shrink-0" />
                                <div className="min-w-0">
                                  <h5 className="text-[11px] font-bold text-white truncate group-hover:text-brand-400 transition-colors">{doc.name}</h5>
                                  <p className="text-[9px] text-industrial-500 font-mono mt-0.5">{doc.type}</p>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono text-industrial-500 shrink-0 ml-1">{doc.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: LESSONS LEARNED & ACTIONS */}
                  {activeTab === "lessons" && (
                    <div className="space-y-6">
                      {/* Highlighted Lessons Learned callout cards */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase block">
                          VALIDATED LESSONS LEARNED
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeIncident.lessonsLearned.map((lesson, idx) => (
                            <div key={idx} className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl relative overflow-hidden flex gap-3">
                              <div className="w-1.5 bg-brand-500 shrink-0 rounded-full" />
                              <p className="text-xs text-industrial-300 leading-relaxed">
                                {lesson}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Preventive Measures List */}
                      <div className="bg-[#07090b] border border-industrial-850 p-5 rounded-xl space-y-4">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <Zap className="w-4 h-4" />
                          <span>UPDATED PREVENTIVE PROTOCOLS DISPATCHED</span>
                        </span>
                        <div className="space-y-3">
                          {activeIncident.preventiveMeasures.map((measure, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-4 h-4 rounded-full bg-emerald-950/20 border border-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5 text-[9px] text-emerald-400">
                                ✓
                              </div>
                              <p className="text-xs text-industrial-300">{measure}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Reuse Rate Metrics Box */}
                      <div className="p-4 bg-emerald-950/15 border border-emerald-900/20 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">REUSE INTENSITY</span>
                          <h4 className="text-lg font-black text-white font-display mt-1">{activeIncident.timesReused} Incidents</h4>
                          <p className="text-[9px] text-industrial-450">Successfully resolved</p>
                        </div>
                        <div className="border-y md:border-y-0 md:border-x border-industrial-850 py-3 md:py-0">
                          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">INVESTIGATION TIME SAVED</span>
                          <h4 className="text-lg font-black text-white font-display mt-1">18 Hours</h4>
                          <p className="text-[9px] text-industrial-450">Diagnostics cut to zero</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">ESTIMATED DIRECT SAVINGS</span>
                          <h4 className="text-lg font-black text-emerald-400 font-display mt-1">{activeIncident.savings}</h4>
                          <p className="text-[9px] text-industrial-450">Prevented repeated failure cost</p>
                        </div>
                      </div>

                      {/* Repair Details Recap */}
                      <div className="bg-industrial-900/30 border border-industrial-850 p-4 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block">
                          ACTUAL REPAIR EXECUTED ON SITE
                        </span>
                        <p className="text-xs text-industrial-300 leading-relaxed font-mono">
                          {activeIncident.repairPerformed}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AI RELATIONSHIPS & KNOWLEDGE GRAPH */}
                  {activeTab === "evidence" && (
                    <div className="space-y-6">
                      {/* Knowledge Graph Container */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase">
                            COGNITIVE ENTITY RECALL GRAPH
                          </span>
                          <span className="text-[9px] font-mono text-brand-400">
                            CLICK NODES TO WEAVE PATHS
                          </span>
                        </div>

                        {/* Beautiful Visual Graph Panel */}
                        <div className="h-64 bg-[#07090b] rounded-xl border border-industrial-850 relative overflow-hidden flex items-center justify-center p-4">
                          <div className="absolute inset-0 bg-[radial-gradient(#80808007_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                          {/* Render links as static lines */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {graphLinks.map((link, idx) => {
                              const s = graphNodes.find(n => n.id === link.source);
                              const t = graphNodes.find(n => n.id === link.target);
                              if (!s || !t) return null;
                              const isActive = activeGraphNode === s.id || activeGraphNode === t.id;
                              return (
                                <g key={idx}>
                                  <line
                                    x1={`${s.x}%`}
                                    y1={`${s.y}%`}
                                    x2={`${t.x}%`}
                                    y2={`${t.y}%`}
                                    stroke={isActive ? "#10b981" : "#1e293b"}
                                    strokeWidth={isActive ? "1.5" : "0.75"}
                                    className="transition-all duration-300"
                                  />
                                  {isActive && (
                                    <circle
                                      r="2"
                                      fill="#10b981"
                                      className="animate-pulse"
                                    >
                                      <animateMotion
                                        path={`M ${s.x * 6} ${s.y * 2.5} L ${t.x * 6} ${t.y * 2.5}`}
                                        dur="3s"
                                        repeatCount="indefinite"
                                      />
                                    </circle>
                                  )}
                                </g>
                              );
                            })}
                          </svg>

                          {/* Render Nodes */}
                          {graphNodes.map((node) => {
                            const isSelected = activeGraphNode === node.id;
                            return (
                              <button
                                key={node.id}
                                onClick={() => setActiveGraphNode(node.id)}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-lg border transition-all duration-300 text-left cursor-pointer z-10 ${
                                  isSelected
                                    ? "bg-emerald-950/45 border-emerald-500 text-white scale-105 shadow-md shadow-emerald-500/10"
                                    : "bg-industrial-900/60 border-industrial-850 hover:border-industrial-700 text-industrial-300"
                                }`}
                              >
                                <span className="text-[9px] font-mono text-industrial-500 uppercase block leading-none">
                                  {node.type}
                                </span>
                                <span className="text-[10px] font-bold font-display mt-0.5 block leading-tight">
                                  {node.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selected Graph Node Details */}
                      {activeGraphNode && (
                        <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase block">
                              SELECTED GRAPH VERTEX
                            </span>
                            <h4 className="text-xs font-bold font-display text-white">
                              {graphNodes.find(n => n.id === activeGraphNode)?.label}
                            </h4>
                            <p className="text-[10px] text-industrial-450">
                              {graphNodes.find(n => n.id === activeGraphNode)?.details}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-mono text-industrial-500 block">RELATIONAL CONTEXT</span>
                            <Badge variant="info" className="text-[8px] mt-1 uppercase">SMRITI HARVESTED</Badge>
                          </div>
                        </div>
                      )}

                      {/* Related Entities list */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-industrial-900/20 border border-industrial-850 rounded-xl space-y-2">
                          <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block">
                            RELATED MACHINES
                          </span>
                          <div className="space-y-1.5">
                            {activeIncident.relatedMachines.map((m, idx) => (
                              <span key={idx} className="block text-[11px] text-industrial-300 font-mono">
                                ↳ {m}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-industrial-900/20 border border-industrial-850 rounded-xl space-y-2">
                          <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block">
                            RELATED COMPONENTS
                          </span>
                          <div className="space-y-1.5">
                            {activeIncident.relatedComponents.map((c, idx) => (
                              <span key={idx} className="block text-[11px] text-industrial-300 font-mono">
                                ↳ {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-industrial-900/20 border border-industrial-850 rounded-xl space-y-2">
                          <span className="text-[9px] font-mono text-industrial-500 font-bold uppercase block">
                            CROSS INCIDENTS
                          </span>
                          <div className="space-y-1.5">
                            {activeIncident.relatedIncidents.map((i, idx) => (
                              <span key={idx} className="block text-[11px] text-industrial-300 font-mono">
                                ↳ {i}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Factory Memory Panel Timeline */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase block">
                          SMRITI MEMORY PROPAGATION TIMELINE
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#07090b] border border-industrial-850 p-4 rounded-xl">
                          {[
                            { title: "Original Failure", desc: "First logged casing overheat in February.", icon: "01" },
                            { title: "SOP Codified", desc: "Sleeve clearance parameters logged.", icon: "02" },
                            { title: "Dynamic Match", desc: "Subsequent temp warnings trigger auto matches.", icon: "03" },
                            { title: "Predictive Zero", desc: "Operator blocks high vibration before spike.", icon: "04" },
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1 relative">
                              <div className="w-6 h-6 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-mono text-[10px] font-bold">
                                {item.icon}
                              </div>
                              <h5 className="text-[11px] font-bold text-white pt-1">{item.title}</h5>
                              <p className="text-[9px] text-industrial-450 leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: EVOLUTION HISTORY */}
                  {activeTab === "evolution" && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono text-industrial-500 font-bold uppercase block">
                          KNOWLEDGE ITERATIVE EVOLUTION
                        </span>

                        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-industrial-800">
                          {activeIncident.versions.map((ver, idx) => (
                            <div key={idx} className="flex gap-4 relative">
                              {/* Indicator dot */}
                              <div className="w-6 h-6 rounded-full bg-[#07090b] border border-industrial-800 flex items-center justify-center text-[10px] font-bold text-industrial-400 z-10 shrink-0 mt-1">
                                {ver.version}
                              </div>
                              <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl flex-1 space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-mono text-industrial-500 font-bold">
                                    COMPILED ON {ver.date}
                                  </span>
                                  <Badge variant="gold" className="text-[9px]">
                                    {ver.confidence}% Precision
                                  </Badge>
                                </div>
                                <p className="text-xs text-industrial-300 font-medium">
                                  {ver.note}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Continuous Learning Footer */}
                      <div className="p-4 bg-[#07090b] border border-industrial-850 rounded-xl flex items-center gap-3">
                        <History className="w-5 h-5 text-brand-400 shrink-0" />
                        <p className="text-[11px] text-industrial-400 leading-relaxed">
                          SMRITI models refine confidence metrics continuously on the backend as shift supervisors confirm or correct root causes in the daily operations journal.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#0b0e12]/80 border border-industrial-800 rounded-2xl p-12 text-center text-industrial-400">
                <BrainCircuit className="w-12 h-12 text-industrial-700 mx-auto mb-4 animate-pulse" />
                <h3 className="text-base font-bold text-white font-display">Select an Incident</h3>
                <p className="text-xs text-industrial-500 mt-1">
                  Click on an operational entry on the left column to view its dynamic context profile.
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* --- SIDEBAR QUICK METRIC SUMMARY (FOOTER / SUBBAR) --- */}
      <footer className="border-t border-industrial-850 py-4 px-6 bg-[#07090b]">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-industrial-500">
          <div className="flex items-center gap-2">
            <Badge variant="info">REUSE ANALYSIS</Badge>
            <span>ESTIMATED MSME INVESTIGATION HOURS SAVED: <strong>84 HOURS</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span>SMRITI INDEX: <strong className="text-emerald-400">87/100</strong></span>
            <span>TOTAL RETRIEVED VALUE: <strong className="text-emerald-400">₹2,12,000</strong></span>
          </div>
        </div>
      </footer>

      {/* --- ADD NEW INCIDENT MODAL DIALOG --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-[#0c0e12] border border-industrial-800 rounded-2xl p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-industrial-450 hover:text-white"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <BrainCircuit className="w-5 h-5 text-brand-400" />
              <div>
                <h3 className="text-sm font-bold text-white font-display">Log New Shop Floor Incident</h3>
                <p className="text-[10px] text-industrial-450 font-mono mt-0.5">Captures telemetry with context</p>
              </div>
            </div>

            <form onSubmit={handleAddNewIncidentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-industrial-400 uppercase font-bold">Incident Title</label>
                <input
                  type="text"
                  required
                  value={newIncidentTitle}
                  onChange={(e) => setNewIncidentTitle(e.target.value)}
                  placeholder="e.g. Hydraulic Valve Pressure Drift"
                  className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white placeholder-industrial-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-industrial-400 uppercase font-bold">Machine Station</label>
                  <select
                    value={newIncidentMachine}
                    onChange={(e) => setNewIncidentMachine(e.target.value)}
                    className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="CNC-01 Lathe">CNC-01 Lathe</option>
                    <option value="Hydraulic Press-03">Hydraulic Press-03</option>
                    <option value="Laser Cutter-02">Laser Cutter-02</option>
                    <option value="Solder-05 SMT">Solder-05 SMT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-industrial-400 uppercase font-bold">Anomaly Category</label>
                  <select
                    value={newIncidentType}
                    onChange={(e) => setNewIncidentType(e.target.value as any)}
                    className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Thermal">Thermal</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-industrial-400 uppercase font-bold">Anomaly Observation Note</label>
                <textarea
                  value={newIncidentDesc}
                  onChange={(e) => setNewIncidentDesc(e.target.value)}
                  placeholder="Provide any raw symptoms or on-floor sounds noticed..."
                  rows={3}
                  className="w-full bg-[#07090b] border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white placeholder-industrial-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-industrial-800 text-industrial-300 hover:text-white rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-xs font-bold"
                >
                  Save Incident Entry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
