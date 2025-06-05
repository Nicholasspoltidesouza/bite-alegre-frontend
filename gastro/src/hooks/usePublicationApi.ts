import { useState } from 'react';
import { PublicationDTO, RestaurantFilterDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

export const usePublicationApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PublicationDTO | null>(null);
  const publicationApiService = new ApiService('/post');

  const callApi = async <T>(callApiPromise: Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await callApiPromise;
      return result;
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 404) {
        return null;
      }
      setError(err.message || 'Erro ao executar a chamada da API.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPublication = async (
    newPublicationData: PublicationDTO
  ): Promise<PublicationDTO | null> => {
    const { media, description, restaurant_id } = newPublicationData;

    const payload = {
      media,
      description,
      restaurant_id,
    };

    const responseData = await callApi(
      publicationApiService.post<typeof payload, PublicationDTO>(payload)
    );

    if (responseData) {
      setData(responseData);
    }
    return responseData;
  };

const getPublicationbyUserId = async (
  userId: string,
  filters?: RestaurantFilterDTO
): Promise<PublicationDTO[] | null> => {
  const queryParams = new URLSearchParams();

  if (filters?.price_range) {
    queryParams.append('price_range', filters.price_range.toString());
  }

  if (filters?.tags?.length) {
    filters.tags.forEach((tag) => queryParams.append('tags', tag));
  }

  const queryString = queryParams.toString();
  const url = `/user/${userId}${queryString ? `?${queryString}` : ''}`;

  const responseData = await callApi(
    publicationApiService.get<PublicationDTO[] | null>(url)
  );

  console.log('Publicações filtradas:', responseData);
  return responseData;
};

  return {
    getPublicationbyUserId,
    createPublication,
    loading,
    error,
    data,
  };
};
