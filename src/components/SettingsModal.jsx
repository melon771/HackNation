import React, { useState } from 'react';
import { X, Key, Volume2, Save, Sparkles, Check } from 'lucide-react';
import { speechEngine } from '../services/speechEngine';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [apiKey, setApiKey] = useState(localStorage.getItem('elevenlabs_api_key') || '');
  const [voiceId, setVoiceId] = useState(localStorage.getItem('elevenlabs_voice_id') || '21m00Tcm4TlvDq8ikWAM');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    speechEngine.setApiKey(apiKey);
    speechEngine.setVoiceId(voiceId);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121622] border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#171D2D] p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Key className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm text-white">Voice & Engine Configuration</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              ElevenLabs API Key (Optional):
            </label>
            <input
              type="password"
              placeholder="sk_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0C0E16] border border-slate-700 text-xs font-mono text-slate-200 focus:border-orange-500"
            />
            <p className="text-[11px] text-slate-400">
              If omitted or invalid, the app automatically switches to high-fidelity Web Speech API with zero interruption.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Tutor Voice Persona:
            </label>
            <select
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0C0E16] border border-slate-700 text-xs text-slate-200 focus:border-orange-500"
            >
              <option value="21m00Tcm4TlvDq8ikWAM">Rachel — Calm, Patient Mentor (Default)</option>
              <option value="EXAVITQu4vr4xnSDxMaL">Bella — Expressive Inquisitive Guide</option>
              <option value="JBFqnCBsd6RMkjVDRZzb">George — Experienced Enterprise Auditor</option>
              <option value="ErXwobaYiN019PkySvjV">Antoni — Technical Accounting Lead</option>
            </select>
          </div>

          <div className="bg-[#161B27] p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="text-orange-400 font-bold block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Expressive Turn-Taking Ready
            </span>
            <p>Natural pause threshold set to 2.5s idle. Screen diff sampling rate: 1.5s.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#171D2D] p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/30 transition-all"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Saved Settings!" : "Save Configuration"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
