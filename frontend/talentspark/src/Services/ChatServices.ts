import api from "./api";

export interface ChatResponse {
    response: string;
}

export const askCareerBot = async (
    token: string,
    message: string,
    sessionId: string = "default"
): Promise<ChatResponse> => {
    const res = await api.post<ChatResponse>(
        "/chat/ask_career",
        { message, session_id: sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};