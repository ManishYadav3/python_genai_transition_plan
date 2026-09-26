import React, { useState } from 'react';
import { StudyTopic } from '../../services/notesStorage';
import { ROADMAP_PHASES } from '../../data/roadmapData';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  Copy, 
  Check, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  Terminal, 
  AlertCircle
} from 'lucide-react';
import { marked } from 'marked';

interface TopicCardProps {
  topic: StudyTopic;
  onToggleUnderstood: (id: string) => void;
  onEdit: (topic: StudyTopic) => void;
  onDelete: (id: string) => void;
  onAIExplain: (topic: StudyTopic) => Promise<void>;
  isAILoading: boolean;
  hasApiKey: boolean;
  onOpenAISettings: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  onToggleUnderstood,
  onEdit,
  onDelete,
  onAIExplain,
  isAILoading,
  hasApiKey,
  onOpenAISettings
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const phase = ROADMAP_PHASES.find(p => p.id === topic.phaseId);

  const handleCopyCode = () => {
    if (topic.codeSnippet) {
      navigator.clipboard.writeText(topic.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Safe markdown parse
  const renderMarkdown = (content: string) => {
    try {
      return { __html: marked.parse(content, { breaks: true, gfm: true }) as string };
    } catch {
      return { __html: `<p>${content}</p>` };
    }
  };

  return (
    <div 
      id={`card-${topic.id}`}
      className={`glass-card rounded-2xl p-6 sm:p-7 border transition-all duration-200 shadow-xl ${
        topic.understood 
          ? 'border-emerald-500/30' 
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* CARD TOP META BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {phase ? `Phase ${phase.phaseNumber}: ${phase.title.split('&')[0].trim()}` : 'General AI Topic'}
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Updated: {new Date(topic.updatedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Quick Actions (Understood Toggle, Edit, Delete) */}
        <div className="flex items-center gap-3">
          {/* Quick Recap Checkbox */}
          <button
            onClick={() => onToggleUnderstood(topic.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium transition-colors border shadow-sm ${
              topic.understood
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {topic.understood ? (
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Square className="w-3.5 h-3.5" />
            )}
            <span>{topic.understood ? 'Understood' : 'Mark Understood'}</span>
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(topic)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit topic note"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Delete note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 p-1 rounded-lg">
              <span className="text-[10px] text-rose-600 dark:text-rose-300 font-mono px-1">Delete?</span>
              <button
                onClick={() => onDelete(topic.id)}
                className="text-[10px] text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-white px-1.5 py-0.5 rounded bg-rose-500/20 font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white px-1"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TOPIC TITLE */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-display mb-3 flex items-center justify-between">
        <span>{topic.title}</span>
      </h3>

      {/* ORDER A: ONE-LINE "IN SHORT" SUMMARY (BOLD, BIG TEXT) */}
      <div className="p-4 rounded-xl bg-emerald-500/10 dark:bg-slate-950/80 border-l-4 border-l-emerald-500 border border-emerald-500/20 dark:border-slate-800/80 mb-5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
          In Short
        </span>
        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {topic.inShort}
        </p>
      </div>

      {/* ORDER B: CODE SNIPPET (IF PROVIDED) */}
      {topic.codeSnippet && topic.codeSnippet.trim() && (
        <div className="rounded-xl overflow-hidden border border-slate-300/80 dark:border-slate-800 bg-[#0d131f] mb-6 shadow-md">
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 dark:text-slate-400 flex items-center gap-1.5 text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              {topic.codeLanguage || 'python'}
            </span>
            <button
              onClick={handleCopyCode}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-100 overflow-x-auto leading-relaxed">
            <code>{topic.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* ORDER C: LONGER NOTES BELOW (MARKDOWN RENDERED) */}
      {topic.notes && topic.notes.trim() && (
        <div className="mb-6 pt-2 border-t border-slate-200 dark:border-slate-800/60">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 font-bold">
            Detailed Notes & Context
          </span>
          <div 
            className="prose prose-slate dark:prose-invert prose-sm max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2
              prose-headings:font-display prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-headings:font-bold prose-headings:mt-3 prose-headings:mb-1
              prose-h3:text-sm prose-h4:text-xs
              prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-ul:list-disc prose-ul:pl-4
              prose-code:text-emerald-700 dark:prose-code:text-amber-300 prose-code:font-mono prose-code:text-[11px] prose-code:bg-slate-100 dark:prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-strong:text-slate-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={renderMarkdown(topic.notes)}
          />
        </div>
      )}

      {/* AI EXPLANATION BOX / BUTTON */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
        
        {/* If already has cached explanation */}
        {topic.aiExplanation ? (
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 via-slate-50 to-cyan-500/10 dark:from-emerald-950/30 dark:via-slate-900 dark:to-cyan-950/20 border border-emerald-500/30 relative">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-emerald-500/20">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                AI Synthesized Explanation (Cached)
              </span>
              <button
                onClick={() => onAIExplain(topic)}
                disabled={isAILoading}
                className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors"
                title="Regenerate explanation using LLM"
              >
                <RefreshCw className={`w-3 h-3 ${isAILoading ? 'animate-spin' : ''}`} />
                <span>Regenerate</span>
              </button>
            </div>

            <div 
              className="prose prose-slate dark:prose-invert prose-sm max-w-none text-xs text-slate-700 dark:text-slate-200 leading-relaxed
                prose-code:text-cyan-700 dark:prose-code:text-cyan-300 prose-code:font-mono prose-code:text-[11px] prose-code:bg-slate-100 dark:prose-code:bg-slate-950 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:border prose-pre:border-slate-800"
              dangerouslySetInnerHTML={renderMarkdown(topic.aiExplanation)}
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Need a fast, concise breakdown of this topic?</span>
            </div>

            <div className="flex items-center gap-2">
              {!hasApiKey && (
                <button
                  onClick={onOpenAISettings}
                  className="text-[11px] font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> Set API Key
                </button>
              )}
              <button
                onClick={() => onAIExplain(topic)}
                disabled={isAILoading}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {isAILoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Consulting AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Explain</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
