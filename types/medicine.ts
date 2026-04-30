export interface Medicine {
    _id: string;
    name: string;
    commonName?: string;
    company: string;
    type: string;
    price: number;
    quantity: number;
    image: {
        public_id: string;
        url: string;
    };
    category?: string;
    description?: string;
}
