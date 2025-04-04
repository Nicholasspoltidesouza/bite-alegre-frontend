interface RestaurantDTO {
    profilePhoto?: string;
    bannerPhoto?: string;
    address: string;
    name: string;
    email: string;
    password: string;
    averagePrice: number;
    phone: string;
    restaurantType: string | null;
}

export type { RestaurantDTO };
