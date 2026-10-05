# NagrikSetu (नागरिकसेतू)
> **Pronunciation:** Na-grik Say-tu  
> **Tagline:** *Bridging citizen voice and public priorities.*

NagrikSetu is a multilingual civic-tech and **Digital Public Infrastructure (DPI)** prototype that transforms scattered citizen development requests into organized, explainable infrastructure-demand hotspots for policymakers to review alongside municipal baseline indicators and ongoing capital projects.

---

## 🏛️ What NagrikSetu Is (and Is Not)

- **NOT a generic chatbot:** NagrikSetu does not provide hallucinated conversational answers or replace municipal personnel.
- **NOT a scheme-discovery portal:** It does not replace myScheme, UMANG, or national entitlement catalogs.
- **NOT an automatic budget allocator:** AI provides decision-support organization and clustering; **humans make final policy, verification, funding, and engineering execution decisions.**
- **It IS an explainable aggregation engine:** Converts vernacular citizen voice (Marathi, Hindi, English) into deterministic 0–100 priority signals with complete mathematical transparency.

---

## 🚀 Key Features

1. **Multilingual Ingestion:**
   - Supports **Marathi (मराठी)**, **Hindi (हिन्दी)**, and **English**.
   - Optional speech-to-text / microphone interface with real-time audio transcription and simulated fallback.
   - Intelligent local multilingual NLP engine: language detection, semantic translation, plain-language summaries, category inference, and urgency tagging.

2. **Responsible AI & Human-in-the-Loop Governance:**
   - Strict algorithmic boundary: AI assists in organization and clustering, never in funding or policy approvals.
   - Transparent AI confidence indicators (e.g., 92%) and "Low confidence — human review required" banners.
   - Uncertainty flags for localized reports requiring physical engineering ground-truthing.

3. **Privacy by Design & Data Minimization:**
   - **Zero Aadhaar or national identity ingestion.**
   - Anonymous reporting supported by default.
   - Approximate geographic ward tagging (Area 1 – Area 5) instead of intrusive home tracking.

4. **Deterministic 5-Factor Priority Scoring (0–100):**
   - **Infrastructure Gap (30%):** Deficiency measured against baseline municipal audits.
   - **Urgency & Severity (25%):** Weighted proportion of critical/high-severity hazard reports.
   - **Equity & Vulnerability Context (20%):** Area socio-economic vulnerability rating.
   - **Unique Requests per 1,000 Residents (15%):** Density-normalized demand rate.
   - **Readiness to Act (10%):** Overlap with planned or active capital projects to enable variation orders or accelerated tendering.

5. **Complete Vertical Slice & 5 Core Screens:**
   - **Screen 1 (Citizen Home):** High-trust landing page, DPI framing, privacy pledge.
   - **Screen 2 (Citizen Submission):** Multilingual form, voice-to-text, real-time AI normalization preview, unique reference generation (e.g., `NS-2026-W3-0101`).
   - **Screen 3 (Citizen Tracking):** Real-time administrative progression timeline (*Received → Under Review → Needs Verification → Planned → In Progress → Completed*) with audit notes.
   - **Screen 4 (Policymaker Dashboard):** High-level metrics, interactive clickable 5-area pilot map, multi-criteria filters, demand hotspot cards, and full citizen intake table.
   - **Screen 5 (Priority Detail Evidence Panel):** Deep-dive evidence panel with exact score math, "Why is this highlighted?" explanation, municipal project overlaps, and policymaker action controls.

6. **Interactive 15-Step Evaluator Demo Tour:**
   - Built-in 3-minute guided walkthrough drawer demonstrating the complete 15-step chain requested in the brief.

---

## 🏗️ Architecture

```
Frontend (React 19, TypeScript, Tailwind CSS v4, Lucide Icons)
  │
  ├── Application & Service Layer
  │     ├── storage.ts          (State persistence & audit logs in localStorage)
  │     ├── hotspotEngine.ts    (Aggregation & demand clustering)
  │     └── priorityScorer.ts   (Deterministic 5-factor scoring engine)
  │
  ├── AI Processing Layer
  │     └── aiProcessing.ts     (Multilingual NLP: Marathi/Hindi/English tokenizers,
  │                              normalization, urgency detection & uncertainty flags)
  │
  └── Data Layer
        ├── seedData.ts         (40+ authentic synthetic citizen complaints,
        │                        infrastructure indicators, and capital projects)
        └── translations.ts     (Full multilingual UI dictionary)
```

---

## 📊 Pilot Geography (Synthetic Demonstration Data)

All pilot data is explicitly labeled as **Demo / Synthetic Data**:
- **Area 1:** North Ward (Vidya Vihar) — Pop: 14,200 (Industrial & Mixed Zone)
- **Area 2:** East Ward (Shivaji Nagar) — Pop: 22,500 (High-Density Residential)
- **Area 3:** Central Ward (Nehru Chowk) — Pop: 8,500 (Transit & Market Hub; primary 17-request water hotspot)
- **Area 4:** West Ward (Subhash Nagar) — Pop: 11,800 (Peri-urban Settlement)
- **Area 5:** South Ward (Ambedkar Colony) — Pop: 6,900 (Hillside Periphery)

---

## 💻 Running Locally

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd nagriksetu

# Install dependencies
npm install

# Start the Vite development server (Port 3000)
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 🔒 Responsible AI & Privacy Disclaimers
- All sample citizen reports, project names, and infrastructure indicators are synthetic demonstration artifacts.
- AI provides decision support and organization; human officials make final policy, verification, and funding decisions.
