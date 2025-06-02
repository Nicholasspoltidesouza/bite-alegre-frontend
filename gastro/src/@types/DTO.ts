import { OperatingHoursDto } from "./OperatingHoursDto";

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
  influencer?: boolean;
}
interface RestaurantDTO {
  id?: string;
  profilePhoto?: string;
  bannerPhoto?: string;
  address: string;
  name: string;
  cnpj: string;
  description: string;
  email: string;
  password: string;
  averagePrice: number;
  averageScore?: number | null;
  phone: string;
  userType: string;
  reviews?: ReviewDTO[];
  stars?: number;
  openingPeriods?: OperatingHoursDto[];
}

interface RestaurantPatchDTO {
  id: string;
  profilePhoto?: string;
  bannerPhoto?: string;
  address?: string;
  name?: string;
  description?: string;
  averagePrice?: number;
  phone?: string;
  openingPeriods?: {
    weekday: string;
    opensAt: string;
    closesAt: string;
  }[];
  tagIds?: string[];
}

interface CheckinDTO {
  user_id?: string;
  restaurant_id: string;
  restaurantProfilePhoto?: string;
  restaurantName?: string;
}

interface ReviewDTO {
  id?: string;
  user_id?: string;
  restaurantId?: string;
  restaurant_id?: string;
  stars: number;
  feedback?: string;
  restaurantProfilePhoto?: string;
  restaurantName?: string;
}

interface RestaurantFilterDTO {
  name?: string;
  geolocation?: [number, number];
  address?: string;
  proximity?: number;
  price_range?: number;
  tags?: string[];
  open_now?: boolean;
}

interface AuthDTO {
  token: string;
  role: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

interface PublicationDTO {
  id?: string;
  url?: string;
  media?: string;
  description?: string;
  restaurant_id?: string;
  restaurant_name?: string;
  restaurant_tags?: string[];
}
export type {
  RestaurantDTO,
  RestaurantPatchDTO,
  UserDTO,
  CheckinDTO,
  ReviewDTO,
  RestaurantFilterDTO,
  AuthDTO,
  PublicationDTO,
  OperatingHoursDto
};
