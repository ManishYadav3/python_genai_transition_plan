export type ProjectStatus = "Planned" | "In Progress" | "Done";

export interface ProjectEntry {
  id: string;
  name: string;
  status: ProjectStatus;
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  phaseId: string;
  keyHighlight?: string;
}

export const INITIAL_PROJECTS: ProjectEntry[] = [
  {
    id: "proj-tokenizer",
    name: "Tokenizer from Scratch",
    status: "Planned",
    techStack: ["Python 3.12", "Regex", "BPE Algorithm", "Pytest"],
    description: "Build a Byte-Pair Encoding (BPE) subword tokenizer in pure Python without external ML libraries. Train vocabulary from raw corpus, handle UTF-8 bytes, and benchmark compression against tiktoken.",
    githubUrl: "https://github.com/manishyadav/bpe-tokenizer-scratch",
    phaseId: "phase-2",
    keyHighlight: "Demonstrates under-the-hood transformer understanding to senior interviewers."
  },
  {
    id: "proj-ollama-fastapi",
    name: "Local Ollama + FastAPI AI App",
    status: "Planned",
    techStack: ["FastAPI", "Ollama", "Docker", "Pydantic v2", "SSE"],
    description: "Containerized local LLM gateway running quantized LLaMA-3.2/DeepSeek models with async Server-Sent Events (SSE) streaming, rate limiting, and health checks.",
    githubUrl: "https://github.com/manishyadav/local-ollama-fastapi-hub",
    phaseId: "phase-2",
    keyHighlight: "Low latency streaming (TTFT < 250ms) without cloud API costs."
  },
  {
    id: "proj-document-rag",
    name: "Document RAG Pipeline (LangChain + Vector DB)",
    status: "Planned",
    techStack: ["Python", "LangChain", "Qdrant", "BM25", "FlashRank", "Ragas"],
    description: "Enterprise document Q&A engine combining dense vector embeddings with BM25 lexical search (hybrid retrieval), cross-encoder reranking, and Ragas automated evaluation.",
    githubUrl: "https://github.com/manishyadav/hybrid-document-rag",
    phaseId: "phase-3",
    keyHighlight: "Solves exact SKU/keyword retrieval failure in pure vector search."
  },
  {
    id: "proj-cli-coding-agent",
    name: "CLI Coding Agent",
    status: "Planned",
    techStack: ["Python Typer", "Claude 3.5 Sonnet", "AST Parser", "Subprocess"],
    description: "Terminal-based autonomous coding agent with a sandboxed tool runner, directory file tree inspection, AST syntax parsing, and automated self-healing test loops.",
    githubUrl: "https://github.com/manishyadav/cli-coding-agent",
    phaseId: "phase-4",
    keyHighlight: "Autonomous Thought-Action-Observation ReAct loop written from scratch."
  },
  {
    id: "proj-langgraph-agent",
    name: "Stateful LangGraph Agent with Memory",
    status: "Planned",
    techStack: ["LangGraph", "MongoDB", "Mem0", "Neo4j", "FastAPI"],
    description: "Cyclic multi-agent state machine with persistent checkpointing in MongoDB for multi-turn threads, human-in-the-loop approval, and relational knowledge graph memory in Neo4j.",
    githubUrl: "https://github.com/manishyadav/langgraph-stateful-agent",
    phaseId: "phase-4",
    keyHighlight: "True enterprise agent architecture with state rollbacks & episodic memory."
  },
  {
    id: "proj-mcp-server",
    name: "MCP-Powered AI Server",
    status: "Planned",
    techStack: ["FastMCP", "Python MCP SDK", "SQLite", "PostgreSQL", "SSE"],
    description: "Custom Python Model Context Protocol server exposing corporate database queries, system metrics, and internal tools over STDIO & SSE transports to Claude Desktop and Cursor.",
    githubUrl: "https://github.com/manishyadav/enterprise-mcp-server",
    phaseId: "phase-5",
    keyHighlight: "The open universal standard (Anthropic MCP) powering next-gen enterprise tools."
  }
];
