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
  restaurantName: string,
  address: string,
  email: string,
  password: string,
  averagePrice: string,
  phone: string,
  UserType:  string,
}

export type { UserDTO, RestaurantDTO };
