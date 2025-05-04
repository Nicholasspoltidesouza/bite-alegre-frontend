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
  id?: string;
  reviews?: ReviewDTO[];
  checkinsWithoutReview?: CheckinDTO[]; 
}
interface RestaurantDTO {
    id?: string;
    profilePhoto?: string;
    bannerPhoto?: string;
    address: string;
    name: string;
    description: string;
    email: string;
    password: string;
    averagePrice: number;
    averageScore?: number | null;
    phone: string;
    userType: string;
    reviews?: ReviewDTO[];
    stars?: number;
}

interface CheckinDTO {
  user_id: string;
  restaurant_id: string;
  restaurantProfilePhoto?: string;
  restaurantName?: string
}

interface ReviewDTO {
  user_id: string;
  restaurantId?: string
  restaurant_id?: string
  stars: number;
  feedback?: string
  restaurantProfilePhoto?: string
  restaurantName?: string
}

export type { RestaurantDTO, UserDTO, CheckinDTO, ReviewDTO};
