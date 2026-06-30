import axios from "axios";
import type { Company } from "../types/company";

const API_BASE_URL = "http://localhost:8000";
export const getCompanies = async (): Promise<Company[]> => {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    return response.data;
};
