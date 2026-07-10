from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from langchain_groq import ChatGroq
from utils.oauth2 import get_current_user
import os
import json

router = APIRouter(prefix="/interview", tags=["interview"])

llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.getenv("GROQ_API_KEY"))

class ResumeInput(BaseModel):
    resume_text: str
    role: str = "Software Engineer"

class QuestionsResponse(BaseModel):
    questions: List[str]

class AnswerInput(BaseModel):
    question: str
    answer: str

class EvaluationResponse(BaseModel):
    score: int
    feedback: str
    strengths: str
    improvements: str

@router.post("/generate-questions", response_model=QuestionsResponse)
async def generate_questions(data: ResumeInput, current_user=Depends(get_current_user)):
    prompt = f"""Based on this resume, generate 5 interview questions for a {data.role} role.
Mix technical (about their projects/skills) and behavioral questions.
Resume:
{data.resume_text}

Return ONLY a JSON array of 5 question strings, no other text, no markdown formatting."""

    response = llm.invoke(prompt)
    content = response.content.strip()
    if content.startswith("```"):
        content = content.strip("`").replace("json", "", 1).strip()

    try:
        questions = json.loads(content)
    except json.JSONDecodeError:
        raise HTTPException(500, "Failed to generate questions")

    return {"questions": questions}

@router.post("/evaluate-answer", response_model=EvaluationResponse)
async def evaluate_answer(data: AnswerInput, current_user=Depends(get_current_user)):
    prompt = f"""You are an interview evaluator. Score this answer from 1-10.

Question: {data.question}
Answer: {data.answer}

Return ONLY valid JSON in this exact format, no markdown formatting:
{{"score": <int 1-10>, "feedback": "<2-3 sentence overall feedback>", "strengths": "<what was good>", "improvements": "<what to improve>"}}"""

    response = llm.invoke(prompt)
    content = response.content.strip()
    if content.startswith("```"):
        content = content.strip("`").replace("json", "", 1).strip()

    try:
        result = json.loads(content)
    except json.JSONDecodeError:
        raise HTTPException(500, "Failed to evaluate answer")

    return result