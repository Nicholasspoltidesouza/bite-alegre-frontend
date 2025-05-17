import { useState } from 'react';
import { RestaurantDTO, UserDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

export const useSearch = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userApi = new ApiService('/users');
  const restaurantApi = new ApiService('/restaurants');

  const search = async (query: string): Promise<void> => {
    const trimmed = query.trim();

    if (!trimmed) {
      setUsers([]);
      setRestaurants([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (trimmed.startsWith('@')) {
        const allUsers = await userApi.get<UserDTO[]>(); // GET /users
        const searchTerm = trimmed.replace('@', '').toLowerCase();
        const filtered = allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.nickname?.toLowerCase().includes(searchTerm)
        );
        setUsers(filtered);
        setRestaurants([]);
      } else {
        const allRestaurants = await restaurantApi.get<RestaurantDTO[]>(); // GET /restaurants
        const searchTerm = trimmed.toLowerCase();
        const filtered = allRestaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm)
        );
        setRestaurants(filtered);
        setUsers([]);
      }
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      setUsers([]);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    restaurants,
    loading,
    error,
    search,
  };
};
