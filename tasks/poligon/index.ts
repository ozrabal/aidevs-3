import { sendAnswer } from "../../utils/aidevsApi";

export async function run() {
  const result = await fetch(`${process.env.AIDEVS_API_URL!}/dane.txt`);
  const data = await result.text();
  
  if (data) {
    const parsed = data.split("\n").filter((line) => line.length > 0);
    const response = await sendAnswer("POLIGON", parsed);
    console.log("Response: ", response);
  }
};