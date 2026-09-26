import React, { useState, useEffect } from 'react';
import { StudyTopic } from '../../services/notesStorage';
import { ROADMAP_PHASES } from '../../data/roadmapData';
import { X, Code, FileText, CheckCircle } from 'lucide-react';

interface TopicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (topicData: Omit<StudyTopic, 'id' | 'createdAt' | 'updatedAt' | 'understood' | 'aiExplanation'>, existingId?: string) => void;
  editingTopic?: StudyTopic | null;
}

export const TopicFormModal: React.FC<TopicFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTopic
}) => {
  const [title, setTitle] = useState('');
  const [phaseId, setPhaseId] = useState(ROADMAP_PHASES[0].id);
  const [inShort, setInShort] = useState('');
  const [notes, setNotes] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('python');

  useEffect(() => {
    if (editingTopic) {
      setTitle(editingTopic.title);
      setPhaseId(editingTopic.phaseId);
      setInShort(editingTopic.inShort);
      setNotes(editingTopic.notes);
      setCodeSnippet(editingTopic.codeSnippet || '');
      setCodeLanguage(editingTopic.codeLanguage || 'python');
    } else {
      setTitle('');
      setPhaseId(ROADMAP_PHASES[0].id);
      setInShort('');
      setNotes('');
      setCodeSnippet('');
      setCodeLanguage('python');
    }
  }, [editingTopic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !inShort.trim()) return;

    onSave({
      title: title.trim(),
      phaseId,
      inShort: inShort.trim(),
      notes: notes.trim(),
      codeSnippet: codeSnippet.trim() ? codeSnippet : undefined,
      codeLanguage
    }, editingTopic?.id);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg font-display">
                {editingTopic ? 'Edit Topic Note' : 'Add New Study Topic'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Capture technical concepts & code recipes
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Row 1: Title and Phase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Topic Title <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Asyncio Semaphore & Rate Limiting"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs shadow-inner"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Roadmap Phase <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <select
                value={phaseId}
                onChange={(e) => setPhaseId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 text-xs shadow-inner"
              >
                {ROADMAP_PHASES.map((p) => (
                  <option key={p.id} value={p.id}>
                    Phase {p.phaseNumber}: {p.title.split('&')[0].trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: One-line "in short" summary */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              "In Short" Summary (One Bold Line) <span className="text-emerald-600 dark:text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Semaphores cap concurrent active requests to prevent HTTP 429 rate limit bans."
              value={inShort}
              onChange={(e) => setInShort(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs shadow-inner"
            />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
              Displayed prominently at the top of the card for quick scanning.
            </span>
          </div>

          {/* Row 3: Optional Code Snippet */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Code Example (Optional)</span>
              </label>
              <select
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 rounded px-2 py-0.5"
              >
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="bash">Bash / Shell</option>
                <option value="json">JSON</option>
                <option value="sql">SQL / Cypher</option>
              </select>
            </div>
            <textarea
              rows={4}
              placeholder="Paste a concise, working code snippet..."
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-[#0d131f] border border-slate-300 dark:border-slate-800 rounded-xl p-3 font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs shadow-inner"
            />
          </div>

          {/* Row 4: Detailed Notes (Markdown supported) */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Detailed Notes (Markdown Supported: **bold**, `code`, bullets)
            </label>
            <textarea
              rows={5}
              placeholder="### Why this matters&#10;- Key insight 1&#10;- Gotcha to avoid..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs shadow-inner"
            />
          </div>

          {/* Actions */}
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{editingTopic ? 'Update Note' : 'Save Topic'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
