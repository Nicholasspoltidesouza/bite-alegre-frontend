export type UserResponse = {
  id: string;
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
  reviews: [];
  stars?: number;
};
