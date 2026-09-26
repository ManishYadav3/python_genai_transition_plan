import React, { useState } from 'react';
import { CHEAT_SHEET_DATA, GOLDEN_RULE } from '../data/cheatSheetData';
import { FastForward, Flame, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LearnVsSkip: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'skip' | 'deep'>('both');

  return (
    <section id="learn-vs-skip" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            Time Optimization Filter
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Learn vs Skip: The Senior Efficiency Guide
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            With 1-2 hours a night, studying the wrong things will burn you out before you reach AI agents. Use this filter to protect your study bandwidth.
          </p>
        </div>

        {/* PROMINENT GOLDEN RULE BANNER */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-100 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-950 border border-amber-500/30 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-full bg-amber-500/5 blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block mb-1">
                The Non-Negotiable Time-Saving Rule
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                "{GOLDEN_RULE}"
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl text-xs font-mono shadow-inner">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'both' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Side-by-Side View
            </button>
            <button
              onClick={() => setActiveTab('deep')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'deep' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Learn Deeply Only
            </button>
            <button
              onClick={() => setActiveTab('skip')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'skip' ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Skip / Skim Only
            </button>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* COLUMN 1: SKIM FAST / SKIP */}
          {(activeTab === 'both' || activeTab === 'skip') && (
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
                      <FastForward className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                        {CHEAT_SHEET_DATA.skip.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Fast-track past these</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 font-semibold">
                    Commoditized
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 mb-5 leading-relaxed">
                  {CHEAT_SHEET_DATA.skip.tagline}
                </p>

                <div className="space-y-4">
                  {CHEAT_SHEET_DATA.skip.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-rose-700 dark:text-rose-200 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Skim</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.reason}
                      </p>
                      <div className="pt-1.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="text-rose-600 dark:text-rose-400 font-bold">Action:</span>
                        <span>{item.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COLUMN 2: LEARN DEEPLY */}
          {(activeTab === 'both' || activeTab === 'deep') && (
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-emerald-500/30 glow-emerald flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                        {CHEAT_SHEET_DATA.deep.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">The core differentiator</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-semibold">
                    High Value
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 mb-5 leading-relaxed">
                  {CHEAT_SHEET_DATA.deep.tagline}
                </p>

                <div className="space-y-4">
                  {CHEAT_SHEET_DATA.deep.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-700 dark:text-emerald-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold">Build</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.reason}
                      </p>
                      <div className="pt-1.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Action:</span>
                        <span>{item.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
