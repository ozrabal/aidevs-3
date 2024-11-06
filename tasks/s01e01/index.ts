import { JSDOM } from 'jsdom';
import { extractFlag } from '../../utils/strings';
import { generateAiReply } from '../../utils/ai';

const SYSTEM_PROMPT = `Answer question, respond as short as possible, always use only numbers`;

export async function run() {
  const result = await fetch(`${process.env.XYZ_API_URL!}`);
  const data = await result.text();
  
  const dom = new JSDOM(data);
  const document = dom.window.document;  
  const element = document.getElementById('human-question');
  const text = element?.textContent;

  if (!text) {
    console.log('No question found');
    return;
  }

  const question = text.split(':')[1];

  const aiReply = await generateAiReply({
    system: SYSTEM_PROMPT,
    user: question
  });

  console.log(question, aiReply);

  const formData = new FormData();
  formData.append('username', process.env.XYZ_LOGIN!);
  formData.append('password', process.env.XYZ_PASSWORD!);
  formData.append('answer', aiReply);

  const login = await fetch(`${process.env.XYZ_API_URL!}/`, {
    method: 'POST',
    body: formData
  });
  const resultText = await login.text();
  
  const flag = extractFlag(resultText);
  console.log(flag);
}