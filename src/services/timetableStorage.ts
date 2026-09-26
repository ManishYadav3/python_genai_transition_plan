import { TimetableBlock } from '../data/timetableData';

const STORAGE_KEY_TIMETABLE = 'study_timetable_blocks';
const STORAGE_KEY_TIMETABLE_VERSION = 'study_timetable_version';
const CURRENT_TIMETABLE_VERSION = 'v2_generators_decorators_inserted';

/**
 * Load timetable blocks from localStorage, merging saved completion states
 * and any user-created custom blocks with the seed schedule.
 */
export const loadTimetable = (initialBlocks: TimetableBlock[]): TimetableBlock[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TIMETABLE);
    const version = localStorage.getItem(STORAGE_KEY_TIMETABLE_VERSION);

    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TIMETABLE, JSON.stringify(initialBlocks));
      localStorage.setItem(STORAGE_KEY_TIMETABLE_VERSION, CURRENT_TIMETABLE_VERSION);
      return initialBlocks;
    }

    const savedList: TimetableBlock[] = JSON.parse(raw);
    const savedMap = new Map(savedList.map(b => [b.id, b]));

    // Merge initial blocks with saved completion state & dates
    const mergedSeed = initialBlocks.map(initBlock => {
      const saved = savedMap.get(initBlock.id);
      if (saved) {
        return {
          ...initBlock,
          completed: saved.completed ?? false,
          completedDate: saved.completedDate
        };
      }
      return initBlock;
    });

    // Custom blocks added by the user
    const customBlocks = savedList.filter(b => b.isCustom || !initialBlocks.some(init => init.id === b.id));

    const result = [...mergedSeed, ...customBlocks];

    if (version !== CURRENT_TIMETABLE_VERSION) {
      localStorage.setItem(STORAGE_KEY_TIMETABLE, JSON.stringify(result));
      localStorage.setItem(STORAGE_KEY_TIMETABLE_VERSION, CURRENT_TIMETABLE_VERSION);
    }

    return result;
  } catch (e) {
    console.error('Failed to load timetable from localStorage', e);
    return initialBlocks;
  }
};

/**
 * Save timetable blocks to localStorage
 */
export const saveTimetable = (blocks: TimetableBlock[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_TIMETABLE, JSON.stringify(blocks));
  } catch (e) {
    console.error('Failed to save timetable to localStorage', e);
  }
};

/**
 * Reset timetable back to initial schedule
 */
export const resetTimetableToDefault = (initialBlocks: TimetableBlock[]): TimetableBlock[] => {
  try {
    localStorage.setItem(STORAGE_KEY_TIMETABLE, JSON.stringify(initialBlocks));
    localStorage.setItem(STORAGE_KEY_TIMETABLE_VERSION, CURRENT_TIMETABLE_VERSION);
  } catch (e) {
    console.error('Failed to reset timetable', e);
  }
  return initialBlocks;
};
