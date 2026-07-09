import axios from "axios";
import type { Job } from "../types/job";

const API_BASE_URL = "http://localhost:8000";

const getHeaders = (token: string) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const getJobs = async (token: string): Promise<Job[]> => {
    const response = await axios.get(`${API_BASE_URL}/job/`, getHeaders(token));
    return response.data;
};

export const getJobById = async (id: number, token: string): Promise<Job> => {
    const response = await axios.get(`${API_BASE_URL}/job/${id}`, getHeaders(token));
    return response.data;
};

export async function createJob(job: Omit<Job, "id">, token: string): Promise<Job> {
    const response = await axios.post(`${API_BASE_URL}/job/`, job, getHeaders(token));
    return response.data;
}

export async function updateJob(id: number, job: Partial<Job>, token: string): Promise<Job> {
    const response = await axios.put(`${API_BASE_URL}/job/${id}`, job, getHeaders(token));
    return response.data;
}

export async function deleteJob(id: number, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/job/${id}`, getHeaders(token));
}