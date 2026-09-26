import React, { useState } from 'react';
import { ProjectEntry, ProjectStatus } from '../data/projectsData';
import { GitBranch, ExternalLink, Plus, Filter, Sparkles } from 'lucide-react';

interface ProjectLogProps {
  projects: ProjectEntry[];
  onUpdateStatus: (projectId: string, newStatus: ProjectStatus) => void;
  onAddProject: (newProj: Omit<ProjectEntry, 'id'>) => void;
}

export const ProjectLog: React.FC<ProjectLogProps> = ({
  projects,
  onUpdateStatus,
  onAddProject,
}) => {
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New project form state
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStack, setFormStack] = useState('');
  const [formGithub, setFormGithub] = useState('');
  const [formStatus, setFormStatus] = useState<ProjectStatus>('Planned');

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30';
      case 'Planned':
      default:
        return 'bg-slate-100 dark:bg-slate-800/80 text-amber-700 dark:text-amber-300 border-slate-200 dark:border-slate-700';
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    onAddProject({
      name: formName,
      description: formDesc || 'Custom project in AI engineering track.',
      techStack: formStack ? formStack.split(',').map(s => s.trim()) : ['Python', 'AI'],
      githubUrl: formGithub || 'https://github.com/manishyadav',
      status: formStatus,
      phaseId: 'custom',
    });

    setFormName('');
    setFormDesc('');
    setFormStack('');
    setFormGithub('');
    setShowAddModal(false);
  };

  return (
    <section id="projects" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Proof of Work
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Portfolio Project Log
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Real systems over tutorial followers. Each project represents an end-to-end milestone demonstrating full-stack AI engineering competence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/30 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Custom Project
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono shadow-inner">
            <span className="px-2 py-1 text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['All', 'Planned', 'In Progress', 'Done'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filter === status
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Showing {filteredProjects.length} of {projects.length} Projects
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Header & Status Toggle */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.name}
                  </h3>
                  
                  {/* Status Dropdown/Toggle */}
                  <select
                    value={project.status}
                    onChange={(e) => onUpdateStatus(project.id, e.target.value as ProjectStatus)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border focus:outline-none cursor-pointer ${getStatusBadge(project.status)}`}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.keyHighlight && (
                  <div className="mb-4 p-2.5 rounded-lg bg-amber-500/10 dark:bg-slate-950/70 border border-amber-500/20 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-400 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{project.keyHighlight}</span>
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with GitHub Link */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <a
                  href={project.githubUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-mono text-[11px]"
                >
                  <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub Repo</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>

                <span className="text-[10px] font-mono text-slate-500">
                  {project.status === 'Done' ? 'Completed' : project.status === 'In Progress' ? 'Active Build' : 'Queued'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Add New Portfolio Project</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GraphRAG with Neo4j & Cypher"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short description of what the project does and why it matters..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. FastAPI, LangGraph, Neo4j, Docker"
                    value={formStack}
                    onChange={(e) => setFormStack(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as ProjectStatus)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none shadow-inner"
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">GitHub Repo Link</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={formGithub}
                      onChange={(e) => setFormGithub(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/20"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
