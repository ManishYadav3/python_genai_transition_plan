import { StudyTopic } from '../services/notesStorage';

export const INITIAL_STUDY_TOPICS: StudyTopic[] = [
  // ==========================================
  // TOPIC 1: DATA TYPES & MEMORY
  // ==========================================
  {
    id: "py-datatypes",
    title: "1. Data Types & Memory Reference Model",
    phaseId: "phase-1",
    inShort: "Variables in Python are pointers to heap objects; primitive scalars are immutable, while lists, dicts, and sets are mutable references.",
    codeLanguage: "python",
    codeSnippet: `# Immutable types (int, float, str, tuple, bytes) create new memory addresses on change
a = 1000
b = a
a += 1
print(f"a: {a} (id: {id(a)}), b: {b} (id: {id(b)})")  # Different ids

# Mutable types (list, dict, set) mutate in place
list_a = [1, 2, 3]
list_b = list_a  # Shared memory reference!
list_a.append(4)
print(list_b)  # [1, 2, 3, 4] - unintentionally altered!

# Always use copy() or deepcopy for agent memory buffers:
import copy
clean_history = copy.deepcopy(list_a)`,
    notes: `### Deep Dive: Memory & Type Model in Python 3.12+
- **Everything is an Object:** Integers, functions, classes, and modules inherit from \`object\`.
- **Reference Counting & GC:** Python tracks object references using an internal counter. When it drops to zero, memory is freed immediately. Cyclic references are cleared by the cyclic garbage collector.
- **Bytes vs Strings:** Strings (\`str\`) are unicode sequences; \`bytes\` are raw 8-bit octets. In AI, tokenizers and audio streams (Whisper) always operate over \`bytes\` before UTF-8 decoding.
- **Slicing Tricks for Token Windows:**
  - \`tokens[:500]\`: first 500 tokens (head truncation)
  - \`tokens[-500:]\`: last 500 tokens (tail truncation for chat context)
  - \`tokens[::-1]\`: reverse sequence

### Gotchas to Avoid
- **Never compare singletons with \`==\`:** Always use \`if x is None:\` instead of \`if x == None:\` because \`is\` checks memory identity ($O(1)$ pointer comparison).`,
    understood: true,
    createdAt: "2026-09-26T09:00:00.000Z",
    updatedAt: "2026-09-26T09:00:00.000Z"
  },

  // ==========================================
  // TOPIC 2: CONDITIONALS & PATTERN MATCHING
  // ==========================================
  {
    id: "py-conditionals",
    title: "2. Conditionals, Truthiness & Structural Pattern Matching",
    phaseId: "phase-1",
    inShort: "Python 3.10+ 'match-case' enables structural pattern matching over complex LLM tool payloads and JSON responses.",
    codeLanguage: "python",
    codeSnippet: `# Structural Pattern Matching over LLM tool action outputs
def handle_agent_action(action: dict):
    match action:
        case {"type": "tool_call", "name": "sql", "query": str(sql)}:
            return f"Executing SQL query: {sql}"
        case {"type": "tool_call", "name": "search", "query": str(q)}:
            return f"Searching web for: {q}"
        case {"type": "final_answer", "content": str(ans)}:
            return f"Returning to user: {ans}"
        case _:
            raise ValueError(f"Unknown action schema: {action}")

# Clean ternary operator for prompt templating
system_prompt = "You are a coding assistant" if is_code else "You are a general agent"`,
    notes: `### Truthiness & Falsy Values
- **Falsy objects:** \`None\`, \`False\`, \`0\`, \`0.0\`, \`""\` (empty str), \`[]\` (empty list), \`{}\` (empty dict), \`set()\`.
- **Short-Circuit Evaluation:**
  \`result = cached_val or fetch_from_llm()\`
  If \`cached_val\` is truthy, \`fetch_from_llm()\` is never called, saving network latency.

### Why Match-Case Beats If-Elif Chains in Agents
- Validates both dictionary keys AND value types simultaneously (\`"query": str(q)\`).
- Automatically extracts nested variables into scope.`,
    understood: true,
    createdAt: "2026-09-26T09:10:00.000Z",
    updatedAt: "2026-09-26T09:10:00.000Z"
  },

  // ==========================================
  // TOPIC 3: LOOPS & ITERATION
  // ==========================================
  {
    id: "py-loops",
    title: "3. Loops, Enumerate, Zip & The Loop-Else Construct",
    phaseId: "phase-1",
    inShort: "Iterate cleanly with 'enumerate' and 'zip'; use 'for...else' to handle search exhaustion without flag variables.",
    codeLanguage: "python",
    codeSnippet: `# 1. Enumerate with custom index offset
chunks = ["Introduction to AI", "Transformers Math", "RAG Systems"]
for index, chunk in enumerate(chunks, start=1):
    print(f"Embedding chunk {index}/{len(chunks)}: {chunk}")

# 2. Zip parallel lists (queries + responses)
queries = ["What is RAG?", "What is MCP?"]
latencies = [180, 240]
for q, lat in zip(queries, latencies):
    print(f"{q} completed in {lat}ms")

# 3. For-Else construct for tool lookup (else runs ONLY if no break)
tools = [{"name": "search"}, {"name": "calculator"}]
for t in tools:
    if t["name"] == "python_repl":
        print("Tool found!")
        break
else:
    print("Warning: python_repl tool not installed.")`,
    notes: `### Essential Iteration Tools in \`itertools\`
- \`itertools.batched(iterable, n)\` (Python 3.12+): Batches document lists for chunked embedding API calls:
  \`for batch in itertools.batched(documents, 50): embed(batch)\`
- \`zip(strict=True)\`: Raises \`ValueError\` if input sequences have unequal length, preventing silent truncation bugs in data pipelines.`,
    understood: true,
    createdAt: "2026-09-26T09:20:00.000Z",
    updatedAt: "2026-09-26T09:20:00.000Z"
  },

  // ==========================================
  // TOPIC 4: FUNCTIONS & SCOPE
  // ==========================================
  {
    id: "py-functions",
    title: "4. Functions, *args/**kwargs, Closures & LEGB Scope",
    phaseId: "phase-1",
    inShort: "Master dynamic arguments, closures, and the fatal mutable default argument trap in agent functions.",
    codeLanguage: "python",
    codeSnippet: `# 1. The Deadly Mutable Default Trap (Never do this!)
# def bad_add_msg(msg, history=[]): history.append(msg); return history

# Correct pattern: None default with inner initialization
def append_msg(msg: str, history: list = None) -> list:
    if history is None:
        history = []
    history.append(msg)
    return history

# 2. Dynamic Tool Calling with *args and **kwargs
def tool_dispatcher(tool_fn, *args, **kwargs):
    print(f"Calling {tool_fn.__name__} with kwargs: {kwargs}")
    return tool_fn(*args, **kwargs)

# 3. Closure for Stateful Rate Limiter
def make_counter(limit: int):
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count <= limit
    return increment

has_tokens = make_counter(limit=3)`,
    notes: `### The LEGB Scope Hierarchy
When a variable is accessed, Python searches in strict order:
1. **L (Local):** Defined inside current function.
2. **E (Enclosing):** In enclosing namespaces of outer functions (closures).
3. **G (Global):** Defined at top module level.
4. **B (Built-in):** Built-in names (\`len\`, \`range\`, \`Exception\`).

### \`*args\` vs \`**kwargs\`
- \`*args\`: Collects positional arguments into a \`tuple\`.
- \`**kwargs\`: Collects keyword arguments into a \`dict\`.
All LLM tool calls deserialize into keyword arguments passed to Python tools via \`func(**tool_call.arguments)\`.`,
    understood: true,
    createdAt: "2026-09-26T09:30:00.000Z",
    updatedAt: "2026-09-26T09:30:00.000Z"
  },

  // ==========================================
  // TOPIC 5: COMPREHENSIONS
  // ==========================================
  {
    id: "py-comprehensions",
    title: "5. Comprehensions (List, Dict, Set & Generator Expressions)",
    phaseId: "phase-1",
    inShort: "Concise, C-optimized loops for filtering chunks, deduplicating IDs, and mapping metadata dictionaries.",
    codeLanguage: "python",
    codeSnippet: `# 1. List Comprehension with condition filter
docs = [{"id": "d1", "score": 0.88}, {"id": "d2", "score": 0.42}, {"id": "d3", "score": 0.94}]
relevant_ids = [d["id"] for d in docs if d["score"] >= 0.80]
# ['d1', 'd3']

# 2. Dict Comprehension for fast O(1) Tool Registry
tool_list = [("search", "Web search tool"), ("sql", "Database reader")]
tool_map = {name: desc for name, desc in tool_list}

# 3. Set Comprehension for deduplicating sources
citations = ["doc_A.pdf", "doc_B.pdf", "doc_A.pdf", "doc_C.pdf"]
unique_sources = {src.strip().lower() for src in citations}

# 4. Generator Expression (Lazy, consumes ~0 RAM)
chunk_lengths = (len(d["id"]) for d in docs)  # Does not allocate list!`,
    notes: `### Memory Difference: List vs Generator Expression
- \`[x for x in range(10_000_000)]\`: Allocates ~80 Megabytes of RAM immediately.
- \`(x for x in range(10_000_000))\`: Allocates ~128 bytes; computes each value on-the-fly.
- When loading gigabytes of document dumps for RAG indexing, always use generator expressions or generator functions.`,
    understood: true,
    createdAt: "2026-09-26T09:40:00.000Z",
    updatedAt: "2026-09-26T09:40:00.000Z"
  },

  // ==========================================
  // TOPIC 6: GENERATORS & YIELD
  // ==========================================
  {
    id: "py-generators",
    title: "6. Generators & Yield (Streaming Real-Time Tokens)",
    phaseId: "phase-1",
    inShort: "Generators pause with 'yield' to emit items incrementally, enabling sub-200ms Time-To-First-Token streaming in web apps.",
    codeLanguage: "python",
    codeSnippet: `import time
from typing import Generator

def stream_llm_response(prompt: str) -> Generator[str, None, None]:
    """Yields token chunks as they arrive from LLM provider."""
    simulated_chunks = ["Agent ", "planning ", "complete. ", "Executing ", "tool..."]
    for chunk in simulated_chunks:
        time.sleep(0.05)  # Simulate network arrival
        yield chunk

# Consuming token by token in FastAPI Server-Sent Events (SSE):
for token in stream_llm_response("Hello"):
    print(token, end="", flush=True)`,
    notes: `### How Generators Work Internally
- A standard function has one entry point and one exit point (\`return\`).
- A generator saves its stack frame, local variables, and instruction pointer every time it reaches \`yield\`.
- Calling \`next()\` resumes execution right after the last \`yield\`.
- \`yield from iterable\`: Delegating generator that yields all items from a sub-generator or collection cleanly.`,
    understood: true,
    createdAt: "2026-09-26T09:50:00.000Z",
    updatedAt: "2026-09-26T09:50:00.000Z"
  },

  // ==========================================
  // TOPIC 7: DECORATORS
  // ==========================================
  {
    id: "py-decorators",
    title: "7. Custom Decorators & Exponential Backoff for Rate Limits",
    phaseId: "phase-1",
    inShort: "Decorators wrap functions with cross-cutting logic like retry backoff on HTTP 429 errors and token latency profiling.",
    codeLanguage: "python",
    codeSnippet: `import time
import functools
import random

def retry_llm_call(max_attempts: int = 3, initial_delay: float = 0.5):
    """Decorator retrying flaky LLM API calls with exponential backoff & jitter."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise e
                    sleep_time = delay + random.uniform(0.1, 0.3)
                    print(f"Attempt {attempt} failed: {e}. Retrying in {sleep_time:.2f}s...")
                    time.sleep(sleep_time)
                    delay *= 2
        return wrapper
    return decorator

@retry_llm_call(max_attempts=3)
def query_model(prompt: str) -> str:
    if random.random() < 0.5:
        raise ConnectionResetError("429 Too Many Requests")
    return f"Response to '{prompt}'"`,
    notes: `### Crucial Rules for Decorators
1. **Always use \`@functools.wraps(func)\`:** Without it, the wrapped function loses its original \`__name__\`, docstrings, and signature, breaking debugging and FastAPI router inspection.
2. **Three-layer function for arguments:** If your decorator takes arguments (\`@retry(max=3)\`), you need 3 nested functions: \`decorator_maker(args) -> decorator(func) -> wrapper(*args, **kwargs)\`.`,
    understood: true,
    createdAt: "2026-09-26T10:00:00.000Z",
    updatedAt: "2026-09-26T10:00:00.000Z"
  },

  // ==========================================
  // TOPIC 8: OOP & DUNDERS FOR AGENTS
  // ==========================================
  {
    id: "py-oop",
    title: "8. OOP, Dunder Methods & Abstract Base Classes for Tools",
    phaseId: "phase-1",
    inShort: "How Python classes, dunder methods like '__call__', and 'abc.ABC' form the foundation of custom Agent Tool runnables.",
    codeLanguage: "python",
    codeSnippet: `from abc import ABC, abstractmethod
from typing import Any

# 1. Abstract Tool Interface
class BaseTool(ABC):
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    @abstractmethod
    def run(self, **kwargs) -> Any:
        pass

    # __call__ makes an instance callable like a function: tool()
    def __call__(self, **kwargs) -> Any:
        return self.run(**kwargs)

    def __repr__(self) -> str:
        return f"<Tool: {self.name}>"

# 2. Concrete Implementation
class CalculatorTool(BaseTool):
    def run(self, expression: str) -> float:
        return eval(expression)  # Simple demo calculation

calc = CalculatorTool("calc", "Evaluates math expressions")
# Invoked directly via __call__:
result = calc(expression="40 + 2")
print(result)  # 42`,
    notes: `### Essential Dunder (Double Underscore) Methods
- **\`__init__(self, ...)\`:** Object constructor and attribute initialization.
- **\`__call__(self, ...)\`:** Turns an instance into a callable object (this is how LangChain \`Runnable\` and LangGraph nodes work).
- **\`__enter__\` / \`__exit__\`:** Implements context managers (\`with obj:\`).
- **\`__repr__\`:** Developer-facing debug representation (used in logging and trace spans).
- **\`@classmethod\`:** Factory methods (e.g., \`Agent.from_config("agent.json")\`).
- **\`@property\`:** Getter/setter encapsulation for state validation.`,
    understood: true,
    createdAt: "2026-09-26T10:10:00.000Z",
    updatedAt: "2026-09-26T10:10:00.000Z"
  },

  // ==========================================
  // TOPIC 9: FILE HANDLING & CONTEXT MANAGERS
  // ==========================================
  {
    id: "py-files",
    title: "9. File Handling, Pathlib & Custom Context Managers",
    phaseId: "phase-1",
    inShort: "Safely read datasets, stream massive log files, and guarantee resource cleanup using the 'with' context manager protocol.",
    codeLanguage: "python",
    codeSnippet: `from pathlib import Path
import json
from contextlib import contextmanager
import time

# 1. Modern Pathlib Operations
data_path = Path("data/corpus.jsonl")
data_path.parent.mkdir(parents=True, exist_ok=True)

# 2. Safe streaming line-by-line (prevents loading 2GB into RAM)
with open(data_path, "w", encoding="utf-8") as f:
    f.write(json.dumps({"text": "AI engineering lesson"}) + "\\n")

# 3. Custom Context Manager with @contextmanager
@contextmanager
def timer_span(name: str):
    start = time.time()
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"[{name}] Completed in {elapsed:.4f}s")

with timer_span("Embedding Batch"):
    time.sleep(0.1)`,
    notes: `### The \`with\` Statement Mechanics
The \`with\` statement calls \`__enter__()\` at entry and guarantees \`__exit__(exc_type, exc_val, exc_tb)\` at departure, even if an unhandled crash or exception occurs inside the block.
Always specify \`encoding="utf-8"\` explicitly on Mac/Windows/Linux to avoid silent UTF-16 encoding corruptions in prompt datasets.`,
    understood: false,
    createdAt: "2026-09-26T10:20:00.000Z",
    updatedAt: "2026-09-26T10:20:00.000Z"
  },

  // ==========================================
  // TOPIC 10: ASYNCIO & CONCURRENCY
  // ==========================================
  {
    id: "py-asyncio-core",
    title: "10. Asyncio, Event Loop & Semaphore Rate Throttling",
    phaseId: "phase-1",
    inShort: "Non-blocking concurrency using Python's event loop to dispatch multiple agent tool calls in parallel with rate-limiting.",
    codeLanguage: "python",
    codeSnippet: `import asyncio
import time

# Allow maximum 3 concurrent API calls to avoid HTTP 429
sem = asyncio.Semaphore(3)

async def fetch_tool_result(tool_id: int) -> str:
    async with sem:
        print(f"[START] Tool {tool_id} executing...")
        await asyncio.sleep(0.5)  # Non-blocking pause
        print(f"[DONE] Tool {tool_id} finished")
        return f"Tool {tool_id} Result"

async def orchestrate_agent():
    start = time.time()
    # Schedule 6 tasks concurrently
    tasks = [fetch_tool_result(i) for i in range(1, 7)]
    results = await asyncio.gather(*tasks)
    print(f"All 6 tools executed in {time.time() - start:.2f}s!")

asyncio.run(orchestrate_agent())`,
    notes: `### Asyncio Essentials for AI Engineers
- **Coroutines:** Declared with \`async def\`. Calling them returns a coroutine object; it does not execute until \`await\`ed.
- **\`asyncio.gather(*tasks)\`:** Runs multiple coroutines concurrently, returning results in the original list order.
- **\`asyncio.create_task(coro)\`:** Schedules a task in the background without blocking current flow.
- **\`asyncio.Semaphore(n)\`:** Crucial for LLMs! Caps simultaneous requests to match provider rate limits (e.g. OpenAI Tier-1 TPM limits).`,
    understood: false,
    createdAt: "2026-09-26T10:30:00.000Z",
    updatedAt: "2026-09-26T10:30:00.000Z"
  },

  // ==========================================
  // TOPIC 11: MULTITHREADING VS MULTIPROCESSING
  // ==========================================
  {
    id: "py-threading-multiprocessing",
    title: "11. Multithreading vs Multiprocessing in AI Systems",
    phaseId: "phase-1",
    inShort: "Use ThreadPool for network I/O (API calls, web scraping); use ProcessPool for CPU-heavy tasks (tokenization, local vector math).",
    codeLanguage: "python",
    codeSnippet: `from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import math

# 1. ThreadPoolExecutor: Ideal for I/O-bound network calls
def download_url(url: str) -> str:
    return f"Downloaded {url}"

with ThreadPoolExecutor(max_workers=4) as executor:
    urls = ["https://arxiv.org/1", "https://arxiv.org/2"]
    results = list(executor.map(download_url, urls))

# 2. ProcessPoolExecutor: Bypasses the GIL for CPU-bound math
def cpu_heavy_distance(vector: list) -> float:
    return math.sqrt(sum(x * x for x in vector))

with ProcessPoolExecutor(max_workers=2) as executor:
    vectors = [[0.1 * i for i in range(1000)] for _ in range(10)]
    norms = list(executor.map(cpu_heavy_distance, vectors))`,
    notes: `### Threading vs Multiprocessing Matrix
| Feature | Threading | Multiprocessing |
| :--- | :--- | :--- |
| **Memory** | Shared memory space | Separate memory per process |
| **GIL Bound?** | Yes (only 1 thread runs Python bytecode) | No (each process has its own Python interpreter) |
| **Best For** | Network I/O, file downloads, API queries | Heavy NumPy crunching, local embedding models |
| **Overhead** | Lightweight (~few KB stack) | Heavy process fork/spawn (~MBs + IPC cost) |`,
    understood: false,
    createdAt: "2026-09-26T10:40:00.000Z",
    updatedAt: "2026-09-26T10:40:00.000Z"
  },

  // ==========================================
  // TOPIC 12: THE GIL (GLOBAL INTERPRETER LOCK)
  // ==========================================
  {
    id: "py-gil",
    title: "12. The GIL (Global Interpreter Lock) & Python 3.13 Free-Threading",
    phaseId: "phase-1",
    inShort: "The GIL allows only one OS thread to execute Python bytecode at a time; understand its boundaries and how C extensions release it.",
    codeLanguage: "python",
    codeSnippet: `# Demonstration: Why multithreading does NOT speed up CPU tasks in standard CPython
import threading
import time

def cpu_burn():
    count = 0
    for _ in range(20_000_000):
        count += 1

# Two threads run CONCURRENTLY, not in PARALLEL, taking equal or longer time due to GIL switching
t1 = threading.Thread(target=cpu_burn)
t2 = threading.Thread(target=cpu_burn)

start = time.time()
t1.start(); t2.start()
t1.join(); t2.join()
print(f"2 Threads elapsed: {time.time() - start:.2f}s")`,
    notes: `### Why the GIL Exists & Why It Matters for AI
- **History:** CPython uses reference counting for garbage collection. Without the GIL, every increment/decrement of \`ob_refcnt\` would require mutex locks, causing massive overhead on single-threaded code.
- **How C Extensions Bypass the GIL:** NumPy, PyTorch, and tokenizers (written in Rust/C++) explicitly release the GIL during matrix multiplications (\`cblas\`), allowing full multi-core saturation.
- **Python 3.13 Free-Threading (PEP 703):** Introduced optional experimental \`nogil\` builds using mimalloc thread-safe memory management.`,
    understood: false,
    createdAt: "2026-09-26T10:50:00.000Z",
    updatedAt: "2026-09-26T10:50:00.000Z"
  },

  // ==========================================
  // TOPIC 13: PYDANTIC V2
  // ==========================================
  {
    id: "py-pydantic-deep",
    title: "13. Pydantic v2 Deep Dive for Agentic I/O Contracts",
    phaseId: "phase-1",
    inShort: "Pydantic v2 turns unreliable LLM text into type-safe, validated schemas with automatic JSON Schema generation for tool calling.",
    codeLanguage: "python",
    codeSnippet: `from pydantic import BaseModel, Field, field_validator, model_validator
from typing import List

class AgentExecutionPlan(BaseModel):
    task_name: str = Field(..., description="Action title")
    tools: List[str] = Field(default_factory=list, description="Tools needed")
    confidence: float = Field(..., ge=0.0, le=1.0)
    requires_human_review: bool = Field(default=False)

    @field_validator("tools")
    def validate_tool_names(cls, tools: List[str]) -> List[str]:
        allowed = {"search", "calculator", "sql_reader"}
        for t in tools:
            if t not in allowed:
                raise ValueError(f"Disallowed tool: '{t}'")
        return tools

# 1. Export schema for OpenAI / Gemini function calling
tool_json_schema = AgentExecutionPlan.model_json_schema()

# 2. Deserializing raw LLM output with instant validation
raw_json = '{"task_name": "Audit", "tools": ["search"], "confidence": 0.95}'
plan = AgentExecutionPlan.model_validate_json(raw_json)
print(f"Validated: {plan.task_name}, Tools: {plan.tools}")`,
    notes: `### Why Pydantic v2 Over Python Dataclasses
- **Validation Engine:** Dataclasses do NOT validate data at runtime; Pydantic actively validates types and values.
- **Rust Core:** Pydantic v2 is written in Rust (\`pydantic-core\`), making serialization and validation up to 10x faster.
- **\`model_dump()\` and \`model_dump_json()\`:** Clean conversion to Python dictionaries and JSON strings.
- **\`model_json_schema()\`:** The industry standard method to generate tool definition schemas for LLM tool calling.`,
    understood: true,
    createdAt: "2026-09-26T11:00:00.000Z",
    updatedAt: "2026-09-26T11:00:00.000Z"
  },

  // ==========================================
  // TOPIC 14: TRANSFORMER ATTENTION MATH
  // ==========================================
  {
    id: "topic-attention",
    title: "14. Scaled Dot-Product Attention Math",
    phaseId: "phase-2",
    inShort: "Attention calculates how much each token focuses on every other token by multiplying Query and Key vectors and scaling by 1/√d_k.",
    codeLanguage: "python",
    codeSnippet: `import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = np.matmul(Q, np.swapaxes(K, -2, -1)) / np.sqrt(d_k)
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)
    weights = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = weights / np.sum(weights, axis=-1, keepdims=True)
    return np.matmul(weights, V), weights`,
    notes: `### The Formula & Intuition
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
- **Q (Query):** What the current token is seeking.
- **K (Key):** What each token contains.
- **V (Value):** The information content to aggregate.
- **Scaling by $\\sqrt{d_k}$:** For high dimensions (e.g. $d_k=64$), dot products become large, pushing softmax into flat regions with vanishing gradients. Dividing by $\\sqrt{d_k}$ preserves variance of 1.`,
    understood: false,
    createdAt: "2026-09-26T11:10:00.000Z",
    updatedAt: "2026-09-26T11:10:00.000Z"
  },

  // ==========================================
  // TOPIC 15: HYBRID RAG & RRF
  // ==========================================
  {
    id: "topic-hybrid-rag",
    title: "15. Hybrid Search & Reciprocal Rank Fusion (RRF)",
    phaseId: "phase-3",
    inShort: "Pure vector search misses exact alphanumeric codes; Hybrid Search fuses lexical BM25 with dense vector embeddings.",
    codeLanguage: "python",
    codeSnippet: `def compute_rrf_score(rank_dense: int, rank_sparse: int, k: int = 60) -> float:
    """Reciprocal Rank Fusion score calculation."""
    return (1.0 / (k + rank_dense)) + (1.0 / (k + rank_sparse))

# Example: Candidate appearing 1st in BM25 and 4th in Vector Search
score = compute_rrf_score(rank_dense=4, rank_sparse=1)
print(f"Fused RRF score: {score:.5f}")`,
    notes: `### Production RAG Pipeline Steps
1. **Lexical (BM25):** Fast exact keyword and token matching.
2. **Dense Vector Search (Qdrant/Chroma):** Semantic synonym discovery.
3. **RRF Merge:** Merges top 30 hits without score scale mismatch.
4. **Cross-Encoder Reranker (FlashRank/Cohere):** Jointly evaluates \`(query, passage)\` to yield top 5 highest-precision chunks.`,
    understood: false,
    createdAt: "2026-09-26T11:20:00.000Z",
    updatedAt: "2026-09-26T11:20:00.000Z"
  },

  // ==========================================
  // TOPIC 16: LANGGRAPH STATE & CHECKPOINTING
  // ==========================================
  {
    id: "topic-langgraph",
    title: "16. LangGraph StateGraph & Checkpointing",
    phaseId: "phase-4",
    inShort: "LangGraph models agent workflows as cyclical state graphs with persistent database checkpointing for multi-turn threads.",
    codeLanguage: "python",
    codeSnippet: `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Sequence
import operator

class AgentState(TypedDict):
    # 'operator.add' appends messages rather than overwriting
    messages: Annotated[Sequence[str], operator.add]
    next_node: str

workflow = StateGraph(AgentState)
# Add nodes, edges, and conditional routers...`,
    notes: `### Cyclic State vs Linear Chains
- Real-world agents require retry loops: **Code -> Test -> Fail -> Re-code -> Pass -> Deploy**.
- Linear chains cannot model cycles naturally.
- Checkpointing serializes the entire state at every step into MongoDB or PostgreSQL, allowing session resume and human approval interruptions.`,
    understood: false,
    createdAt: "2026-09-26T11:30:00.000Z",
    updatedAt: "2026-09-26T11:30:00.000Z"
  },

  // ==========================================
  // TOPIC 17: MODEL CONTEXT PROTOCOL (MCP)
  // ==========================================
  {
    id: "topic-mcp",
    title: "17. Model Context Protocol (MCP) Transports",
    phaseId: "phase-5",
    inShort: "Anthropic's open standard for connecting AI agents to tools and resources over STDIO and SSE transports.",
    codeLanguage: "python",
    codeSnippet: `from mcp.server.fastmcp import FastMCP

# Initialize FastMCP Server
mcp = FastMCP("Database-Tool-Gateway")

@mcp.tool()
def query_customers(city: str) -> str:
    """Look up customer records by city."""
    return f"Found 12 customers in {city}"

if __name__ == "__main__":
    mcp.run()`,
    notes: `### The USB-C for Agentic AI
- Standardizes tool schemas, resource lookups, and prompt templates over JSON-RPC.
- **STDIO Transport:** Direct subprocess communication with client (Claude Desktop / Cursor).
- **SSE Transport:** Server-Sent Events over HTTP for distributed microservices.`,
    understood: false,
    createdAt: "2026-09-26T11:40:00.000Z",
    updatedAt: "2026-09-26T11:40:00.000Z"
  }
];
