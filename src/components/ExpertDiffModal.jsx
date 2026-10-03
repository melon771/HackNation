import React from 'react';
import { X, GitCompare, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { expertSessionData } from '../data/expertSession';

export default function ExpertDiffModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const diffData = expertSessionData.klausDiffSession;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121622] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-[#171D2D] p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Stretch Goal 1: Multi-Expert Workflow Diffing</h3>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono border border-purple-700/40">
                  DIFF ENGINE ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Comparing Sabine Weimann (Senior, 24y) vs Klaus Hoffmann (Junior Peer, 3y) on identical invoices
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Summary Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#161C2A] p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Senior Expert</span>
              <span className="font-bold text-sm text-slate-100 block">Sabine Weimann</span>
              <span className="text-xs text-emerald-400 font-mono">0 Errors • 4 Guardrails Upheld</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Peer Comparison</span>
              <span className="font-bold text-sm text-slate-100 block">{diffData.expertName}</span>
              <span className="text-xs text-red-400 font-mono">2 Critical Guardrail Bypasses</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Financial Risk</span>
              <span className="font-bold text-sm text-amber-400 font-mono block">€8,050.00 At Risk</span>
              <span className="text-xs text-slate-400">Misallocated Opex & Duplicate Billed</span>
            </div>
          </div>

          {/* Divergence Cards */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Identified Tacit Discrepancies & Divergence Points:
            </h4>

            {diffData.divergencePoints.map((point, idx) => (
              <div key={idx} className="bg-[#151926] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="font-mono text-xs font-bold text-blue-400">{point.invoiceId}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    {point.diffCategory}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sabine's Approach */}
                  <div className="bg-[#11141E] p-3 rounded-lg border border-emerald-900/40 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sabine's Action (Golden Standard)
                    </span>
                    <p className="text-xs text-slate-200">{point.sabineAction}</p>
                  </div>

                  {/* Klaus's Approach */}
                  <div className="bg-[#11141E] p-3 rounded-lg border border-red-900/40 space-y-1">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Klaus's Action (Implicit Trap)
                    </span>
                    <p className="text-xs text-slate-200">{point.klausAction}</p>
                  </div>
                </div>

                {/* Financial & Business Impact */}
                <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-lg flex items-center gap-2 text-xs text-amber-200">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Business Impact:</strong> {point.impact}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#171D2D] p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Close Diff Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
