# TalentSpark

**An AI-powered job portal with intelligent matching, career guidance, and mock interview practice.**

TalentSpark connects candidates with companies through semantic job search, AI-driven career chat, resume analysis, and a resume-based mock interview module — all backed by a role-based, JWT-secured FastAPI backend and a modern React + TypeScript frontend.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
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
- **Containerization:** Docker
- **Deployment:** Docker on Render

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Containerization:** Docker (local development)
- **Deployment:** Vercel

### DevOps
- **Containerization:** Docker & Docker Compose — backend and frontend run as independent, isolated services with a single-command local environment (`docker compose up`)
- **CI/CD:** Git-based continuous deployment — every push to `main` automatically triggers a build and deploy on both Render (backend) and Vercel (frontend), with no manual deployment steps
- **Environment separation:** Local, staging, and production configs are fully decoupled via environment variables, so local Docker development never touches production data

---

## Project Structure
```

Fast-api-app/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── app/
│   │   └── main.py
│   ├── database.py
│   ├── model/
│   ├── schemas/
│   ├── router/
│   │   ├── auth.py
│   │   ├── company.py
│   │   ├── job.py
│   │   ├── chat.py
│   │   ├── rag.py
│   │   └── interview.py
│   ├── services/
│   ├── utils/
│   └── requirements.txt
│
└── frontend/
    └── talentspark/
        ├── Dockerfile
        ├── src/
        │   ├── App.tsx
        │   ├── components/
        │   ├── pages/
        │   └── Services/
        ├── index.html
        └── package.json

```
---

## Getting Started

### Option A: Run with Docker (recommended)

The fastest way to run the full stack locally — no manual Python/Node environment setup required.

**Prerequisites**
- Docker Desktop installed and running
- A PostgreSQL database (cloud or local) and a Groq API key

**Steps**

1. Clone the repo:
```bash
git clone https://github.com/yashaachar/Fast-api-app.git
cd Fast-api-app
```

2. Create `backend/.env`:
```env
DATABASE_URL=postgresql+asyncpg://user:password@host:port/dbname
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
GROQ_API_KEY=your-groq-api-key
QDRANT_URL=your-qdrant-url
QDRANT_API_KEY=your-qdrant-api-key
```

3. Build and start both services:
```bash
docker compose up --build
```

4. Access the app:
- Backend API docs: `http://localhost:8000/docs`
- Frontend: `http://localhost:3000`

Both services auto-reload on code changes while running.

### Option B: Manual Setup (without Docker)

#### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL database
- Groq API key
- Qdrant instance (cloud or local)

#### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql+asyncpg://user:password@host:port/dbname
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
GROQ_API_KEY=your-groq-api-key
QDRANT_URL=your-qdrant-url
QDRANT_API_KEY=your-qdrant-api-key
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

API docs available at `http://localhost:8000/docs`

#### Frontend Setup

```bash
cd frontend/talentspark
npm install
```

Create a `.env` file in `frontend/talentspark/`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

App available at `http://localhost:5173`

---

## CI/CD Pipeline

TalentSpark uses a fully automated, Git-driven deployment pipeline — no manual deploy steps for production releases.

```
git push origin main
        │
        ├──▶ Render detects push → builds backend Docker image → deploys → live at fast-api-appp.onrender.com
        │
        └──▶ Vercel detects push → builds frontend (npm run build) → deploys → live at fast-api-app-alpha.vercel.app
```

- **Backend (Render):** builds directly from `backend/Dockerfile` on every push to `main`, ensuring the deployed environment always matches what's defined in source control.
- **Frontend (Vercel):** builds from `package.json` on every push to `main`, with automatic preview deployments generated for pull requests and non-main branches before merging.
- **Zero-downtime updates:** both platforms roll out the new build and only switch traffic once the build succeeds, so a failed build never takes down the live site.
- **Secrets management:** environment variables (`DATABASE_URL`, `GROQ_API_KEY`, `SECRET_KEY`, `QDRANT_URL`, etc.) are configured directly in Render/Vercel dashboards, fully decoupled from local `.env` files used in Docker development.

---

## API Overview

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/auth/register` | POST | Register a new user | Public |
| `/auth/login` | POST | Login, returns JWT | Public |
| `/company/` | GET | List all companies | Required |
| `/company/` | POST | Create a company | Admin |
| `/job/` | GET | List all jobs | Required |
| `/job/` | POST | Create a job | Admin |
| `/chat/ask_career` | POST | AI career chat | Required |
| `/rag/search` | POST | Semantic job search | Public |
| `/rag/job-match` | POST | Match profile to jobs | Public |
| `/rag/analyze-resume` | POST | Resume feedback | Required |
| `/interview/generate-questions` | POST | Generate interview questions from resume | Required |
| `/interview/evaluate-answer` | POST | Score an interview answer | Required |

Full interactive documentation available at `/docs` (Swagger UI).

---

## Key Engineering Decisions

- **Async throughout the backend** — every database call uses `AsyncSession` with `await db.execute(select(...))`, avoiding blocking I/O under load.
- **RBAC via dependency injection** — `role_required(["admin"])` and `get_current_user` dependencies enforce access control at the route level.
- **Semantic search over keyword search** — job listings are embedded and stored in Qdrant, enabling search by meaning ("backend role with Python experience") rather than exact keyword matches.
- **Groq over standard OpenAI-style APIs** — chosen for significantly faster inference latency, important for real-time chat and interview feedback.
- **Environment-driven configuration** — API base URLs and secrets are read from environment variables (`VITE_API_BASE_URL`, `SECRET_KEY`, etc.), keeping local, staging, and production environments cleanly separated.
- **Containerized local development** — Docker Compose spins up backend and frontend as isolated services with a single command, eliminating "works on my machine" inconsistencies across the team.
- **Automated deployment pipeline** — Render and Vercel both auto-build and deploy directly from `main` on every push, removing manual deployment steps and keeping production always in sync with source control.

---

## Roadmap

- [ ] Voice-based mock interview mode
- [ ] Company-side applicant tracking dashboard
- [ ] Email notifications for application status
- [ ] Multi-language resume support

---
## Contributors

This project was built collaboratively as a team effort.

| Contributor | Contribution | GitHub |
|---|---|---|
| **Amitha Pankaj** | Frontend development & deployment | [@AmithaPankaj](https://github.com/AmithaPankaj) |
| **Ashrifa K** | Database design & API integration | [@Ashrifa-k](https://github.com/Ashrifa-k) |
| **Neha Shetty** | UI/UX design & testing | [@Nehashetty842](https://github.com/Nehashetty842) |
| **Yasha Achar** | Backend development, AI integration, Docker & CI/CD setup | [@yashaachar](https://github.com/yashaachar) |

---

## License

This project is available for educational and portfolio purposes.
