import { AISettings } from './notesStorage';

export interface AIExplanationResult {
  explanation?: string;
  error?: string;
}

export const generateAIExplanation = async (
  topicTitle: string,
  userNotes: string,
  settings: AISettings
): Promise<AIExplanationResult> => {
  if (!settings.apiKey || !settings.apiKey.trim()) {
    return {
      error: 'API key is missing. Please click "AI Settings" in the header to enter your OpenAI or compatible API key.'
    };
  }

  const endpoint = settings.endpointUrl.trim().replace(/\/+$/, '') + '/chat/completions';
  const model = settings.model.trim() || 'gpt-4o-mini';

  const prompt = `Explain "${topicTitle}" in under 150 words. Prioritize a concrete tiny code example over prose. Use short sentences, no long paragraphs, structure as: one-line summary, then a 3-5 line code example, then max 2 bullet points of gotchas/things to remember. No fluff.
Context from my notes (if relevant): ${userNotes.slice(0, 300)}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey.trim()}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an elite Staff AI Engineer explaining technical Python and Agentic AI concepts to a senior developer transitioning into GenAI. Be terse, mathematically sound, code-first, and zero fluff.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 350
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      return {
        error: `LLM API Error: ${errorMsg}`
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return { error: 'No content returned from AI model.' };
    }

    return { explanation: content.trim() };
  } catch (err: any) {
    console.error('AI Explanation Fetch Failure:', err);
    return {
      error: `Network or CORS Error: ${err.message || 'Could not reach the LLM endpoint. Check your endpoint URL and internet connection.'}`
    };
  }
};
