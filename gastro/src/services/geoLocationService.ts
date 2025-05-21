import ApiService from './apiService';
import { validateCoordinates, getDefaultPortoAlegreCoordinates } from '../utils/geocodingUtils';
import { RestaurantDTO } from '../@types/DTO';

/**
 * Serviço especializado para lidar com requisições que envolvem geolocalização
 */
class GeoLocationService {
  private apiService: ApiService;
  
  constructor() {
    this.apiService = new ApiService('/restaurants');
  }
  
  /**
   * Busca restaurantes baseados nas coordenadas de geolocalização
   * 
   * @param latitude Latitude da posição
   * @param longitude Longitude da posição
   * @param proximity Raio de proximidade em km (opcional, padrão 10)
   * @returns Lista de restaurantes próximos
   */
  async getNearbyRestaurants(
    latitude: number | string, 
    longitude: number | string,
    proximity: number = 10
  ): Promise<RestaurantDTO[]> {
    try {
      // Garante que os valores são válidos antes de fazer a requisição
      if (!validateCoordinates(latitude, longitude)) {
        console.warn('Coordenadas inválidas, usando coordenadas padrão de Porto Alegre');
        const [defaultLat, defaultLng] = getDefaultPortoAlegreCoordinates();
        latitude = defaultLat;
        longitude = defaultLng;
      }
      
      // Formata os valores para o formato esperado pela API
      const formattedLat = typeof latitude === 'number' ? latitude.toFixed(6) : latitude;
      const formattedLng = typeof longitude === 'number' ? longitude.toFixed(6) : longitude;
      
      // Constrói a URL com os parâmetros de geolocalização
      const url = `?geolocation=${formattedLat},${formattedLng}&proximity=${proximity}`;
      console.log('Geolocation API URL:', url);
      
      // Faz a requisição para a API
      const restaurants = await this.apiService.get<RestaurantDTO[]>(url);
      console.log(`Found ${restaurants.length} nearby restaurants`);
      return restaurants;
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      throw error;
    }
  }
  
  /**
   * Formata as coordenadas para o formato "lat,lng" usado pela API
   * 
   * @param latitude Latitude
   * @param longitude Longitude
   * @returns String formatada como "lat,lng"
   */
  formatCoordinates(latitude: number | string, longitude: number | string): string {
    const formattedLat = typeof latitude === 'number' ? latitude.toFixed(6) : latitude;
    const formattedLng = typeof longitude === 'number' ? longitude.toFixed(6) : longitude;
    return `${formattedLat},${formattedLng}`;
  }
}

// Exporta uma instância única do serviço
export default new GeoLocationService();
