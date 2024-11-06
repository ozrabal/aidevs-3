import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export type AiPrompt = {
  system: string;
  user: string;
}

export async function generateAiReply(prompt: AiPrompt) {
  const aiReply = await generateText({
    model: openai('gpt-4o-mini'),
    messages: [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user }
    ],
    temperature: 0.7,
  });

  return aiReply.text;
}
