import React, { useState, useMemo } from 'react';
import { StudyTopic, AISettings } from '../../services/notesStorage';
import { ROADMAP_PHASES } from '../../data/roadmapData';
import { TopicCard } from './TopicCard';
import { TopicFormModal } from './TopicFormModal';
import { AISettingsModal } from './AISettingsModal';
import { generateAIExplanation } from '../../services/aiExplain';
import { 
  Search, 
  Plus, 
  Settings, 
  BookMarked, 
  CheckCircle2, 
  Layers, 
  FolderCheck,
  Sparkles,
  ChevronRight,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

interface StudyNotesProps {
  topics: StudyTopic[];
  onSaveTopic: (topicData: Omit<StudyTopic, 'id' | 'createdAt' | 'updatedAt' | 'understood' | 'aiExplanation'>, existingId?: string) => void;
  onDeleteTopic: (id: string) => void;
  onToggleUnderstood: (id: string) => void;
  onUpdateAIExplanation: (id: string, explanation: string) => void;
  aiSettings: AISettings;
  onSaveAISettings: (settings: AISettings) => void;
  onResetTopics?: () => void;
}

export const StudyNotes: React.FC<StudyNotesProps> = ({
  topics,
  onSaveTopic,
  onDeleteTopic,
  onToggleUnderstood,
  onUpdateAIExplanation,
  aiSettings,
  onSaveAISettings,
  onResetTopics
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<StudyTopic | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Loading state per topic ID for AI Explain call
  const [loadingAIId, setLoadingAIId] = useState<string | null>(null);
  const [aiErrorMessage, setAiErrorMessage] = useState<string | null>(null);

  // Filtered topics based on search & phase
  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      const matchesSearch = 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.inShort.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.notes.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPhase = selectedPhaseFilter === 'all' || t.phaseId === selectedPhaseFilter;
      return matchesSearch && matchesPhase;
    });
  }, [topics, searchQuery, selectedPhaseFilter]);

  // Overall notes statistics
  const totalNotes = topics.length;
  const understoodNotes = topics.filter(t => t.understood).length;
  const understoodPercent = totalNotes > 0 ? Math.round((understoodNotes / totalNotes) * 100) : 0;

  // Phase-wise stats for sidebar
  const phaseStats = useMemo(() => {
    return ROADMAP_PHASES.map(phase => {
      const phaseTopics = topics.filter(t => t.phaseId === phase.id);
      const phaseUnderstood = phaseTopics.filter(t => t.understood).length;
      return {
        phaseId: phase.id,
        phaseNumber: phase.phaseNumber,
        title: phase.title.split('&')[0].trim(),
        total: phaseTopics.length,
        understood: phaseUnderstood
      };
    });
  }, [topics]);

  // Handle AI Explanation Trigger
  const handleAIExplain = async (topic: StudyTopic) => {
    setLoadingAIId(topic.id);
    setAiErrorMessage(null);

    const result = await generateAIExplanation(topic.title, topic.notes, aiSettings);

    if (result.error) {
      setAiErrorMessage(result.error);
      alert(result.error);
    } else if (result.explanation) {
      onUpdateAIExplanation(topic.id, result.explanation);
    }

    setLoadingAIId(null);
  };

  const handleOpenEdit = (topic: StudyTopic) => {
    setEditingTopic(topic);
    setIsFormOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingTopic(null);
    setIsFormOpen(true);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-3">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Personal Knowledge Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Study Notes & Fast Recaps
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Synthesized technical takeaways, code patterns, and on-demand AI explanations grouped by roadmap phase.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors flex items-center gap-2 shadow-sm"
              title="Configure LLM API Key"
            >
              <Settings className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span>AI Settings</span>
              {aiSettings.apiKey ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="API Key Configured" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-500" title="API Key Missing" />
              )}
            </button>

            {/* Sync / Reset 17 Topics Button */}
            {onResetTopics && (
              <button
                onClick={() => {
                  if (window.confirm("Restore the complete 17-topic Python & AI syllabus? This will reload all default curriculum topics.")) {
                    onResetTopics();
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors flex items-center gap-1.5 shadow-sm"
                title="Restore all 17 syllabus topics"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Sync Syllabus (17)</span>
              </button>
            )}

            {/* Add Topic Button */}
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Topic</span>
            </button>
          </div>
        </div>

        {/* AI Error Alert Banner */}
        {aiErrorMessage && (
          <div className="my-6 p-4 rounded-xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 flex items-center justify-between text-xs text-rose-700 dark:text-rose-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
              <span>{aiErrorMessage}</span>
            </div>
            <button
              onClick={() => setAiErrorMessage(null)}
              className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-white px-2 py-0.5 rounded bg-rose-500/20"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Total Notes</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{totalNotes} Topics</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Mastery Recaps</span>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {understoodNotes} / {totalNotes} ({understoodPercent}%)
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">AI Explanations</span>
              <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                {topics.filter(t => !!t.aiExplanation).length} Synthesized
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* SEARCH AND PHASE FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search topics by title, keyword, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Phase Filter Dropdown/Pills for Mobile/Desktop */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
            <button
              onClick={() => setSelectedPhaseFilter('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shadow-sm ${
                selectedPhaseFilter === 'all'
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              All Phases
            </button>
            {ROADMAP_PHASES.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseFilter(phase.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shadow-sm ${
                  selectedPhaseFilter === phase.id
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                P{phase.phaseNumber}: {phase.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN TWO-COLUMN LAYOUT: SIDEBAR + TOPIC CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: TOPICS GROUPED BY PHASE */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-bold flex items-center gap-1.5">
                <FolderCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Index by Phase
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {filteredTopics.length} Matched
              </span>
            </div>

            {/* Grouped Accordion / List */}
            <div className="space-y-5 max-h-[750px] overflow-y-auto pr-1">
              {ROADMAP_PHASES.map((phase) => {
                const phaseTopics = filteredTopics.filter(t => t.phaseId === phase.id);
                if (phaseTopics.length === 0 && selectedPhaseFilter !== 'all' && selectedPhaseFilter !== phase.id) {
                  return null;
                }

                const phaseStatsItem = phaseStats.find(s => s.phaseId === phase.id);

                return (
                  <div key={phase.id} className="space-y-2">
                    {/* Phase Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-300 font-display">
                        Phase {phase.phaseNumber}: {phase.title.split('&')[0].trim()}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        {phaseStatsItem?.understood}/{phaseStatsItem?.total} understood
                      </span>
                    </div>

                    {/* Topics under this phase */}
                    {phaseTopics.length > 0 ? (
                      <div className="space-y-1 pl-1">
                        {phaseTopics.map((topic) => {
                          const isSelected = selectedTopicId === topic.id;
                          return (
                            <button
                              key={topic.id}
                              onClick={() => {
                                setSelectedTopicId(topic.id);
                                const el = document.getElementById(`card-${topic.id}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between group ${
                                isSelected
                                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold'
                                  : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${topic.understood ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                <span className="truncate">{topic.title}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 shrink-0 ml-1" />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 italic pl-2">No notes added in this phase yet.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: MAIN TOPIC CARDS DISPLAY */}
          <div className="lg:col-span-8 space-y-6">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onToggleUnderstood={onToggleUnderstood}
                  onEdit={handleOpenEdit}
                  onDelete={onDeleteTopic}
                  onAIExplain={handleAIExplain}
                  isAILoading={loadingAIId === topic.id}
                  hasApiKey={!!aiSettings.apiKey}
                  onOpenAISettings={() => setIsSettingsOpen(true)}
                />
              ))
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
                <BookMarked className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Study Topics Found</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  {searchQuery 
                    ? `No notes matched "${searchQuery}". Try a different keyword.` 
                    : "You haven't added any notes for this phase yet. Click '+ Add Topic' above to create your first note."}
                </p>
                <button
                  onClick={handleOpenAdd}
                  className="mt-5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Topic</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODALS */}
      <TopicFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={onSaveTopic}
        editingTopic={editingTopic}
      />

      <AISettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={aiSettings}
        onSaveSettings={onSaveAISettings}
      />

    </div>
  );
};
