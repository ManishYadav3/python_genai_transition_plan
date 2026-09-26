import React, { useState } from 'react';
import { X, Calendar, BookOpen, Layers, FileText } from 'lucide-react';
import { TimetableBlock } from '../../data/timetableData';

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlock: (block: Omit<TimetableBlock, 'id' | 'completed' | 'isCustom'>) => void;
}

const PHASES = [
  { id: 'phase-1', name: 'Python Fundamentals' },
  { id: 'phase-2', name: 'LLM Fundamentals' },
  { id: 'phase-3', name: 'RAG' },
  { id: 'phase-4', name: 'Agents & LangGraph' },
  { id: 'phase-5', name: 'MCP & Production' },
];

export const AddBlockModal: React.FC<AddBlockModalProps> = ({
  isOpen,
  onClose,
  onAddBlock
}) => {
  const [topic, setTopic] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dayCount, setDayCount] = useState<number>(2);
  const [focusNote, setFocusNote] = useState('');
  const [phaseId, setPhaseId] = useState('phase-1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !dateRange.trim()) {
      alert('Please provide at least a Topic title and Date range.');
      return;
    }

    const selectedPhase = PHASES.find(p => p.id === phaseId)?.name || 'Python Fundamentals';

    // Auto-fill fallback dates if left empty
    const now = new Date();
    const fallbackStart = startDate || now.toISOString().split('T')[0];
    const fallbackEnd = endDate || fallbackStart;

    onAddBlock({
      topic: topic.trim(),
      dateRange: dateRange.trim(),
      startDate: fallbackStart,
      endDate: fallbackEnd,
      dayCount: Number(dayCount) || 1,
      focusNote: focusNote.trim() || 'Custom study milestone',
      phase: selectedPhase,
      phaseId: phaseId
    });

    // Reset and close
    setTopic('');
    setDateRange('');
    setStartDate('');
    setEndDate('');
    setDayCount(2);
    setFocusNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden p-6 sm:p-7">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Add Timetable Block
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extend your schedule for November & beyond
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Topic Name *</span>
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Advanced LangGraph Multi-Agent Supervision"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                <span>Date Range Display *</span>
              </label>
              <input
                type="text"
                required
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                placeholder="e.g. Nov 1-3"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Day Count (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={dayCount}
                onChange={e => setDayCount(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Start Date (for Tracking)
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                End Date (for Tracking)
              </label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Phase</span>
            </label>
            <select
              value={phaseId}
              onChange={e => setPhaseId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              {PHASES.map(phase => (
                <option key={phase.id} value={phase.id}>
                  {phase.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Focus Note & Guidance</span>
            </label>
            <textarea
              rows={3}
              value={focusNote}
              onChange={e => setFocusNote(e.target.value)}
              placeholder="What is the critical objective? What to prioritize vs skim?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              Add to Schedule
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
