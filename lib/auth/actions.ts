import apiClient from "@/lib/api/client";
import { AuthResponse, LoginCredentials, SignupCredentials } from "@/types";

export const AuthService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>("/auth/login", credentials);
    },
    signup: async (data: SignupCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>("/register", data);
    }
};
