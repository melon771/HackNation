import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ShieldAlert, 
  Play, 
  Square,
  MessageSquare,
  Activity,
  Check
} from 'lucide-react';

export default function ApprenticeSidebar({
  agentState = "QUIET", // "QUIET" | "TYPING" | "PAUSE_DETECTED" | "SPEAKING" | "INTERCEPTING"
  isOffTheRecord = false,
  onToggleOffTheRecord,
  currentQuestion = null,
  recentEvents = [],
  onTriggerQuestion,
  isSpeaking = false,
  onStopSpeaking,
  language = "en-US",
  onToggleLanguage
}) {
  return (
    <div className="w-full lg:w-96 flex flex-col bg-[#10131C] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full">
      
      {/* Sidebar Header */}
      <div className="bg-[#161B27] p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isOffTheRecord 
                ? 'bg-slate-700 text-slate-400' 
                : isSpeaking 
                  ? 'bg-gradient-to-tr from-[#FF5A36] to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-slate-800 text-orange-400'
            }`}>
              {isOffTheRecord ? <EyeOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </div>
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs text-slate-100">ElevenLabs Voice Copilot</h3>
              <span className="text-[10px] bg-slate-800 text-orange-400 px-1.5 py-0.2 rounded font-mono border border-orange-500/20">
                Scribe v2
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Expressive Realtime Turn-Taking</p>
          </div>
        </div>

        {/* Language Switcher (German / English Stretch Goal #2) */}
        <button
          onClick={onToggleLanguage}
          title="Toggle Sabine's German vs Tutor English"
          className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-[#0E1119] border border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          {language.startsWith('de') ? '🇩🇪 DE' : '🇬🇧 EN'}
        </button>
      </div>

      {/* Realtime Waveform & Agent State Banner */}
      <div className={`p-4 border-b transition-colors duration-300 ${
        isOffTheRecord
          ? 'bg-red-950/20 border-red-900/30'
          : isSpeaking
            ? 'bg-orange-950/20 border-orange-900/30'
            : 'bg-[#131722] border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            Agent Cognitive State:
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${
            isOffTheRecord
              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
              : agentState === 'INTERCEPTING'
                ? 'bg-red-600 text-white animate-bounce'
                : agentState === 'PAUSE_DETECTED'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : isSpeaking
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}>
            {isOffTheRecord ? 'OFF THE RECORD (MUTED)' : agentState}
          </span>
        </div>

        {/* Audio Waveform Visualization */}
        <div className="h-10 bg-[#0B0D14] rounded-xl flex items-center justify-center gap-1 px-3 border border-slate-800/90 overflow-hidden">
          {isOffTheRecord ? (
            <span className="text-[11px] text-red-400/80 font-mono flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5" /> Mic buffer purged. Zero bytes stored.
            </span>
          ) : isSpeaking ? (
            Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-orange-600 to-amber-400 rounded-full waveform-bar"
                style={{
                  height: `${Math.max(6, Math.sin(i * 0.4) * 26 + 10)}px`,
                  animationDelay: `${(i % 5) * 0.15}s`
                }}
              />
            ))
          ) : (
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Quietly observing screen diffs (stays silent while typing)...</span>
            </div>
          )}
        </div>
      </div>

      {/* Trust & Off-The-Record Controller (Apprentice Test Question 5) */}
      <div className="px-4 py-2.5 bg-[#141824] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleOffTheRecord}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isOffTheRecord
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            {isOffTheRecord ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOffTheRecord ? "Resume Recording" : "Take Off-The-Record"}</span>
          </button>
        </div>

        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80"
          >
            <Square className="w-3 h-3 text-red-400" /> Stop Audio
          </button>
        )}
      </div>

      {/* Spoken Dialogue Feed & Transcript */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
            Live Spoken Turn Feed
          </span>
          <span className="font-mono text-slate-500">Natural Pauses &gt; 2.5s</span>
        </div>

        {currentQuestion ? (
          <div className="space-y-3">
            {/* Agent Question */}
            <div className="bg-[#181D2A] p-3.5 rounded-xl border border-orange-500/30 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ElevenLabs Voice Prompt ({currentQuestion.timestamp})
                </span>
                <span className="text-[10px] bg-orange-950 text-orange-300 px-2 py-0.5 rounded border border-orange-700/50">
                  {currentQuestion.category}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-100 italic">
                "{language.startsWith('de') ? currentQuestion.agentQuestionDe : currentQuestion.agentQuestionEn}"
              </p>
            </div>

            {/* Expert Answer */}
            <div className="bg-[#131722] p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Sabine Weimann (Spoken Answer)
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Captured in Work Map
                </span>
              </div>
              <p className="text-xs text-slate-300">
                "{language.startsWith('de') ? currentQuestion.expertAnswerDe : currentQuestion.expertAnswerEn}"
              </p>
            </div>
          </div>
        ) : (
          <div className="h-40 flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-2">
            <Eye className="w-8 h-8 text-slate-600 animate-pulse-slow" />
            <p className="text-xs">Observing workflow silently. When a natural pause occurs after a decision change, the agent will ask why.</p>
          </div>
        )}

        {/* Live Vision Events Stream (Frames -> Business Events) */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Recent Screen Vision Events:
          </span>
          <div className="space-y-1.5 font-mono text-[11px]">
            {recentEvents.map((evt, idx) => (
              <div key={idx} className="bg-[#141824] px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 flex items-center justify-between">
                <span className="truncate">{evt.text}</span>
                <span className="text-slate-500 text-[10px] shrink-0 ml-2">{evt.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Natural Pause Simulation Trigger Buttons for Fast Judge Demos */}
      <div className="p-3 bg-[#131722] border-t border-slate-800 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Judge Live Simulators (Trigger Natural Pauses):
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => onTriggerQuestion(0)}
            className="px-2 py-1.5 rounded bg-[#1C2130] hover:bg-[#252C40] text-[11px] text-slate-200 border border-slate-700 text-center transition-colors truncate"
          >
            Pause 1: Capex
          </button>
          <button
            onClick={() => onTriggerQuestion(1)}
            className="px-2 py-1.5 rounded bg-[#1C2130] hover:bg-[#252C40] text-[11px] text-slate-200 border border-slate-700 text-center transition-colors truncate"
          >
            Pause 2: Asset Tag
          </button>
          <button
            onClick={() => onTriggerQuestion(2)}
            className="px-2 py-1.5 rounded bg-[#1C2130] hover:bg-[#252C40] text-[11px] text-slate-200 border border-slate-700 text-center transition-colors truncate"
          >
            Pause 3: Dec Hold
          </button>
        </div>
      </div>

    </div>
  );
}
