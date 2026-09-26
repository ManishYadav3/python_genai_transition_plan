import React, { useState } from 'react';
import { AISettings } from '../../services/notesStorage';
import { X, Key, ShieldCheck, Cpu, Save } from 'lucide-react';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSaveSettings: (settings: AISettings) => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [endpointUrl, setEndpointUrl] = useState(settings.endpointUrl);
  const [model, setModel] = useState(settings.model);
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      apiKey: apiKey.trim(),
      endpointUrl: endpointUrl.trim() || 'https://api.openai.com/v1',
      model: model.trim() || 'gpt-4o-mini'
    });
    onClose();
  };

  const applyPreset = (presetEndpoint: string, presetModel: string) => {
    setEndpointUrl(presetEndpoint);
    setModel(presetModel);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                AI Explanation Settings
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                BYOK (Bring Your Own Key) • Stored strictly in local browser
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Alert Note */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Your API key is saved directly to your browser's <strong className="text-slate-900 dark:text-white font-mono">localStorage</strong>. It is never transmitted to any third-party server or backend.
          </p>
        </div>

        {/* Preset Quick Buttons */}
        <div className="mb-4">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Quick Provider Presets
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => applyPreset('https://api.openai.com/v1', 'gpt-4o-mini')}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white">OpenAI</div>
              <div className="text-[10px] text-slate-500 font-mono">gpt-4o-mini</div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('https://generativelanguage.googleapis.com/v1beta/openai', 'gemini-2.5-flash')}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white">Gemini</div>
              <div className="text-[10px] text-slate-500 font-mono">gemini-2.5-flash</div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('https://openrouter.ai/api/v1', 'openai/gpt-4o-mini')}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white">OpenRouter</div>
              <div className="text-[10px] text-slate-500 font-mono">openrouter</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center justify-between">
              <span>API Key <span className="text-emerald-600 dark:text-emerald-400">*</span></span>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-[10px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-mono"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </label>
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs shadow-inner"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Base Endpoint URL
            </label>
            <input
              type="text"
              placeholder="https://api.openai.com/v1"
              value={endpointUrl}
              onChange={(e) => setEndpointUrl(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs shadow-inner"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Model Identifier</span>
            </label>
            <input
              type="text"
              placeholder="gpt-4o-mini or gemini-2.5-flash"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs shadow-inner"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
