export interface CourseModuleItem {
  id: string;
  title: string;
  category: "Python Bedrock" | "AI Fundamentals" | "RAG & Agents" | "Advanced & MCP";
  recommendedPace: "Skim Fast" | "Learn Deeply" | "Build Project";
}

export const COURSE_INFO = {
  title: "Complete AI & LLM Engineering Bootcamp",
  instructors: "Hitesh Choudhary & Piyush Garg",
  platform: "Udemy",
  tagline: "Comprehensive from-scratch curriculum: Python, Docker, Pydantic, LLMs, Agents, RAG, LangChain, LangGraph, and Multi-Modal AI.",
  url: "https://www.udemy.com/"
};

export const COURSE_CHAPTERS: CourseModuleItem[] = [
  { id: "c-datatypes", title: "Python Data Types & Syntax", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-conditionals", title: "Conditionals & Logic", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-loops", title: "Loops & Iterations", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-functions", title: "Functions, *args & **kwargs", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-comprehensions", title: "List & Dict Comprehensions", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-generators", title: "Generators, Yield & Decorators", category: "Python Bedrock", recommendedPace: "Learn Deeply" },
  { id: "c-oop", title: "OOP (Classes, Inheritance, Dunders)", category: "Python Bedrock", recommendedPace: "Learn Deeply" },
  { id: "c-files", title: "File Handling & Context Managers", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-asyncio", title: "Asyncio Event Loop & Concurrency", category: "Python Bedrock", recommendedPace: "Learn Deeply" },
  { id: "c-multithreading", title: "Multithreading & Multiprocessing", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-gil", title: "Understanding the Python GIL", category: "Python Bedrock", recommendedPace: "Skim Fast" },
  { id: "c-pydantic", title: "Pydantic v2 Type-Safe Data Handling", category: "Python Bedrock", recommendedPace: "Learn Deeply" },
  { id: "c-llm-fund", title: "LLM Fundamentals & Transformer Attention", category: "AI Fundamentals", recommendedPace: "Learn Deeply" },
  { id: "c-prompting", title: "Prompt Engineering & Structured Outputs", category: "AI Fundamentals", recommendedPace: "Learn Deeply" },
  { id: "c-rag", title: "The Complete RAG Pipeline & Vector DBs", category: "RAG & Agents", recommendedPace: "Build Project" },
  { id: "c-langchain", title: "LangChain Loaders, Splitters & Retrievers", category: "RAG & Agents", recommendedPace: "Learn Deeply" },
  { id: "c-langgraph", title: "LangGraph State Machines & Checkpointing", category: "RAG & Agents", recommendedPace: "Build Project" },
  { id: "c-memory", title: "Memory Systems (Mem0, Vector & Neo4j Graph)", category: "RAG & Agents", recommendedPace: "Build Project" },
  { id: "c-mcp", title: "Model Context Protocol (MCP) STDIO & SSE", category: "Advanced & MCP", recommendedPace: "Build Project" },
  { id: "c-multimodal", title: "Conversational Voice & Multi-Modal AI", category: "Advanced & MCP", recommendedPace: "Learn Deeply" },
];
