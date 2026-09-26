import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyThisPath } from './components/WhyThisPath';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { LearnVsSkip } from './components/LearnVsSkip';
import { CourseTracker } from './components/CourseTracker';
import { ProjectLog } from './components/ProjectLog';
import { Footer } from './components/Footer';

import { StudyNotes } from './components/notes/StudyNotes';
import { 
  StudyTopic, 
  AISettings, 
  loadTopics, 
  saveTopics, 
  loadAISettings, 
  saveAISettings,
  resetTopicsToDefault
} from './services/notesStorage';
import { INITIAL_STUDY_TOPICS } from './data/initialNotes';

import { TimetableBlock, INITIAL_TIMETABLE_BLOCKS } from './data/timetableData';
import { 
  loadTimetable, 
  saveTimetable, 
  resetTimetableToDefault 
} from './services/timetableStorage';
import { Timetable } from './components/timetable/Timetable';

import { ROADMAP_PHASES, RoadmapPhase } from './data/roadmapData';
import { INITIAL_PROJECTS, ProjectEntry, ProjectStatus } from './data/projectsData';

export const App: React.FC = () => {
  // Navigation Route ('roadmap' | 'notes' | 'timetable')
  const [currentRoute, setCurrentRoute] = useState<'roadmap' | 'notes' | 'timetable'>(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === '#timetable' || path === '/timetable') {
      return 'timetable';
    }
    if (hash === '#notes' || path === '/notes') {
      return 'notes';
    }
    return 'roadmap';
  });

  // Theme state ('dark' | 'light')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // default dark mode for Apple aesthetic
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#timetable') {
        setCurrentRoute('timetable');
      } else if (hash === '#notes') {
        setCurrentRoute('notes');
      } else if (hash === '#roadmap' || hash === '' || hash.startsWith('#')) {
        // If it's a specific anchor like #projects, switch to roadmap view
        if (hash !== '#notes' && hash !== '#timetable') {
          setCurrentRoute('roadmap');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: 'roadmap' | 'notes' | 'timetable') => {
    setCurrentRoute(route);
    if (route === 'timetable') {
      window.location.hash = 'timetable';
    } else if (route === 'notes') {
      window.location.hash = 'notes';
    } else {
      window.location.hash = 'roadmap';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Roadmap Checked Map (localStorage)
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('roadmap_checked_items');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 2. Course Chapters Checked Map (localStorage)
  const [courseCheckedMap, setCourseCheckedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('course_checked_items');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 3. Projects State (localStorage)
  const [projects, setProjects] = useState<ProjectEntry[]>(() => {
    try {
      const saved = localStorage.getItem('user_projects_data');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // 4. Study Notes State (localStorage)
  const [topics, setTopics] = useState<StudyTopic[]>(() => {
    return loadTopics(INITIAL_STUDY_TOPICS);
  });

  // 5. AI Settings (localStorage)
  const [aiSettings, setAiSettings] = useState<AISettings>(() => {
    return loadAISettings();
  });

  // 6. Study Timetable State (localStorage)
  const [timetableBlocks, setTimetableBlocks] = useState<TimetableBlock[]>(() => {
    return loadTimetable(INITIAL_TIMETABLE_BLOCKS);
  });

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('roadmap_checked_items', JSON.stringify(checkedMap));
  }, [checkedMap]);

  useEffect(() => {
    localStorage.setItem('course_checked_items', JSON.stringify(courseCheckedMap));
  }, [courseCheckedMap]);

  useEffect(() => {
    localStorage.setItem('user_projects_data', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    saveTopics(topics);
  }, [topics]);

  useEffect(() => {
    saveTimetable(timetableBlocks);
  }, [timetableBlocks]);

  // Roadmap Toggle Item
  const handleToggleRoadmapItem = (itemId: string) => {
    setCheckedMap(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Toggle all items in a phase
  const handleToggleAllInPhase = (phase: RoadmapPhase, checkAll: boolean) => {
    setCheckedMap(prev => {
      const updated = { ...prev };
      phase.items.forEach(item => {
        updated[item.id] = checkAll;
      });
      return updated;
    });
  };

  // Course Toggle Item
  const handleToggleCourseItem = (itemId: string) => {
    setCourseCheckedMap(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Update Project Status
  const handleUpdateProjectStatus = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  // Add Project
  const handleAddProject = (newProj: Omit<ProjectEntry, 'id'>) => {
    const entry: ProjectEntry = {
      ...newProj,
      id: `proj-custom-${Date.now()}`
    };
    setProjects(prev => [entry, ...prev]);
  };

  // Notes: Save / Update Topic
  const handleSaveTopic = (
    topicData: Omit<StudyTopic, 'id' | 'createdAt' | 'updatedAt' | 'understood' | 'aiExplanation'>,
    existingId?: string
  ) => {
    const now = new Date().toISOString();
    if (existingId) {
      setTopics(prev => prev.map(t => {
        if (t.id === existingId) {
          return {
            ...t,
            ...topicData,
            updatedAt: now
          };
        }
        return t;
      }));
    } else {
      const newTopic: StudyTopic = {
        ...topicData,
        id: `topic-${Date.now()}`,
        understood: false,
        createdAt: now,
        updatedAt: now
      };
      setTopics(prev => [newTopic, ...prev]);
    }
  };

  // Notes: Delete Topic
  const handleDeleteTopic = (id: string) => {
    setTopics(prev => prev.filter(t => t.id !== id));
  };

  // Notes: Toggle Understood Checkbox
  const handleToggleTopicUnderstood = (id: string) => {
    setTopics(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          understood: !t.understood,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
  };

  // Notes: Update & Cache AI Explanation
  const handleUpdateAIExplanation = (id: string, explanation: string) => {
    setTopics(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          aiExplanation: explanation,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
  };

  // Notes: Save AI Settings
  const handleSaveAISettings = (newSettings: AISettings) => {
    setAiSettings(newSettings);
    saveAISettings(newSettings);
  };

  // Notes: Reset Topics to 17 syllabus items
  const handleResetTopics = () => {
    const refreshed = resetTopicsToDefault(INITIAL_STUDY_TOPICS);
    setTopics(refreshed);
  };

  // Timetable: Toggle Block Completed
  const handleToggleTimetableBlock = (id: string) => {
    const today = new Date();
    const readableDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setTimetableBlocks(prev => prev.map(b => {
      if (b.id === id) {
        const nextCompleted = !b.completed;
        return {
          ...b,
          completed: nextCompleted,
          completedDate: nextCompleted ? (b.completedDate || readableDate) : undefined
        };
      }
      return b;
    }));
  };

  // Timetable: Add Custom Block
  const handleAddTimetableBlock = (blockData: Omit<TimetableBlock, 'id' | 'completed' | 'isCustom'>) => {
    const newBlock: TimetableBlock = {
      ...blockData,
      id: `custom-block-${Date.now()}`,
      completed: false,
      isCustom: true
    };
    setTimetableBlocks(prev => [...prev, newBlock]);
  };

  // Timetable: Reset to Standard Schedule
  const handleResetTimetable = () => {
    const resetList = resetTimetableToDefault(INITIAL_TIMETABLE_BLOCKS);
    setTimetableBlocks(resetList);
  };

  // Reset all progress
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all checklist progress? Your projects and study notes will remain intact.")) {
      setCheckedMap({});
      setCourseCheckedMap({});
      localStorage.removeItem('roadmap_checked_items');
      localStorage.removeItem('course_checked_items');
    }
  };

  // Global Progress Calculation (Roadmap items)
  const totalRoadmapItems = ROADMAP_PHASES.reduce((acc, phase) => acc + phase.items.length, 0);
  const completedRoadmapItems = Object.values(checkedMap).filter(Boolean).length;
  const completedPercentage = totalRoadmapItems > 0 ? Math.round((completedRoadmapItems / totalRoadmapItems) * 100) : 0;

  const timetableCompletedCount = timetableBlocks.filter(b => b.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a11] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-500 flex flex-col transition-colors duration-300">
      <Navbar
        completedCount={completedRoadmapItems}
        totalCount={totalRoadmapItems}
        onResetProgress={handleResetProgress}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        notesCount={topics.length}
        timetableCount={{ completed: timetableCompletedCount, total: timetableBlocks.length }}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        {currentRoute === 'roadmap' ? (
          <>
            <Hero completedPercentage={completedPercentage} />
            <WhyThisPath />
            <RoadmapTimeline
              checkedMap={checkedMap}
              onToggleItem={handleToggleRoadmapItem}
              onToggleAllInPhase={handleToggleAllInPhase}
            />
            <LearnVsSkip />
            <CourseTracker
              courseCheckedMap={courseCheckedMap}
              onToggleCourseItem={handleToggleCourseItem}
            />
            <ProjectLog
              projects={projects}
              onUpdateStatus={handleUpdateProjectStatus}
              onAddProject={handleAddProject}
            />
          </>
        ) : currentRoute === 'notes' ? (
          <StudyNotes
            topics={topics}
            onSaveTopic={handleSaveTopic}
            onDeleteTopic={handleDeleteTopic}
            onToggleUnderstood={handleToggleTopicUnderstood}
            onUpdateAIExplanation={handleUpdateAIExplanation}
            aiSettings={aiSettings}
            onSaveAISettings={handleSaveAISettings}
            onResetTopics={handleResetTopics}
          />
        ) : (
          <Timetable
            blocks={timetableBlocks}
            onToggleComplete={handleToggleTimetableBlock}
            onAddBlock={handleAddTimetableBlock}
            onResetTimetable={handleResetTimetable}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
