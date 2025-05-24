import { useState } from 'react';
import { RestaurantDTO, RestaurantFilterDTO } from '../@types/DTO';
import ApiService from '../services/apiService';
import { useFilterResult } from '../contexts/FilterResultContext';

export const useSearchFilter = () => {
  const { restaurants, setRestaurants } = useFilterResult();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restaurantApi = new ApiService('/restaurants');

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

      if (filters.address) {
        const cleanedAddress = filters.address.replace(/,/g, '');
        queryParams.append('address', cleanedAddress);
      }

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
      const url = queryString ? `?${queryString}` : '';

      const filteredRestaurants = await restaurantApi.get<RestaurantDTO[]>(url);
      setRestaurants(filteredRestaurants);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    restaurants,
    loading,
    error,
    filterRestaurants,
  };
};
