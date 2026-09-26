export interface ChecklistItem {
  id: string;
  text: string;
  note?: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  timeframe: string;
  durationMonths: string;
  statusBadge: string;
  focusSummary: string;
  items: ChecklistItem[];
  deliverable?: string;
  accentColor: string;
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "Python Fundamentals & Modern Tooling",
    timeframe: "Months 1 - 2",
    durationMonths: "2 Months",
    statusBadge: "Phase 1: Bedrock",
    focusSummary: "Master core Python through the lens of AI engineering. Focus on non-blocking asyncio and Pydantic validation.",
    accentColor: "emerald",
    deliverable: "Deliverable: Async CLI Script + Pydantic Data Models with Pytest tests",
    items: [
      {
        id: "p1-syntax",
        text: "Data types, conditionals, loops, functions, comprehensions, generators, decorators",
        note: "Master list/dict comprehensions and generator streaming (yield)"
      },
      {
        id: "p1-oop",
        text: "OOP (classes, inheritance, property decorators, classmethod vs staticmethod)",
        note: "Focus on dunder methods (__call__, __repr__) used by agent runnables"
      },
      {
        id: "p1-files",
        text: "File handling, custom context managers (with statement)",
        note: "Resource cleanup for DB sessions and local file parsing"
      },
      {
        id: "p1-asyncio",
        text: "Asyncio (event loop, tasks, gather) — deserves extra focus, different from JS's async model",
        note: "Crucial! Essential for non-blocking concurrent LLM calls and WebSocket streams"
      },
      {
        id: "p1-concurrency",
        text: "Multithreading / multiprocessing / GIL — understand conceptually, don't over-invest",
        note: "Know the difference: I/O bound (asyncio) vs CPU bound (multiprocessing)"
      },
      {
        id: "p1-pydantic",
        text: "Pydantic — structured data validation, quick to learn",
        note: "Field validators, model_validate_json, and automatic JSON schema generation"
      }
    ]
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    title: "LLM & AI Fundamentals",
    timeframe: "Month 2 - 3",
    durationMonths: "1.5 Months",
    statusBadge: "Phase 2: Under The Hood",
    focusSummary: "Understand how transformers work under the hood, master prompting for structured outputs, and connect LLMs to FastAPI.",
    accentColor: "cyan",
    deliverable: "Deliverable: Local Tokenizer + FastAPI Streaming LLM Endpoint (SSE)",
    items: [
      {
        id: "p2-llm-internals",
        text: "How LLMs work: tokenization, embeddings, attention, transformers",
        note: "Deconstruct Scaled Dot-Product Attention & BPE subword tokenization"
      },
      {
        id: "p2-prompting",
        text: "Prompt engineering: zero-shot, few-shot, chain-of-thought, structured output",
        note: "Enforcing strict JSON schema responses using Pydantic"
      },
      {
        id: "p2-apis",
        text: "OpenAI & Gemini API integration with Python",
        note: "SDK usage, streaming responses, error handling & token budgeting"
      },
      {
        id: "p2-fastapi",
        text: "FastAPI basics — learned in context, wrapping real LLM calls, not generic CRUD practice",
        note: "Server-Sent Events (SSE) streaming, async endpoints, dependency injection"
      }
    ]
  },
  {
    id: "phase-3",
    phaseNumber: 3,
    title: "RAG Systems (Retrieval-Augmented Generation)",
    timeframe: "Month 3 - 5",
    durationMonths: "2 Months",
    statusBadge: "Phase 3: Information Retrieval",
    focusSummary: "Move beyond toy vector search. Implement production-grade indexing, chunking, hybrid retrieval, and vector database management.",
    accentColor: "indigo",
    deliverable: "Deliverable: Production Document RAG Pipeline with Qdrant/Chroma & Evaluation",
    items: [
      {
        id: "p3-chunking",
        text: "Chunking strategies, embeddings, vector databases (Chroma, Pinecone, Qdrant)",
        note: "Recursive character vs semantic chunking; HNSW indexing strategies"
      },
      {
        id: "p3-rag-pipeline",
        text: "Full RAG pipeline: indexing, retrieval, answering",
        note: "Context window packing, prompt augmentation, citation generation"
      },
      {
        id: "p3-langchain",
        text: "LangChain: document loaders, splitters, retrievers, vector stores",
        note: "Understand internal abstractions without becoming overly dependent on bloated wrappers"
      },
      {
        id: "p3-build-rag",
        text: "Build: Document RAG pipeline project",
        note: "Upload PDFs/Markdown, search with hybrid BM25 + dense vectors, stream answers"
      }
    ]
  },
  {
    id: "phase-4",
    phaseNumber: 4,
    title: "Agents & LangGraph (Cyclic Orchestration)",
    timeframe: "Month 5 - 7",
    durationMonths: "2 Months",
    statusBadge: "Phase 4: Agentic Core",
    focusSummary: "Build autonomous agents using state machines. Master tool-calling, the ReAct loop, conditional routing, and memory layers.",
    accentColor: "violet",
    deliverable: "Deliverable: CLI Coding Agent & Stateful LangGraph Agent with Checkpointing",
    items: [
      {
        id: "p4-agents-scratch",
        text: "AI agents from scratch, tool-calling, ReAct pattern",
        note: "Thought-Action-Observation loop without frameworks; tool definition via Pydantic"
      },
      {
        id: "p4-langgraph",
        text: "LangGraph: state, nodes, edges, checkpointing",
        note: "StateGraph, TypedDict states, conditional routing, human-in-the-loop approvals"
      },
      {
        id: "p4-memory",
        text: "Memory systems: short-term, long-term, semantic memory, Mem0, graph memory (Neo4j)",
        note: "Moving past flat vector search to relational knowledge graphs & entity persistence"
      },
      {
        id: "p4-build-agents",
        text: "Build: CLI coding agent, stateful LangGraph agent",
        note: "Autonomous coding helper + stateful multi-turn reasoning agent"
      }
    ]
  },
  {
    id: "phase-5",
    phaseNumber: 5,
    title: "MCP & Production Concerns",
    timeframe: "Month 7 - 9",
    durationMonths: "2 Months",
    statusBadge: "Phase 5: Enterprise Protocols",
    focusSummary: "Adopt the open Model Context Protocol (MCP), scale RAG with async Redis queues, and implement evaluations & observability.",
    accentColor: "amber",
    deliverable: "Deliverable: Custom Python MCP Server + Redis Async Worker Queue + LangSmith Tracing",
    items: [
      {
        id: "p5-mcp-concept",
        text: "Model Context Protocol: what it is, STDIO/SSE transports",
        note: "The universal USB-C standard for connecting LLMs to databases & APIs"
      },
      {
        id: "p5-mcp-build",
        text: "Build an MCP server with Python",
        note: "FastMCP server exposing tools and resources to Claude Desktop & Cursor"
      },
      {
        id: "p5-queue-rag",
        text: "Advanced RAG: Redis/Valkey queues, async processing, scaling with FastAPI",
        note: "Decouple heavy PDF parsing/embedding from web requests using worker pools"
      },
      {
        id: "p5-evals",
        text: "Evals & observability basics: RAGAS, LangSmith, LLM-as-judge concepts (self-taught via free docs)",
        note: "Faithfulness, Answer Relevance, Context Precision; CI/CD regression testing"
      }
    ]
  },
  {
    id: "phase-6",
    phaseNumber: 6,
    title: "Portfolio & Job Prep",
    timeframe: "Month 9 - 12",
    durationMonths: "3 Months",
    statusBadge: "Phase 6: Career Launch",
    focusSummary: "Package full-stack AI applications (FastAPI + React/TS), build your public presence, and start interviewing for high-impact roles.",
    accentColor: "rose",
    deliverable: "Deliverable: 3-4 Polished Live Demos + GitHub Repos + Targeted Resume",
    items: [
      {
        id: "p6-polish-portfolio",
        text: "Polish 3-4 portfolio projects (Python/FastAPI backend + React/Next.js frontend) on GitHub with good READMEs",
        note: "Showcase the full-stack edge: clean UI fronting real asynchronous agent backends"
      },
      {
        id: "p6-build-in-public",
        text: "Publish build-in-public posts on LinkedIn",
        note: "Breakdowns of architectural decisions, benchmarks, and agent failure modes"
      },
      {
        id: "p6-target-roles",
        text: "Target titles: 'AI Engineer', 'GenAI Engineer', 'Agentic AI Engineer' — not generic 'Full Stack + AI' roles",
        note: "Position as a specialist in agents, RAG, and scalable AI infrastructure"
      },
      {
        id: "p6-apply",
        text: "Start applying ~Q2 2027",
        note: "Targeting GCCs, AI startups, and enterprise engineering centers"
      }
    ]
  }
];
