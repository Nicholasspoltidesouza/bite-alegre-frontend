import { useState } from 'react';
import { RestaurantDTO, RestaurantFilterDTO } from '../@types/DTO';
import ApiService from '../services/apiService';
import { useFilterResult } from '../contexts/FilterResultContext';
import { validateCoordinates, getDefaultPortoAlegreCoordinates } from '../utils/geocodingUtils';

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
        const [lat, lng] = filters.geolocation;
        
        // Verificar se as coordenadas são válidas
        if (validateCoordinates(lat, lng)) {
          // Garantindo que lat e lng são formatados corretamente com precisão adequada
          const formattedLat = typeof lat === 'number' ? lat.toFixed(6) : lat;
          const formattedLng = typeof lng === 'number' ? lng.toFixed(6) : lng;
          
          // Formato consistente com useFeedApi.ts (geolocation=lat,lng)
          queryParams.append('geolocation', `${formattedLat},${formattedLng}`);

          if (filters.proximity) {
            queryParams.append('proximity', filters.proximity.toString());
          }
          console.log('Geolocation params added:', { geolocation: `${formattedLat},${formattedLng}`, proximity: filters.proximity });
        } else {
          console.warn('Invalid geolocation data, using default coordinates');
          const [defaultLat, defaultLng] = getDefaultPortoAlegreCoordinates();
          queryParams.append('geolocation', `${defaultLat},${defaultLng}`);
          if (filters.proximity) {
            queryParams.append('proximity', filters.proximity.toString());
          }
          console.log('Default geolocation params added:', { geolocation: `${defaultLat},${defaultLng}`, proximity: filters.proximity });
        }
      }

      if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach((tag) => {
          queryParams.append('tags', tag);
        });
      }
      
      const queryString = queryParams.toString();
      const url = queryString ? `?${queryString}` : '';
      console.log('Filter API request URL:', url);
      console.log('Final API request URL:', `/restaurants${url}`);

      const filteredRestaurants = await restaurantApi.get<RestaurantDTO[]>(url);
      console.log('Filtered restaurants received:', filteredRestaurants.length);
      setRestaurants(filteredRestaurants);
    } catch (err: any) {
      console.error('Error in filterRestaurants:', err);
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
