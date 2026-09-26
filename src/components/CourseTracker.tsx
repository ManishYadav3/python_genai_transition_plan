import React from 'react';
import { COURSE_INFO, COURSE_CHAPTERS } from '../data/courseData';
import { BookOpen, CheckSquare, Square, ExternalLink, Award } from 'lucide-react';

interface CourseTrackerProps {
  courseCheckedMap: Record<string, boolean>;
  onToggleCourseItem: (itemId: string) => void;
}

export const CourseTracker: React.FC<CourseTrackerProps> = ({
  courseCheckedMap,
  onToggleCourseItem,
}) => {
  const totalChapters = COURSE_CHAPTERS.length;
  const completedChapters = COURSE_CHAPTERS.filter(c => courseCheckedMap[c.id]).length;
  const coursePercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  const getPaceBadge = (pace: string) => {
    switch (pace) {
      case 'Skim Fast':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      case 'Learn Deeply':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Build Project':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 font-bold';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="course-tracker" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            Curriculum Anchor
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Current Course Tracker
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Tracking structured chapter progress against the bootcamp while applying our personal Learn-vs-Skip filter.
          </p>
        </div>

        {/* Main Course Overview Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shrink-0 shadow-lg shadow-cyan-500/10">
                <div className="w-full h-full bg-white dark:bg-[#080c14] rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-semibold">
                  Enrolled Bootcamp
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5 font-display">
                  {COURSE_INFO.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Instructors: <strong className="text-slate-900 dark:text-slate-200">{COURSE_INFO.instructors}</strong> • Platform: <span className="text-slate-700 dark:text-slate-300">{COURSE_INFO.platform}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-center">
              <div className="flex items-center gap-2 text-xs font-mono mb-1.5">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300 font-bold">{completedChapters} of {totalChapters} Chapters Done</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">({coursePercent}%)</span>
              </div>
              <div className="w-48 sm:w-60 h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${coursePercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chapter Checklist Grid */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-4 flex items-center justify-between">
              <span className="font-bold">Chapter Breakdown & Filter Strategy</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 normal-case">Click to check off completed chapters</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COURSE_CHAPTERS.map((chapter) => {
                const isChecked = !!courseCheckedMap[chapter.id];
                return (
                  <div
                    key={chapter.id}
                    onClick={() => onToggleCourseItem(chapter.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none shadow-sm ${
                      isChecked
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-500 dark:text-slate-400'
                        : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400" />
                        )}
                      </div>
                      <span className={`text-xs font-medium truncate ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-200'}`}>
                        {chapter.title}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${getPaceBadge(chapter.recommendedPace)}`}>
                      {chapter.recommendedPace}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Aligned with Bootcamp syllabus (Python, Docker, Pydantic, Attention, RAG, LangGraph, Memory, MCP).</span>
            <a 
              href={COURSE_INFO.url} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-cyan-600 dark:hover:text-cyan-400 inline-flex items-center gap-1 font-mono text-[11px]"
            >
              Course Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
