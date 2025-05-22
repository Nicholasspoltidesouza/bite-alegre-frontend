import { useState } from 'react';
import { RestaurantDTO, RestaurantFilterDTO } from '../@types/DTO';
import { API_URL_ANDROID, API_URL_BACKEND } from '../constants/apiUrl';

export const useSearchFilter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    RestaurantDTO[]
  >([]);

  const filterRestaurants = async (
    filters: RestaurantFilterDTO,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      if (filters.name) queryParams.append('name', filters.name);
      if (filters.price_range)
        queryParams.append('price_range', filters.price_range.toString());
      if (filters.open_now !== undefined)
        queryParams.append('open_now', filters.open_now.toString());

      if (filters.geolocation && filters.geolocation.length === 2) {
        queryParams.append('lat', filters.geolocation[0].toString());
        queryParams.append('lng', filters.geolocation[1].toString());

        if (filters.proximity) {
          queryParams.append('proximity', filters.proximity.toString());
        }
      }

      if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach((tag) => {
          queryParams.append('tags', tag);
        });
      }

      const queryString = queryParams.toString();
      const url = `${API_URL_BACKEND}/restaurants${queryString ? '?' + queryString : ''}`;
      console.log('Filtrando restaurantes com a URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        const normalizedData = Array.isArray(responseData) ? responseData : [];
        setFilteredRestaurants(normalizedData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao filtrar restaurantes. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      console.error('Erro ao filtrar restaurantes:', err);
      setError(err.message || 'Erro desconhecido');
      setFilteredRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    filterRestaurants,
    loading,
    error,
    filteredRestaurants,
  };
};
