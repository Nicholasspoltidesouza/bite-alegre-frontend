import { useState } from 'react';
import { CheckinDTO, RestaurantDTO, ReviewDTO } from '../@types/DTO';
import { API_URL_BACKEND } from '../constants/apiUrl';

export const useRestaurantApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RestaurantDTO | null>(null);

  const getRestaurantById = async (
    restaurantId: RestaurantDTO,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL_BACKEND}/restaurants/${restaurantId}`,
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

  const createRestaurant = async (
    restaurantData: RestaurantDTO,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL_BACKEND}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });
      const responseData = await response.json();

      if (response.ok) {
        console.log('Restaurante criado:', responseData);
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao criar restaurante. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      console.error('Erro ao criar restaurante:', err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const createCheckin = async (data: CheckinDTO): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL_BACKEND}/restaurants/${data.restaurant_id}/checkin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log('Checkin criado:', responseData);
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao criar checkin. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      console.error('Erro ao criar checkin:', err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (
    data: ReviewDTO,
    restaurantId: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL_BACKEND}/restaurants/${restaurantId}/review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log('Review criada:', responseData);
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao criar Review. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      console.error('Erro ao criar review:', err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return {
    createRestaurant,
    getRestaurantById,
    createCheckin,
    createReview,
    loading,
    error,
    data,
  };
};
