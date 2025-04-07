export interface RestaurantDTO {
    profilePhoto?: string;
    bannerPhoto?: string;
    address: string;
    restaurantName: string;
    email: string;
    password: string;
    averagePrice: number;
    phone: string;
    restaurantType: string | null;
}
