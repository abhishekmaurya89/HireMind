import { GoogleGenAI } from "@google/genai";

export const generateFeedback = async (problem, language, code) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const prompt = `
You are an experienced software engineering interviewer.
Evaluate the candidate's solution.
Problem:
${problem}
Programming Language:
${language}
Candidate Solution:
${code}
Return ONLY valid JSON.
{
  "rating": number,
  "correctness": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "strengths": [
    "",
    "",
    ""
  ],
  "weaknesses": [
    "",
    "",
    ""
  ],
  "suggestions": [
    "",
    "",
    ""
  ]
}

Rules:
- rating should be an integer between 1 and 10.
- strengths, weaknesses and suggestions must be arrays.
- Do not include markdown.
- Do not wrap the JSON inside \`\`\`.
- Return JSON only.
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  let feedback;
  try {
    return feedback = JSON.parse(response.text);
  } catch {
    throw new Error("Invalid JSON returned by Gemini");
  }
};
