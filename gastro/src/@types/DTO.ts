interface UserDTO {
  profilePhoto?: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  gender: string | null;
  birthDate?: string;
  userType: string;
}
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

export type { UserDTO, RestaurantDTO };
