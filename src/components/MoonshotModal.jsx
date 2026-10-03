import React from 'react';
import { X, Sparkles, Network, Cpu, Globe2, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export default function MoonshotModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#10131E] border border-amber-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl shadow-amber-500/10">
        
        {/* Pitch Slide Header */}
        <div className="bg-gradient-to-r from-[#181D2D] via-[#1F1928] to-[#251A18] p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-700/50">
                  FINAL PITCH SLIDE • THE MOONSHOT
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">
                The Living Company Memory & The World’s Operations Manual
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content: Visual Roadmap & Architecture */}
        <div className="p-8 overflow-y-auto space-y-8 bg-[#0D1018]">
          
          {/* Subtitle Statement */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
              Today's MVP captures <span className="text-orange-400 font-bold">1 expert</span>, <span className="text-blue-400 font-bold">1 task</span>, and coaches <span className="text-emerald-400 font-bold">1 new hire</span>. 
              Here is how that exact architecture scales to build the operational backbone for all enterprise work:
            </p>
          </div>

          {/* 4 Evolutionary Pillars (Direct from Hackathon Brief) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Pillar 1 */}
            <div className="bg-[#141825] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
                  <Network className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">1. The Living Company Memory</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every expert and every workflow connected into one self-updating knowledge graph. When software updates or procedures shift, the apprentice notices the diff and asks only about the delta.
              </p>
              <div className="text-[10px] font-mono text-orange-400 bg-orange-950/40 px-2.5 py-1 rounded-md border border-orange-800/30">
                Zero obsolete documentation. The map stays alive forever.
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#141825] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">2. The Always-On Ambient Apprentice</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                No scheduled training sessions. As employees work in everyday apps, the agent sits silently in the OS background, notices rare exceptions, and asks one single 5-second question at the right pause.
              </p>
              <div className="text-[10px] font-mono text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-800/30">
                Zero disruption. Tacit judgment captured organically.
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#141825] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">3. People First, Then Safe AI Agents</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The exact guardrails extracted to tutor Lena are exported as policy bounds for AI agents. Routine invoice processing is automated, but the agent stops and asks humans at Sabine's exact boundaries.
              </p>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/30">
                Solves Gartner's 40% AI agent cancellation risk.
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#141825] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">4. The World’s Operations Manual</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anonymized Work Maps aggregated across thousands of companies. Teaches the next generation how global digital work is actually done across languages, jurisdictions, and industrial software.
              </p>
              <div className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-800/30">
                Preserving human civilizational know-how before retirement.
              </div>
            </div>

          </div>

          {/* Bottom Callout Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-orange-950/40 border border-amber-500/40 flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">
              "A retiring expert with 24 years of judgment turns into a living Work Map and an active tutor — instead of a farewell party."
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-4">
              ElevenLabs × Hack-Nation 2026
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
