import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Target, ArrowRight, BookMarked, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

interface HeroProps {
  completedPercentage: number;
}

export const Hero: React.FC<HeroProps> = ({ completedPercentage }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden pt-14 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Apple-style Background Ambient Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 dark:from-emerald-950/20 via-slate-200/20 dark:via-slate-950/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          
          <div className="max-w-3xl">
            {/* Apple Launch-style Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Career Switch
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                Part-Time: 1-2 hrs weeknights + weekends
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono">
                <Target className="w-3.5 h-3.5 text-amber-500" />
                Target: Q2 2027
              </span>
            </div>

            {/* Apple Titanium Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] font-display text-slate-900 dark:text-white">
              My Path to <span className="gradient-text-emerald">AI Engineering.</span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-slate-700 dark:text-slate-200">
              From LAMP → JS/React → Python & Agentic AI
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              A working developer’s switch into GenAI, tracked in public. Moving past commoditized prompt wrappers toward durable agent orchestration, RAG architectures, and production system design.
            </p>

            {/* Apple-style CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#notes"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <BookMarked className="w-4 h-4" />
                <span>Study Notes (17 Topics)</span>
              </a>
              <a
                href="#timetable"
                className="px-5 py-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold text-xs sm:text-sm border border-cyan-500/30 transition-all flex items-center gap-2 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>Daily Timetable</span>
              </a>
              <a
                href="#roadmap"
                className="px-5 py-3 rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-300/80 dark:border-slate-800 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <span>6-Phase Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#learn-vs-skip"
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm border border-slate-300/80 dark:border-slate-800 transition-all flex items-center gap-2"
              >
                <span>Learn vs Skip</span>
              </a>
              <a
                href="#projects"
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-900 text-amber-700 dark:text-amber-300 font-medium text-xs sm:text-sm border border-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>6 Capstones</span>
              </a>
            </div>
          </div>

          {/* Right Snapshot Dashboard Card (Frosted Glass Apple Design) */}
          <div className="w-full lg:w-96 glass-card rounded-3xl p-6 sm:p-7 border glow-emerald relative overflow-hidden">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">Target Role Profile</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold font-mono border border-emerald-500/30">
                Specialist
              </span>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Agentic AI Engineer
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Targeting: AI Engineer • GenAI Engineer • Agentic Systems Architect
              </p>
            </div>

            {/* Transition Snapshot Metrics */}
            <div className="mt-5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-200/80 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Prior Stack:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">5yr LAMP + 2yr React/TS</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/80 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Target Stack:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Python 3.12, LangGraph, MCP</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/80 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Current Phase:</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">Phase 1: Python Bedrock</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Target Timeline:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Q2 2027
                </span>
              </div>
            </div>

            {/* Required Skills & Competencies */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Required Skills for this Role</span>
                </span>
                <button
                  onClick={() => setShowAllSkills(prev => !prev)}
                  className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-0.5 transition-colors"
                >
                  <span>{showAllSkills ? 'Compact' : 'Full Matrix (16)'}</span>
                  {showAllSkills ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Compact Skill Badges (Ordered Phase 1 -> Phase 5) */}
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-[11px] font-mono font-medium">
                  Phase 1: Asyncio & Pydantic
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[11px] font-mono font-medium">
                  Phase 2: FastAPI & Ollama
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-[11px] font-mono font-medium">
                  Phase 3: Hybrid RAG (RRF)
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-[11px] font-mono font-medium">
                  Phase 4: LangGraph Agents
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 text-[11px] font-mono font-medium">
                  Phase 5: MCP Protocols
                </span>
              </div>

              {/* Full Detailed Skill Matrix (Chronological: Phase 1 -> Phase 5) */}
              {showAllSkills && (
                <div className="mt-3 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs animate-fade-in">
                  
                  {/* Category 1: Phase 1 */}
                  <div>
                    <div className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between text-[11px] mb-1">
                      <span>Phase 1: Python Bedrock & Concurrency</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-500/10 border border-blue-500/20 font-bold">Phase 1</span>
                    </div>
                    <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300 pl-1">
                      <li>• <strong>Async Python 3.12:</strong> Event loop, async/await, tasks & Semaphores</li>
                      <li>• <strong>Pydantic v2:</strong> Rust-core strict JSON validation & auto schemas</li>
                      <li>• <strong>GIL & Multithreading:</strong> Non-blocking I/O vs CPU multiprocessing</li>
                      <li>• <strong>Context Managers & Memory:</strong> Safe file I/O & token buffering</li>
                    </ul>
                  </div>

                  {/* Category 2: Phase 2 */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-between text-[11px] mb-1">
                      <span>Phase 2: LLM Fundamentals & Endpoints</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">Phase 2</span>
                    </div>
                    <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300 pl-1">
                      <li>• <strong>FastAPI SSE:</strong> Server-Sent Events real-time token streaming</li>
                      <li>• <strong>Prompt Architecture:</strong> Zero-shot, Few-shot, ReAct reasoning</li>
                      <li>• <strong>Function Calling:</strong> Strict deterministic tool payload contracts</li>
                      <li>• <strong>Docker & Ollama:</strong> Local containerized inference & deployment</li>
                    </ul>
                  </div>

                  {/* Category 3: Phase 3 */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="font-semibold text-purple-600 dark:text-purple-400 flex items-center justify-between text-[11px] mb-1">
                      <span>Phase 3: RAG & Information Retrieval</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 font-bold">Phase 3</span>
                    </div>
                    <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300 pl-1">
                      <li>• <strong>Hybrid Search:</strong> Dense vector embeddings + Sparse BM25 lexical</li>
                      <li>• <strong>Reciprocal Rank Fusion (RRF):</strong> Formula-driven candidate merger</li>
                      <li>• <strong>Vector Databases:</strong> ChromaDB/Qdrant indexing & chunking</li>
                      <li>• <strong>Cross-Encoder Rerankers:</strong> FlashRank / Cohere rank precision</li>
                    </ul>
                  </div>

                  {/* Category 4: Phase 4 */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="font-semibold text-amber-600 dark:text-amber-400 flex items-center justify-between text-[11px] mb-1">
                      <span>Phase 4: Agentic Core & LangGraph</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20 font-bold">Phase 4</span>
                    </div>
                    <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300 pl-1">
                      <li>• <strong>LangGraph StateGraph:</strong> Cycles, memory checkpointing & branching</li>
                      <li>• <strong>Multi-Agent Supervisor:</strong> Router & hierarchical execution</li>
                      <li>• <strong>Human-in-the-Loop:</strong> Approval halts & persistent state resumption</li>
                      <li>• <strong>Cognitive Memory:</strong> Short/long-term memory & entity graphs</li>
                    </ul>
                  </div>

                  {/* Category 5: Phase 5 */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 flex items-center justify-between text-[11px] mb-1">
                      <span>Phase 5: Protocols & Production Ops</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/20 font-bold">Phase 5</span>
                    </div>
                    <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300 pl-1">
                      <li>• <strong>Model Context Protocol (MCP):</strong> STDIO & SSE tools standard</li>
                      <li>• <strong>Custom FastMCP Servers:</strong> Exposing tools to Cursor & Claude</li>
                      <li>• <strong>Async Queue Architecture:</strong> Redis/Valkey background task scaling</li>
                      <li>• <strong>Evaluation & Tracing:</strong> LangSmith benchmarks & regression evals</li>
                    </ul>
                  </div>

                </div>
              )}
            </div>

            {/* Overall Progress */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Curriculum Progress</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{completedPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300/80 dark:border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${completedPercentage}%` }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
