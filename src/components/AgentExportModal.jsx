import React, { useState } from 'react';
import { X, Download, Copy, Check, FileJson, Sparkles } from 'lucide-react';
import agentGuardrails from '../data/agentGuardrailsExport.json';

export default function AgentExportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(agentGuardrails, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "sabine_agent_guardrails_v1.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121622] border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#171D2D] p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Stretch Goal 3: Export Agent-Ready Guardrails</h3>
                <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded font-mono border border-blue-700/40">
                  JSON SCHEMA v2020-12
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Machine-readable policy schema ready for LangGraph, AutoGen, and ElevenAgents Tools
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

        {/* JSON Preview Container */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#0A0C13]">
          <pre className="text-xs font-mono text-emerald-400 p-4 rounded-xl bg-[#0F121C] border border-slate-800 overflow-x-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#171D2D] p-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            4 Hard Guardrails • 1 Pre-Validation Hook
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy JSON"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Policy File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
