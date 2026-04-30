import api from "@/lib/api/client";
import { Medicine } from "@/types";

export const MedicineService = {
    getAll: async (params: { page?: number; limit?: number; search?: string } = {}): Promise<Medicine[]> => {
        try {
            const { page = 1, limit = 10, search } = params;
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (search) queryParams.append("name", search);

            const response = await api.get<{ data: Medicine[] }>(`/api/medicines?${queryParams.toString()}`);
            let data: Medicine[] = [];
            if (response.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            }
            return data;
        } catch (error) {
            console.error("Error fetching medicines:", error);
            return [];
        }
    },

    getById: async (id: string): Promise<Medicine | null> => {
        try {
            const response = await api.get<{ data: Medicine }>(`/api/medicines/${id}`);
            if (response.data && response.data.data) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching medicine:", error);
            return null;
        }
    },

    getFeatured: async (): Promise<Medicine[]> => {
        const medicines = await MedicineService.getAll();
        return medicines.slice(0, 4);
    }
};
