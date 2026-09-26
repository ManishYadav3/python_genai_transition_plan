import React, { useState } from 'react';
import { ROADMAP_PHASES, RoadmapPhase } from '../data/roadmapData';
import { Calendar, ChevronDown, ChevronUp, CheckSquare, Square, Package, BookMarked } from 'lucide-react';

interface RoadmapTimelineProps {
  checkedMap: Record<string, boolean>;
  onToggleItem: (itemId: string) => void;
  onToggleAllInPhase: (phase: RoadmapPhase, checkAll: boolean) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  checkedMap,
  onToggleItem,
  onToggleAllInPhase,
}) => {
  // Collapsed state for accordion functionality
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

  const toggleCollapse = (phaseId: string) => {
    setCollapsedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const getAccentColors = (accent: string) => {
    switch (accent) {
      case 'emerald':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500 ring-emerald-500/20',
          bar: 'bg-emerald-500',
          border: 'hover:border-emerald-500/40',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          dot: 'bg-cyan-500 ring-cyan-500/20',
          bar: 'bg-cyan-500',
          border: 'hover:border-cyan-500/40',
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
          dot: 'bg-indigo-500 ring-indigo-500/20',
          bar: 'bg-indigo-500',
          border: 'hover:border-indigo-500/40',
        };
      case 'violet':
        return {
          badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
          dot: 'bg-violet-500 ring-violet-500/20',
          bar: 'bg-violet-500',
          border: 'hover:border-violet-500/40',
        };
      case 'amber':
        return {
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500 ring-amber-500/20',
          bar: 'bg-amber-500',
          border: 'hover:border-amber-500/40',
        };
      case 'rose':
        return {
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500 ring-rose-500/20',
          bar: 'bg-rose-500',
          border: 'hover:border-rose-500/40',
        };
      default:
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500 ring-emerald-500/20',
          bar: 'bg-emerald-500',
          border: 'hover:border-emerald-500/40',
        };
    }
  };

  return (
    <section id="roadmap" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Primary Stepper
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              The 6-Phase Engineering Roadmap
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step transition plan spanning Months 1 through 12. Check off competencies as you learn and build; progress is persisted automatically in your browser.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const allCollapsed = ROADMAP_PHASES.every(p => collapsedPhases[p.id]);
                const nextState: Record<string, boolean> = {};
                ROADMAP_PHASES.forEach(p => {
                  nextState[p.id] = !allCollapsed;
                });
                setCollapsedPhases(nextState);
              }}
              className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
            >
              Toggle Expand / Collapse All
            </button>
          </div>
        </div>

        {/* Vertical Timeline Wrapper */}
        <div className="relative pl-4 sm:pl-8 space-y-10">
          
          {/* Central Vertical Connector Line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-rose-500/40 -translate-x-1/2" />

          {ROADMAP_PHASES.map((phase) => {
            const colors = getAccentColors(phase.accentColor);
            const isCollapsed = collapsedPhases[phase.id];
            
            // Calculate phase progress
            const totalItems = phase.items.length;
            const completedItems = phase.items.filter(item => checkedMap[item.id]).length;
            const isPhaseComplete = totalItems > 0 && completedItems === totalItems;
            const phasePercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

            return (
              <div key={phase.id} className="relative group">
                
                {/* Node Connector Dot */}
                <div 
                  className={`absolute -left-4 sm:-left-8 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#080c14] border-2 flex items-center justify-center transition-all shadow-md ${
                    isPhaseComplete
                      ? 'border-emerald-500 dark:border-emerald-400 ring-4 ring-emerald-500/20'
                      : 'border-slate-300 dark:border-slate-700 group-hover:border-slate-500'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isPhaseComplete ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-slate-400 dark:bg-slate-500'}`} />
                </div>

                {/* Timeline Card */}
                <div 
                  className={`ml-5 sm:ml-6 glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 ${colors.border} transition-all duration-200 shadow-sm`}
                >
                  
                  {/* Card Header Top */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${colors.badge}`}>
                        Phase 0{phase.phaseNumber}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-full">
                        <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                        {phase.timeframe} ({phase.durationMonths})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Mini Progress */}
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">Progress:</span>
                        <span className={`font-bold ${isPhaseComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {completedItems}/{totalItems} ({phasePercent}%)
                        </span>
                      </div>

                      {/* Collapse Button */}
                      <button
                        onClick={() => toggleCollapse(phase.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={isCollapsed ? "Expand phase" : "Collapse phase"}
                      >
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Phase Title & Summary */}
                  <div className="mt-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                      {phase.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {phase.focusSummary}
                    </p>

                    {/* Direct Quick Link to Phase 1 Study Notes */}
                    {phase.id === 'phase-1' && (
                      <div className="mt-3.5">
                        <a
                          href="#notes"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono transition-all hover:scale-[1.01] shadow-sm"
                        >
                          <BookMarked className="w-4 h-4 text-emerald-500" />
                          <span>👉 View All 13 Deep Python Notes & Code Snippets</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Content */}
                  {!isCollapsed && (
                    <div className="mt-6 space-y-4">
                      
                      {/* Sub-item Checklist */}
                      <div className="space-y-2.5">
                        {phase.items.map((item) => {
                          const isChecked = !!checkedMap[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => onToggleItem(item.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none shadow-sm ${
                                isChecked
                                  ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-500 dark:text-slate-400'
                                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400" />
                                )}
                              </div>
                              <div className="flex-1 text-xs">
                                <span className={`font-medium ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                                  {item.text}
                                </span>
                                {item.note && (
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                                    ↳ {item.note}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Phase Deliverable Banner */}
                      {phase.deliverable && (
                        <div className="mt-4 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 flex items-center justify-between gap-3 text-xs shadow-sm">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">{phase.deliverable}</span>
                          </div>
                          
                          {/* Toggle all in phase shortcut */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleAllInPhase(phase, !isPhaseComplete);
                            }}
                            className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 underline whitespace-nowrap"
                          >
                            {isPhaseComplete ? "Uncheck All" : "Mark Phase Complete"}
                          </button>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Summary Bar when collapsed */}
                  {isCollapsed && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span>{totalItems} competencies in this phase</span>
                      <button
                        onClick={() => toggleCollapse(phase.id)}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        Expand details <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
