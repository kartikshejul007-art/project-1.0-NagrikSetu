/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CitizenRequest, Language, WorkflowStatus } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  MapPin,
  Calendar,
  Sparkles,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface CitizenTrackingProps {
  language: Language;
  requests: CitizenRequest[];
  initialRequestId?: string;
  onNavigateSubmit: () => void;
}

const TIMELINE_STEPS: {
  status: WorkflowStatus;
  labelEn: string;
  labelMr: string;
  labelHi: string;
  descriptionEn: string;
  descriptionMr: string;
  descriptionHi: string;
}[] = [
  {
    status: 'received',
    labelEn: 'Received',
    labelMr: 'प्राप्त झाली',
    labelHi: 'प्राप्त हुआ',
    descriptionEn: 'Request logged into ward citizen intake system with reference ID.',
    descriptionMr: 'नागरी नोंदणी प्रणालीमध्ये संदर्भ क्रमांकासह दाखल झाली आहे.',
    descriptionHi: 'नागरिक पोर्टल में संदर्भ नंबर के साथ अनुरोध दर्ज हुआ।',
  },
  {
    status: 'under_review',
    labelEn: 'Under Review',
    labelMr: 'पुनरावलोकन सुरू',
    labelHi: 'समीक्षाधीन',
    descriptionEn: 'Ward officers assessing citizen reports alongside municipal asset data.',
    descriptionMr: 'प्रभाग अधिकारी इतर तक्रारी व मालमत्ता नोंदींसह तांत्रिक तपासणी करत आहेत.',
    descriptionHi: 'वार्ड अधिकारी अन्य ज्ञापनों व बुनियादी डाटा के साथ समीक्षा कर रहे हैं।',
  },
  {
    status: 'needs_verification',
    labelEn: 'Field Verification Required',
    labelMr: 'प्रत्यक्ष स्थळ पाहणी आवश्यक',
    labelHi: 'स्थलीय सत्यापन आवश्यक',
    descriptionEn: 'Dispatched to junior engineer for on-site physical inspection and measurement.',
    descriptionMr: 'कनिष्ठ अभियंत्याकडे प्रत्यक्ष स्थळ पाहणी व दाबाच्या तपासणीसाठी वर्ग केले.',
    descriptionHi: 'कनिष्ठ अभियंता को भौतिक जांच व दबाव परीक्षण हेतु भेजा गया।',
  },
  {
    status: 'planned',
    labelEn: 'Planned in Works Schedule',
    labelMr: 'कामाच्या नियोजनात समाविष्ट',
    labelHi: 'कार्य योजना में शामिल',
    descriptionEn: 'Included in ward maintenance schedule or capital budget tender scope.',
    descriptionMr: 'प्रभाग दुरुस्ती आराखडा किंवा निविदा व्याप्तीमध्ये नियोजित केले.',
    descriptionHi: 'वार्ड मरम्मत कार्यक्रम अथवा निविदा योजना में शामिल किया गया।',
  },
  {
    status: 'in_progress',
    labelEn: 'Work in Progress',
    labelMr: 'काम प्रगतीपथावर',
    labelHi: 'प्रगति पर',
    descriptionEn: 'On-ground civil or utility contractor currently executing repairs.',
    descriptionMr: 'संबंधित ठेकेदाराकडून प्रत्यक्ष पाईपलाईन/रस्ता दुरुस्ती काम सुरू आहे.',
    descriptionHi: 'कार्यकारी एजेंसी द्वारा स्थलीय मरम्मत कार्य प्रारंभ हो चुका है।',
  },
  {
    status: 'completed',
    labelEn: 'Completed & Certified',
    labelMr: 'काम पूर्ण व प्रमाणित',
    labelHi: 'पूर्ण व प्रमाणित',
    descriptionEn: 'Field work completed, tested, and certified by municipal engineers.',
    descriptionMr: 'काम पूर्ण होऊन प्रभाग अभियंत्याकडून तपासणी व प्रमाणीकरण झाले.',
    descriptionHi: 'कार्य पूर्ण होकर वार्ड अभियंता द्वारा विधिवत प्रमाणित किया गया।',
  },
];

