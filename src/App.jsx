import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CaptureModule from './components/CaptureModule';
import WorkMapModule from './components/WorkMapModule';
import TeachModule from './components/TeachModule';
import ExpertDiffModal from './components/ExpertDiffModal';
import AgentExportModal from './components/AgentExportModal';
import MoonshotModal from './components/MoonshotModal';
import SettingsModal from './components/SettingsModal';
import { speechEngine } from './services/speechEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('capture');
  const [piiShieldEnabled, setPiiShieldEnabled] = useState(true);
  const [language, setLanguage] = useState('en-US'); // 'en-US' or 'de-DE'
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals state
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isMoonshotOpen, setIsMoonshotOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Subscribe to speech engine state
  useEffect(() => {
    const unsubscribe = speechEngine.subscribe((event) => {
      if (event === 'start') setIsSpeaking(true);
      if (event === 'end') setIsSpeaking(false);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleLanguage = () => {
    setLanguage(prev => prev.startsWith('de') ? 'en-US' : 'de-DE');
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] text-slate-100 flex flex-col font-['Inter'] selection:bg-orange-500 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        piiShieldEnabled={piiShieldEnabled}
        setPiiShieldEnabled={setPiiShieldEnabled}
        onOpenDiff={() => setIsDiffOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenMoonshot={() => setIsMoonshotOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSpeaking={isSpeaking}
      />

      {/* Main Module Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {activeTab === 'capture' && (
          <CaptureModule
            piiShieldEnabled={piiShieldEnabled}
            onProceedToMap={() => setActiveTab('map')}
            isSpeaking={isSpeaking}
            language={language}
            onToggleLanguage={handleToggleLanguage}
          />
        )}

        {activeTab === 'map' && (
          <WorkMapModule
            onProceedToTeach={() => setActiveTab('teach')}
            isSpeaking={isSpeaking}
            language={language}
            onToggleLanguage={handleToggleLanguage}
          />
        )}

        {activeTab === 'teach' && (
          <TeachModule
            piiShieldEnabled={piiShieldEnabled}
            isSpeaking={isSpeaking}
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>7th Global AI Hackathon • Challenge 01: The AI Apprentice</span>
          <span className="font-mono text-slate-400">Powered by ElevenLabs Voice & Scribe v2</span>
        </div>
      </footer>

      {/* Modals for Stretch Goals & Moonshot */}
      <ExpertDiffModal isOpen={isDiffOpen} onClose={() => setIsDiffOpen(false)} />
      <AgentExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <MoonshotModal isOpen={isMoonshotOpen} onClose={() => setIsMoonshotOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
}
