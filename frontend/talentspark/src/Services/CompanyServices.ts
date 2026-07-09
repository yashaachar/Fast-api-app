import axios from "axios";
import type { Company } from "../types/company";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const getHeaders = (token: string) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const getCompanies = async (token: string): Promise<Company[]> => {
    const response = await axios.get(`${API_BASE_URL}/company/`, getHeaders(token));
    return response.data;
};

export const getCompanyById = async (id: number, token: string): Promise<Company> => {
    const response = await axios.get(`${API_BASE_URL}/company/${id}`, getHeaders(token));
    return response.data;
};

export async function createCompany(company: Company, token: string): Promise<Company> {
    const response = await axios.post(`${API_BASE_URL}/company/`, company, getHeaders(token));
    return response.data;
}

export async function updateCompany(id: string, company: Company, token: string): Promise<Company> {
    const response = await axios.put(`${API_BASE_URL}/company/${id}`, company, getHeaders(token));
    return response.data;
}

export async function deleteCompany(id: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/company/${id}`, getHeaders(token));
}