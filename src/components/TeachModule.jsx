import React, { useState } from 'react';
import ERPPortal from './ERPPortal';
import { 
  GraduationCap, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  Award, 
  Sparkles,
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { testCaseLena } from '../data/testCaseLena';
import { expertSessionData } from '../data/expertSession';
import { guardrailEngine } from '../services/guardrailEngine';
import { speechEngine } from '../services/speechEngine';

export default function TeachModule({ 
  piiShieldEnabled,
  isSpeaking,
  language
}) {
  const [interceptionActive, setInterceptionActive] = useState(false);
  const [replayingSabine, setReplayingSabine] = useState(false);
  const [activeViolation, setActiveViolation] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scorecardVisible, setScorecardVisible] = useState(false);

  const [tutorSpeechLog, setTutorSpeechLog] = useState([
    {
      role: "tutor",
      text: "Welcome to your live desk, Lena! I am your AI Tutor. Process this fresh invoice from Kuka Roboter just like Sabine taught us. I will only step in if an invisible guardrail is about to be breached.",
      time: "NOW"
    }
  ]);

  const handleAttemptSave = (formData, invoice) => {
    // Run real-time guardrail validation
    const validation = guardrailEngine.validateInvoiceSubmission(formData, invoice);

    if (!validation.isValid) {
      // PRE-COMMIT INTERCEPTION TRIGGERED!
      const topViolation = validation.violations[0];
      setActiveViolation(topViolation);
      setInterceptionActive(true);
      setReplayingSabine(true);

      const tutorIntervention = testCaseLena.interceptionConfig.tutorPromptEn + " " + testCaseLena.interceptionConfig.tutorExplanationEn;
      
      setTutorSpeechLog(prev => [
        { role: "tutor", text: tutorIntervention, time: "INTERCEPTION", isAlert: true },
        ...prev
      ]);

      // Speak live via ElevenLabs / speech engine
      speechEngine.speak(tutorIntervention, language);
    } else {
      // SUCCESS: Lena followed all guardrails!
      setInterceptionActive(false);
      setReplayingSabine(false);
      setIsSuccess(true);
      setScorecardVisible(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      const praise = "Brilliant job, Lena! You remembered Sabine's golden rule: €7,200 is above the €5,000 threshold, so you correctly classified it as Capex (0400) with asset tag AST-88219. You just prevented a EUR 7,200 opex reporting blunder!";
      
      setTutorSpeechLog(prev => [
        { role: "tutor", text: praise, time: "COMPLETED", isSuccess: true },
        ...prev
      ]);

      speechEngine.speak(praise, language);
    }
  };

  const handleAutoApplySabineFix = () => {
    setInterceptionActive(false);
    setReplayingSabine(false);
    
    // Simulate Lena self-correcting
    const correctedData = {
      costCenter: "0400",
      assetNumber: "AST-88219",
      isHold: false,
      approvalLevel: "Tier-1",
      notes: "Re-coded to Capex per Sabine's €5k rule. Asset tag confirmed."
    };
    handleAttemptSave(correctedData, testCaseLena.invoice);
  };

  const handleResetTest = () => {
    setInterceptionActive(false);
    setReplayingSabine(false);
    setIsSuccess(false);
    setScorecardVisible(false);
    speechEngine.stop();
  };

  return (
    <div className="space-y-5">
      
      {/* Module 3 Context Bar */}
      <div className="bg-[#131724] border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-100">Module 3: AI Voice Tutor & Pre-Commit Interception</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                JUDGE AS NEW HIRE (LENA)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              New unobserved invoice (€7,200 Laser Head) • Intercepts before save • Replays Sabine's exact decision moment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetTest}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Test</span>
          </button>
        </div>
      </div>

      {/* Interception Alert Banner (When Judge/Lena tries to save wrong code) */}
      {interceptionActive && (
        <div className="bg-red-950/40 border-2 border-red-500 p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/40">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  CRITICAL PRE-COMMIT INTERCEPTION
                </span>
                <span className="text-[10px] bg-red-900/60 text-red-200 px-2 py-0.5 rounded font-mono">
                  EUR 7,200 OPEX MISTAKE STOPPED
                </span>
              </div>
              <p className="text-xs font-medium text-white mt-0.5">
                "Sabine would stop here. Equipment over €5,000 is always Capex (0400), not Opex (4711)."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleAutoApplySabineFix}
              className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Sabine's Guardrail Fix</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Live ERP on Left + Tutor Feedback / Replay on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[650px]">
        
        {/* Left: Lena's ERP Workbench */}
        <div className="lg:col-span-8 h-full">
          <ERPPortal
            currentInvoice={testCaseLena.invoice}
            invoices={[testCaseLena.invoice]}
            selectedInvoiceId={testCaseLena.invoice.id}
            onSelectInvoice={() => {}}
            isTutorMode={true}
            onAttemptSave={handleAttemptSave}
            interceptionActive={interceptionActive}
            piiShieldEnabled={piiShieldEnabled}
          />
        </div>

        {/* Right: Tutor Voice Stream & Sabine Moment Replay */}
        <div className="lg:col-span-4 flex flex-col bg-[#10131D] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full">
          
          {/* Header */}
          <div className="bg-[#161B28] p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-100">AI Tutor Watchdog</h3>
                <p className="text-[10px] text-slate-400">Pre-Save Interception & Replay</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded">
              GUARD: ON
            </span>
          </div>

          {/* Replay Sabine's Screen Moment Widget (When Intercepted) */}
          {replayingSabine && (
            <div className="p-4 bg-orange-950/20 border-b border-orange-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Replaying Sabine's Screen Moment (03:12)
                </span>
                <span className="text-[10px] font-mono text-slate-400">INV-4471</span>
              </div>
              <div className="bg-[#0C0E16] p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Sabine's Action:</span>
                  <span className="text-emerald-400 font-bold">4711 ➔ 0400 Capex</span>
                </div>
                <p className="text-xs italic text-slate-200">
                  "{testCaseLena.interceptionConfig.replayedMoment.expertQuote}"
                </p>
              </div>
            </div>
          )}

          {/* Spoken Dialogue Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-800 pb-1">
              Tutor Guidance Transcript:
            </span>

            {tutorSpeechLog.map((log, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs space-y-1 ${
                  log.isAlert
                    ? 'bg-red-950/30 border-red-500/40 text-red-100'
                    : log.isSuccess
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                      : 'bg-[#151926] border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    {log.isAlert ? "⚠ TUTOR WARNING" : log.isSuccess ? "✓ MASTERY VERIFIED" : "TUTOR VOICE"}
                  </span>
                  <span className="text-slate-500">{log.time}</span>
                </div>
                <p className="leading-relaxed">{log.text}</p>
              </div>
            ))}
          </div>

          {/* New Hire Mastery Scorecard (Rubric Question 4: Whether new hire learned) */}
          {scorecardVisible && (
            <div className="p-4 bg-emerald-950/20 border-t border-emerald-500/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span>Lena Becker: Mastery Scorecard</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  100% PASS
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                {testCaseLena.masteryCriteria.map((crit) => (
                  <div key={crit.id} className="flex items-center gap-2 text-slate-200">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{crit.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-[#0C0E16] rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono text-center">
                ✓ Certified for Autonomous Invoice Processing
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
