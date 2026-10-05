/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'emblem' | 'poster';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const NagrikSetuLogo: React.FC<LogoProps> = ({
  variant = 'compact',
  className = '',
  size = 'md',
}) => {
  // Sizing definitions
  const emblemSize =
    size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-24 h-24';

  const titleSize =
    size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-4xl';

  // The Iconic Circular Emblem from image.png
  const EmblemSvg = (
    <svg
      viewBox="0 0 200 200"
      className={`${emblemSize} shrink-0 drop-shadow-xs`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NagrikSetu Emblem"
    >
      <defs>
        {/* Soft Sky Gradient */}
        <linearGradient id="skyGrad" x1="100" y1="35" x2="100" y2="165" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e0f2fe" />
          <stop offset="0.6" stopColor="#bae6fd" />
          <stop offset="1" stopColor="#7dd3fc" />
        </linearGradient>

        {/* Green Hills Gradient */}
        <linearGradient id="hillGrad" x1="50" y1="120" x2="150" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>

        {/* Left Citizen (Blue) */}
        <linearGradient id="blueCitizen" x1="20" y1="40" x2="110" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Right Citizen (Warm Orange/Saffron) */}
        <linearGradient id="orangeCitizen" x1="180" y1="60" x2="90" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>

        {/* Central Circular Clip */}
        <clipPath id="circleClip">
          <circle cx="100" cy="105" r="54" />
        </clipPath>
      </defs>

      {/* 1. Digital Connectivity / Wi-Fi Waves radiating on top */}
      <path
        d="M82 32 C93 25, 107 25, 118 32"
        stroke="#0284c7"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M74 24 C90 14, 110 14, 126 24"
        stroke="#0284c7"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M66 16 C88 4, 112 4, 134 16"
        stroke="#0284c7"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="100" cy="40" r="3" fill="#0284c7" />

      {/* 2. Inner Circular World (clipped) */}
      <g clipPath="url(#circleClip)">
        {/* Sky background */}
        <circle cx="100" cy="105" r="54" fill="url(#skyGrad)" />

        {/* Soft cloud shapes */}
        <path d="M125 78 Q135 73 145 78 Q150 85 140 88 Z" fill="#ffffff" opacity="0.75" />

        {/* Modern City Buildings */}
        {/* Building 1 (Left Tall) */}
        <rect x="76" y="80" width="14" height="42" fill="#1e3a8a" rx="1.5" />
        <rect x="78" y="84" width="3" height="3" fill="#93c5fd" />
        <rect x="84" y="84" width="3" height="3" fill="#93c5fd" />
        <rect x="78" y="90" width="3" height="3" fill="#93c5fd" />
        <rect x="84" y="90" width="3" height="3" fill="#93c5fd" />
        <rect x="78" y="96" width="3" height="3" fill="#93c5fd" />
        <rect x="84" y="96" width="3" height="3" fill="#93c5fd" />

        {/* Building 2 (Center Spire) */}
        <polygon points="94,62 108,70 108,125 94,125" fill="#0284c7" />
        <rect x="97" y="76" width="3" height="4" fill="#ffffff" opacity="0.9" />
        <rect x="102" y="76" width="3" height="4" fill="#ffffff" opacity="0.9" />
        <rect x="97" y="83" width="3" height="4" fill="#ffffff" opacity="0.9" />
        <rect x="102" y="83" width="3" height="4" fill="#ffffff" opacity="0.9" />
        <rect x="97" y="90" width="3" height="4" fill="#ffffff" opacity="0.9" />
        <rect x="102" y="90" width="3" height="4" fill="#ffffff" opacity="0.9" />

        {/* Building 3 (Right) */}
        <rect x="110" y="82" width="15" height="42" fill="#1e40af" rx="1.5" />
        <rect x="113" y="86" width="3" height="3" fill="#67e8f9" />
        <rect x="119" y="86" width="3" height="3" fill="#67e8f9" />
        <rect x="113" y="92" width="3" height="3" fill="#67e8f9" />
        <rect x="119" y="92" width="3" height="3" fill="#67e8f9" />

        {/* Green Tree in front of city */}
        <circle cx="94" cy="110" r="7" fill="#16a34a" />
        <rect x="93" y="114" width="2" height="6" fill="#78350f" />

        {/* Green Landscape / Rolling Hills */}
        <path
          d="M45 130 Q75 110 105 132 Q130 115 155 130 L155 165 L45 165 Z"
          fill="url(#hillGrad)"
        />

        {/* Curving Grey Asphalt Road */}
        <path
          d="M80 160 C88 140, 96 130, 114 126 L124 128 C108 135, 102 144, 98 160 Z"
          fill="#334155"
        />
        {/* Road white dashed/curved center line */}
        <path
          d="M88 158 C94 144, 102 135, 118 127"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeDasharray="3 3"
          fill="none"
        />
      </g>

      {/* 3. Left Citizen (Blue): Head & Sweeping Arm */}
      {/* Head */}
      <circle cx="68" cy="58" r="9" fill="#fbcfe8" opacity="0.1" />
      <circle cx="68" cy="58" r="9" fill="#fed7aa" />
      {/* Hair */}
      <path d="M59 56 C59 49, 73 48, 76 53 C76 56, 73 57, 72 58 C68 59, 62 61, 59 56 Z" fill="#1e293b" />
      {/* Sweeping Blue Body & Embracing Arm */}
      <path
        d="M58 72 C52 82, 46 100, 48 118 C50 135, 62 152, 80 160 C74 150, 70 138, 68 126 C66 112, 70 94, 82 84 C88 78, 98 80, 104 88 C106 91, 108 96, 116 98 C124 100, 134 94, 142 90 C130 84, 118 80, 106 74 C90 66, 70 65, 58 72 Z"
        fill="url(#blueCitizen)"
      />

      {/* 4. Right Citizen (Warm Orange/Saffron): Head & Sweeping Arm */}
      {/* Head */}
      <circle cx="132" cy="65" r="9" fill="#fed7aa" />
      {/* Hair / Bun */}
      <path d="M128 58 C135 56, 142 59, 141 68 C139 70, 136 67, 132 66 Z" fill="#1e293b" />
      <circle cx="140" cy="67" r="4.5" fill="#1e293b" />
      {/* Sweeping Orange Body & Arm */}
      <path
        d="M142 77 C152 85, 156 98, 154 112 C152 126, 144 140, 128 154 C138 144, 144 132, 144 120 C144 108, 138 98, 128 92 C120 87, 110 88, 102 85 C96 82, 88 88, 80 92 C92 98, 104 102, 118 102 C130 102, 138 92, 142 77 Z"
        fill="url(#orangeCitizen)"
      />
    </svg>
  );

  // Full Wordmark with the Green Leaf on the 'i' of Nagrik and Vibrant Green for 'Setu'
  const Wordmark = (
    <div className="flex flex-col">
      <div className={`font-extrabold tracking-tight ${titleSize} flex items-center leading-none`}>
        {/* "Nagrik" in Deep Navy with Leaf Dot on 'i' */}
        <span className="text-[#102a43] flex items-baseline">
          Nagr
          {/* Custom 'i' with Green Leaf Dot */}
          <span className="relative inline-block">
            <span className="text-[#102a43]">ı</span>
            <span className="absolute -top-1.5 -right-0.5 w-2 h-2 text-emerald-600 inline-block rotate-12">
              🍃
            </span>
          </span>
          k
        </span>
        {/* "Setu" in vibrant Emerald Green */}
        <span className="text-[#15803d] ml-0.5">Setu</span>
      </div>

      {(variant === 'full' || variant === 'poster') && (
        <>
          <p className="text-xs text-slate-600 font-medium tracking-normal mt-1">
            Bridging citizen voice and public priorities.
          </p>
          {/* Saffron, White, Green Tricolor Indicator */}
          <div className="flex items-center gap-1 mt-1.5">
            <span className="w-5 h-1 rounded-full bg-orange-500" />
            <span className="w-5 h-1 rounded-full bg-slate-300" />
            <span className="w-5 h-1 rounded-full bg-emerald-600" />
          </div>
        </>
      )}
    </div>
  );

  if (variant === 'emblem') {
    return EmblemSvg;
  }

  if (variant === 'poster') {
    return (
      <div className={`flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
        {EmblemSvg}
        <div className="mt-4">{Wordmark}</div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {EmblemSvg}
      {Wordmark}
    </div>
  );
};
