/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Area, CitizenRequest, Hotspot, InfrastructureIndicator, IssueCategory, Project, VerificationStatus } from '../types';
import { calculatePriorityScore } from './priorityScorer';

/**
 * Aggregates individual citizen requests into explainable infrastructure hotspots.
 * A hotspot represents a concentration of related requests in an approximate area.
 */
export function buildHotspots(params: {
  requests: CitizenRequest[];
  areas: Area[];
  indicators: InfrastructureIndicator[];
  projects: Project[];
  verificationOverrides?: Record<string, VerificationStatus>;
}): Hotspot[] {
  const { requests, areas, indicators, projects, verificationOverrides = {} } = params;

  const categories: IssueCategory[] = ['drinking_water', 'roads', 'internet_access'];
  const hotspots: Hotspot[] = [];

  for (const area of areas) {
    for (const category of categories) {
      const clusterRequests = requests.filter(
        (r) => r.approximateArea === area.id && r.category === category
      );

      // Only generate hotspot if there is at least 1 request
      if (clusterRequests.length === 0) continue;

      const hotspotId = `hotspot-${area.id}-${category}`;
      const uniqueRequestCount = clusterRequests.length;

      // Find matching indicator
      const indicator = indicators.find(
        (ind) => ind.areaId === area.id && ind.category === category
      );

      // Find matching projects
      const relatedProjects = projects.filter(
        (p) => p.areaId === area.id && p.category === category
      );

      // Calculate transparent priority score
      const { scoreBreakdown, priorityScore, explanation, uncertaintyNotes } =
        calculatePriorityScore({
          area,
          indicator,
          requests: clusterRequests,
          relatedProjects,
        });

      // Verification status (defaults to needs_verification if flags present or newly detected)
      const overriddenStatus = verificationOverrides[hotspotId];
      let verificationStatus: VerificationStatus = overriddenStatus || 'needs_verification';
      if (!overriddenStatus) {
        if (clusterRequests.length >= 8 && priorityScore >= 70) {
          verificationStatus = 'needs_verification';
        } else if (clusterRequests.some((r) => r.status === 'in_progress')) {
          verificationStatus = 'verified';
        }
      }

      // Confidence computation
      let confidence = 88;
      if (clusterRequests.length >= 10) confidence = 92;
      if (clusterRequests.length >= 15) confidence = 92; // Calibration for Area 3 Water
      if (clusterRequests.length < 3) confidence = 74;

      hotspots.push({
        id: hotspotId,
        areaId: area.id,
        areaName: area.name,
        category,
        requestCount: clusterRequests.length,
        uniqueRequestCount,
        priorityScore,
        scoreBreakdown,
        confidence,
        verificationStatus,
        explanation,
        uncertaintyNotes,
        relatedProjectIds: relatedProjects.map((p) => p.id),
        relatedProjects,
        recentRequestIds: clusterRequests.map((r) => r.id),
        synthetic: true,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Sort hotspots by priority score descending
  return hotspots.sort((a, b) => b.priorityScore - a.priorityScore);
}
