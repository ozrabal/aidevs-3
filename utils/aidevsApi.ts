export async function sendAnswer(task: string, answer: unknown, apiUrl?: string) {
  console.log(`Sending answer to task ${task}: ${answer}`);
  try {
    const body = JSON.stringify({
      apikey: process.env.AIDEVS_API_KEY,
      task,
      answer,
    });

    const url = apiUrl || `${process.env.AIDEVS_API_URL!}/verify`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body
    })

    return await response.json();
  } catch (error) {
    console.error("Error when sending data:", error);
    return null;
  }
}
