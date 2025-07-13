import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const config = {
  responseMimeType: "application/json",
};

export async function generateContent(contents: string) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: contents }],
      },
    ],
    config,
  });
  let result = "";
  for await (const chunk of response) {
    result += chunk.text;
  }
  const json = JSON.parse(result);
  return json;
}
