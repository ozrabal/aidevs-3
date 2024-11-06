import { generateText } from "ai";
import { sendAnswer } from "../../utils/aidevsApi";
import { openai } from "@ai-sdk/openai";

const SYSTEM_PROMPT = `Answer question, respond as short as possible, always respond in English`;

async function processTestData(data: any) {
  if (!data) return;

  for (const item of data) {
    if (item.test) {
      console.log('Test question:', item.test.q);
      const aiReply = await generateText({
        model: openai('gpt-4o-mini'),
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: item.test.q }
        ],
        temperature: 0.7,
      });

      console.log('AI Reply:', aiReply.text);
      item.test.a = aiReply.text;

    }

    if (item.question) {
      const expression = item.question.replace(/\s+/g, '');
      try {
        const answer = eval(expression);
        item.answer = answer;
      } catch (error) {
        console.error(`Failed to evaluate: ${item.question}`);
      }
    }
  }

  return data;
}

export async function run() {
  const result = await fetch(`${process.env.CENTRALA_API_URL!}/data/${process.env.AIDEVS_API_KEY}/json.txt`);
  const data = await result.json();
  
  if (data) {
    const parsedData = await processTestData(data["test-data"]);

    const resultData = {
      apikey: process.env.AIDEVS_API_KEY,
      description: data.description,
      copyright: data.copyright,
      "test-data": parsedData
    }

    const response = await sendAnswer("JSON", resultData, `${process.env.CENTRALA_API_URL!}/report`);
    console.log("Response: ", response);
  }
};