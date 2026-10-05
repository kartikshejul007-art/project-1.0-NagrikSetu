/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppRole,
  CitizenRequest,
  Hotspot,
  IssueCategory,
  Language,
  VerificationStatus,
  WorkflowStatus,
} from './types';
import {
  createCitizenRequest,
  getAllAreas,
  getAllIndicators,
  getAllProjects,
  getStoredRequests,
  getVerificationOverrides,
  resetToSeedData,
  updateHotspotVerification,
  updateRequestStatus,
} from './services/storage';
import { buildHotspots } from './services/hotspotEngine';
import { Header } from './components/Header';
import { CitizenHome } from './components/CitizenHome';
import { CitizenSubmission } from './components/CitizenSubmission';
import { CitizenTracking } from './components/CitizenTracking';
import { PolicymakerDashboard } from './components/PolicymakerDashboard';
import { PriorityDetailModal } from './components/PriorityDetailModal';
import { GuidedDemoTour } from './components/GuidedDemoTour';
import { TRANSLATIONS } from './data/translations';
import { AlertCircle, FileText, Search, Home } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<AppRole>('citizen');
  const [language, setLanguage] = useState<Language>('mr'); // Default to Marathi for demo
  const [citizenTab, setCitizenTab] = useState<'home' | 'submit' | 'track'>('home');
  const [activeTrackingId, setActiveTrackingId] = useState<string>('NS-2026-W3-0101');

  // Modal States
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Application Data
  const areas = getAllAreas();
  const indicators = getAllIndicators();
  const projects = getAllProjects();

  const [requests, setRequests] = useState<CitizenRequest[]>(() => getStoredRequests());
  const [hotspots, setHotspots] = useState<Hotspot[]>(() =>
    buildHotspots({
      requests: getStoredRequests(),
      areas,
      indicators,
      projects,
      verificationOverrides: getVerificationOverrides(),
    })
  );

  // Recompute hotspots whenever requests change
  const refreshHotspots = (updatedReqs: CitizenRequest[]) => {
    const updatedHotspots = buildHotspots({
      requests: updatedReqs,
      areas,
      indicators,
      projects,
      verificationOverrides: getVerificationOverrides(),
    });
    setHotspots(updatedHotspots);

    // If modal is open, refresh selectedHotspot
    if (selectedHotspot) {
      const refreshedSelected = updatedHotspots.find((h) => h.id === selectedHotspot.id);
      if (refreshedSelected) setSelectedHotspot(refreshedSelected);
    }
  };

  // Submit Citizen Request
  const handleSubmitRequest = (params: {
    text: string;
    category: IssueCategory;
    areaId: string;
    anonymous: boolean;
    contactInfo?: string;
    customLanguage?: Language;
  }): CitizenRequest => {
    const { newRequest, allRequests } = createCitizenRequest(params);
    setRequests(allRequests);
    refreshHotspots(allRequests);
    setActiveTrackingId(newRequest.id);
    return newRequest;
  };

  // Update Workflow Status for Single Request
  const handleUpdateSingleStatus = (requestId: string, status: WorkflowStatus, note: string) => {
    updateRequestStatus({
      requestId,
      status,
      note,
      author: 'Review Officer (Policymaker Portal)',
    });
    const updated = getStoredRequests();
    setRequests(updated);
    refreshHotspots(updated);
  };

  // Update Batch Workflow Status for a Hotspot Cluster
  const handleUpdateBatchStatus = (
    requestIds: string[],
    status: WorkflowStatus,
    note: string
  ) => {
    requestIds.forEach((id) => {
      updateRequestStatus({
        requestId: id,
        status,
        note,
        author: 'Executive Engineer / Review Officer',
      });
    });
    const updated = getStoredRequests();
    setRequests(updated);
    refreshHotspots(updated);
  };

  // Update Hotspot Verification Status
  const handleUpdateHotspotVerification = (
    hotspotId: string,
    verificationStatus: VerificationStatus
  ) => {
    updateHotspotVerification(hotspotId, verificationStatus);
    refreshHotspots(requests);
  };

  // Reset to Pristine Demo Seed Data
  const handleResetData = () => {
    const result = resetToSeedData();
    setRequests(result.requests);
    setHotspots(result.hotspots);
    setSelectedHotspot(null);
    setActiveTrackingId('NS-2026-W3-0101');
    alert('Demo dataset has been reset to original synthetic seed records.');
  };

  // Demo Automation Helpers
  const handleAutoSubmitWater = () => {
    const created = handleSubmitRequest({
      text: 'आमच्या भागात गेल्या दोन आठवड्यांपासून पाणी नीट येत नाही.',
      category: 'drinking_water',
      areaId: 'area_3',
      anonymous: true,
      customLanguage: 'mr',
    });
    setCitizenTab('submit');
    setActiveTrackingId(created.id);
  };

  const handleSelectHotspotArea3 = () => {
    const hs = hotspots.find(
      (h) => h.areaId === 'area_3' && h.category === 'drinking_water'
    ) || hotspots[0];
    if (hs) setSelectedHotspot(hs);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        setRole={setCurrentRole}
        language={language}
        setLanguage={setLanguage}
        onResetData={handleResetData}
        onOpenDemoTour={() => {
          setIsDemoTourOpen(true);
          setDemoStep(1);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentRole === 'citizen' ? (
          <div className="space-y-6">
            {/* Citizen Sub-Navigation Bar */}
            <nav className="flex items-center gap-2 border-b border-slate-200 pb-3" aria-label="Citizen Portal Navigation">
              <button
                onClick={() => setCitizenTab('home')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  citizenTab === 'home'
                    ? 'bg-indigo-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>मुख्य पृष्ठ (Home)</span>
              </button>

              <button
                onClick={() => setCitizenTab('submit')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  citizenTab === 'submit'
                    ? 'bg-indigo-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.reportNeed}</span>
              </button>

              <button
                onClick={() => setCitizenTab('track')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  citizenTab === 'track'
                    ? 'bg-indigo-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.trackRequest}</span>
              </button>
            </nav>

            {/* Citizen Screen Routing */}
            {citizenTab === 'home' && (
              <CitizenHome
                language={language}
                onNavigateSubmit={() => setCitizenTab('submit')}
                onNavigateTrack={() => setCitizenTab('track')}
                onSwitchToPolicymaker={() => setCurrentRole('policymaker')}
                areas={areas}
                hotspots={hotspots}
              />
            )}

            {citizenTab === 'submit' && (
              <CitizenSubmission
                language={language}
                areas={areas}
                onSubmitRequest={handleSubmitRequest}
                onTrackRequest={(reqId) => {
                  setActiveTrackingId(reqId);
                  setCitizenTab('track');
                }}
              />
            )}

            {citizenTab === 'track' && (
              <CitizenTracking
                language={language}
                requests={requests}
                initialRequestId={activeTrackingId}
                onNavigateSubmit={() => setCitizenTab('submit')}
              />
            )}
          </div>
        ) : (
          /* Policymaker Screen (SCREEN 4) */
          <PolicymakerDashboard
            requests={requests}
            areas={areas}
            indicators={indicators}
            projects={projects}
            hotspots={hotspots}
            onSelectHotspot={(hs) => setSelectedHotspot(hs)}
            onUpdateSingleStatus={handleUpdateSingleStatus}
          />
        )}
      </main>

      {/* Screen 5: Priority Detail Modal (when policymaker clicks a hotspot) */}
      {selectedHotspot && (
        <PriorityDetailModal
          hotspot={selectedHotspot}
          area={areas.find((a) => a.id === selectedHotspot.areaId) || areas[2]}
          indicator={indicators.find(
            (ind) =>
              ind.areaId === selectedHotspot.areaId && ind.category === selectedHotspot.category
          )}
          requests={requests}
          onClose={() => setSelectedHotspot(null)}
          onUpdateVerification={handleUpdateHotspotVerification}
          onUpdateBatchStatus={handleUpdateBatchStatus}
          onSelectRequest={(reqId) => {
            setActiveTrackingId(reqId);
            setCurrentRole('citizen');
            setCitizenTab('track');
            setSelectedHotspot(null);
          }}
        />
      )}

      {/* 15-Step Interactive Guided Tour */}
      <GuidedDemoTour
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        currentStep={demoStep}
        setCurrentStep={setDemoStep}
        setRole={setCurrentRole}
        setLanguage={setLanguage}
        onAutoSubmitWater={handleAutoSubmitWater}
        onSelectHotspotArea3={handleSelectHotspotArea3}
        onNavigateTrackSample={() => {
          setActiveTrackingId('NS-2026-W3-0101');
          setCitizenTab('track');
        }}
        onNavigateSubmitTab={() => setCitizenTab('submit')}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">NagrikSetu</span>
            <span>·</span>
            <span>Civic Infrastructure Pilot</span>
            <span>·</span>
            <span className="text-slate-600">5 Municipal Wards</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Ward Engineer Ground-Truthing</span>
            <span>·</span>
            <span>Privacy First (No Aadhaar)</span>
            <span>·</span>
            <span>मराठी · हिन्दी · English</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
