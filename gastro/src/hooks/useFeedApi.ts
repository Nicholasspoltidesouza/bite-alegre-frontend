import { useState } from 'react';
import { FeedDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

export const useFeedApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FeedDTO | null>(null);

  const apiService = new ApiService('/feed');

  const getFeed = async (
    latitude: string,
    longitude: string,
  ): Promise<FeedDTO | null> => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await apiService.get<FeedDTO>(
        `/?geolocation=${latitude},${longitude}`,
      );
      setData(responseData);
      return responseData;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar feed.');
      return null;
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