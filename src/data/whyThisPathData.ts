export interface WhyPillar {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  summary: string;
  points: string[];
}

export const WHY_THIS_PATH: WhyPillar[] = [
  {
    id: "python-over-node",
    title: "Python over Node for AI",
    badge: "Ecosystem Gravity",
    iconName: "Binary",
    summary: "The entire AI/ML ecosystem is built Python-first. Node/JS bindings are secondary ports with delayed features.",
    points: [
      "Every foundational framework (PyTorch, Hugging Face, LangGraph, CrewAI, vLLM, FastMCP) originates and matures in Python.",
      "JS/TypeScript AI libraries (LangChain.js) often lag behind, suffer from breaking API changes, or lack advanced features like complex graph checkpointing.",
      "Senior AI engineering roles and GCC interviews strictly test Python idioms: Asyncio event loops, Pydantic v2 validation, generators, and Pytest."
    ]
  },
  {
    id: "full-stack-advantage",
    title: "The Full-Stack Advantage",
    badge: "Key Differentiator",
    iconName: "Layers",
    summary: "Your 2+ years of JS/React experience is a major superpower, not something to throw away.",
    points: [
      "Most AI researchers and ML engineers struggle to build sleek, responsive user interfaces or production web applications.",
      "Full-stack AI engineers who can design a Python/FastAPI agentic backend AND ship a high-performance React/TypeScript UI are in top 5% demand.",
      "You can build complete, end-to-end working software products—from token streaming SSE hooks to complex stateful agent canvases."
    ]
  },
  {
    id: "avoid-lamp-trap",
    title: "Avoiding the 'LAMP Saturation' Trap",
    badge: "Durable Career Moat",
    iconName: "ShieldAlert",
    summary: "Basic prompt wrappers and simple API callers are commoditizing at lightning speed, just like LAMP CRUD websites did.",
    points: [
      "Trivial 'call the OpenAI API and show the text' apps are being automated away or built by non-technical founders.",
      "The durable, high-paying career value lives in: Cyclic Agent Orchestration (LangGraph), Scalable RAG Pipelines (hybrid search + Redis queues), Model Context Protocol (MCP), and Rigorous Evals.",
      "By focusing on system design, state machines, and distributed workers, your skills remain resilient against model commoditization."
    ]
  }
];
