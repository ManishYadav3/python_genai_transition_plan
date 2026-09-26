import React, { useState } from 'react';
import { Github, Linkedin, Terminal, Edit2, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  // Allow user to edit their GitHub and LinkedIn URLs directly on the site, persisted in localStorage
  const [githubUrl, setGithubUrl] = useState(() => {
    return localStorage.getItem('profile_github_url') || 'https://github.com/manishyadav';
  });

  const [linkedinUrl, setLinkedinUrl] = useState(() => {
    return localStorage.getItem('profile_linkedin_url') || 'https://linkedin.com/in/manishyadav';
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveLinks = () => {
    localStorage.setItem('profile_github_url', githubUrl);
    localStorage.setItem('profile_linkedin_url', linkedinUrl);
    setIsEditing(false);
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#05080e] border-t border-slate-200 dark:border-slate-800/80 py-12 text-xs text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-200 block text-sm">
                My AI Engineering Career Switch
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                "Building in public — tracking my switch from web dev to AI engineering."
              </p>
            </div>
          </div>

          {/* Social Links & Edit toggle */}
          <div className="flex items-center gap-4">
            {!isEditing ? (
              <div className="flex items-center gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 font-mono text-[11px] shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 font-mono text-[11px] shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>LinkedIn</span>
                </a>

                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors"
                  title="Edit GitHub/LinkedIn profile links"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="GitHub URL"
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-900 dark:text-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-500 shadow-inner"
                />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="LinkedIn URL"
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-900 dark:text-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-500 shadow-inner"
                />
                <button
                  onClick={handleSaveLinks}
                  className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
                  title="Save links"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Footer Bottom info */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-1">
            <span>For purposeful career transformation - Developed by Manish Yadav</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
