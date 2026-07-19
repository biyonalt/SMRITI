/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

// --- ENUMS & TYPES ---

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum WorkerLevel {
  Apprentice = "Apprentice",
  Operator = "Operator",
  Specialist = "Specialist",
  Master = "Master",
}

export enum SOPStatus {
  Draft = "Draft",
  UnderReview = "Under Review",
  Active = "Active",
  RevisionRequired = "Revision Required",
  Archived = "Archived",
}

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

// --- DOMAIN INTERFACES ---

/**
 * Worker Profile in SMRITI representing shop floor learning
 */
export interface Worker {
  id: string;
  name: string;
  employeeId: string;
  station: string;
  level: WorkerLevel;
  avatarUrl?: string;
  complianceScore: number; // Percentage (e.g. 95)
  skills: { [skillName: string]: number }; // Skill scores 1-5
  lastActive: string;
}

/**
 * Standard Operating Procedure (SOP) representing manufacturing learning materials
 */
export interface SOP {
  id: string;
  code: string;
  title: string;
  category: string;
  revision: number;
  lastUpdated: string;
  status: SOPStatus;
  criticality: Priority;
  durationMinutes: number;
  author: string;
  completionRate: number; // Percentage of floor workers who completed it
}

/**
 * Learning Audit Log & Operations Event for Timeline
 */
export interface AuditLog {
  id: string;
  timestamp: string;
  category: "SOP_REVISION" | "SKILL_VERIFICATION" | "COMPLIANCE_ALERT" | "MACHINE_UPDATE";
  title: string;
  description: string;
  workerName?: string;
  stationName?: string;
  priority: Priority;
  status: "success" | "pending" | "warning" | "alert";
}

// --- UI COMPONENT SPECIFIC INTERFACES ---

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    variant: "default" | "success" | "warning" | "error" | "info";
  };
  highlight?: boolean;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string;
  category?: string;
}
