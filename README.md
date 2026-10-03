# 🎙️ The AI Apprentice: Accelerating the World's Digital Operations
### Built for the 7th Global AI Hackathon (Hack-Nation) • Challenge 01 — Powered by ElevenLabs

[![ElevenLabs](https://img.shields.io/badge/Powered%20By-ElevenLabs-FF5A36?style=for-the-badge&logo=elevenlabs&logoColor=white)](https://elevenlabs.io)
[![Scribe v2](https://img.shields.io/badge/Voice%20Turn--Taking-Scribe%20v2-2B6CB0?style=for-the-badge)](https://elevenlabs.io)
[![Hackathon](https://img.shields.io/badge/Hack--Nation-Challenge%2001-orange?style=for-the-badge)](https://hacknation.ai)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Summary & Motivation
Across the globe, the most experienced generation in human history is retiring:
* **11,200 Americans turn 65 every day.**
* **In Germany, 12.9 million workers (30% of the labor force) will reach retirement age by 2036.**
* **Over 1.6 billion people worldwide will be 65+ by 2050.**

When senior operators like **Sabine Weimann** (57, Accounts Payable lead with 24 years at Stuttgart Machine Works) retire, decades of tacit judgment walk out the door. Standard screen recordings and process documentation only capture *what* was clicked—never *why* or what invisible guardrails keep the business safe.

**The AI Apprentice** closes this civilizational knowledge gap:
1. **Watches & Asks Why:** Observes screen diffs silently and speaks *only at natural pauses* to capture hidden rules.
2. **Maps the Tacit Playbook:** Synthesizes the session into an interactive, clickable **Work Map** where every step links to an exact screen moment, expert audio quote, and guardrail.
3. **Pre-Commit Voice Tutor:** Coaches a new hire (Lena) on an unseen case and intercepts a costly **€7,200 opex reporting blunder** before it can ever be saved!

---

## 🏆 All 3 Mandatory Modules (Implemented & Verified)

### 1. CAPTURE (`Module 1`)
* **Real-time Screen Diffing:** Samples 1 frame every 1.5 seconds and extracts business state changes (`INV-4471 opened`, `Cost center re-mapped from 4711 to 0400`).
* **Non-Intrusive Turn-Taking:** The agent stays quiet while the expert types or navigates.
* **Natural Pause Detector:** Requires $>2.5$ seconds of idle pause and frame stability before speaking.
* **The 3 Tacit Questions:**
  1. *Decision Judgment (03:15):* *"You moved invoice 4471 from 4711 to 0400 without hesitation. What made you do that?"*
  2. *Mandatory Guardrail (03:42):* *"I notice you paused before confirming the capex code. Is there a strict limit or condition before you are allowed to book it?"*
  3. *Exception Guardrail (05:50):* *"You placed Bauer Logistik on hold. Is that standard for all December invoices, or is this supplier an exception?"*

### 2. MAP (`Module 2`)
* **Post-Task Spoken Debrief:** Surfaces 3 unobserved gaps and edge cases:
  1. *Mixed Invoices:* Hardware exceeding €5,000 bundled with consumables.
  2. *Unfreezing Authority:* Who signs off on releasing December vendor holds.
  3. *Cumulative Capex Orders:* Multi-part machine tool bundling.
* **Spoken Teach-Back Summary:** Synthesizes the operational playbook in under 1 minute; Sabine confirms with one click.
* **Clickable Work Map:** 7 interactive steps, 3 judgment points, 4 guardrails, complete with timestamps, screen snippets, and Sabine's spoken quotes.

### 3. TEACH (`Module 3`)
* **Live Sandbox Test:** Judge or new hire (Lena) opens an unobserved case: **Invoice #5012 (€7,200 Fiber Laser Head)**.
* **Pre-Commit Interception:** If Lena leaves the cost center as Opex (4711) and clicks *Approve & Post to General Ledger*, the system locks the submit action!
* **Tutor Audio Intervention:** A calm ElevenLabs voice steps in:
  > *"Wait, Lena! Sabine would stop here before saving. Why do you think? Equipment over €5,000 must always be Capex (0400) and requires an asset tag. Booking this as Opex causes an immediate EUR 7,200 financial reporting error!"*
* **Replay Sabine's Moment:** Pulls up Sabine's exact timestamp (`03:12`) and voice snippet.
* **Mastery Scorecard:** 100% Guardrail Adherence, Error Caught Pre-Save, Certified for Production.

---

## 🎯 The Apprentice Test: Rubric Q&A

| Rubric Question | Winning Answer & Architecture |
| :--- | :--- |
| **1. When to ask** | Monitored by the Natural Pause Detector. Scribe v2 checks audio silence, DOM event idle time ($>2.5s$), and viewport pixel stability. The agent **never** interrupts active typing. |
| **2. What to ask** | Diffing visual changes against known rule schema. Rather than asking *"What did you click?"*, the engine detects semantic anomalies (e.g. changing default 4711 to 0400 or flagging a vendor) and asks for the **boundary threshold** and **stop-and-ask limits**. |
| **3. When it has understood** | Evaluated via a Knowledge Coverage Matrix. The debrief asks targeted questions on 3 missing dimensions (exceptions, mixed orders, authorization tiers) and generates a spoken Teach-Back that the expert validates. |
| **4. Whether the new hire learned** | Proven through an unobserved test invoice (#5012). The tutor intercepts Lena's error before commit, coaches her with Sabine's rationale, allows self-correction, and issues a verified Mastery Scorecard. |
| **5. Trust & Privacy** | **Off-the-Record Controller:** Expert can toggle the privacy switch or say *"Take this off the record"*, instantly muting the mic, blanking the frame stream, and wiping temporary memory buffers. **PII Shield:** Redacts IBANs, Tax IDs, and employee names in real-time. |

---

## 🚀 Stretch Goals (All 3 Included!)

1. **Multi-Expert Workflow Diffing (Sabine vs. Klaus):**
   * Side-by-side comparison between Senior Expert Sabine (24y) and Junior Peer Klaus (3y).
   * Identifies where Klaus missed the €5k Capex threshold and failed to freeze Bauer Logistik's December invoice, exposing €8,050 in corporate risk.
2. **Bilingual German 🇩🇪 ➔ English 🇬🇧 Localization:**
   * Sabine explains in natural German (*"Geräte über 5.000 € sind immer Investitionsausgaben..."*).
   * Lena's tutor seamlessly translates and coaches in English, with an instant one-click toggle across the UI.
3. **Export Agent-Ready Guardrails:**
   * One-click download of machine-readable **JSON Schema** / YAML policies (`sabine_agent_guardrails_v1.json`).
   * Ready to load into LangGraph, AutoGen, and ElevenAgents tools so autonomous AI agents respect the same human boundaries.

---

## 🌌 The Moonshot: The Living Company Memory
* **The Living Company Memory:** A self-updating organizational graph. When workflows change, the apprentice only asks about the delta.
* **The Always-On Apprentice:** Ambient background observation that notices edge cases during everyday work with zero scheduled training sessions.
* **People First, Then Safe AI Agents:** Retiring human judgment directly programs safety bounds for autonomous agents, preventing the 40% AI agent cancellation risk cited by Gartner.
* **The World’s Operations Manual:** Cross-company anonymized Work Maps preserving human operational know-how for humanity.

---

## 🛠️ Quickstart Guide

### Prerequisites
* **Node.js**: v18+ (tested on v22.18.0)
* **Python**: 3.10+ (for backend API services)

### Running the Application

```bash
# 1. Clone repository & install dependencies
cd Hack_nation
npm run build

# 2. Start the Vite Dev Server
npm run dev
```

Open your browser to:
👉 **`http://localhost:5173`**

### Running the Optional Python FastAPI Backend
```bash
python -m uvicorn server.app:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation available at: `http://localhost:8000/docs`

---

## 📂 Project Architecture

```
Hack_nation/
├── dist/                              # Production build artifacts (Vite)
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Top bar, module switcher, PII badge
│   │   ├── ERPPortal.jsx              # Realistic Stuttgart Machine Works ERP
│   │   ├── ApprenticeSidebar.jsx      # ElevenLabs Voice Copilot with waveform
│   │   ├── CaptureModule.jsx          # Module 1: Screen observation & Q&A
│   │   ├── WorkMapModule.jsx          # Module 2: Clickable 7-step Work Map
│   │   ├── TeachModule.jsx            # Module 3: Pre-commit interception & tutor
│   │   ├── ExpertDiffModal.jsx        # Stretch 1: Sabine vs Klaus diff
│   │   ├── AgentExportModal.jsx       # Stretch 3: Agent-ready JSON policy
│   │   ├── MoonshotModal.jsx          # Moonshot pitch deck slide
│   │   └── SettingsModal.jsx          # ElevenLabs API key & voice selector
│   ├── data/
│   │   ├── expertSession.js           # Sabine's 3 invoices, 7 steps, 4 guardrails
│   │   ├── testCaseLena.js            # Lena's €7,200 Laser Head invoice (#5012)
│   │   └── agentGuardrailsExport.json # JSON Schema policy for AI agents
│   ├── services/
│   │   ├── speechEngine.js            # ElevenLabs REST + Web Speech API fallback
│   │   ├── guardrailEngine.js         # Real-time pre-commit validation engine
│   │   └── piiMasker.js               # Presidio-style real-time PII anonymizer
│   ├── App.jsx                        # Master layout & state management
│   ├── index.css                      # Tailwind styling & animations
│   └── main.jsx                       # React DOM entry point
├── server/
│   ├── app.py                         # FastAPI backend service
│   └── requirements.txt               # Backend dependencies
├── Eleven_labs_PS.pdf                 # Official Hackathon Challenge Brief
├── package.json                       # Node dependencies & build scripts
└── README.md                          # Comprehensive submission document
```

---

## 💡 Tech Stack
* **Voice & Turn-Taking:** ElevenLabs Conversational AI, Scribe v2, Web Speech API fallback.
* **Frontend:** React 18, Tailwind CSS, Lucide Icons, Canvas Confetti.
* **Build System:** Vite 5.
* **Backend:** FastAPI, Pydantic, Uvicorn, Python 3.10.
* **Privacy & Trust:** Microsoft Presidio-inspired pattern redaction (IBANs, Tax IDs).

---
*Built with ❤️ and a winner's mindset for the 7th Global AI Hackathon.*
