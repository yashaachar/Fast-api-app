import { useState } from "react";
import { generateQuestions, evaluateAnswer } from "../Services/InterviewServices";
import type { EvaluationResult } from "../Services/InterviewServices";

interface Props {
  token: string;
}

interface ResultItem extends EvaluationResult {
  question: string;
  answer: string;
}

type Stage = "setup" | "interview" | "done";

export default function Interview({ token }: Props) {
  const [resumeText, setResumeText] = useState("");
  const [role, setRole] = useState("Software Engineer");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<Stage>("setup");
  const [error, setError] = useState("");

  const startInterview = async () => {
    if (!resumeText.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const qs = await generateQuestions(token, resumeText, role);
      setQuestions(qs);
      setCurrentIdx(0);
      setResults([]);
      setStage("interview");
    } catch {
      setError("Couldn't generate questions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const evalResult = await evaluateAnswer(token, questions[currentIdx], answer);
      const newResults = [...results, { question: questions[currentIdx], answer, ...evalResult }];
      setResults(newResults);
      setAnswer("");
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setStage("done");
      }
    } catch {
      setError("Couldn't evaluate answer. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStage("setup");
    setResumeText("");
    setQuestions([]);
    setResults([]);
    setCurrentIdx(0);
    setAnswer("");
  };

  const avgScore = results.length
    ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1)
    : "0";

  return (
    <div>
      <h1 className="page-title">AI Interview</h1>
      <p className="page-subtitle">Paste your resume and get custom interview questions with feedback.</p>

      {error && <p className="page-subtitle">{error}</p>}

      {stage === "setup" && (
        <div className="card" style={{ maxWidth: "700px" }}>
          <div className="card-title">Set up your interview</div>
          <input
            className="input"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Target role, e.g. Backend Developer"
          />
          <textarea
            className="input"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            rows={10}
            style={{ resize: "vertical", fontFamily: "var(--font-body)" }}
          />
          <button className="btn btn-primary" onClick={startInterview} disabled={loading}>
            {loading ? "Generating questions..." : "Start Interview"}
          </button>
        </div>
      )}

      {stage === "interview" && questions.length > 0 && (
        <div className="card accent-coral" style={{ maxWidth: "700px" }}>
          <p className="card-meta">
            Question {currentIdx + 1} of {questions.length}
          </p>
          <div className="card-title" style={{ fontSize: "0.95rem",fontWeight:600, lineHeight: "1.5" }}>
            {questions[currentIdx]}
          </div>
          <textarea
            className="input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            rows={6}
            style={{ resize: "vertical", fontFamily: "var(--font-body)" }}
          />
          <button className="btn btn-primary" onClick={submitAnswer} disabled={loading}>
            {loading
              ? "Evaluating..."
              : currentIdx + 1 < questions.length
              ? "Submit & Next"
              : "Submit & Finish"}
          </button>
        </div>
      )}

      {stage === "done" && (
        <div>
          <div className="card accent-mint" style={{ maxWidth: "700px" }}>
            <div className="card-title" style={{ fontSize: "1.6rem" }}>
              Overall Score: {avgScore} / 10
            </div>
          </div>

          {results.map((r, i) => (
            <div key={i} className="card" style={{ maxWidth: "700px" }}>
              <p className="card-meta">Q{i + 1}: {r.question}</p>
              <p className="card-meta">Your answer: {r.answer}</p>
              <span className="tag">Score: {r.score}/10</span>
              <p className="card-meta" style={{ marginTop: "0.5rem" }}>{r.feedback}</p>
              <p className="card-meta"><strong>Strengths:</strong> {r.strengths}</p>
              <p className="card-meta"><strong>Improve:</strong> {r.improvements}</p>
            </div>
          ))}

          <button className="btn btn-secondary" onClick={restart}>
            Start New Interview
          </button>
        </div>
      )}
    </div>
  );
}