import React, { useState } from 'react';
import ERPPortal from './ERPPortal';
import ApprenticeSidebar from './ApprenticeSidebar';
import { 
  Video, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { expertSessionData } from '../data/expertSession';
import { speechEngine } from '../services/speechEngine';

export default function CaptureModule({
  piiShieldEnabled,
  onProceedToMap,
  isSpeaking,
  language,
  onToggleLanguage
}) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("INV-4471");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [agentState, setAgentState] = useState("QUIET");
  const [isOffTheRecord, setIsOffTheRecord] = useState(false);
  const [askedQuestionsCount, setAskedQuestionsCount] = useState(1);

  const [recentEvents, setRecentEvents] = useState([
    { text: "Invoice INV-4471 opened in SAP workspace", time: "01:05" },
    { text: "Tax ID & IBAN verified against master vendor ledger", time: "01:10" },
    { text: "Cost center re-mapped from 4711 -> 0400", time: "03:12" },
    { text: "Natural pause detected (3.2s typing idle)", time: "03:15" },
  ]);

  const currentInvoice = expertSessionData.invoices.find(inv => inv.id === selectedInvoiceId) || expertSessionData.invoices[0];
  const currentQuestion = expertSessionData.liveQuestions[activeQuestionIndex];

  const handleTriggerQuestion = (index) => {
    setActiveQuestionIndex(index);
    const q = expertSessionData.liveQuestions[index];
    
    // Switch to relevant invoice
    if (index === 0 || index === 1) setSelectedInvoiceId("INV-4471");
    if (index === 2) setSelectedInvoiceId("INV-4472");

    setAgentState("PAUSE_DETECTED");
    
    setTimeout(() => {
      setAgentState("SPEAKING");
      const textToSpeak = language.startsWith('de') ? q.agentQuestionDe : q.agentQuestionEn;
      speechEngine.speak(textToSpeak, language);
      
      setAskedQuestionsCount(prev => Math.max(prev, index + 1));
      
      setRecentEvents(prev => [
        { text: `Agent asked question on ${q.category}`, time: q.timestamp },
        ...prev.slice(0, 4)
      ]);
    }, 600);
  };

  const handleToggleOffTheRecord = () => {
    const nextVal = !isOffTheRecord;
    setIsOffTheRecord(nextVal);
    if (nextVal) {
      speechEngine.stop();
      setAgentState("OFF_RECORD");
      setRecentEvents(prev => [
        { text: "🔒 OFF-THE-RECORD ACTIVE: Frame stream paused & memory wiped", time: "NOW" },
        ...prev.slice(0, 4)
      ]);
    } else {
      setAgentState("QUIET");
      setRecentEvents(prev => [
        { text: "▶ Recording resumed: Encrypted audit capture online", time: "NOW" },
        ...prev.slice(0, 4)
      ]);
    }
  };

  const handleStopSpeaking = () => {
    speechEngine.stop();
    setAgentState("QUIET");
  };

  return (
    <div className="space-y-4">
      
      {/* Module 1 Context Bar */}
      <div className="bg-[#131724] border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-100">Module 1: Real-Time Tacit Knowledge Capture</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE SESSION: SABINE (24 YRS EXP)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Vision events sampled every 1.5s • Agent stays quiet during active typing • Speaks only at natural pauses (&gt;2.5s)
            </p>
          </div>
        </div>

        {/* Requirements Meter (Challenge Brief Rubric) */}
        <div className="flex items-center gap-4 bg-[#0D1017] px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-semibold block">Spoken Questions Asked:</span>
            <span className="text-xs font-mono font-bold text-orange-400">
              {askedQuestionsCount} / 3 Required (1 Guardrail)
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((num) => (
              <span
                key={num}
                className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  askedQuestionsCount >= num ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onProceedToMap}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all ml-2"
          >
            <span>Proceed to Work Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace: ERP Sandbox + ElevenLabs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[680px]">
        {/* Left Side: Sandbox ERP */}
        <div className="lg:col-span-8 h-full">
          <ERPPortal
            currentInvoice={currentInvoice}
            invoices={expertSessionData.invoices}
            selectedInvoiceId={selectedInvoiceId}
            onSelectInvoice={(id) => {
              setSelectedInvoiceId(id);
              if (id === "INV-4471") handleTriggerQuestion(0);
              if (id === "INV-4472") handleTriggerQuestion(2);
            }}
            isTutorMode={false}
            piiShieldEnabled={piiShieldEnabled}
          />
        </div>

        {/* Right Side: ElevenLabs Voice Companion */}
        <div className="lg:col-span-4 h-full">
          <ApprenticeSidebar
            agentState={agentState}
            isOffTheRecord={isOffTheRecord}
            onToggleOffTheRecord={handleToggleOffTheRecord}
            currentQuestion={currentQuestion}
            recentEvents={recentEvents}
            onTriggerQuestion={handleTriggerQuestion}
            isSpeaking={isSpeaking}
            onStopSpeaking={handleStopSpeaking}
            language={language}
            onToggleLanguage={onToggleLanguage}
          />
        </div>
      </div>

    </div>
  );
}
