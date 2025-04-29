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
  id: string;
}
interface RestaurantDTO {
    profilePhoto?: string;
    bannerPhoto?: string;
    address: string;
    name: string;
    description: string;
    email: string;
    password: string;
    averagePrice: number;
    phone: string;
    userType: string;
}

interface CheckinDTO {
  user_id: string;
  restaurant_id: string;
}

interface ReviewDTO {
  user_id: string;
  restaurant_id: string
  stars: number;
  feedback?: string
}

export type { RestaurantDTO, UserDTO, CheckinDTO, ReviewDTO};
