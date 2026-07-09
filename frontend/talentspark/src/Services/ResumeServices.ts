import api from "./api";

export interface ResumeResponse {
    analysis: string;
}

export const analyseResume = async (
    token: string,
    resumeText: string
): Promise<ResumeResponse> => {
    const res = await api.post<ResumeResponse>(
        "/rag/analyze-resume",
        { resume_text: resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};