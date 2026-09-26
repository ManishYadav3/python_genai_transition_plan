export interface StudyTopic {
  id: string;
  title: string;
  phaseId: string; // matches roadmap phase id, e.g. "phase-1"
  inShort: string; // One-line summary (bold, big text)
  codeSnippet?: string;
  codeLanguage?: string;
  notes: string; // Markdown notes
  understood: boolean; // quick recap checkbox
  aiExplanation?: string; // cached AI explanation
  createdAt: string;
  updatedAt: string;
}

export interface AISettings {
  apiKey: string;
  endpointUrl: string; // default: https://api.openai.com/v1
  model: string; // default: gpt-4o-mini
}

const STORAGE_KEY_TOPICS = 'study_notes_topics';
const STORAGE_KEY_AI_SETTINGS = 'study_notes_ai_settings';
const STORAGE_KEY_VERSION = 'study_notes_syllabus_version';
const CURRENT_SYLLABUS_VERSION = 'v2_python_17_topics';

export const DEFAULT_AI_SETTINGS: AISettings = {
  apiKey: '',
  endpointUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini'
};

// Reset topics completely to initial syllabus (17 topics)
export const resetTopicsToDefault = (initialTopics: StudyTopic[]): StudyTopic[] => {
  try {
    localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(initialTopics));
    localStorage.setItem(STORAGE_KEY_VERSION, CURRENT_SYLLABUS_VERSION);
  } catch (e) {
    console.error('Failed to reset study notes', e);
  }
  return initialTopics;
};

// Load notes from localStorage, automatically merging or upgrading to all 17 topics
export const loadTopics = (initialTopics: StudyTopic[]): StudyTopic[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TOPICS);
    const version = localStorage.getItem(STORAGE_KEY_VERSION);

    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(initialTopics));
      localStorage.setItem(STORAGE_KEY_VERSION, CURRENT_SYLLABUS_VERSION);
      return initialTopics;
    }

    const existing: StudyTopic[] = JSON.parse(raw);

    // If version is outdated or notes count is less than initial topics (e.g. user only had initial 8 notes)
    if (version !== CURRENT_SYLLABUS_VERSION || existing.length < initialTopics.length) {
      const existingIdMap = new Map(existing.map(t => [t.id, t]));
      
      // Identify custom topics the user may have created (not starting with default IDs)
      const userCustomTopics = existing.filter(t => 
        !initialTopics.some(init => init.id === t.id) &&
        !t.id.startsWith('topic-') // old v1 prefix
      );

      // Merge initial topics, preserving user's 'understood' checkmark or custom AI explanation if matched
      const mergedList: StudyTopic[] = initialTopics.map(initTopic => {
        const found = existingIdMap.get(initTopic.id);
        if (found) {
          return {
            ...initTopic,
            understood: found.understood ?? initTopic.understood,
            aiExplanation: found.aiExplanation || initTopic.aiExplanation
          };
        }
        return initTopic;
      });

      // Append any custom topics the user created
      const finalList = [...mergedList, ...userCustomTopics];

      localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(finalList));
      localStorage.setItem(STORAGE_KEY_VERSION, CURRENT_SYLLABUS_VERSION);
      return finalList;
    }

    return existing;
  } catch (e) {
    console.error('Failed to load study notes from localStorage', e);
    return initialTopics;
  }
};

// Save topics array to localStorage
export const saveTopics = (topics: StudyTopic[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(topics));
  } catch (e) {
    console.error('Failed to save study notes to localStorage', e);
  }
};

// Load AI Settings (API key never leaves client)
export const loadAISettings = (): AISettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AI_SETTINGS);
    if (!raw) return DEFAULT_AI_SETTINGS;
    return { ...DEFAULT_AI_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_AI_SETTINGS;
  }
};

// Save AI Settings
export const saveAISettings = (settings: AISettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY_AI_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save AI settings', e);
  }
};
