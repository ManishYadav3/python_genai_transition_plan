export interface CheatSheetCategory {
  title: string;
  type: "skip" | "deep";
  tagline: string;
  items: {
    name: string;
    reason: string;
    action: string;
  }[];
}

export const GOLDEN_RULE = "Anything plain-programming (syntax, OOP, git, basic docker) → skim fast. Anything titled LLM, RAG, Agent, LangGraph, Memory, or MCP → slow down and build it for real.";

export const CHEAT_SHEET_DATA: { skip: CheatSheetCategory; deep: CheatSheetCategory } = {
  skip: {
    title: "Skim Fast / Skip",
    type: "skip",
    tagline: "Do not waste precious study hours re-learning generic software engineering concepts you already understand.",
    items: [
      {
        name: "Basic Python Syntax & Conditionals",
        reason: "You already know loops, if/else, and functions from PHP/JS. Only pick up Python's syntactic differences (indentation, list comprehensions, slicing).",
        action: "Spend 2-3 days max, then move immediately to Asyncio and Pydantic."
      },
      {
        name: "Git & GitHub Basics",
        reason: "You have years of production experience. Branching, merging, and PRs are second nature.",
        action: "Zero hours needed. Only refresh pre-commit hooks and GitHub Actions for CI/CD testing."
      },
      {
        name: "Basic Docker Concepts",
        reason: "You know what a container and image are from LAMP/maintenance days.",
        action: "Only learn multi-stage Dockerfiles for Python slim images and docker-compose for Redis + Ollama."
      },
      {
        name: "Node.js / Express / NestJS",
        reason: "Backend AI engineering is Python-dominated. Building Node backends splits your focus and distracts from core AI libraries.",
        action: "Skip completely. Keep React/TS for frontend only; build all backend services in FastAPI."
      },
      {
        name: "Deep MongoDB / NoSQL Administration",
        reason: "You only need basic persistence for LangGraph state checkpointing (key-value thread state storage).",
        action: "Treat it as an off-the-shelf checkpoint store. Do not invest time in MongoDB indexing or sharding."
      }
    ]
  },
  deep: {
    title: "Learn Deeply & Build For Real",
    type: "deep",
    tagline: "This is where your interview offers and competitive moat are won. Go deep, build from scratch, and understand edge cases.",
    items: [
      {
        name: "Python Asyncio & Concurrency",
        reason: "LLM API calls are I/O bound. Synchronous blocking code ruins agent throughput. Asyncio differs fundamentally from JavaScript's single-threaded event loop.",
        action: "Build parallel tool callers with asyncio.gather, manage rate limits with Semaphores, and stream tokens via async generators."
      },
      {
        name: "Pydantic v2 & Structured Outputs",
        reason: "The bridge between non-deterministic LLMs and deterministic code. Guarantees that agent tool execution never crashes on malformed JSON.",
        action: "Master model validators, dynamic schemas, and model_json_schema() for tool calling."
      },
      {
        name: "LLM Fundamentals & Attention Math",
        reason: "Interviewers immediately filter out surface-level prompt engineers by asking how Scaled Dot-Product Attention and BPE tokenizers work under the hood.",
        action: "Write a BPE tokenizer from scratch and understand Q/K/V matrix multiplications."
      },
      {
        name: "RAG Architecture & Hybrid Retrieval",
        reason: "Naive RAG fails in production. Real enterprise systems require hybrid search (BM25 + dense vectors), reciprocal rank fusion, and cross-encoder reranking.",
        action: "Build a production RAG pipeline with Qdrant/Chroma and evaluate with Ragas metrics."
      },
      {
        name: "LangGraph State Machines & Cycles",
        reason: "Linear chains (DAGs) cannot handle real-world autonomous loops, backtracking, or human-in-the-loop approvals.",
        action: "Build multi-agent supervisor systems with TypedDict states and persistent checkpointing."
      },
      {
        name: "Model Context Protocol (MCP)",
        reason: "The open industry standard created by Anthropic. In 2026-2027, every enterprise agent connects to external tools via MCP.",
        action: "Code custom Python MCP servers supporting STDIO and SSE transports."
      },
      {
        name: "Evals & Observability (LangSmith / Ragas)",
        reason: "You cannot deploy an AI agent to production without measuring faithfulness, context precision, and latency regressions.",
        action: "Set up automated test suites using LLM-as-a-judge and Langfuse/LangSmith tracing."
      }
    ]
  }
};
