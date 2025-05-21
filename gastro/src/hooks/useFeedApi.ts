import { useState } from 'react';
import { RestaurantDTO } from '../@types/DTO';
import ApiService from '../services/apiService';
import geoLocationService from '../services/geoLocationService';
import { validateCoordinates, getDefaultPortoAlegreCoordinates } from '../utils/geocodingUtils';

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
      // Verifica se as coordenadas são válidas
      if (!validateCoordinates(latitude, longitude)) {
        console.warn('Coordenadas inválidas para getFeed, usando coordenadas padrão');
        const [defaultLat, defaultLng] = getDefaultPortoAlegreCoordinates();
        latitude = defaultLat.toString();
        longitude = defaultLng.toString();
      }
      
      // Formata as coordenadas usando o serviço
      const formattedCoordinates = geoLocationService.formatCoordinates(latitude, longitude);
      console.log('Getting feed with coordinates:', formattedCoordinates);
      
      const responseData = await apiService.get<RestaurantDTO[]>(
        `/?geolocation=${formattedCoordinates}`,
      );
      console.log('Feed data received:', responseData.length, 'restaurants');
      setData(responseData);
    } catch (err: any) {
      console.error('Error in getFeed:', err);
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
