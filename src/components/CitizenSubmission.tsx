/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Area, CitizenRequest, IssueCategory, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { analyzeCitizenRequestLocally } from '../services/aiProcessing';
import {
  Mic,
  MicOff,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Info,
  Droplet,
  Compass,
  Wifi,
  FileCheck,
} from 'lucide-react';

interface CitizenSubmissionProps {
  language: Language;
  areas: Area[];
  onSubmitRequest: (params: {
    text: string;
    category: IssueCategory;
    areaId: string;
    anonymous: boolean;
    contactInfo?: string;
    customLanguage?: Language;
  }) => CitizenRequest;
  onTrackRequest: (requestId: string) => void;
}

export const CitizenSubmission: React.FC<CitizenSubmissionProps> = ({
  language,
  areas,
  onSubmitRequest,
  onTrackRequest,
}) => {
  const t = TRANSLATIONS[language];

  // Form State
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [text, setText] = useState<string>('');
  const [category, setCategory] = useState<IssueCategory>('drinking_water');
  const [areaId, setAreaId] = useState<string>('area_3'); // Default to Area 3
  const [anonymous, setAnonymous] = useState<boolean>(true);
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Voice-to-Text State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  // Submitted Success State
  const [submittedRequest, setSubmittedRequest] = useState<CitizenRequest | null>(null);

  // Sync selectedLang if parent changes
  useEffect(() => {
    setSelectedLang(language);
  }, [language]);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSpeech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      setSpeechSupported(hasSpeech);
    }
  }, []);

  // Voice recording toggle handler
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Try native Web Speech API if supported
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = selectedLang === 'mr' ? 'mr-IN' : selectedLang === 'hi' ? 'hi-IN' : 'en-IN';

        setIsListening(true);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          fillSamplePrompt('mr_water');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
      }
    }

    // Fallback simulation
    setIsListening(true);
    setTimeout(() => {
      fillSamplePrompt('mr_water');
      setIsListening(false);
    }, 1000);
  };

  // Demo Quick-Fill Presets
  const fillSamplePrompt = (preset: 'mr_water' | 'hi_water' | 'en_water' | 'roads' | 'internet') => {
    if (preset === 'mr_water') {
      setSelectedLang('mr');
      setText('आमच्या भागात गेल्या दोन आठवड्यांपासून पाणी नीट येत नाही.');
      setCategory('drinking_water');
      setAreaId('area_3');
    } else if (preset === 'hi_water') {
      setSelectedLang('hi');
      setText('वार्ड ३ में पिछले कई दिनों से पीने के पानी का भारी संकट है।');
      setCategory('drinking_water');
      setAreaId('area_3');
    } else if (preset === 'en_water') {
      setSelectedLang('en');
      setText('Several homes in Area 3 have unreliable drinking water and low pressure.');
      setCategory('drinking_water');
      setAreaId('area_3');
    } else if (preset === 'roads') {
      setSelectedLang('mr');
      setText('नेहरू चौक मुख्य रस्त्यावर मोठे खड्डे पडले आहेत, दुचाकी घसरतात.');
      setCategory('roads');
      setAreaId('area_3');
    } else if (preset === 'internet') {
      setSelectedLang('mr');
      setText('सुभाष नगर अभ्यासिका आणि डिजिटल सेवा केंद्रात इंटरनेट आठवडाभर बंद आहे.');
      setCategory('internet_access');
      setAreaId('area_4');
    }
  };

  // Normalization Preview
  const previewAnalysis = text.trim().length > 10 ? analyzeCitizenRequestLocally(text, category, areaId) : null;

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const created = onSubmitRequest({
        text: text.trim(),
        category,
        areaId,
        anonymous,
        contactInfo: anonymous ? undefined : contactInfo.trim(),
        customLanguage: selectedLang,
      });

      setSubmittedRequest(created);
      setIsSubmitting(false);
    }, 350);
  };

  // SCREEN 2 Success / Reference ID state
  if (submittedRequest) {
    const selectedAreaObj = areas.find((a) => a.id === submittedRequest.approximateArea);

    return (
      <div className="max-w-2xl mx-auto py-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t.successTitle}</h2>
              <p className="text-xs text-slate-500">{t.successMessage}</p>
            </div>
          </div>

          {/* Reference ID Card */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 space-y-1.5 text-center">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              {t.yourReferenceId}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-mono tracking-wider">
              {submittedRequest.id}
            </div>
            <p className="text-xs text-slate-500">
              Please save this ID to track review progress on the public tracker.
            </p>
          </div>

          {/* Intake Receipt Summary */}
          <div className="rounded-lg border border-slate-200 p-4 space-y-3 bg-white">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-700" />
                Intake Receipt & Routing Summary
              </span>
              <span className="font-mono text-slate-500">
                Routed to Ward Review Desk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Department Category:</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {submittedRequest.category.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Approximate Ward:</span>
                <span className="font-semibold text-slate-800">
                  {selectedAreaObj?.shortName || submittedRequest.approximateArea}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Urgency:</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {submittedRequest.urgency}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Current Status:</span>
                <span className="font-semibold text-amber-700 capitalize">
                  {submittedRequest.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 block">Official Summary:</span>
              <p className="text-slate-700 mt-0.5">
                "{submittedRequest.summary}"
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onTrackRequest(submittedRequest.id)}
              className="flex-1 py-3 px-4 bg-indigo-900 hover:bg-indigo-800 text-white font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>{t.trackNowButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSubmittedRequest(null);
                setText('');
              }}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer text-sm text-center"
            >
              {t.submitAnother}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-2 space-y-5">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">{t.formTitle}</h1>
        <p className="text-xs text-slate-600">{t.formSubtitle}</p>
      </div>

      {/* Quick Demo Pre-fill Bar */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-800">
            Sample Civic Submissions (1-Click Test)
          </span>
          <span className="text-slate-500 text-[11px]">Testing presets</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => fillSamplePrompt('mr_water')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded font-medium transition-colors cursor-pointer"
          >
            Marathi Water (दोन आठवडे पाणी नाही)
          </button>
          <button
            type="button"
            onClick={() => fillSamplePrompt('hi_water')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded font-medium transition-colors cursor-pointer"
          >
            Hindi Water (पेयजल संकट)
          </button>
          <button
            type="button"
            onClick={() => fillSamplePrompt('en_water')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded font-medium transition-colors cursor-pointer"
          >
            English Water (Low Pressure)
          </button>
          <button
            type="button"
            onClick={() => fillSamplePrompt('roads')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded font-medium transition-colors cursor-pointer"
          >
            Road Potholes
          </button>
          <button
            type="button"
            onClick={() => fillSamplePrompt('internet')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded font-medium transition-colors cursor-pointer"
          >
            Library Broadband
          </button>
        </div>
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xs">
        {/* Language of submission */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">
            {t.selectLanguage}
          </label>
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 gap-1">
            <button
              type="button"
              onClick={() => setSelectedLang('mr')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedLang === 'mr' ? 'bg-white text-indigo-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी (Marathi)
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('hi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedLang === 'hi' ? 'bg-white text-indigo-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedLang === 'en' ? 'bg-white text-indigo-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Text Area & Voice Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-800">
              {t.descriptionLabel} <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer border ${
                isListening
                  ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-3.5 h-3.5" />
                  <span>{t.voiceInputListening}</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{t.voiceInputButton}</span>
                </>
              )}
            </button>
          </div>

          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm outline-none transition-all placeholder:text-slate-400"
            required
          />
        </div>

        {/* Category & Approximate Area Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {t.selectCategory}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IssueCategory)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:border-indigo-600 outline-none cursor-pointer"
            >
              <option value="drinking_water">{t.catWater}</option>
              <option value="roads">{t.catRoads}</option>
              <option value="internet_access">{t.catInternet}</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {t.selectArea}
            </label>
            <select
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:border-indigo-600 outline-none cursor-pointer"
            >
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.shortName}: {selectedLang === 'mr' ? a.marathiName : selectedLang === 'hi' ? a.hindiName : a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clean summary preview if user entered details */}
        {previewAnalysis && (
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span>Observation Summary (Preview)</span>
              <span className="text-slate-500 font-normal">
                Urgency: <strong className="capitalize text-slate-900">{previewAnalysis.suggestedUrgency}</strong>
              </span>
            </div>
            <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200">
              {previewAnalysis.summary}
            </p>
          </div>
        )}

        {/* Privacy & Anonymous Reporting (No Aadhaar) */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <div className="flex items-start gap-3">
            <input
              id="anonymous-checkbox"
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <div className="text-xs">
              <label htmlFor="anonymous-checkbox" className="font-semibold text-slate-800 cursor-pointer block">
                {t.anonymousToggle}
              </label>
              <p className="text-slate-500">{t.anonymousHelp}</p>
            </div>
          </div>

          {!anonymous && (
            <div className="space-y-1.5 pl-7">
              <label className="block text-xs font-medium text-slate-700">
                {t.contactOptional}
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={t.contactPlaceholder}
                className="w-full sm:w-80 px-3 py-2 rounded-lg border border-slate-300 text-xs outline-none focus:border-indigo-600"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="w-full py-3 px-4 bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.submittingButton}</span>
              </>
            ) : (
              <>
                <span>{t.submitButton}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
