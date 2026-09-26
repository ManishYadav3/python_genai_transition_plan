import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Target, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import { TimetableBlock } from '../../data/timetableData';

interface TimetableCardProps {
  block: TimetableBlock;
  isTodayActive: boolean;
  onToggleComplete: (id: string) => void;
  index: number;
}

const getPhaseStyles = (phaseId: string) => {
  switch (phaseId) {
    case 'phase-1':
      return {
        badge: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
        ring: 'ring-blue-500/20',
        dot: 'bg-blue-500'
      };
    case 'phase-2':
      return {
        badge: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        ring: 'ring-emerald-500/20',
        dot: 'bg-emerald-500'
      };
    case 'phase-3':
      return {
        badge: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
        ring: 'ring-purple-500/20',
        dot: 'bg-purple-500'
      };
    case 'phase-4':
      return {
        badge: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
        ring: 'ring-amber-500/20',
        dot: 'bg-amber-500'
      };
    default:
      return {
        badge: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
        ring: 'ring-cyan-500/20',
        dot: 'bg-cyan-500'
      };
  }
};

export const TimetableCard: React.FC<TimetableCardProps> = ({
  block,
  isTodayActive,
  onToggleComplete,
  index
}) => {
  const phaseStyles = getPhaseStyles(block.phaseId);

  // Compare completed date with planned end date to determine schedule pace
  const getPaceStatus = () => {
    if (!block.completed || !block.completedDate) return null;
    const completed = new Date(block.completedDate).getTime();
    const plannedEnd = new Date(block.endDate).getTime();
    
    // Day difference
    const diffDays = Math.round((completed - plannedEnd) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return { label: 'Completed Early', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    } else if (diffDays === 0) {
      return { label: 'On Schedule', color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30' };
    } else {
      return { label: `Completed (+${diffDays}d)`, color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30' };
    }
  };

  const paceStatus = getPaceStatus();

  return (
    <div
      id={`timetable-${block.id}`}
      className={`relative group rounded-2xl transition-all duration-300 p-5 sm:p-6 ${
        isTodayActive
          ? 'bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-slate-900/90 border-2 border-emerald-500 shadow-xl shadow-emerald-500/15 dark:shadow-emerald-500/10 ring-4 ring-emerald-500/10'
          : block.completed
          ? 'bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 opacity-80 hover:opacity-100'
          : 'bg-white/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md'
      }`}
    >
      {/* TODAY ACTIVE FLOATING PILL */}
      {isTodayActive && (
        <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-600/30 animate-pulse">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>TODAY'S ACTIVE FOCUS</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        
        {/* Left Column: Number, Date, Phase, Title, Note */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Completion Checkbox / Toggle */}
          <button
            onClick={() => onToggleComplete(block.id)}
            title={block.completed ? "Mark incomplete" : "Mark completed"}
            className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              block.completed
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {block.completed ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <Circle className="w-4 h-4 stroke-[2]" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            {/* Meta Tags: Index, Date Range, Days, Phase */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                #{String(index + 1).padStart(2, '0')}
              </span>

              {/* Date Range Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold font-mono border border-slate-200 dark:border-slate-700">
                <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                <span>{block.dateRange}</span>
                <span className="text-slate-400 dark:text-slate-500">({block.dayCount} {block.dayCount === 1 ? 'day' : 'days'})</span>
              </div>

              {/* Phase Tag */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium border ${phaseStyles.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${phaseStyles.dot}`} />
                <span>{block.phase}</span>
              </span>

              {/* Completion Pace Status */}
              {paceStatus && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono font-medium border ${paceStatus.color}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{paceStatus.label}</span>
                </span>
              )}
            </div>

            {/* Topic Title */}
            <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
              block.completed
                ? 'line-through text-slate-500 dark:text-slate-400'
                : 'text-slate-900 dark:text-white'
            }`}>
              {block.topic}
            </h3>

            {/* Focus Note Callout */}
            <div className={`mt-2.5 p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
              isTodayActive
                ? 'bg-emerald-500/5 dark:bg-emerald-950/30 border-emerald-500/20 text-slate-800 dark:text-slate-200'
                : block.completed
                ? 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-slate-400'
                : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-start gap-2">
                <Target className={`w-4 h-4 mt-0.5 shrink-0 ${isTodayActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 mr-1.5">Action Focus:</span>
                  <span>{block.focusNote}</span>
                </div>
              </div>
            </div>

            {/* Completed Date Footer */}
            {block.completed && block.completedDate && (
              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Marked complete on {block.completedDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Button */}
        <div className="flex sm:flex-col items-center justify-end sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
          <button
            onClick={() => onToggleComplete(block.id)}
            className={`w-full sm:w-auto px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              block.completed
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                : isTodayActive
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {block.completed ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <span>Mark Done</span>
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
