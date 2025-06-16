import { OpeningPeriodDto, OperatingHoursDto } from "./OperatingHoursDto";

interface UserDTO {
  tagIds: any;
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
  savedRestaurants?: SavedRestaurantDTO[];
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
  publications?: PublicationDTO[];
  menuItems?: MenuItemsDTO[];
  isFavorite?: boolean;
}

export type OpeningPeriodPatch = {
    add?: OpeningPeriodDto[];
    update?: (OpeningPeriodDto & { periodId: string })[];
    delete?: string[];
};

interface RestaurantPatchDTO {
    id: string;
    profilePhoto?: string;
    bannerPhoto?: string;
    address?: string;
    name?: string;
    description?: string;
    averagePrice?: number;
    phone?: string;
    openingPeriods?: OpeningPeriodPatch;
    tags?: string[];
    menuItems?: MenuItemsDTO[];
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
  name?: string;
  date?: string;
  userName?: string;
  createdAt?: string;
  userProfilePhoto?: string;
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
  file?: string;
  description?: string;
  restaurant_id?: string;
  restaurant_name?: string;
  restaurant_photo?: string;
  restaurant_tags?: { id: string; name: string; type: string }[];
}

interface MenuItemsDTO {
    id?: string;
    name: string;
    media: string;
    description: string;
    dish_price: number;
}

interface FeedDTO {
    publications: PublicationDTO[];
    restaurants: RestaurantDTO[];
}

interface  SavedRestaurantDTO { 
  user_id?: string;
  restaurant_id?: string;
  restaurantId?: string;
  averageScore?: number;
  profilePhoto?: string;
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
  OperatingHoursDto,
  MenuItemsDTO,
  FeedDTO,
  SavedRestaurantDTO
};
