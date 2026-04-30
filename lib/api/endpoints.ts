/**
 * Centralized API endpoints configuration
 * Makes it easy to manage and update API routes
 */

export const API_ENDPOINTS = {
    // Auth endpoints
    auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        profile: '/api/auth/profile',
    },

    // Medicine endpoints
    medicines: {
        list: '/api/medicines',
        detail: (id: string) => `/api/medicines/${id}`,
        search: '/api/medicines/search',
    },

    // Doctor endpoints
    doctors: {
        list: '/api/doctors',
        detail: (id: string) => `/api/doctors/${id}`,
        reviews: (id: string) => `/api/doctors/${id}/reviews`,
    },

    // Nurse endpoints
    nurses: {
        list: '/api/nurses',
        detail: (id: string) => `/api/nurses/${id}`,
        reviews: (id: string) => `/api/nurses/${id}/reviews`,
    },

    // Blood donation endpoints
    blood: {
        list: '/api/blood',
        detail: (id: string) => `/api/blood/${id}`,
    },
} as const;

export default API_ENDPOINTS;
