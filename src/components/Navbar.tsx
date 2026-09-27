import React, { useState } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  RotateCcw, 
  BookMarked, 
  Map, 
  Sun, 
  Moon, 
  Calendar,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleNavClick = (route: 'roadmap' | 'notes' | 'timetable') => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav transition-all duration-300 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">

          {/* Brand */}
          <div
            onClick={() => handleNavClick('roadmap')}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer select-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[1.5px] flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-white dark:bg-[#070a11] rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm lg:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="hidden sm:inline">GenAI & Agentic AI Roadmap</span>
                <span className="sm:hidden font-bold">GenAI Roadmap</span>
              </div>
            </div>
          </div>

          {/* Primary View Switcher Tabs (Apple Floating Pill - Desktop/Tablet) */}
          <div className="hidden md:flex items-center bg-slate-200/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-800 text-xs font-mono backdrop-blur-xl shadow-inner">
            <button
              onClick={() => handleNavClick('roadmap')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${currentRoute === 'roadmap'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <Map className="w-3.5 h-3.5 text-cyan-500" />
              <span>Roadmap</span>
            </button>

            <button
              onClick={() => handleNavClick('notes')}
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
              onClick={() => handleNavClick('timetable')}
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

          {/* Roadmap Anchor Links (Desktop xl) */}
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

          {/* Right Actions: Progress Widget, Dark/Light Switch, Reset, Mobile Menu */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">

            {/* Global Progress Bar Widget - Tablet / Desktop */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-200/70 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="hidden lg:flex flex-col">
                <span className="text-[9px] uppercase font-mono text-slate-500 dark:text-slate-400 leading-tight">Mastery</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">{completedCount}/{totalCount}</span>
              </div>
              <div className="w-10 sm:w-16 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="font-mono font-bold text-slate-800 dark:text-white text-xs">{percentage}%</span>
            </div>

            {/* Mobile Compact Progress Badge */}
            <div 
              className="sm:hidden flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 px-2 py-1 rounded-xl text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400"
              title={`${completedCount} of ${totalCount} completed (${percentage}%)`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{percentage}%</span>
            </div>

            {/* Apple-style Dark / Light Mode Switcher */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300/80 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Reset progress (Desktop/Tablet) */}
            <button
              onClick={onResetProgress}
              title="Reset localStorage checklist"
              className="hidden sm:flex p-2 rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border border-slate-300/80 dark:border-slate-800 transition-colors"
              aria-label="Reset checklist progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300/80 dark:border-slate-800 transition-all active:scale-95 shadow-sm"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              ) : (
                <Menu className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              )}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#070a11]/95 backdrop-blur-2xl px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            {/* Primary View Navigation Switcher */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">
                Navigation Views
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleNavClick('roadmap')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    currentRoute === 'roadmap'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Map className="w-4 h-4 text-cyan-500 mb-1" />
                  <span>Roadmap</span>
                </button>

                <button
                  onClick={() => handleNavClick('notes')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all relative ${
                    currentRoute === 'notes'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <BookMarked className="w-4 h-4 text-emerald-500 mb-1" />
                  <span>Notes</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-mono mt-0.5">
                    {notesCount}
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('timetable')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all relative ${
                    currentRoute === 'timetable'
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400 shadow-sm font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-cyan-500 mb-1" />
                  <span>Timetable</span>
                  {timetableCount && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-mono mt-0.5">
                      {timetableCount.completed}/{timetableCount.total}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Section Anchors (When on Roadmap view) */}
            {currentRoute === 'roadmap' && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">
                  Jump to Section
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <a
                    href="#why-this-path"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Why This Path</span>
                  </a>
                  <a
                    href="#roadmap"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>6-Month Phases</span>
                  </a>
                  <a
                    href="#learn-vs-skip"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Learn vs Skip</span>
                  </a>
                  <a
                    href="#course-tracker"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Bootcamp</span>
                  </a>
                  <a
                    href="#projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>8 Capstone Projects</span>
                  </a>
                </div>
              </div>
            )}

            {/* Detailed Progress Breakdown & Reset */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Roadmap Progress:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {completedCount} / {totalCount} items ({percentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onResetProgress();
                }}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Local Progress</span>
              </button>
            </div>

          </div>
        )}
      </header>

      {/* Apple-style Mobile Bottom Navigation Bar (Fixed for quick thumb navigation on phones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#070a11]/90 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => handleNavClick('roadmap')}
          className={`flex-1 py-1 flex flex-col items-center justify-center text-[10px] font-mono transition-all rounded-xl ${
            currentRoute === 'roadmap'
              ? 'text-emerald-500 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Map className="w-4 h-4 mb-0.5 text-cyan-500" />
          <span>Roadmap</span>
        </button>

        <button
          onClick={() => handleNavClick('notes')}
          className={`flex-1 py-1 flex flex-col items-center justify-center text-[10px] font-mono transition-all rounded-xl relative ${
            currentRoute === 'notes'
              ? 'text-emerald-500 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="relative">
            <BookMarked className="w-4 h-4 mb-0.5 text-emerald-500" />
            <span className="absolute -top-1 -right-3 text-[8px] font-bold px-1 rounded-full bg-emerald-500 text-white dark:text-slate-950 font-mono">
              {notesCount}
            </span>
          </div>
          <span>Notes</span>
        </button>

        <button
          onClick={() => handleNavClick('timetable')}
          className={`flex-1 py-1 flex flex-col items-center justify-center text-[10px] font-mono transition-all rounded-xl relative ${
            currentRoute === 'timetable'
              ? 'text-cyan-500 dark:text-cyan-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="relative">
            <Calendar className="w-4 h-4 mb-0.5 text-cyan-500" />
            {timetableCount && (
              <span className="absolute -top-1 -right-3 text-[8px] font-bold px-1 rounded-full bg-cyan-500 text-white dark:text-slate-950 font-mono">
                {timetableCount.completed}
              </span>
            )}
          </div>
          <span>Timetable</span>
        </button>
      </div>
    </>
  );
};

