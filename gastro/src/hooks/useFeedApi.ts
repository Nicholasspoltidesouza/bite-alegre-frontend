import { useState } from 'react';
import { RestaurantDTO } from '../@types/DTO';
import { API_URL_BACKEND } from '../constants/apiUrl';

export const useFeedApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RestaurantDTO | null>(null);

  const getFeed = async (
    userId: string,
    latitude: string,
    longitude: string,
    proximity: number,
  ): Promise<void> => {
    setLoading(true);
    setError(null);
  
    try {
      const params = new URLSearchParams();
      params.append('geolocation', `${latitude},${longitude}`);
      params.append('proximity', proximity.toString());
      params.append('id', userId);

      const url = `${API_URL_BACKEND}/feed?${params.toString()}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao buscar feed. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };



  return {
    getFeed,
    loading,
    error,
    data,
  };
};
