import { useState } from 'react';
import { RestaurantDTO } from '../@types/DTO';
import { API_URL_BACKEND } from '../constants/apiUrl';

interface Restaurant {
  id: string;
  profilePhoto: string;
  bannerPhoto: string;
  name: string;
  description: string;
  address: string;
  averagePrice: string;
  phone: string;
}

export const useRestaurantApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Restaurant | null>(null);

  const getRestaurant = async (restaurantId: RestaurantDTO): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL_BACKEND}restaurants/${restaurantId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao buscar restaurante. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { getRestaurant, loading, error, data };
};
