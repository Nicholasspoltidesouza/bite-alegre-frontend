export type RestaurantResponse = {
    id: string;
    profilePhoto: string;
    bannerPhoto: string;
    name: string;
    cnpj: string;
    description: string;
    address: string;
    averagePrice: string;
    phone: string;
    latitude: number;
    longitude: number;
    averageScore: number | null;
    reviews: any[];
};
