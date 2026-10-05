/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SEED_AREAS,
  SEED_INFRASTRUCTURE_INDICATORS,
  SEED_PROJECTS,
  SEED_REQUESTS,
} from '../data/seedData';
import {
  Area,
  CitizenRequest,
  Hotspot,
  InfrastructureIndicator,
  Project,
  VerificationStatus,
  WorkflowStatus,
} from '../types';
import { analyzeCitizenRequestLocally } from './aiProcessing';
import { buildHotspots } from './hotspotEngine';

const STORAGE_KEYS = {
  REQUESTS: 'nagriksetu_requests_v2',
  VERIFICATION_OVERRIDES: 'nagriksetu_verification_overrides_v2',
};

// Memory fallback if localStorage is unavailable
let memoryRequests: CitizenRequest[] | null = null;
let memoryVerificationOverrides: Record<string, VerificationStatus> = {};

export function getStoredRequests(): CitizenRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (raw) {
      const parsed = JSON.parse(raw) as CitizenRequest[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('LocalStorage read error, using memory state:', err);
  }

  if (!memoryRequests) {
    memoryRequests = [...SEED_REQUESTS];
    saveRequests(memoryRequests);
  }
  return memoryRequests;
}

export function saveRequests(requests: CitizenRequest[]): void {
  memoryRequests = requests;
  try {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

export function getVerificationOverrides(): Record<string, VerificationStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VERIFICATION_OVERRIDES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }
  return memoryVerificationOverrides;
}

export function saveVerificationOverrides(overrides: Record<string, VerificationStatus>): void {
  memoryVerificationOverrides = overrides;
  try {
    localStorage.setItem(STORAGE_KEYS.VERIFICATION_OVERRIDES, JSON.stringify(overrides));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

export function resetToSeedData(): { requests: CitizenRequest[]; hotspots: Hotspot[] } {
  try {
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.VERIFICATION_OVERRIDES);
  } catch (err) {
    console.warn('Error clearing storage:', err);
  }
  memoryRequests = [...SEED_REQUESTS];
  memoryVerificationOverrides = {};
  saveRequests(memoryRequests);

  const hotspots = buildHotspots({
    requests: memoryRequests,
    areas: SEED_AREAS,
    indicators: SEED_INFRASTRUCTURE_INDICATORS,
    projects: SEED_PROJECTS,
  });

  return { requests: memoryRequests, hotspots };
}

/**
 * Creates a new citizen request, runs local AI normalization, and assigns unique ID
 */
export function createCitizenRequest(params: {
  text: string;
  category: CitizenRequest['category'];
  areaId: string;
  anonymous: boolean;
  contactInfo?: string;
  customLanguage?: CitizenRequest['language'];
}): { newRequest: CitizenRequest; allRequests: CitizenRequest[]; hotspots: Hotspot[] } {
  const { text, category, areaId, anonymous, contactInfo, customLanguage } = params;

  // Run AI processing
  const aiResult = analyzeCitizenRequestLocally(text, category, areaId);
  const detectedLang = customLanguage || aiResult.detectedLanguage;

  const area = SEED_AREAS.find((a) => a.id === areaId) || SEED_AREAS[2]; // Area 3 default

  // Generate reference ID like NS-2026-W3-0842
  const wardCode = area.id.replace('area_', 'W');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `NS-2026-${wardCode}-${randomSuffix}`;

  const now = new Date().toISOString();

  const newRequest: CitizenRequest = {
    id,
    language: detectedLang,
    originalText: text,
    translatedText: aiResult.normalizedText,
    summary: aiResult.summary,
    category: aiResult.category,
    urgency: aiResult.suggestedUrgency,
    approximateArea: area.id,
    areaName: area.name,
    possibleDuplicateGroup: `hotspot-${area.id}-${aiResult.category}`,
    aiConfidence: aiResult.confidence,
    anonymous,
    contactInfo: anonymous ? undefined : contactInfo,
    createdAt: now,
    status: 'received',
    statusNotes: [
      {
        timestamp: now,
        status: 'received',
        note: `Citizen observation registered in ${detectedLang === 'mr' ? 'Marathi' : detectedLang === 'hi' ? 'Hindi' : 'English'}. Routed to Ward ${wardCode} review desk.`,
        author: 'Ward Intake Desk',
      },
    ],
    uncertaintyFlags: aiResult.uncertaintyFlags,
    fieldVerificationRequired: aiResult.fieldVerificationRequired,
    synthetic: true,
  };

  const currentRequests = getStoredRequests();
  const updatedRequests = [newRequest, ...currentRequests];
  saveRequests(updatedRequests);

  const overrides = getVerificationOverrides();
  const hotspots = buildHotspots({
    requests: updatedRequests,
    areas: SEED_AREAS,
    indicators: SEED_INFRASTRUCTURE_INDICATORS,
    projects: SEED_PROJECTS,
    verificationOverrides: overrides,
  });

  return { newRequest, allRequests: updatedRequests, hotspots };
}

/**
 * Updates workflow status for a specific citizen request with policymaker notes
 */
export function updateRequestStatus(params: {
  requestId: string;
  status: WorkflowStatus;
  note: string;
  author: string;
}): CitizenRequest | null {
  const { requestId, status, note, author } = params;
  const requests = getStoredRequests();
  const index = requests.findIndex((r) => r.id === requestId);
  if (index === -1) return null;

  const target = requests[index];
  const updatedNotes = [
    ...(target.statusNotes || []),
    {
      timestamp: new Date().toISOString(),
      status,
      note: note || `Workflow status updated to "${status.replace('_', ' ')}" by policymaker.`,
      author: author || 'Review Officer',
    },
  ];

  const updatedTarget: CitizenRequest = {
    ...target,
    status,
    statusNotes: updatedNotes,
  };

  requests[index] = updatedTarget;
  saveRequests(requests);
  return updatedTarget;
}

/**
 * Updates verification status of a hotspot (e.g. 'verified' | 'needs_verification' | 'not_a_valid_cluster')
 */
export function updateHotspotVerification(
  hotspotId: string,
  verificationStatus: VerificationStatus
): void {
  const overrides = getVerificationOverrides();
  overrides[hotspotId] = verificationStatus;
  saveVerificationOverrides(overrides);
}

export function getAllAreas(): Area[] {
  return SEED_AREAS;
}

export function getAllIndicators(): InfrastructureIndicator[] {
  return SEED_INFRASTRUCTURE_INDICATORS;
}

export function getAllProjects(): Project[] {
  return SEED_PROJECTS;
}
