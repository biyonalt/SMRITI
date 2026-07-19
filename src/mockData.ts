/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SOP, Worker, AuditLog, SOPStatus, Priority, WorkerLevel } from "./types";

/**
 * Standard Operating Procedures catalog reflecting critical industrial compliance
 */
export const mockSOPs: SOP[] = [
  {
    id: "sop-1",
    code: "SOP-CNC-302",
    title: "Laser Cutter Calibration & Optic Cleaning",
    category: "Machinery Calibration",
    revision: 4,
    lastUpdated: "2026-07-15",
    status: SOPStatus.Active,
    criticality: Priority.Critical,
    durationMinutes: 12,
    author: "Elena Vance (Lead Architect)",
    completionRate: 98.5,
  },
  {
    id: "sop-2",
    code: "SOP-PPE-001",
    title: "Category 3 Protective Shielding & Goggles Standards",
    category: "Floor Safety",
    revision: 2,
    lastUpdated: "2026-06-18",
    status: SOPStatus.Active,
    criticality: Priority.High,
    durationMinutes: 8,
    author: "Marcus Brody (HSE Director)",
    completionRate: 100,
  },
  {
    id: "sop-3",
    code: "SOP-ASS-104",
    title: "Micro-electronics Solder Bead Alignment Procedures",
    category: "Precision Assembly",
    revision: 7,
    lastUpdated: "2026-07-19",
    status: SOPStatus.UnderReview,
    criticality: Priority.Medium,
    durationMinutes: 15,
    author: "Sanjay Kumar (Operations Manager)",
    completionRate: 72.4,
  },
  {
    id: "sop-4",
    code: "SOP-CNC-401",
    title: "Multi-axis Lathe High-Speed Emergency Kill Sequence",
    category: "Safety Systems",
    revision: 1,
    lastUpdated: "2026-05-02",
    status: SOPStatus.RevisionRequired,
    criticality: Priority.Critical,
    durationMinutes: 5,
    author: "Elena Vance (Lead Architect)",
    completionRate: 91.0,
  },
  {
    id: "sop-5",
    code: "SOP-SYS-901",
    title: "Enterprise SMRITI Mobile Logging Portal Sync Check",
    category: "Data Systems",
    revision: 3,
    lastUpdated: "2026-07-01",
    status: SOPStatus.Draft,
    criticality: Priority.Low,
    durationMinutes: 6,
    author: "Biyonal T. (Plant Supervisor)",
    completionRate: 0,
  },
];

/**
 * Shop floor workers tracking current micro-learning credentials and certification levels
 */
export const mockWorkers: Worker[] = [
  {
    id: "w-1",
    name: "Rahul Sharma",
    employeeId: "EMP-2026-098",
    station: "Workstation CNC-3",
    level: WorkerLevel.Operator,
    complianceScore: 97.8,
    skills: { "Laser Calibration": 4, "Safety Protocols": 5, "Solder Bead": 2 },
    lastActive: "12 mins ago",
  },
  {
    id: "w-2",
    name: "Anita Deshmukh",
    employeeId: "EMP-2026-112",
    station: "Assembly Line B",
    level: WorkerLevel.Specialist,
    complianceScore: 100,
    skills: { "Laser Calibration": 5, "Safety Protocols": 5, "Solder Bead": 5 },
    lastActive: "Just now",
  },
  {
    id: "w-3",
    name: "Vikram Rathore",
    employeeId: "EMP-2026-041",
    station: "Machining Unit 1",
    level: WorkerLevel.Apprentice,
    complianceScore: 84.5,
    skills: { "Laser Calibration": 2, "Safety Protocols": 4, "Solder Bead": 1 },
    lastActive: "2 hours ago",
  },
  {
    id: "w-4",
    name: "Elena Vance",
    employeeId: "EMP-2026-003",
    station: "Research & Tooling Lab",
    level: WorkerLevel.Master,
    complianceScore: 99.2,
    skills: { "Laser Calibration": 5, "Safety Protocols": 5, "Solder Bead": 4 },
    lastActive: "1 day ago",
  },
];

/**
 * Continuous auditing timeline tracking SOP revisions, safety alerts, and compliance updates
 */
export const mockAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "10:15 AM",
    category: "SOP_REVISION",
    title: "SOP-CNC-302 Laser Optic Cleaning Revised",
    description: "Lead Architect Elena Vance pushed a critical revision to optic lens cleaning cycles to prevent microscopic bead debris accumulation.",
    priority: Priority.High,
    status: "success",
  },
  {
    id: "log-2",
    timestamp: "09:42 AM",
    category: "COMPLIANCE_ALERT",
    title: "Workstation CNC-3 compliance score warning",
    description: "Apprentice Vikram R. attempted to initialize multi-axis lathe without completing the required 'Kill Sequence SOP' micro-quiz verification.",
    priority: Priority.Critical,
    status: "alert",
  },
  {
    id: "log-3",
    timestamp: "Yesterday",
    category: "SKILL_VERIFICATION",
    title: "Anita D. Certified on Solder Bead Alignment",
    description: "Passed workstation manual assessment with 5/5 score. Upgraded to specialist certification level.",
    priority: Priority.Medium,
    status: "success",
  },
  {
    id: "log-4",
    timestamp: "2 days ago",
    category: "MACHINE_UPDATE",
    title: "Thermal Scanner calibrated for Assembly Line B",
    description: "Sensors adjusted to allow ±0.2°C tolerance. Operational learning training track assigned to 4 operators.",
    priority: Priority.Low,
    status: "pending",
  },
];

/**
 * Analytics dataset showing learning engagement and SOP quiz attempts over time
 */
export const analyticsHistory = [
  { name: "Mon", complianceRate: 92, trainingMinutes: 420, activeUsers: 24 },
  { name: "Tue", complianceRate: 94, trainingMinutes: 510, activeUsers: 28 },
  { name: "Wed", complianceRate: 95, trainingMinutes: 490, activeUsers: 31 },
  { name: "Thu", complianceRate: 97, trainingMinutes: 610, activeUsers: 35 },
  { name: "Fri", complianceRate: 96, trainingMinutes: 580, activeUsers: 32 },
  { name: "Sat", complianceRate: 98, trainingMinutes: 300, activeUsers: 14 },
  { name: "Sun", complianceRate: 97, trainingMinutes: 240, activeUsers: 11 },
];
