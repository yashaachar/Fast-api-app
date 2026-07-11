# TalentSpark

**An AI-powered job portal with intelligent matching, career guidance, and mock interview practice.**

TalentSpark connects candidates with companies through semantic job search, AI-driven career chat, resume analysis, and a resume-based mock interview module — all backed by a role-based, JWT-secured FastAPI backend and a modern React + TypeScript frontend.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat&logo=render)](https://render.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat&logo=vercel)](https://vercel.com/)

---

## Live Demo

- **Frontend:** [fast-api-app-alpha.vercel.app](https://fast-api-app-alpha.vercel.app)
- **Backend API docs:** [fast-api-appp.onrender.com/docs](https://fast-api-appp.onrender.com/docs)

---

## Features

| Feature | Description |
|---|---|
| 🔐 **Role-Based Auth** | JWT authentication with admin/candidate roles and protected routes |
| 🏢 **Company & Job CRUD** | Full create, read, update, delete for companies and job listings |
| 🔍 **Semantic Job Search** | Vector-based job search using Qdrant + fastembed — finds relevant roles by meaning, not just keywords |
| 💬 **AI Career Chat** | Conversational career guidance powered by Groq's LLaMA 3.3 70B via LangChain |
| 📄 **Resume Analyser** | AI-generated structured feedback on resume text |
| 🎯 **AI Mock Interview** | Upload your resume, get custom-generated interview questions, and receive AI-scored feedback on your answers |
| 🎨 **Polished UI** | Custom pastel-corporate design system across the full app |

---

## Tech Stack

### Backend
- **Framework:** FastAPI (async)
- **Database:** PostgreSQL with async SQLAlchemy
- **Auth:** JWT-based authentication with role-based access control (RBAC)
- **AI/LLM:** LangChain + Groq (`llama-3.3-70b-versatile`)
- **Vector Search:** Qdrant with `fastembed` (`BAAI/bge-small-en-v1.5`, 384-dim embeddings)
- **Deployment:** Docker on Render

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Deployment:** Vercel

---

## Project Structure
