/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { AppRole, Hotspot, Language } from '../types';

export interface GuidedStep {
  stepNumber: number;
  title: string;
  role: AppRole;
  description: string;
  actionLabel?: string;
  executeAction?: () => void;
}

interface GuidedDemoTourProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  // Automation triggers
  setRole: (role: AppRole) => void;
  setLanguage: (lang: Language) => void;
  onAutoSubmitWater: () => void;
  onSelectHotspotArea3: () => void;
  onNavigateTrackSample: () => void;
  onNavigateSubmitTab: () => void;
}

export const GuidedDemoTour: React.FC<GuidedDemoTourProps> = ({
  isOpen,
  onClose,
  currentStep,
  setCurrentStep,
  setRole,
  setLanguage,
  onAutoSubmitWater,
  onSelectHotspotArea3,
  onNavigateTrackSample,
  onNavigateSubmitTab,
}) => {
  if (!isOpen) return null;

  const STEPS: GuidedStep[] = [
    {
      stepNumber: 1,
      title: 'Step 1: Open NagrikSetu Civic Landing Page',
      role: 'citizen',
      description:
        'NagrikSetu welcomes citizens with an accessible, high-trust DPI interface that guarantees anonymous reporting with data minimization (no Aadhaar or identity cards required).',
      actionLabel: 'Go to Citizen Home',
      executeAction: () => setRole('citizen'),
    },
    {
      stepNumber: 2,
      title: 'Step 2: Select Marathi (मराठी) Language',
      role: 'citizen',
      description:
        'Citizen selects Marathi from the top language bar. All headers, guidance, and labels immediately render in clean Devanagari script.',
      actionLabel: 'Switch to Marathi',
      executeAction: () => {
        setRole('citizen');
        setLanguage('mr');
        onNavigateSubmitTab();
      },
    },
    {
      stepNumber: 3,
      title: 'Step 3: Submit Water Problem in Marathi',
      role: 'citizen',
      description:
        'The citizen types or speaks via mic: "आमच्या भागात गेल्या दोन आठवड्यांपासून पाणी नीट येत नाही." (Water has not been coming properly for the last two weeks in our area).',
      actionLabel: 'Auto-fill & Submit',
      executeAction: () => {
        setRole('citizen');
        setLanguage('mr');
        onAutoSubmitWater();
      },
    },
    {
      stepNumber: 4,
      title: 'Step 4: Departmental Triage & Language Translation',
      role: 'citizen',
      description:
        'The platform identifies Marathi, routes to Drinking Water department, flags high urgency, and creates a clear administrative summary for municipal review.',
    },
    {
      stepNumber: 5,
      title: 'Step 5: Generate Public Reference ID',
      role: 'citizen',
      description:
        'A unique tracking reference number (e.g. NS-2026-W3-0101) is generated for the citizen to follow up without disclosing personal identification.',
      actionLabel: 'Copy Sample Reference ID',
      executeAction: () => onNavigateTrackSample(),
    },
    {
      stepNumber: 6,
      title: 'Step 6: Open Policymaker Decision Support',
      role: 'policymaker',
      description:
        'Switch to the Policymaker dashboard. The system aggregates all individual complaints alongside baseline infrastructure data.',
      actionLabel: 'Open Policymaker View',
      executeAction: () => setRole('policymaker'),
    },
    {
      stepNumber: 7,
      title: 'Step 7: Notice Demand Hotspot Clustering',
      role: 'policymaker',
      description:
        'Notice how multiple similar complaints have grouped into a potential demand hotspot rather than being treated as isolated tickets.',
      actionLabel: 'Inspect Hotspots',
      executeAction: () => setRole('policymaker'),
    },
    {
      stepNumber: 8,
      title: 'Step 8: Select Area 3 (Central Ward)',
      role: 'policymaker',
      description:
        'Click on Area 3 (Nehru Chowk). 17 related citizen requests have clustered around the central transit sector.',
      actionLabel: 'Select Area 3 Hotspot',
      executeAction: () => {
        setRole('policymaker');
        onSelectHotspotArea3();
      },
    },
    {
      stepNumber: 9,
      title: 'Step 9: Correlate Baseline Infrastructure Indicator',
      role: 'policymaker',
      description:
        'The evidence panel shows the Drinking Water Reliability Index is 38 / 100, corroborating that physical distribution in Area 3 is indeed failing.',
    },
    {
      stepNumber: 10,
      title: 'Step 10: Check Existing Planned & Ongoing Projects',
      role: 'policymaker',
      description:
        'The system checks municipal records and discovers a "Pipeline Improvement Project" is already In Progress nearby. This allows scope variation or contractor acceleration.',
    },
    {
      stepNumber: 11,
      title: 'Step 11: Calculate 0-100 Transparent Priority Signal',
      role: 'policymaker',
      description:
        'The deterministic engine computes a 76 / 100 Priority Signal. It explicitly advises: "Recommended for policymaker review — does not authorize automatic budget or project approval."',
    },
    {
      stepNumber: 12,
      title: 'Step 12: Transparent 5-Factor Score Breakdown',
      role: 'policymaker',
      description:
        'Every point is mathematically explained: Infrastructure Gap (25/30) + Urgency (20/25) + Equity/Context (15/20) + Requests per 1,000 (10/15) + Readiness (6/10) = 76/100.',
    },
    {
      stepNumber: 13,
      title: 'Step 13: Review Field Verification Requirement',
      role: 'policymaker',
      description:
        'The system flags: "Needs Field Verification". The software provides objective decision support, but a qualified ward engineer must physically measure water pressure before approving works.',
    },
    {
      stepNumber: 14,
      title: 'Step 14: Policymaker Updates Workflow Status',
      role: 'policymaker',
      description:
        'The official changes the cluster status to "Under Review" and logs an administrative note: "Junior engineer dispatched for pressure measurement."',
    },
    {
      stepNumber: 15,
      title: 'Step 15: Citizen Tracks Real-time Review Progress',
      role: 'citizen',
      description:
        'The citizen returns to "Track My Request", enters their reference ID, and sees the status timeline advance to "Under Review" with the engineer note logged.',
      actionLabel: 'Return to Citizen Tracker',
      executeAction: () => {
        setRole('citizen');
        onNavigateTrackSample();
      },
    },
  ];

  const activeStep = STEPS[currentStep - 1] || STEPS[0];

  const handleNext = () => {
    if (activeStep.executeAction) {
      activeStep.executeAction();
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-2xl p-5 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm text-white">
            15-Step Evaluator Demo Walkthrough
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-400 font-bold">
            Step {currentStep} of {STEPS.length}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Role: {activeStep.role.toUpperCase()}
          </span>
          <h4 className="text-sm font-bold text-amber-300">{activeStep.title}</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {activeStep.description}
        </p>
      </div>

      {/* Action / Next Button bar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {activeStep.actionLabel && (
            <button
              onClick={() => {
                if (activeStep.executeAction) activeStep.executeAction();
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded text-white transition-colors cursor-pointer"
            >
              {activeStep.actionLabel}
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{currentStep === STEPS.length ? 'Finish' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
