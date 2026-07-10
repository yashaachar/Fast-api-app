import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/interview`;

export interface EvaluationResult {
  score: number;
  feedback: string;
  strengths: string;
  improvements: string;
}

export async function generateQuestions(
  token: string,
  resumeText: string,
  role: string
): Promise<string[]> {
  const res = await axios.post(
    `${API_URL}/generate-questions`,
    { resume_text: resumeText, role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.questions;
}

export async function evaluateAnswer(
  token: string,
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const res = await axios.post(
    `${API_URL}/evaluate-answer`,
    { question, answer },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}