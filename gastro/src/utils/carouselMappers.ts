import { RestaurantDTO, ReviewDTO, CheckinDTO, PublicationDTO, MenuItemsDTO } from "../@types/DTO";

export interface CarouselItem {
  id: string;
  stars?: number;
  photo?: string;
  name?: string;
  averagePrice?: number;
  isSaved?: boolean;
}

export const mapRestaurantToCarouselItem = (restaurant: RestaurantDTO): CarouselItem => {
  return {
    id: restaurant.id!,
    name: restaurant.name,
    photo: restaurant.profilePhoto,
    averagePrice: restaurant.averagePrice,
    stars: restaurant.averageScore ?? undefined,
  };
};

export const mapReviewToCarouselItem = (review: ReviewDTO): CarouselItem => {
  return {
    id: review.restaurantId!,
    name: review.restaurantName,
    photo: review.restaurantProfilePhoto,
    stars: review.stars,
  };
};

export const mapCheckinToCarouselItem = (checkin: CheckinDTO): CarouselItem => {
  return {
    id: checkin.restaurant_id,
    name: checkin.restaurantName,
    photo: checkin.restaurantProfilePhoto,
  };
};

export const mapPublicationToCarouselItem = (publication: PublicationDTO): CarouselItem => {
  return {
    id: publication.id!,
    name: publication.restaurant_name,
    photo: publication.url,
  };
};

export const mapMenuItemToCarouselItem = (menuItem: MenuItemsDTO): CarouselItem => {
  return {
    id: menuItem.id,
    photo: menuItem.dish_photo,
  };
};