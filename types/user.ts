export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: {
        public_id: string;
        url: string;
    } | null;
    gender?: string;
    phone?: string;
    createdAt?: string;
}

export interface AuthResponse {
    success: boolean;
    user: User;
    token: string;
}

export interface ErrorResponse {
    message: string;
}

// Re-export auth types
export * from "./auth";
