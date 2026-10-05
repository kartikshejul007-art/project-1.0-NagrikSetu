/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppRole, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Building2, Globe, UserCheck, RefreshCw, PlayCircle } from 'lucide-react';
import { NagrikSetuLogo } from './NagrikSetuLogo';

interface HeaderProps {
  currentRole: AppRole;
  setRole: (role: AppRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onResetData: () => void;
  onOpenDemoTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setRole,
  language,
  setLanguage,
  onResetData,
  onOpenDemoTour,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top Administrative Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-100 text-[11px] tracking-wide">
            नागरिक मंच · Municipal Civic Demonstration
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">
            5 Ward Pilot Study
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemoTour}
            className="text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>3-Min Evaluator Walkthrough</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand with Official Logo */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setRole('citizen')}>
          <NagrikSetuLogo variant="compact" size="md" />
        </div>

        {/* Center / Right Controls: Role Switcher, Language Picker, Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5" role="tablist">
            <button
              onClick={() => setRole('citizen')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                currentRole === 'citizen'
                  ? 'bg-white text-indigo-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.roleCitizen}</span>
            </button>
            <button
              onClick={() => setRole('policymaker')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                currentRole === 'policymaker'
                  ? 'bg-white text-indigo-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.rolePolicymaker}</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center border border-slate-200 rounded-md bg-white text-xs px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer"
            >
              <option value="mr">मराठी (Marathi)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            title="Reset data back to original pilot records"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
