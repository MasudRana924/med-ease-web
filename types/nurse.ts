export interface Nurse {
    _id: string;
    name: string;
    phone: number;
    email: string;
    gender: string;
    location: string;
    work: string;
    degree: string;
    ratings: number;
    description: string;
    images: {
        public_id: string;
        url: string;
        _id: string;
    }[];
    numOfReviews: number;
    fees: number;
    reviews: {
        user: string;
        name: string;
        rating: number;
        comment: string;
        _id: string;
    }[];
    createdAt?: string;
    __v?: number;
}
