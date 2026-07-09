import api from "./api";

export interface SemanticSearchResult {
    job_id: number | null;
    title: string;
    description: string;
    salary: number | null;
    score: number;
}

export interface JobMatchResult {
    job_id: number | null;
    title: string;
    description: string;
    salary: number | null;
    match_score: number;
}

export const searchJobs = async (query: string): Promise<SemanticSearchResult[]> => {
    const res = await api.post<{ results: SemanticSearchResult[] }>("/rag/search", { query });
    return res.data.results;
};

export const matchJobsForProfile = async (
    skills: string,
    experience: string
): Promise<JobMatchResult[]> => {
    const res = await api.post<{ matches: JobMatchResult[] }>("/rag/job-match", { skills, experience });
    return res.data.matches;
};