export const CitizenTracking: React.FC<CitizenTrackingProps> = ({
  language,
  requests,
  initialRequestId,
  onNavigateSubmit,
}) => {
  const t = TRANSLATIONS[language];
  const [searchId, setSearchId] = useState<string>(initialRequestId || 'NS-2026-W3-0101');
  const [activeRequest, setActiveRequest] = useState<CitizenRequest | null>(() => {
    if (initialRequestId) {
      return requests.find((r) => r.id === initialRequestId) || null;
    }
    return requests.find((r) => r.id === 'NS-2026-W3-0101') || requests[0] || null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = requests.find((r) => r.id.toUpperCase() === query);
    setActiveRequest(found || null);
  };

  const handleQuickSelect = (id: string) => {
    setSearchId(id);
    const found = requests.find((r) => r.id === id);
    if (found) setActiveRequest(found);
  };

  const getStepIndex = (status: WorkflowStatus) => {
    return TIMELINE_STEPS.findIndex((s) => s.status === status);
  };

  const currentStepIndex = activeRequest ? getStepIndex(activeRequest.status) : -1;

  // Status Badge Helper
  const getStatusBadge = (status: WorkflowStatus) => {
    switch (status) {
      case 'received':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'under_review':
        return 'bg-indigo-50 text-indigo-900 border-indigo-200';
      case 'needs_verification':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'planned':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'in_progress':
        return 'bg-amber-100 text-amber-950 border-amber-400';
      case 'completed':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Elevated Title Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200">
          <Building2 className="w-3.5 h-3.5" />
          <span>नागरी तक्रार मागोवा · Ward Status Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.trackingTitle}
        </h1>
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          {t.trackingSubtitle}
        </p>
      </div>

      {/* Elevated Search Bar Card */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-7 shadow-xs space-y-4">
        <label className="block text-sm font-bold text-slate-900">
          {t.enterReferencePrompt}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. NS-2026-W3-0101"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-base font-mono font-bold text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="px-7 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t.searchButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick select demo buttons (Elevated, readable) */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold text-xs">Sample Case IDs:</span>
          <button
            type="button"
            onClick={() => handleQuickSelect('NS-2026-W3-0101')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            NS-2026-W3-0101 (Ward 3 Water)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('NS-2026-W3-0102')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            NS-2026-W3-0102 (Contamination)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('NS-2026-W1-0201')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            NS-2026-W1-0201 (Ward 1 Roads)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('NS-2026-W4-0301')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            NS-2026-W4-0301 (Ward 4 Connectivity)
          </button>
        </div>
      </form>

      {/* Not found state */}
      {!activeRequest ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <p className="text-base text-slate-600">
            No record found for Reference ID <span className="font-mono font-bold text-slate-900">"{searchId}"</span>.
          </p>
          <button
            onClick={onNavigateSubmit}
            className="inline-flex items-center gap-2 text-sm text-indigo-900 font-bold hover:underline"
          >
            <span>Submit a new civic request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Elevated Request Details & Timeline */
        <div className="space-y-8">
          {/* Main Elevated Header Card */}
          <div className="bg-white rounded-2xl border border-slate-300 p-7 sm:p-8 space-y-6 shadow-xs">
            {/* Top row with big reference ID & status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
                  Public Reference Number
                </span>
                <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900 tracking-tight">
                  {activeRequest.id}
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
                  Current Workflow Stage
                </span>
                <span
                  className={`inline-block text-sm font-bold uppercase font-mono px-4 py-2 rounded-xl border shadow-2xs ${getStatusBadge(
                    activeRequest.status
                  )}`}
                >
                  {activeRequest.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Elevated Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-medium">Department Category</span>
                <span className="font-bold text-slate-900 capitalize text-base block">
                  {activeRequest.category.replace('_', ' ')}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-medium">Assigned Ward / Area</span>
                <span className="font-bold text-slate-900 text-base block truncate" title={activeRequest.areaName}>
                  {activeRequest.areaName.split('-')[0] || activeRequest.areaName}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-medium">Filing Date</span>
                <span className="font-bold text-slate-900 font-mono text-base block">
                  {new Date(activeRequest.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-medium">Urgency Level</span>
                <span className="font-bold text-slate-900 capitalize text-base block">
                  {activeRequest.urgency}
                </span>
              </div>
            </div>

            {/* Observation Callout Card */}
            <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                  Original Citizen Observation:
                </span>
                <p className="text-slate-900 mt-1 font-medium text-base sm:text-lg leading-relaxed">
                  "{activeRequest.originalText}"
                </p>
              </div>

              {activeRequest.language !== 'en' && (
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    Inter-departmental Translation (for Ward Engineers):
                  </span>
                  <p className="text-slate-700 italic mt-1 text-sm sm:text-base">
                    "{activeRequest.translatedText}"
                  </p>
                </div>
              )}
            </div>

            {/* Public Accountability & Review Disclaimer */}
            <div className="bg-slate-100 rounded-xl border border-slate-200 p-4 text-xs text-slate-600 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t.statusDisclaimer}
              </p>
            </div>
          </div>

          {/* Elevated Timeline Section */}
          <div className="bg-white rounded-2xl border border-slate-300 p-7 sm:p-8 space-y-8 shadow-xs">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {t.statusTimelineTitle}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Official step-by-step administrative review and execution progression.
              </p>
            </div>

            {/* Stepper with Elevated Typography & Large Nodes */}
            <div className="relative pl-8 sm:pl-10 space-y-10 before:absolute before:left-4 sm:before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-slate-200">
              {TIMELINE_STEPS.map((step, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const isFuture = idx > currentStepIndex;

                const stepNotes = activeRequest.statusNotes?.filter(
                  (n) => n.status === step.status
                );

                const stepLabel =
                  language === 'mr' ? step.labelMr : language === 'hi' ? step.labelHi : step.labelEn;

                const stepDesc =
                  language === 'mr'
                    ? step.descriptionMr
                    : language === 'hi'
                    ? step.descriptionHi
                    : step.descriptionEn;

                return (
                  <div key={step.status} className="relative group">
                    {/* Large Elevated Circle Node */}
                    <div
                      className={`absolute -left-8 sm:-left-10 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                        isCurrent
                          ? 'bg-indigo-900 border-indigo-900 text-white ring-4 ring-indigo-100 shadow-md'
                          : isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`text-base sm:text-lg font-bold tracking-tight ${
                            isCurrent
                              ? 'text-indigo-950'
                              : isPassed
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {stepLabel}
                        </span>

                        {isCurrent && (
                          <span className="text-xs uppercase font-mono font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md shadow-2xs">
                            Current Active Stage
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-500 max-w-xl">
                        {stepDesc}
                      </p>

                      {/* Associated Officer Notes Log */}
                      {stepNotes && stepNotes.length > 0 ? (
                        <div className="space-y-2 pt-2">
                          {stepNotes.map((note, nIdx) => (
                            <div
                              key={nIdx}
                              className="text-sm bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                <span className="font-semibold text-slate-800">{note.author}</span>
                                <span className="font-mono text-slate-500">
                                  {new Date(note.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-slate-800 font-medium leading-relaxed">
                                {note.note}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : isCurrent ? (
                        <p className="text-xs text-slate-500 italic pt-1">
                          In process with the Ward Technical and Inspection team.
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
