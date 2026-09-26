import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  AlertCircle, 
  Plus, 
  RotateCcw,
  Clock
} from 'lucide-react';
import { TimetableBlock } from '../../data/timetableData';
import { TimetableCard } from './TimetableCard';
import { AddBlockModal } from './AddBlockModal';

interface TimetableProps {
  blocks: TimetableBlock[];
  onToggleComplete: (id: string) => void;
  onAddBlock: (block: Omit<TimetableBlock, 'id' | 'completed' | 'isCustom'>) => void;
  onResetTimetable: () => void;
}

export const Timetable: React.FC<TimetableProps> = ({
  blocks,
  onToggleComplete,
  onAddBlock,
  onResetTimetable
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Today's date formatted as YYYY-MM-DD
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0]; // "2026-09-26"
  const todayReadable = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Find today's active block (or the next upcoming block if today is between schedules)
  const todayActiveBlock = useMemo(() => {
    // 1. Exact match within date range
    const active = blocks.find(b => todayStr >= b.startDate && todayStr <= b.endDate);
    if (active) return active;
    
    // 2. Next upcoming block if today is before the schedule ends
    const upcoming = blocks.find(b => todayStr < b.startDate && !b.completed);
    if (upcoming) return upcoming;

    // 3. Fallback to first incomplete block
    return blocks.find(b => !b.completed) || blocks[0];
  }, [blocks, todayStr]);

  // Overall Statistics & Pace Calculation
  const totalBlocks = blocks.length;
  const completedCount = blocks.filter(b => b.completed).length;
  const progressPercent = totalBlocks > 0 ? Math.round((completedCount / totalBlocks) * 100) : 0;

  // Expected blocks that should be completed by today based on block.endDate < todayStr
  const expectedBlocksToDate = useMemo(() => {
    return blocks.filter(b => b.endDate < todayStr).length;
  }, [blocks, todayStr]);

  // Calculate Pace: Ahead, On Track, or Behind
  const paceAnalysis = useMemo(() => {
    const diff = completedCount - expectedBlocksToDate;
    if (diff > 0) {
      return {
        status: 'Ahead of Schedule',
        description: `You are ${diff} ${diff === 1 ? 'block' : 'blocks'} ahead of target! Keep up the momentum.`,
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        icon: TrendingUp
      };
    } else if (diff === 0) {
      return {
        status: 'On Track',
        description: 'You are right on schedule with your daily learning targets.',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
        icon: CheckCircle2
      };
    } else {
      const behindCount = Math.abs(diff);
      return {
        status: 'Behind Target',
        description: `${behindCount} ${behindCount === 1 ? 'block' : 'blocks'} behind planned pace. Use the catch-up days (Oct 7, Oct 21) to reset!`,
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        icon: AlertCircle
      };
    }
  }, [completedCount, expectedBlocksToDate]);

  // Filtered Blocks
  const filteredBlocks = useMemo(() => {
    return blocks.filter(block => {
      const matchesPhase = selectedPhase === 'all' || block.phaseId === selectedPhase;
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'completed' && block.completed) ||
        (statusFilter === 'pending' && !block.completed);
      return matchesPhase && matchesStatus;
    });
  }, [blocks, selectedPhase, statusFilter]);

  // Scroll to Today's Active Block
  const handleScrollToToday = () => {
    if (todayActiveBlock) {
      const el = document.getElementById(`timetable-${todayActiveBlock.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Sprint Schedule • Sep 26 – Oct 31, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Study Timetable
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Tactical day-by-day roadmap execution for working developers. Follow the calibrated pace, protect weekend deep-work blocks, and log completions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Scroll to Today Button */}
            {todayActiveBlock && (
              <button
                onClick={handleScrollToToday}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold font-mono transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Flame className="w-4 h-4 fill-current animate-pulse text-emerald-500" />
                <span>Jump to Today</span>
              </button>
            )}

            {/* Reset Schedule Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset timetable back to the standard 18 blocks? (Any custom blocks will be removed)')) {
                  onResetTimetable();
                }
              }}
              title="Reset to default schedule"
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Add Custom Block */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Block</span>
            </button>
          </div>
        </div>

        {/* PACE & PROGRESS METRICS DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          
          {/* 1. Completion Counter */}
          <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>OVERALL PROGRESS</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  {completedCount}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                  / {totalBlocks} blocks ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 2. Schedule Pace Status */}
          <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>SCHEDULE PACE</span>
              <paceAnalysis.icon className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="mt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border mb-1.5 font-mono">
                <span className={`inline-block w-2 h-2 rounded-full ${paceAnalysis.status === 'Ahead of Schedule' ? 'bg-emerald-500' : paceAnalysis.status === 'On Track' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                <span className={paceAnalysis.badgeColor}>{paceAnalysis.status}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {paceAnalysis.description}
              </p>
            </div>
          </div>

          {/* 3. Today's Active Focus */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/30 dark:via-slate-900/60 dark:to-slate-900/60 border border-emerald-500/30 shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-mono font-semibold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>TODAY: {todayReadable}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 font-bold">
                ACTIVE
              </span>
            </div>
            <div className="mt-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {todayActiveBlock ? `${todayActiveBlock.dateRange} • ${todayActiveBlock.phase}` : 'No active block'}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
                {todayActiveBlock ? todayActiveBlock.topic : 'Rest & Review'}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-1 italic">
                "{todayActiveBlock ? todayActiveBlock.focusNote : 'Catch-up on notes'}"
              </p>
            </div>
          </div>

        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 backdrop-blur-md">
          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedPhase('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedPhase === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Phases ({blocks.length})
            </button>
            <button
              onClick={() => setSelectedPhase('phase-1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedPhase === 'phase-1'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Python ({blocks.filter(b => b.phaseId === 'phase-1').length})
            </button>
            <button
              onClick={() => setSelectedPhase('phase-2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedPhase === 'phase-2'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              LLM Fundamentals ({blocks.filter(b => b.phaseId === 'phase-2').length})
            </button>
            <button
              onClick={() => setSelectedPhase('phase-3')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedPhase === 'phase-3'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              RAG ({blocks.filter(b => b.phaseId === 'phase-3').length})
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                statusFilter === 'all'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Pending ({blocks.filter(b => !b.completed).length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>
        </div>

        {/* TIMELINE CARDS LIST */}
        <div className="space-y-4">
          {filteredBlocks.map((block, idx) => (
            <TimetableCard
              key={block.id}
              block={block}
              index={idx}
              isTodayActive={todayActiveBlock?.id === block.id}
              onToggleComplete={onToggleComplete}
            />
          ))}

          {filteredBlocks.length === 0 && (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No timetable blocks match the selected filter.
              </p>
              <button
                onClick={() => { setSelectedPhase('all'); setStatusFilter('all'); }}
                className="mt-3 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ADD CUSTOM BLOCK MODAL */}
      <AddBlockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBlock={onAddBlock}
      />
    </div>
  );
};
