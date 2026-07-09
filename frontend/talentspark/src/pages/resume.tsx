import { useState } from "react";
import { analyseResume } from "../Services/ResumeServices";
import ReactMarkdown from "react-markdown";

interface ResumeProps {
  token: string;
}

const Resume = ({ token }: ResumeProps) => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyse = async () => {
    if (!resumeText.trim() || loading) return;
    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const res = await analyseResume(token, resumeText);
      setAnalysis(res.analysis);
    } catch (err) {
      setError("Couldn't analyse resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Resume Analyser</h1>
      <p className="page-subtitle">Paste your resume text to get structured feedback.</p>

      <textarea
        className="input"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
        rows={10}
        style={{ maxWidth: "700px", resize: "vertical", fontFamily: "var(--font-body)" }}
      />

      <div>
        <button className="btn btn-primary" onClick={handleAnalyse} disabled={loading} style={{ marginBottom: "1.5rem" }}>
          {loading ? "Analysing..." : "Analyse Resume"}
        </button>
      </div>

      {error && <p className="page-subtitle">{error}</p>}

      {analysis && (
        <div className="resume-output">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Resume;