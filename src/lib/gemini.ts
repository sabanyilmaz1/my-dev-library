import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

export const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function generateContent(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [contents],
    config: {
      responseMimeType: "application/json",
      tools: [{ urlContext: {} }],
      responseSchema: z.object({
        title: z.string().describe("The title of the content"),
        description: z.string().describe("The description of the content"),
        image: z.string().describe("The image of the content"),
        content: z.string().describe("The content of the content"),
        tags: z.array(z.string()).describe("The tags of the content"),
        summary: z.string().describe("The summary of the content"),
      }),
    },
  });
  const result = await response.text;
  if (!result) {
    throw new Error("No result from Gemini");
  }
  const json = JSON.parse(result);
  return json;
}
