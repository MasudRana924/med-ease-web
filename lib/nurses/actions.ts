import api from "@/lib/api/client";
import axios from "axios";
import { Nurse } from "@/types";

interface NurseResponse {
    success: boolean;
    message: string;
    data: Nurse;
}

export const NurseService = {
    getAll: async (params: { page?: number; limit?: number; name?: string; work?: string } = {}): Promise<Nurse[]> => {
        try {
            const { page = 1, limit = 10, name, work } = params;
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (name) queryParams.append("name", name);
            if (work) queryParams.append("work", work);

            const response = await api.get<{ data: Nurse[] }>(`/api/nurses?${queryParams.toString()}`);
            let data: Nurse[] = [];
            if (response.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            }
            return data;
        } catch (error) {
            console.error("Error fetching nurses:", error);
            return [];
        }
    },

    getById: async (id: string): Promise<Nurse | null> => {
        try {
            // Use the med-ease-service API for nurse details
            const nurseApiUrl = process.env.NEXT_PUBLIC_NURSE_API_BASE_URL || "https://med-ease-service.onrender.com/api";
            const response = await axios.get<NurseResponse>(`${nurseApiUrl}/nurses/${id}`);
            if (response.data.success && response.data.data) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching nurse:", error);
            return null;
        }
    },

    getFeatured: async (): Promise<Nurse[]> => {
        const nurses = await NurseService.getAll();
        return nurses.slice(0, 4);
    }
};
