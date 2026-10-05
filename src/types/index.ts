/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'mr' | 'hi' | 'en';

export type IssueCategory = 'drinking_water' | 'roads' | 'internet_access';

export type WorkflowStatus =
  | 'received'
  | 'under_review'
  | 'needs_verification'
  | 'planned'
  | 'in_progress'
  | 'completed';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type VerificationStatus = 'verified' | 'needs_verification' | 'not_a_valid_cluster';

export interface StatusLogEntry {
  timestamp: string;
  status: WorkflowStatus;
  note: string;
  author: string;
}

export interface CitizenRequest {
  id: string; // e.g., 'NS-2026-W3-0842'
  language: Language;
  originalText: string;
  translatedText: string;
  summary: string;
  category: IssueCategory;
  urgency: UrgencyLevel;
  approximateArea: string; // e.g. 'area_3'
  areaName: string;
  possibleDuplicateGroup?: string;
  aiConfidence: number; // 0-100
  anonymous: boolean;
  contactInfo?: string;
  createdAt: string;
  status: WorkflowStatus;
  statusNotes: StatusLogEntry[];
  uncertaintyFlags: string[];
  fieldVerificationRequired: boolean;
  synthetic: boolean;
}

export interface InfrastructureIndicator {
  id: string;
  areaId: string;
  category: IssueCategory;
  title: string;
  value: number; // e.g. 38
  maxScale: number; // 100
  unit: string; // e.g. 'Index points (0-100)' or 'Hours/day'
  gapScore: number; // 0-30 contribution to priority
  source: string; // e.g. 'Municipal Water Audit (Synthetic 2026)'
  date: string;
  synthetic: boolean;
  interpretation: string;
}

export interface Project {
  id: string;
  areaId: string;
  category: IssueCategory;
  name: string;
  status: 'planned' | 'in_progress' | 'completed' | 'none';
  description: string;
  source: string;
  date: string;
  mock: boolean;
  budget?: string;
  contractor?: string;
  estimatedCompletion?: string;
}

export interface ScoreComponent {
  score: number;
  max: number;
  percentage: number;
  label: string;
  reason: string;
}

export interface ScoreBreakdown {
  infrastructureGap: ScoreComponent; // 30%
  urgencySeverity: ScoreComponent; // 25%
  equityVulnerability: ScoreComponent; // 20%
  requestsPerCapita: ScoreComponent; // 15%
  readinessToAct: ScoreComponent; // 10%
  total: number; // 0-100
}

export interface Area {
  id: string;
  name: string;
  shortName: string;
  hindiName: string;
  marathiName: string;
  zone: string;
  population: number;
  vulnerabilityIndex: number; // 0-100
  vulnerabilityDescription: string;
  infrastructureIndicators: InfrastructureIndicator[];
  synthetic: boolean;
}

export interface Hotspot {
  id: string;
  areaId: string;
  areaName: string;
  category: IssueCategory;
  requestCount: number;
  uniqueRequestCount: number;
  priorityScore: number; // 0-100
  scoreBreakdown: ScoreBreakdown;
  confidence: number;
  verificationStatus: VerificationStatus;
  explanation: string[];
  uncertaintyNotes: string[];
  relatedProjectIds: string[];
  relatedProjects: Project[];
  recentRequestIds: string[];
  synthetic: boolean;
  updatedAt: string;
}

export type AppRole = 'citizen' | 'policymaker';

export interface TranslationDictionary {
  [key: string]: {
    mr: string;
    hi: string;
    en: string;
  };
}
