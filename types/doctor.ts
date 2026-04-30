export interface Doctor {
    _id: string;
    title?: string;
    name: string;
    gender: string;
    nid_No: number;
    bmdc_No: string;
    type: string;
    phone: number;
    email: string;
    role: string;
    isActive: boolean;
    work: string;
    expert: string;
    experience: number;
    degree: string;
    ratings: number;
    numOfReviews: number;
    fees: number;
    reviews: {
        user: string;
        name: string;
        rating: number;
        comment: string;
        _id: string;
    }[];
    avatar: {
        public_id: string;
        url: string;
    };
    createdAt?: string;
    __v?: number;
}
