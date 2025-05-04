import { useState } from 'react';
import { RestaurantDTO, UserDTO } from '../@types/DTO';
import { API_URL_BACKEND } from '../constants/apiUrl';

type SearchResults = {
  users: UserDTO[];
  restaurants: RestaurantDTO[];
};

export const useSearch = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const res = await fetch(`${API_URL_BACKEND}/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (res.ok) {
          const searchTerm = trimmed.replace('@', '').toLowerCase();
          const filtered = data.filter(
            (user: UserDTO) =>
              user.name.toLowerCase().includes(searchTerm) ||
              user.nickname?.toLowerCase().includes(searchTerm),
          );
          setUsers(filtered);
          setRestaurants([]);
        } else {
          throw new Error(data.message || 'Erro ao buscar usuários');
        }
      } else {
        const res = await fetch(`${API_URL_BACKEND}/restaurants`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (res.ok) {
          const searchTerm = trimmed.toLowerCase();
          const filtered = data.filter((restaurant: RestaurantDTO) =>
            restaurant.name.toLowerCase().includes(searchTerm),
          );
          setRestaurants(filtered);
          setUsers([]);
        } else {
          throw new Error(data.message || 'Erro ao buscar restaurantes');
        }
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
