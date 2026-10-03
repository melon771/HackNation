import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Volume2, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  FileCheck,
  ChevronRight,
  Globe
} from 'lucide-react';
import { expertSessionData } from '../data/expertSession';
import { speechEngine } from '../services/speechEngine';

export default function WorkMapModule({
  onProceedToTeach,
  isSpeaking,
  language,
  onToggleLanguage
}) {
  const [selectedStep, setSelectedStep] = useState(expertSessionData.steps[2]); // Step 3 (Capex) by default
  const [expertConfirmed, setExpertConfirmed] = useState(false);
  const [activeDebriefGap, setActiveDebriefGap] = useState(0);

  const handlePlayTeachBack = () => {
    speechEngine.speak(expertSessionData.debriefSession.teachBackSummaryEn, language);
  };

  const handleConfirmMap = () => {
    setExpertConfirmed(true);
    speechEngine.speak(expertSessionData.debriefSession.expertConfirmationResponse, language);
  };

  return (
    <div className="space-y-6">
      
      {/* Module 2 Top Header */}
      <div className="bg-[#131724] border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-100">Module 2: Clickable Work Map & Spoken Debrief</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                7 STEPS • 3 JUDGMENTS • 4 GUARDRAILS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Each step links to a screen timestamp, Sabine's exact quote, and explicit boundary rules.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#181D2B] border border-slate-700 text-slate-300 hover:text-white"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{language.startsWith('de') ? 'Sprache: Deutsch' : 'Lang: English'}</span>
          </button>

          <button
            onClick={onProceedToTeach}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
          >
            <span>Proceed to Teach (Lena)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Spoken Debrief Section (Required: Surfaces >= 3 newly-found gaps & ends with teach-back) */}
      <div className="bg-[#101420] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Post-Task Voice Debrief
            </span>
            <h3 className="font-bold text-sm text-slate-200">Surfacing 3 Tacit Knowledge Gaps & Unseen Exceptions</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayTeachBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Hear Spoken Teach-Back</span>
            </button>

            <button
              onClick={handleConfirmMap}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                expertConfirmed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{expertConfirmed ? "Expert Verified ✓" : "Sabine Sign-off"}</span>
            </button>
          </div>
        </div>

        {/* 3 Debrief Gaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {expertSessionData.debriefSession.gapsIdentified.map((gap, idx) => (
            <div
              key={idx}
              onClick={() => setActiveDebriefGap(idx)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                activeDebriefGap === idx
                  ? 'bg-[#181E2E] border-blue-500/80 shadow-md shadow-blue-500/10'
                  : 'bg-[#131724] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>GAP #{gap.gapNumber}</span>
                <span className="text-blue-400">Debrief Question</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 mb-1.5">{gap.title}</h4>
              <p className="text-[11px] text-slate-400 italic mb-2">"{gap.question}"</p>
              <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40 font-mono">
                <span className="font-bold text-emerald-400">Sabine:</span> {gap.resolution}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clickable Work Map: Steps List + Focused Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 7 Steps Timeline List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            <span>Operational Steps Timeline</span>
            <span>Click to Inspect</span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {expertSessionData.steps.map((step) => {
              const isSelected = selectedStep.stepNumber === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setSelectedStep(step)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1A2030] border-blue-500 shadow-md shadow-blue-500/20 text-white'
                      : 'bg-[#121622] border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {step.stepNumber}
                    </span>
                    <div>
                      <h4 className="text-xs font-semibold">{step.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {step.timestamp}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">{step.screenZone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.isGuardrail && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Guardrail
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Step Inspector Card */}
        <div className="lg:col-span-7 bg-[#111520] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-5">
          
          <div className="space-y-4">
            {/* Step Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                  STEP {selectedStep.stepNumber} OF 7 DETAILS
                </span>
                <h3 className="font-extrabold text-base text-white">{selectedStep.title}</h3>
              </div>
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Moment: {selectedStep.timestamp}
              </span>
            </div>

            {/* Screen Moment Snippet / Simulated Crop */}
            <div className="bg-[#0B0D14] rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Screen Moment & Target Field
              </span>
              <div className="flex items-center justify-between bg-[#151A26] p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-slate-200">{selectedStep.screenZone}</span>
                </div>
                <span className="text-xs font-mono font-semibold text-blue-400">{selectedStep.decision}</span>
              </div>
            </div>

            {/* Expert Quote & Spoken Context */}
            <div className="bg-[#161B28] p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> Sabine's Voice Quote (Live Capture)
                </span>
                <button
                  onClick={() => speechEngine.speak(language.startsWith('de') ? selectedStep.expertQuoteDe : selectedStep.expertQuoteEn, language)}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded"
                >
                  <Volume2 className="w-3 h-3 text-orange-400" /> Play Voice
                </button>
              </div>
              <p className="text-xs font-medium text-slate-100 italic leading-relaxed">
                "{language.startsWith('de') ? selectedStep.expertQuoteDe : selectedStep.expertQuoteEn}"
              </p>
            </div>

            {/* Hard Guardrail Box */}
            <div className="bg-amber-950/20 border border-amber-500/40 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Extracted Guardrail & Operating Boundary</span>
              </div>
              <p className="text-xs text-amber-200/90 font-mono">
                {selectedStep.guardrail}
              </p>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Verified by: Sabine Weimann (Lead AP)</span>
            <span className="font-mono text-emerald-400">Status: Enforced by AI Tutor</span>
          </div>

        </div>

      </div>

    </div>
  );
}
