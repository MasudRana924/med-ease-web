import api from "@/lib/api/client";
import { Doctor } from "@/types";

interface DoctorsResponse {
    data: Doctor[];
}

interface DoctorResponse {
    success: boolean;
    data: Doctor;
}

export const DoctorService = {
    getAll: async (params: { page?: number; limit?: number; name?: string; work?: string; expert?: string } = {}): Promise<Doctor[]> => {
        try {
            const { page = 1, limit = 10, name, work, expert } = params;
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (name) queryParams.append("name", name);
            if (work) queryParams.append("work", work);
            if (expert) queryParams.append("expert", expert);

            const response = await api.get<DoctorsResponse>(`/api/doctors?${queryParams.toString()}`);
            console.log("Doctors API response:", response.data);
            if (response.data.data && Array.isArray(response.data.data)) {
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.error("Error fetching doctors:", error);
            return [];
        }
    },

    getById: async (id: string): Promise<Doctor | null> => {
        try {
            const response = await api.get<DoctorResponse>(`/api/doctors/${id}`);
            if (response.data.success && response.data.data) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching doctor:", error);
            return null;
        }
    },

    getFeatured: async (): Promise<Doctor[]> => {
        const doctors = await DoctorService.getAll();
        return doctors.slice(0, 4);
    },

    addReview: async (id: string, review: { rating: number; comment: string; name: string }): Promise<boolean> => {
        try {
            await api.put(`/doctors/${id}/reviews`, review);
            return true;
        } catch (error) {
            console.error("Error adding review:", error);
            return false;
        }
    }
};
