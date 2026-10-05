/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Area, CitizenRequest, Hotspot, InfrastructureIndicator, VerificationStatus, WorkflowStatus } from '../types';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Building2,
  FileText,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Users,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PriorityDetailModalProps {
  hotspot: Hotspot;
  area: Area;
  indicator?: InfrastructureIndicator;
  requests: CitizenRequest[];
  onClose: () => void;
  onUpdateVerification: (hotspotId: string, status: VerificationStatus) => void;
  onUpdateBatchStatus: (requestIds: string[], status: WorkflowStatus, note: string) => void;
  onSelectRequest: (requestId: string) => void;
}

export const PriorityDetailModal: React.FC<PriorityDetailModalProps> = ({
  hotspot,
  area,
  indicator,
  requests,
  onClose,
  onUpdateVerification,
  onUpdateBatchStatus,
  onSelectRequest,
}) => {
  const [selectedVerification, setSelectedVerification] = useState<VerificationStatus>(
    hotspot.verificationStatus
  );
  const [batchStatus, setBatchStatus] = useState<WorkflowStatus>('under_review');
  const [officerNote, setOfficerNote] = useState<string>('');
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [showRequestsList, setShowRequestsList] = useState<boolean>(false);

  const clusterRequests = requests.filter((r) =>
    hotspot.recentRequestIds.includes(r.id)
  );

  const handleSaveVerification = (status: VerificationStatus) => {
    setSelectedVerification(status);
    onUpdateVerification(hotspot.id, status);
  };

  const handleApplyBatchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      onUpdateBatchStatus(
        hotspot.recentRequestIds,
        batchStatus,
        officerNote || `Policymaker review update for ${hotspot.areaName} ${hotspot.category}.`
      );
      setIsApplying(false);
      setOfficerNote('');
    }, 300);
  };

  const bd = hotspot.scoreBreakdown;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono text-amber-400 font-bold tracking-wider">
                Policymaker Evidence Panel · {area.shortName}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-300 capitalize font-mono">
                {hotspot.category.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              {area.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800">
          {/* Top Metric Strip: Signal, Requests, Indicator, Population */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                Priority Signal
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-indigo-900 font-mono">
                  {hotspot.priorityScore}
                </span>
                <span className="text-xs text-slate-500 font-mono">/ 100</span>
              </div>
              <span className="text-[11px] text-indigo-700 font-medium">
                Recommended for review
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                Unique Requests
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {hotspot.uniqueRequestCount}
                </span>
                <span className="text-xs text-slate-500">reports</span>
              </div>
              <span className="text-[11px] text-slate-500">
                In this localized cluster
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                Infra Indicator
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-amber-900 font-mono">
                  {indicator ? indicator.value : 50}
                </span>
                <span className="text-xs text-slate-500 font-mono">/ 100</span>
              </div>
              <span className="text-[11px] text-amber-800 font-medium truncate block">
                {indicator ? indicator.title.slice(0, 24) : 'Baseline index'}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                Population & Context
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {area.population.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Vuln Index: {area.vulnerabilityIndex}/100
              </span>
            </div>
          </div>

          {/* Decision Support & Administrative Verification Note */}
          <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900">Administrative Advisory Notice:</span>
              <p className="text-slate-600 leading-relaxed">
                This score provides objective decision support for ward prioritization.
                It is <strong>not</strong> an automatic authorization of funding or tender approval; site verification and formal departmental sanction remain mandatory.
              </p>
            </div>
          </div>

          {/* Mathematical Score Breakdown (5 Factors as specified) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono">
                Transparent Priority Score Breakdown (Total: {hotspot.priorityScore}/100)
              </h3>
              <span className="text-xs font-mono text-slate-500">
                Deterministic Formula
              </span>
            </div>

            <div className="space-y-2.5 bg-white border border-slate-200 rounded-xl p-4">
              {/* Factor 1: Infrastructure gap (30%) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    1. Infrastructure gap (30% weight)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {bd.infrastructureGap.score} / {bd.infrastructureGap.max}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${(bd.infrastructureGap.score / bd.infrastructureGap.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{bd.infrastructureGap.reason}</p>
              </div>

              {/* Factor 2: Urgency / severity (25%) */}
              <div className="space-y-1 pt-1.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    2. Urgency & severity (25% weight)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {bd.urgencySeverity.score} / {bd.urgencySeverity.max}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-600 rounded-full transition-all"
                    style={{ width: `${(bd.urgencySeverity.score / bd.urgencySeverity.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{bd.urgencySeverity.reason}</p>
              </div>

              {/* Factor 3: Equity / vulnerability context (20%) */}
              <div className="space-y-1 pt-1.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    3. Equity & vulnerability context (20% weight)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {bd.equityVulnerability.score} / {bd.equityVulnerability.max}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all"
                    style={{ width: `${(bd.equityVulnerability.score / bd.equityVulnerability.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{bd.equityVulnerability.reason}</p>
              </div>

              {/* Factor 4: Unique requests per 1,000 residents (15%) */}
              <div className="space-y-1 pt-1.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    4. Unique requests per 1,000 residents (15% weight)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {bd.requestsPerCapita.score} / {bd.requestsPerCapita.max}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all"
                    style={{ width: `${(bd.requestsPerCapita.score / bd.requestsPerCapita.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{bd.requestsPerCapita.reason}</p>
              </div>

              {/* Factor 5: Readiness to act (10%) */}
              <div className="space-y-1 pt-1.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    5. Readiness to act (10% weight)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {bd.readinessToAct.score} / {bd.readinessToAct.max}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${(bd.readinessToAct.score / bd.readinessToAct.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{bd.readinessToAct.reason}</p>
              </div>
            </div>
          </div>

          {/* Key Evidence & Context Block */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-700" />
              Key Evidence & Ward Context
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {hotspot.explanation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Planned / Ongoing Projects Comparison */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-mono">
              Related Municipal Projects On File
            </h4>
            {hotspot.relatedProjects.length === 0 ? (
              <div className="text-xs text-slate-500 p-3 bg-slate-50 rounded border border-slate-200">
                No active or planned municipal capital schemes recorded for this category in {area.shortName}.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotspot.relatedProjects.map((p) => (
                  <div key={p.id} className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{p.name}</span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          p.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-blue-100 text-blue-900 border border-blue-200'
                        }`}
                      >
                        {p.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-600">{p.description}</p>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex justify-between">
                      <span>Source: {p.source}</span>
                      {p.budget && <span className="font-semibold text-slate-700">{p.budget}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verification Requirements Banner */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Field Verification & Site Inspection Requirements
              </span>
              <span className="font-mono text-slate-600">
                Cluster Consistency: {hotspot.confidence}%
              </span>
            </div>
            {hotspot.uncertaintyNotes.length > 0 ? (
              <ul className="space-y-1 text-amber-900">
                {hotspot.uncertaintyNotes.map((note, idx) => (
                  <li key={idx}>· {note}</li>
                ))}
              </ul>
            ) : (
              <p className="text-amber-800">
                Initial text clustering matches existing asset registry. Field verification recommended before procurement.
              </p>
            )}
          </div>

          {/* Policymaker Administrative Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Action 1: Hotspot Verification Status */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 uppercase font-mono">
                Hotspot Verification Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSaveVerification('verified')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer border ${
                    selectedVerification === 'verified'
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ✓ Verified Hotspot
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveVerification('needs_verification')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer border ${
                    selectedVerification === 'needs_verification'
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ⚠ Needs Verification
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveVerification('not_a_valid_cluster')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer border ${
                    selectedVerification === 'not_a_valid_cluster'
                      ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ✕ Not a Valid Cluster
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Marking "Needs verification" alerts field engineering staff for physical pressure/pothole logs.
              </p>
            </div>

            {/* Action 2: Batch Workflow Transition */}
            <form onSubmit={handleApplyBatchStatus} className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 uppercase font-mono">
                Update Workflow Status for All {clusterRequests.length} Requests
              </label>
              <div className="flex gap-2">
                <select
                  value={batchStatus}
                  onChange={(e) => setBatchStatus(e.target.value as WorkflowStatus)}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-800 outline-none cursor-pointer"
                >
                  <option value="under_review">Under Review</option>
                  <option value="needs_verification">Needs Verification</option>
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  type="submit"
                  disabled={isApplying}
                  className="px-3.5 py-1.5 bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-semibold rounded text-xs transition-colors cursor-pointer"
                >
                  {isApplying ? 'Updating...' : 'Update Status'}
                </button>
              </div>
              <input
                type="text"
                value={officerNote}
                onChange={(e) => setOfficerNote(e.target.value)}
                placeholder="Optional review note (e.g. Dispatched junior engineer for site test)"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs outline-none placeholder:text-slate-400"
              />
            </form>
          </div>

          {/* Toggle: Inspect Individual Citizen Requests in this Cluster */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowRequestsList(!showRequestsList)}
                className="text-xs font-bold text-indigo-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {showRequestsList ? 'Hide' : 'Inspect'} All {clusterRequests.length} Citizen Submissions
                </span>
                <span>{showRequestsList ? '▲' : '▼'}</span>
              </button>
              <span className="text-[11px] text-slate-500">
                Anonymized citizen feedback
              </span>
            </div>

            {showRequestsList && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {clusterRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1.5 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-slate-800">{req.id}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono text-slate-500">
                          {req.language.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-800 font-medium">{req.originalText}</p>
                    {req.language !== 'en' && (
                      <p className="text-slate-500 italic text-[11px]">
                        Translation: {req.translatedText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg text-xs cursor-pointer"
          >
            Close Evidence Panel
          </button>
        </div>
      </div>
    </div>
  );
};
