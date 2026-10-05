/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Area, CitizenRequest, Hotspot, InfrastructureIndicator, IssueCategory, Language, Project, WorkflowStatus } from '../types';
import {
  Building2,
  Filter,
  Flame,
  Search,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  RefreshCw,
  Clock,
  Eye,
  FileCheck,
} from 'lucide-react';

interface PolicymakerDashboardProps {
  requests: CitizenRequest[];
  areas: Area[];
  indicators: InfrastructureIndicator[];
  projects: Project[];
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
  onUpdateSingleStatus: (requestId: string, status: WorkflowStatus, note: string) => void;
}

export const PolicymakerDashboard: React.FC<PolicymakerDashboardProps> = ({
  requests,
  areas,
  indicators,
  projects,
  hotspots,
  onSelectHotspot,
  onUpdateSingleStatus,
}) => {
  // Selected Area on Map / Grid
  const [selectedAreaId, setSelectedAreaId] = useState<string>('area_3'); // default to Area 3

  // Filters
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Top Metric Calculations
  const totalUniqueRequests = requests.length;
  const potentialHotspotsCount = hotspots.length;
  const requestsUnderReview = requests.filter((r) => r.status === 'under_review').length;
  const requestsNeedingVerification = requests.filter(
    (r) => r.status === 'needs_verification' || r.fieldVerificationRequired
  ).length;
  const activeProjectsCount = projects.filter((p) => p.status === 'in_progress').length;

  // Selected Area details
  const selectedArea = areas.find((a) => a.id === selectedAreaId) || areas[2];
  const selectedAreaHotspots = hotspots.filter((h) => h.areaId === selectedAreaId);
  const selectedAreaIndicators = indicators.filter((ind) => ind.areaId === selectedAreaId);
  const selectedAreaProjects = projects.filter((p) => p.areaId === selectedAreaId);
  const selectedAreaRequests = requests.filter((r) => r.approximateArea === selectedAreaId);

  // Filtered Requests for Table
  const filteredRequests = requests.filter((req) => {
    if (selectedAreaId !== 'all' && req.approximateArea !== selectedAreaId) return false;
    if (filterCategory !== 'all' && req.category !== filterCategory) return false;
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    if (filterLanguage !== 'all' && req.language !== filterLanguage) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = req.originalText.toLowerCase().includes(q);
      const matchTrans = req.translatedText.toLowerCase().includes(q);
      const matchId = req.id.toLowerCase().includes(q);
      return matchText || matchTrans || matchId;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Dashboard Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold">
              Ward Administration Portal
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-600 font-medium">
              Pilot Geography (5 Wards)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Infrastructure Demand & Hotspot Decision Support
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent aggregation of citizen voice cross-referenced with municipal asset indicators and ongoing projects.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 bg-slate-100 border border-slate-300 text-slate-800 rounded font-semibold font-mono">
            5-Factor Priority Scoring Model
          </span>
        </div>
      </div>

      {/* TOP METRICS (Prompt Requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 block">Total Unique Requests</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalUniqueRequests}
          </div>
          <span className="text-[11px] text-slate-400">Across 5 pilot areas</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 block">Potential Hotspots</span>
          <div className="text-2xl font-extrabold text-indigo-900 font-mono flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-indigo-600" />
            <span>{potentialHotspotsCount}</span>
          </div>
          <span className="text-[11px] text-slate-400">Ranked by 5-factor score</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 block">Under Review</span>
          <div className="text-2xl font-extrabold text-blue-900 font-mono">
            {requestsUnderReview}
          </div>
          <span className="text-[11px] text-slate-400">In administrative queue</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 block">Needs Verification</span>
          <div className="text-2xl font-extrabold text-amber-900 font-mono">
            {requestsNeedingVerification}
          </div>
          <span className="text-[11px] text-amber-700">Flagged for site test</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 block">Active Projects</span>
          <div className="text-2xl font-extrabold text-emerald-900 font-mono">
            {activeProjectsCount}
          </div>
          <span className="text-[11px] text-emerald-700">Capital works in execution</span>
        </div>
      </div>

      {/* MAIN VISUALIZATION: Interactive Map-Like Area Grid (Prompt Requirement) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-900" />
              <span>Pilot Geography Visualization (Area 1 – Area 5)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select an area to inspect demand hotspots, infrastructure indicators, and capital works overlap.
            </p>
          </div>
          <div className="text-xs text-slate-500 italic">
            *Areas are not ranked solely by raw volume; score factors in asset gap & vulnerability.
          </div>
        </div>

        {/* 5 Clickable Area Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {areas.map((area) => {
            const isSelected = area.id === selectedAreaId;
            const areaReqs = requests.filter((r) => r.approximateArea === area.id);
            const areaHotspot = hotspots.find((h) => h.areaId === area.id);
            const topScore = areaHotspot ? areaHotspot.priorityScore : 0;

            // Visual intensity based on priority signal
            let heatClass = 'border-slate-200 hover:border-indigo-400 bg-white';
            if (isSelected) {
              heatClass = 'border-indigo-900 ring-2 ring-indigo-900/10 bg-indigo-50/50';
            } else if (topScore >= 75) {
              heatClass = 'border-rose-300 bg-rose-50/30';
            } else if (topScore >= 60) {
              heatClass = 'border-amber-300 bg-amber-50/20';
            }

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedAreaId(area.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 relative ${heatClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {area.shortName}
                  </span>
                  {topScore > 0 && (
                    <span className="text-xs font-mono font-bold text-indigo-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                      {topScore}/100
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 line-clamp-1">
                  {area.name.split('-')[1] || area.name}
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Requests:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {areaReqs.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pop:</span>
                    <span className="font-mono text-slate-700">
                      {area.population.toLocaleString()}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="text-[10px] text-indigo-900 font-bold uppercase tracking-wider text-center pt-1 font-mono">
                    ● Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Area Deep-Dive Panel */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {selectedArea.name}
                </h3>
                <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                  {selectedArea.zone}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Population: <strong>{selectedArea.population.toLocaleString()}</strong> · Vulnerability Index: <strong>{selectedArea.vulnerabilityIndex}/100</strong> ({selectedArea.vulnerabilityDescription})
              </p>
            </div>

            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-900">{selectedAreaRequests.length}</span> total citizen reports
            </div>
          </div>

          {/* Area's Detected Hotspots (Clickable to open Screen 5 Evidence Panel) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Detected Hotspots in {selectedArea.shortName} (Click to inspect evidence panel)
              </span>
              <span className="text-[11px] text-slate-400">Ranked by Priority Signal</span>
            </div>

            {selectedAreaHotspots.length === 0 ? (
              <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
                No active hotspots detected in this area yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedAreaHotspots.map((hs) => (
                  <div
                    key={hs.id}
                    onClick={() => onSelectHotspot(hs)}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-indigo-700" />
                        <span className="font-bold text-sm text-slate-900 capitalize">
                          {hs.category.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-indigo-900 font-mono">
                          {hs.priorityScore}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">/100</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>{hs.uniqueRequestCount}</strong> unique citizen requests · Cluster Consistency:{' '}
                      <strong>{hs.confidence}%</strong>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          hs.verificationStatus === 'verified'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : hs.verificationStatus === 'needs_verification'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {hs.verificationStatus.replace('_', ' ')}
                      </span>

                      <span className="text-indigo-900 font-medium group-hover:underline flex items-center gap-1 text-[11px]">
                        Inspect Evidence Panel →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Infrastructure Indicators & Related Projects for Selected Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Infrastructure Indicators */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Baseline Infrastructure Indicators ({selectedArea.shortName})
              </span>
              <div className="space-y-2">
                {selectedAreaIndicators.map((ind) => (
                  <div key={ind.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-900">{ind.title}</span>
                      <span className="font-mono font-bold text-amber-900">
                        {ind.value}/100
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{ind.interpretation}</p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      Source: {ind.source} (Synthetic)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Projects */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Municipal Capital Projects ({selectedArea.shortName})
              </span>
              <div className="space-y-2">
                {selectedAreaProjects.length === 0 ? (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-400">
                    No ongoing or planned projects recorded in this area.
                  </div>
                ) : (
                  selectedAreaProjects.map((p) => (
                    <div key={p.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-slate-900">{p.name}</span>
                        <span
                          className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                            p.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {p.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{p.description}</p>
                      <div className="text-[10px] text-slate-400 flex justify-between pt-0.5">
                        <span>{p.source}</span>
                        {p.budget && <span className="font-medium text-slate-700">{p.budget}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR & CITIZEN REQUEST TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Citizen Requests Intake Feed
            </h2>
            <p className="text-xs text-slate-500">
              Review individual citizen submissions, AI translations, and update workflow status.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Showing {filteredRequests.length} of {requests.length} records
          </span>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Area</label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 bg-white outline-none cursor-pointer"
            >
              <option value="all">All Areas</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.shortName} ({a.name.split('-')[1] || a.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Issue Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 bg-white outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="drinking_water">Drinking Water</option>
              <option value="roads">Roads</option>
              <option value="internet_access">Internet Access</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Workflow Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 bg-white outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="received">Received</option>
              <option value="under_review">Under Review</option>
              <option value="needs_verification">Needs Verification</option>
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Language</label>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 bg-white outline-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="mr">Marathi (मराठी)</option>
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Text Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citizen requests by keyword, translation, or ID (e.g. पानी, खड्डे, NS-2026)..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-indigo-600"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Request ID</th>
                <th className="py-2.5 px-3">Area / Lang</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Citizen Voice & Departmental Summary</th>
                <th className="py-2.5 px-3">Urgency</th>
                <th className="py-2.5 px-3">Workflow Status</th>
                <th className="py-2.5 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No citizen requests found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-indigo-950 whitespace-nowrap">
                      {req.id}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-semibold text-slate-900 block">
                        {areas.find((a) => a.id === req.approximateArea)?.shortName || req.approximateArea}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-slate-500">
                        {req.language} · {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap capitalize">
                      <span className="font-medium text-slate-800">
                        {req.category.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-3 max-w-sm">
                      <p className="font-medium text-slate-900 line-clamp-2">
                        "{req.originalText}"
                      </p>
                      {req.language !== 'en' && (
                        <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">
                          Norm: {req.translatedText}
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                          req.urgency === 'critical'
                            ? 'bg-rose-100 text-rose-800'
                            : req.urgency === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {req.urgency}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <select
                        value={req.status}
                        onChange={(e) =>
                          onUpdateSingleStatus(
                            req.id,
                            e.target.value as WorkflowStatus,
                            'Status updated via policymaker dashboard table.'
                          )
                        }
                        className="p-1 rounded border border-slate-300 bg-white font-mono text-[11px] text-slate-800 cursor-pointer"
                      >
                        <option value="received">Received</option>
                        <option value="under_review">Under Review</option>
                        <option value="needs_verification">Needs Verification</option>
                        <option value="planned">Planned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <button
                        onClick={() => {
                          const matchingHotspot = hotspots.find(
                            (h) => h.areaId === req.approximateArea && h.category === req.category
                          );
                          if (matchingHotspot) onSelectHotspot(matchingHotspot);
                        }}
                        className="text-xs text-indigo-900 font-semibold hover:underline cursor-pointer"
                      >
                        View Hotspot →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
