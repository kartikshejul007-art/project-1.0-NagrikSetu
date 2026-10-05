/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Area, Hotspot, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { NagrikSetuLogo } from './NagrikSetuLogo';
import {
  FileText,
  Search,
  ShieldCheck,
  EyeOff,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Users,
  Brain,
  Compass,
  Building2,
  Shield,
} from 'lucide-react';

interface CitizenHomeProps {
  language: Language;
  onNavigateSubmit: () => void;
  onNavigateTrack: () => void;
  onSwitchToPolicymaker: () => void;
  areas: Area[];
  hotspots: Hotspot[];
}

export const CitizenHome: React.FC<CitizenHomeProps> = ({
  language,
  onNavigateSubmit,
  onNavigateTrack,
  onSwitchToPolicymaker,
  areas,
  hotspots,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-10 pb-16">
      {/* Harmonized Hero Section: Clean, cohesive, matching the inner pages */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-8 sm:p-12 relative overflow-hidden">
        {/* Soft Background Accent Accompanying the Map of India Motif */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          {/* Official NagrikSetu Emblem & Wordmark (Matching uploaded image) */}
          <div className="flex flex-col items-center">
            <NagrikSetuLogo variant="emblem" size="xl" className="mb-3" />

            <div className="flex items-center text-4xl sm:text-5xl font-black tracking-tight leading-none mt-2">
              <span className="text-[#102a43] flex items-baseline">
                Nagr
                <span className="relative inline-block">
                  <span className="text-[#102a43]">ı</span>
                  <span className="absolute -top-2 -right-0.5 w-3 h-3 text-emerald-600 inline-block rotate-12">
                    🍃
                  </span>
                </span>
                k
              </span>
              <span className="text-[#15803d] ml-1">Setu</span>
            </div>

            <p className="text-base sm:text-lg font-semibold text-slate-700 tracking-tight mt-2">
              {t.tagline}
            </p>

            {/* Indian National Tricolor Pill Bar */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-8 h-1.5 rounded-full bg-orange-500" />
              <span className="w-8 h-1.5 rounded-full bg-slate-300" />
              <span className="w-8 h-1.5 rounded-full bg-emerald-600" />
            </div>
          </div>

          {/* Mission Narrative (Directly matching the official brand identity) */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            NagrikSetu is an open civic platform that helps citizens report local development needs in their language,
            and guides policymakers with clear, data-driven insights to prioritize infrastructure projects for a better, more inclusive India.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onNavigateSubmit}
              className="px-6 py-3.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>{t.reportNeed}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateTrack}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-300 hover:border-slate-400 transition-all shadow-2xs flex items-center gap-2 cursor-pointer text-sm"
            >
              <Search className="w-4 h-4 text-indigo-700" />
              <span>{t.trackRequest}</span>
            </button>

            <button
              onClick={onSwitchToPolicymaker}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer text-sm flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-slate-600" />
              <span>{t.exploreHotspots}</span>
            </button>
          </div>

          {/* Trust & Privacy Guardrails */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-200/80 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.privacyPledge}</span>
            </div>
            <span className="hidden sm:inline text-slate-300">·</span>
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{t.anonymousPledge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Brand Pillars (Directly from user's poster graphic) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* Pillar 1: Citizen Voice */}
          <div className="flex flex-col items-center text-center p-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Citizen Voice</h3>
            <p className="text-xs text-slate-500 font-medium">
              Report · Share · Be Heard
            </p>
          </div>

          {/* Pillar 2: AI-Powered Insights */}
          <div className="flex flex-col items-center text-center p-2 space-y-2 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI-Powered Insights</h3>
            <p className="text-xs text-slate-500 font-medium">
              Translate · Organize · Analyze
            </p>
          </div>

          {/* Pillar 3: Better Planning */}
          <div className="flex flex-col items-center text-center p-2 space-y-2 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Better Planning</h3>
            <p className="text-xs text-slate-500 font-medium">
              Spot Needs · Match Resources
            </p>
          </div>

          {/* Pillar 4: Inclusive Growth */}
          <div className="flex flex-col items-center text-center p-2 space-y-2 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-1">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Inclusive Growth</h3>
            <p className="text-xs text-slate-500 font-medium">
              Stronger Communities · A Brighter India
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Civic Workflow */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs text-slate-600">
            From neighborhood observation to verified engineering review and action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm border border-blue-200">
              1
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">{t.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step1Desc}</p>
            <div className="text-[11px] text-slate-500 font-medium">
              मराठी · हिन्दी · English
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm border border-slate-300">
              2
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">{t.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step2Desc}</p>
            <div className="text-[11px] text-slate-500 font-medium">
              Water · Roads · Connectivity
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm border border-amber-200">
              3
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">{t.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step3Desc}</p>
            <div className="text-[11px] text-slate-500 font-medium">
              Municipal Data Overlap
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm border border-emerald-200">
              4
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">{t.step4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step4Desc}</p>
            <div className="text-[11px] text-slate-500 font-medium">
              Field Engineer Ground Check
            </div>
          </div>
        </div>
      </section>

      {/* Public Accountability & Field Verification Note */}
      <section className="bg-slate-100/90 rounded-xl border border-slate-200 p-5 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">
            प्रशासकीय पारदर्शकता आणि स्थळ पाहणी (Public Accountability Notice)
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {t.publicIntegrityNotice}
          </p>
        </div>
      </section>

      {/* Pilot Geography Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Pilot Geography & Active Wards
            </h2>
            <p className="text-xs text-slate-500">
              5 Municipal Demonstration Wards
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
            Pilot Scope
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {areas.map((area) => {
            const areaHotspots = hotspots.filter((h) => h.areaId === area.id);
            const highestHotspot = areaHotspots[0];

            return (
              <div
                key={area.id}
                className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 hover:border-indigo-400 transition-colors shadow-2xs"
              >
                <div className="text-xs font-bold text-indigo-900">
                  {area.shortName}
                </div>
                <div className="text-xs font-medium text-slate-800 truncate">
                  {language === 'mr' ? area.marathiName : language === 'hi' ? area.hindiName : area.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  Pop: {area.population.toLocaleString()}
                </div>

                {highestHotspot ? (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 capitalize">
                      {highestHotspot.category.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-indigo-900 font-mono">
                      {highestHotspot.priorityScore}/100
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    No active reports
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
