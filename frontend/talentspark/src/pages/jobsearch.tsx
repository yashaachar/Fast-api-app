import { useState } from "react";
import { searchJobs, matchJobsForProfile } from "../Services/RagServices";
import type { SemanticSearchResult, JobMatchResult } from "../Services/RagServices";

type Mode = "search" | "match";

const JobSearch = () => {
    const [mode, setMode] = useState<Mode>("search");
    const [query, setQuery] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [searchResults, setSearchResults] = useState<SemanticSearchResult[]>([]);
    const [matchResults, setMatchResults] = useState<JobMatchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!query.trim() || loading) return;
        setLoading(true);
        setError("");
        try {
            const results = await searchJobs(query);
            setSearchResults(results);
            setHasSearched(true);
        } catch (err) {
            setError("Couldn't search jobs. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleMatch = async () => {
        if (!skills.trim() || !experience.trim() || loading) return;
        setLoading(true);
        setError("");
        try {
            const results = await matchJobsForProfile(skills, experience);
            setMatchResults(results);
            setHasSearched(true);
        } catch (err) {
            setError("Couldn't match jobs. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="page-title">Job Search</h1>
            <p className="page-subtitle">Find roles by meaning, or match your profile to open positions.</p>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <button
                    className={mode === "search" ? "btn btn-primary" : "btn btn-ghost"}
                    onClick={() => { setMode("search"); setHasSearched(false); }}
                >
                    Semantic Search
                </button>
                <button
                    className={mode === "match" ? "btn btn-primary" : "btn btn-ghost"}
                    onClick={() => { setMode("match"); setHasSearched(false); }}
                >
                    Profile Match
                </button>
            </div>

            {mode === "search" && (
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", maxWidth: "600px" }}>
                    <input
                        className="input"
                        style={{ marginBottom: 0 }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. backend developer with Python experience"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            )}

            {mode === "match" && (
                <div style={{ maxWidth: "600px", marginBottom: "1.5rem" }}>
                    <input
                        className="input"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Skills, e.g. Python, FastAPI, PostgreSQL"
                    />
                    <input
                        className="input"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Experience, e.g. 2 years backend development"
                    />
                    <button className="btn btn-primary" onClick={handleMatch} disabled={loading}>
                        {loading ? "Matching..." : "Find Matches"}
                    </button>
                </div>
            )}

            {error && <p className="page-subtitle">{error}</p>}

            {mode === "search" && hasSearched && (
                <div>
                    {searchResults.length === 0 && <p className="page-subtitle">No matches found.</p>}
                    {searchResults.map((job, idx) => (
                        <div key={idx} className="card">
                            <div className="card-title">{job.title}</div>
                            <p className="card-meta">{job.description}</p>
                            <span className="tag">₹{job.salary?.toLocaleString() ?? "—"}</span>
                            <span className="tag">Relevance: {(job.score * 100).toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            )}

            {mode === "match" && hasSearched && (
                <div>
                    {matchResults.length === 0 && <p className="page-subtitle">No matches found.</p>}
                    {matchResults.map((job, idx) => (
                        <div key={idx} className="card accent-mint">
                            <div className="card-title">{job.title}</div>
                            <p className="card-meta">{job.description}</p>
                            <span className="tag">₹{job.salary?.toLocaleString() ?? "—"}</span>
                            <span className="tag">Match: {job.match_score.toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobSearch;