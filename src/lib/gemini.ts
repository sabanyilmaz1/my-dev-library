import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function generateContent(contents: string) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: [contents],
    config: {
      responseMimeType: "application/json",
      tools: [{ urlContext: {} }],
    },
  });
  let result = "";
  for await (const chunk of response) {
    result += chunk.text;
  }
  const json = JSON.parse(result);
  return json;
}
