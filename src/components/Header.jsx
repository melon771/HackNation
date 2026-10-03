import React from 'react';
import { 
  Bot, 
  ShieldCheck, 
  Volume2, 
  GitCompare, 
  Download, 
  Sparkles, 
  Settings,
  Layers,
  MapPin,
  GraduationCap
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  piiShieldEnabled, 
  setPiiShieldEnabled,
  onOpenDiff,
  onOpenExport,
  onOpenMoonshot,
  onOpenSettings,
  isSpeaking
}) {
  return (
    <header className="border-b border-eleven-border bg-[#0E1118]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5A36] to-[#FF8C36] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  AI Apprentice
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A36]/15 text-[#FF5A36] border border-[#FF5A36]/30">
                  ElevenLabs Core
                </span>
              </div>
              <p className="text-xs text-slate-400">Tacit Knowledge Capture & Pre-Commit Voice Tutor</p>
            </div>
          </div>

          {/* Quick Voice / Speaking Indicator for Mobile */}
          <div className="md:hidden flex items-center gap-2">
            {isSpeaking && (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </div>
        </div>

        {/* 3 Core Module Tabs (Required by Challenge 01) */}
        <div className="flex items-center bg-[#151923] p-1 rounded-xl border border-slate-800/80 shadow-inner w-full md:w-auto justify-center">
          <button
            onClick={() => setActiveTab('capture')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'capture'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Capture (Sabine)</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>2. Clickable Work Map</span>
          </button>

          <button
            onClick={() => setActiveTab('teach')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'teach'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>3. Teach (Lena's Test)</span>
          </button>
        </div>

        {/* Action Controls & Stretch Modals */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* PII Shield Button */}
          <button
            onClick={() => setPiiShieldEnabled(!piiShieldEnabled)}
            title="Microsoft Presidio-compliant PII Redaction"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              piiShieldEnabled
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50'
                : 'bg-slate-800/40 text-slate-400 border-slate-700'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${piiShieldEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">PII Shield</span>
            <span className={`text-[10px] px-1 py-0.2 rounded ${piiShieldEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
              {piiShieldEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Expert Diff (Stretch Goal 1) */}
          <button
            onClick={onOpenDiff}
            title="Stretch Goal 1: Compare Sabine vs Klaus"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#161B26] hover:bg-[#1E2433] border border-slate-700/60 transition-colors"
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden lg:inline">Expert Diff</span>
          </button>

          {/* Export Agent Guardrails (Stretch Goal 3) */}
          <button
            onClick={onOpenExport}
            title="Stretch Goal 3: Export Agent-Ready JSON Guardrails"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#161B26] hover:bg-[#1E2433] border border-slate-700/60 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline">Export Policy</span>
          </button>

          {/* Moonshot Slide */}
          <button
            onClick={onOpenMoonshot}
            title="Pitch Slide: Living Company Memory"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-600/40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Moonshot</span>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="ElevenLabs Settings"
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-[#161B26] hover:bg-[#1E2433] border border-slate-700/60 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
