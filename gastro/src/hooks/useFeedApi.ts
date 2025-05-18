import { useState } from 'react';
import { RestaurantDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

export const useFeedApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RestaurantDTO[] | null>([]);

  const apiService = new ApiService('/feed');

  const getFeed = async (
    latitude: string,
    longitude: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await apiService.get<RestaurantDTO[]>(
        `/?geolocation=${latitude},${longitude}`,
      );
      console.log(responseData);
      setData(responseData);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar feed.');
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
