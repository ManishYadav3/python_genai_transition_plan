export interface TimetableBlock {
  id: string;
  dateRange: string;      // e.g. "Sep 26-27"
  startDate: string;      // "2026-09-26" (YYYY-MM-DD for date comparison)
  endDate: string;        // "2026-09-27"
  dayCount: number;       // e.g. 2
  topic: string;          // e.g. "Generators + Decorators"
  focusNote: string;      // Detailed advice
  phase: string;          // "Python Fundamentals" | "LLM Fundamentals" | "RAG"
  phaseId: string;        // "phase-1" | "phase-2" | "phase-3"
  completed: boolean;     // default false
  completedDate?: string; // e.g. "2026-09-26" or "Sep 26, 2026"
  isCustom?: boolean;
}

export const INITIAL_TIMETABLE_BLOCKS: TimetableBlock[] = [
  {
    id: "gen-dec-1",
    dateRange: "Sep 26-27",
    startDate: "2026-09-26",
    endDate: "2026-09-27",
    dayCount: 2,
    topic: "Generators + Decorators",
    focusNote: "Use pythontutor.com to step through execution. Write a generator yielding 3 values, then a @timer decorator. One-line mental models: generator = function that pauses/resumes; decorator = function that wraps another function.",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-1",
    dateRange: "Sep 28-29",
    startDate: "2026-09-28",
    endDate: "2026-09-29",
    dayCount: 2,
    topic: "OOP",
    focusNote: "Skim-fast, concepts transfer from JS. Focus on Python quirks: property decorators, classmethod vs staticmethod, MRO",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-2",
    dateRange: "Sep 30",
    startDate: "2026-09-30",
    endDate: "2026-09-30",
    dayCount: 1,
    topic: "File handling",
    focusNote: "Quick pass: file I/O basics + with statement / context managers",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-3",
    dateRange: "Oct 1-2",
    startDate: "2026-10-01",
    endDate: "2026-10-02",
    dayCount: 2,
    topic: "Asyncio (part 1)",
    focusNote: "Slow down starts here — event loop, async/await, asyncio.run(). Use pythontutor.com to visualize execution order",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-4",
    dateRange: "Oct 3-5",
    startDate: "2026-10-03",
    endDate: "2026-10-05",
    dayCount: 3,
    topic: "Asyncio (part 2)",
    focusNote: "Tasks, gather(), coroutines vs regular functions, FastAPI/LLM streaming patterns. Write 3-4 tiny scripts yourself",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-5",
    dateRange: "Oct 6-7",
    startDate: "2026-10-06",
    endDate: "2026-10-07",
    dayCount: 2,
    topic: "Multithreading + GIL",
    focusNote: "Conceptual — why threading behaves differently, what GIL blocks. Don't write complex threaded code",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-6",
    dateRange: "Oct 8",
    startDate: "2026-10-08",
    endDate: "2026-10-08",
    dayCount: 1,
    topic: "Multiprocessing",
    focusNote: "Quick — when to use instead of threading, one basic example",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-7",
    dateRange: "Oct 9",
    startDate: "2026-10-09",
    endDate: "2026-10-09",
    dayCount: 1,
    topic: "Buffer / catch-up day",
    focusNote: "Review anything shaky from asyncio/GIL. If ahead, add notes to Study Notes section instead",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-8",
    dateRange: "Oct 10-11",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    dayCount: 2,
    topic: "Pydantic",
    focusNote: "Type-safe validation, models, field validators — used constantly ahead",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-9",
    dateRange: "Oct 12",
    startDate: "2026-10-12",
    endDate: "2026-10-12",
    dayCount: 1,
    topic: "Mini checkpoint",
    focusNote: "Rewrite generators/decorators/asyncio notes in your own words on Study Notes site before moving on",
    phase: "Python Fundamentals",
    phaseId: "phase-1",
    completed: false
  },
  {
    id: "block-10",
    dateRange: "Oct 13-15",
    startDate: "2026-10-13",
    endDate: "2026-10-15",
    dayCount: 3,
    topic: "LLM fundamentals (part 1)",
    focusNote: "Tokenization, embeddings — watch visual explainers before reading",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-11",
    dateRange: "Oct 16-18",
    startDate: "2026-10-16",
    endDate: "2026-10-18",
    dayCount: 3,
    topic: "LLM fundamentals (part 2)",
    focusNote: "Attention, transformers, 'Attention is All You Need' concepts — conceptual only",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-12",
    dateRange: "Oct 19-20",
    startDate: "2026-10-19",
    endDate: "2026-10-20",
    dayCount: 2,
    topic: "Prompt engineering",
    focusNote: "Zero-shot, few-shot, chain-of-thought, structured outputs with Pydantic — practice writing prompts",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-13",
    dateRange: "Oct 21-22",
    startDate: "2026-10-21",
    endDate: "2026-10-22",
    dayCount: 2,
    topic: "OpenAI / Gemini API setup",
    focusNote: "First real API calls from Python, small script, no framework yet",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-14",
    dateRange: "Oct 23",
    startDate: "2026-10-23",
    endDate: "2026-10-23",
    dayCount: 1,
    topic: "Buffer / catch-up day",
    focusNote: "Catch up on API calls and prompt testing or polish study notes",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-15",
    dateRange: "Oct 24-26",
    startDate: "2026-10-24",
    endDate: "2026-10-26",
    dayCount: 3,
    topic: "FastAPI basics",
    focusNote: "Wrap your LLM API call in a FastAPI endpoint — first real mini-project",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-16",
    dateRange: "Oct 27-28",
    startDate: "2026-10-27",
    endDate: "2026-10-28",
    dayCount: 2,
    topic: "Docker (AI-specific)",
    focusNote: "Running Ollama in Docker, basic deployment — keep practical",
    phase: "LLM Fundamentals",
    phaseId: "phase-2",
    completed: false
  },
  {
    id: "block-17",
    dateRange: "Oct 29-31",
    startDate: "2026-10-29",
    endDate: "2026-10-31",
    dayCount: 3,
    topic: "RAG intro",
    focusNote: "Chunking strategies, embeddings for retrieval, intro to vector DBs (Chroma) — start reading, don't build full pipeline yet",
    phase: "RAG",
    phaseId: "phase-3",
    completed: false
  },
  {
    id: "block-18",
    dateRange: "Nov 1-2",
    startDate: "2026-11-01",
    endDate: "2026-11-02",
    dayCount: 2,
    topic: "Month-end review + project kickoff",
    focusNote: "Review all October topics on Study Notes site; set up repo for 'Local Ollama + FastAPI AI app' project",
    phase: "RAG",
    phaseId: "phase-3",
    completed: false
  }
];
