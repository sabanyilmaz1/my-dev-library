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

// export async function generateDataForYoutubeCultureBook() {
//   const config = {
//     temperature: 0.1,
//     thinkingConfig: {
//       thinkingBudget: -1,
//     },
//     responseMimeType: "text/plain",
//   };
//   const model = "gemini-2.5-flash-lite-preview-06-17";
//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           fileData: {
//             fileUri: "https://www.youtube.com/watch?v=zDm8ZR8Wzjc",
//             mimeType: "video/*",
//           },
//         },
//         {
//           text: promptIA,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   let result = "";
//   for await (const chunk of response) {
//     console.log(chunk.text);
//     result += chunk.text;
//   }
//   const json = JSON.parse(result.replace(/```json\n|```/g, ""));
//   return json;
// }
