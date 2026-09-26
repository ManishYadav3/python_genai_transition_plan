import React from 'react';
import { WHY_THIS_PATH } from '../data/whyThisPathData';
import { Binary, Layers, ShieldAlert, CheckCircle } from 'lucide-react';

export const WhyThisPath: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary':
        return <Binary className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="why-this-path" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Strategic Positioning
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Why This Path: The Developer's Moat
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Transitioning with intention. Grounded in ecosystem reality, leveraging past experience, and avoiding the trap of commoditized prompt-wrapper work.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_THIS_PATH.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed font-normal">
                  {pillar.summary}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800/60">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400/80 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Pillar {pillar.id === 'python-over-node' ? '01' : pillar.id === 'full-stack-advantage' ? '02' : '03'} of Career Strategy
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
