import { GoogleGenAI } from "@google/genai";

export const generateFeedback = async (problem, language, code) => {
    const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
  const prompt = `
You are an experienced software engineering interviewer.

Problem:
${problem}

Programming Language:
${language}

Candidate Solution:
${code}

Evaluate the solution and return markdown using exactly these headings:

# Overall Rating

# Correctness

# Time Complexity

# Space Complexity

# Strengths

# Weaknesses

# Suggested Improvements
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
};
