# My AI Engineering Career Switch 🚀

> **From LAMP → JS/React → Python & Agentic AI**  
> *A working developer’s career switch roadmap and single source of truth, tracked in public.*

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Target](https://img.shields.io/badge/Target-Q2%202027-10b981?style=flat-square)

---

## 📌 Background & Context

- **Current Background:** 5 years LAMP + 3 years maintenance + 2 years JavaScript / React.
- **Goal:** Career transition into **AI Engineer / Agentic AI Engineer** roles.
- **Commitment:** Part-time (1–2 hours on weeknights + focused weekends) while maintaining current engineering job.
- **Target Launch Date:** Start applying around **Q2 2027**.

---

## ⚡ Key Highlights & Architecture

1. **6-Phase Roadmap with Interactive Checklists:**
   - **Phase 1:** Python Fundamentals & Asyncio Bedrock (Months 1–2)
   - **Phase 2:** LLM Internals, Tokenization & Serving (Months 2–3)
   - **Phase 3:** Production RAG Systems & Hybrid Search (Months 3–5)
   - **Phase 4:** Autonomous Agents, LangGraph & Checkpointing (Months 5–7)
   - **Phase 5:** Model Context Protocol (MCP) & Redis Async Queues (Months 7–9)
   - **Phase 6:** Portfolio Applications & Career Sprint (Months 9–12)

2. **Personal Engineering Log Aesthetics:**
   - Dark command-center UI styled with Tailwind CSS, JetBrains Mono, and Inter.
   - Designed to look like a personal engineering log rather than corporate SaaS marketing.

3. **Interactive Study Notes & Fast Recaps (`#notes` / `/notes`):**
   - **Grouped Sidebar by Roadmap Phase:** Browse notes categorized by Phase 1 to Phase 6 with per-phase mastery indicators.
   - **Fast-to-Slow Display:** Displays (a) bold one-line summary, (b) syntax-highlighted code snippet with 1-click copy, (c) detailed markdown notes, and (d) quick-recap checkbox.
   - **AI Explain Button:** On-demand LLM integration (OpenAI, Gemini, OpenRouter) that generates <150 word terse explanations with tiny code examples and gotchas.
   - **Zero-Data-Leak API Settings:** BYOK API key saved strictly in local browser `localStorage`, with responses cached per topic.
   - **Add / Edit / Delete Modal:** Create technical notes with custom code snippets and markdown text.

4. **Learn vs Skip Filter:**
   - *"Anything plain-programming (syntax, OOP, git, basic docker) → skim fast. Anything titled LLM, RAG, Agent, LangGraph, Memory, or MCP → slow down and build it for real."*

5. **Zero-Backend State Persistence:**
   - All checklist progress, study notes, and custom portfolio project entries persist across browser visits using `localStorage`.

6. **Modularity:**
   - Roadmaps, projects, study notes, and course chapters are cleanly separated into data files under `src/data/` and services under `src/services/` for easy extension.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **Storage:** Browser `localStorage`

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have Node.js (v18+ or v20+) and npm installed:

```bash
node -v
npm -v
```

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/manishyadav/my-ai-engineering-career-switch.git
cd my-ai-engineering-career-switch
npm install
```

### Development Server

Run the development server locally:

```bash
npm run dev
```

Open your browser at `http://localhost:5173/`.

---

## 📦 Building for Production & Deployment

To build the static site bundle for deployment to Vercel, Netlify, Cloudflare Pages, or GitHub Pages:

```bash
npm run build
```

This compiles TypeScript and generates a production-optimized static bundle in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
Roadmap-GENAI/
├── index.html              # HTML entry point with Google Fonts
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind theme configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── README.md               # Documentation
└── src/
    ├── main.tsx            # React root mount
    ├── App.tsx             # Master application view
    ├── index.css           # Global Tailwind CSS & scrollbars
    ├── components/
    │   ├── Navbar.tsx          # Top bar with progress indicator
    │   ├── Hero.tsx            # Transition headline & snapshot stats
    │   ├── WhyThisPath.tsx     # 3 strategic career pillars
    │   ├── RoadmapTimeline.tsx # 6-phase vertical timeline & checklist
    │   ├── LearnVsSkip.tsx     # The golden rule & 2-column filter
    │   ├── CourseTracker.tsx   # Udemy bootcamp chapter progress
    │   ├── ProjectLog.tsx      # Portfolio projects card grid & adder
    │   └── Footer.tsx          # Build in public notes & links
    └── data/
        ├── roadmapData.ts      # Phases and competencies checklist
        ├── projectsData.ts     # Planned & custom projects
        ├── courseData.ts        # Bootcamp syllabus chapters
        ├── cheatSheetData.ts   # Learn vs Skip guidelines
        └── whyThisPathData.ts  # Rationale pillars
```

---

## 👤 Author

**Manish Yadav**  
*Building in public — tracking my switch from web dev to AI engineering.*  
- GitHub: [github.com/manishyadav](https://github.com/manishyadav)  
- Target: Agentic AI Engineer (Q2 2027)
