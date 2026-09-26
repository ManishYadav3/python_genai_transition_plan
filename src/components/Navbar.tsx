import React from 'react';
import { Terminal, CheckCircle2, RotateCcw, BookMarked, Map, Sun, Moon, Calendar } from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  onResetProgress: () => void;
  currentRoute: 'roadmap' | 'notes' | 'timetable';
  onNavigate: (route: 'roadmap' | 'notes' | 'timetable') => void;
  notesCount: number;
  timetableCount?: { completed: number; total: number };
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalCount,
  onResetProgress,
  currentRoute,
  onNavigate,
  notesCount,
  timetableCount,
  isDarkMode,
  onToggleTheme
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <div
          onClick={() => onNavigate('roadmap')}
          className="flex items-center space-x-3 group cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[1.5px] flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#070a11] rounded-[14px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>GenAI & Agentic AI Roadmap</span>
            </div>
          </div>
        </div>

        {/* Primary View Switcher Tabs (Apple Floating Pill) */}
        <div className="flex items-center bg-slate-200/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-800 text-xs font-mono backdrop-blur-xl shadow-inner">
          <button
            onClick={() => onNavigate('roadmap')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${currentRoute === 'roadmap'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Map className="w-3.5 h-3.5 text-cyan-500" />
            <span>Roadmap</span>
          </button>

          <button
            onClick={() => onNavigate('notes')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${currentRoute === 'notes'
                ? 'bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-500/30 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <BookMarked className="w-3.5 h-3.5 text-emerald-500" />
            <span>Notes</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-mono">
              {notesCount}
            </span>
          </button>

          <button
            onClick={() => onNavigate('timetable')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${currentRoute === 'timetable'
                ? 'bg-white dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-500/30 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-500" />
            <span>Timetable</span>
            {timetableCount && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-mono">
                {timetableCount.completed}/{timetableCount.total}
              </span>
            )}
          </button>
        </div>

        {/* Roadmap Anchor Links (Desktop) */}
        {currentRoute === 'roadmap' ? (
          <nav className="hidden xl:flex items-center space-x-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#why-this-path" className="px-2.5 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors">
              Why This Path
            </a>
            <a href="#roadmap" className="px-2.5 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors">
              Phases
            </a>
            <a href="#learn-vs-skip" className="px-2.5 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors">
              Learn vs Skip
            </a>
            <a href="#course-tracker" className="px-2.5 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors">
              Bootcamp
            </a>
            <a href="#projects" className="px-2.5 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors">
              Projects
            </a>
          </nav>
        ) : null}

        {/* Right Actions: Progress Widget, Dark/Light Switch, Reset */}
        <div className="flex items-center space-x-2 sm:space-x-3">

          {/* Global Progress Bar Widget */}
          <div className="flex items-center gap-2 bg-slate-200/70 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 px-3 py-1.5 rounded-2xl text-xs backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="hidden sm:flex flex-col">
              <span className="text-[9px] uppercase font-mono text-slate-500 dark:text-slate-400 leading-tight">Mastery</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">{completedCount}/{totalCount}</span>
            </div>
            <div className="w-12 sm:w-16 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="font-mono font-bold text-slate-800 dark:text-white text-xs">{percentage}%</span>
          </div>

          {/* Apple-style Dark / Light Mode Switcher */}
          <button
            onClick={onToggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300/80 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Reset progress */}
          <button
            onClick={onResetProgress}
            title="Reset localStorage checklist"
            className="p-2 rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border border-slate-300/80 dark:border-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
};
