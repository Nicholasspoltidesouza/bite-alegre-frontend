# Correções de Geolocalização

## Problema Resolvido
Foram corrigidos os problemas com o envio das coordenadas de geolocalização nas requisições de filtro de restaurantes. Anteriormente, as coordenadas não estavam sendo enviadas no formato correto que a API esperava.

## Alterações Realizadas

### 1. Estrutura Unificada para Envio de Geolocalização
- Os parâmetros de geolocalização são agora enviados no formato `geolocation=lat,lng` em vez de parâmetros separados `lat` e `lng`
- Formato consistente utilizado em todos os hooks (`useSearchFilter` e `useFeedApi`)

### 2. Utilidades de Geolocalização
- Criado arquivo `src/utils/geocodingUtils.ts` com funções utilitárias:  - `geocodeAddress`: Converte endereços em coordenadas (usando mapeamento de bairros)
  - `validateCoordinates`: Verifica se coordenadas são válidas
  - `getDefaultPortoAlegreCoordinates`: Fornece coordenadas padrão para Porto Alegre
  - `extractNeighborhoodFromAddress`: Extrai nome de bairro de um endereço completo

### 3. Serviço de Geolocalização
- Criado `src/services/geoLocationService.ts` para centralizar operações de geolocalização
- Implementados métodos para buscar restaurantes próximos e formatar coordenadas

### 4. Tratamento de Erros e Fallbacks
- Adicionados verificações de coordenadas inválidas
- Implementado fallback para coordenadas de Porto Alegre quando ocorrem problemas
- Adicionados logs detalhados para facilitar a depuração

### 5. Solução para o Problema do Expo Location geocodeAsync
- Como a API `Location.geocodeAsync` foi removida no SDK 49 do Expo, implementamos uma solução alternativa:
  - Usando mapeamento predefinido de bairros para Porto Alegre
  - Extração inteligente de bairros a partir de endereços completos
  - Suporte a 10+ bairros populares de Porto Alegre com coordenadas precisas
  - Preparado código comentado para integração com APIs externas

## Próximos Passos Recomendados

### Implementar Geocodificação Externa
Para uma solução completa de geocodificação, é necessário integrar com uma API externa:

1. **Google Maps Geocoding API**
   - Crie uma conta no [Google Cloud Platform](https://console.cloud.google.com/)
   - Ative a API de Geocodificação e obtenha uma chave de API
   - Descomente e adapte o código em `geocodeAddress` para usar esta API

2. **Mapbox Geocoding API**
   - Crie uma conta no [Mapbox](https://www.mapbox.com/)
   - Obtenha um token de acesso
   - Implemente a integração conforme a documentação

3. **OpenStreetMap Nominatim**
   - Solução gratuita, mas com limites de uso
   - Não requer chave, mas requer respeitar os termos de uso
   - Útil para testes e aplicações de baixo volume

### Exemplo de Integração com Google Maps API

```typescript
// Em geocodingUtils.ts
export const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
  try {
    // Tenta extrair o bairro primeiro (para o fallback)
    const neighborhood = extractNeighborhoodFromAddress(address);
    
    const API_KEY = 'SUA_API_KEY_AQUI';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ', Porto Alegre, RS, Brasil')}&key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      console.log('Geocoded coordinates:', { latitude: lat, longitude: lng });
      return [lat, lng];
    } else {
      console.error('No coordinates found for address:', address);
      
      // Fallback usando o bairro extraído
      if (neighborhood) {
        const neighborhoodCoords = await geocodeBairro(neighborhood);
        if (neighborhoodCoords) return neighborhoodCoords;
      }
      
      return getDefaultPortoAlegreCoordinates();
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    return getDefaultPortoAlegreCoordinates();
  }
};

// Função auxiliar para fallback por bairro
const geocodeBairro = async (bairro: string): Promise<[number, number] | null> => {
  // Implementação baseada no mapeamento de bairros existente
  const lowerBairro = bairro.toLowerCase();
  if (lowerBairro.includes('centro')) return [-30.0277, -51.2287];
  if (lowerBairro.includes('moinhos')) return [-30.0252, -51.2026];
  // ... outros bairros
  return null;
};
```

## Segurança
Lembre-se de que as chaves de API não devem ser expostas no código. Use variáveis de ambiente ou um sistema de configuração seguro. Para o Expo, você pode usar o pacote `expo-constants` e configurações no `app.config.js`.

## Testes
Após a implementação, teste minuciosamente as funcionalidades de geolocalização com diferentes endereços e cenários de erro para garantir o funcionamento correto.

## Exemplos de Uso

### 1. Usando Geolocalização no Filtro

```typescript
import { useLocation } from '@/src/hooks/useLocation';
import { validateCoordinates } from '@/src/utils/geocodingUtils';

// No componente
const { latitude, longitude } = useLocation();

const applyFilters = () => {
  if (latitude && longitude && validateCoordinates(latitude, longitude)) {
    const apiFilters = {
      geolocation: [Number(latitude), Number(longitude)],
      proximity: 10
    };
    filterRestaurants(apiFilters);
  }
};
```

### 2. Geocodificando Endereços

```typescript
import { geocodeAddress, extractNeighborhoodFromAddress } from '@/src/utils/geocodingUtils';

const searchByAddress = async (address: string) => {
  // Opcionalmente, extrai o bairro para informações adicionais
  const neighborhood = extractNeighborhoodFromAddress(address);
  if (neighborhood) {
    console.log('Bairro detectado:', neighborhood);
  }
  
  // Geocodifica o endereço
  const coordinates = await geocodeAddress(address);
  if (coordinates) {
    const [lat, lng] = coordinates;
    console.log('Coordenadas:', lat, lng);
    
    // Usa as coordenadas para buscar restaurantes próximos
    const apiFilters = {
      geolocation: coordinates,
      proximity: 10
    };
    filterRestaurants(apiFilters);
  }
};
```

### 3. Utilizando o Serviço de Geolocalização

```typescript
import geoLocationService from '@/src/services/geoLocationService';

// Buscar restaurantes próximos
const getNearbyPlaces = async () => {
  try {
    const restaurants = await geoLocationService.getNearbyRestaurants(
      latitude, 
      longitude, 
      5 // raio de 5km
    );
    setRestaurants(restaurants);  } catch (error) {
    console.error('Erro ao buscar restaurantes próximos:', error);
  }
};
```

### 4. Calculando Distância Entre Coordenadas

```typescript
import { calculateDistance } from '@/src/utils/geocodingUtils';

// Calcular distância entre a localização do usuário e um restaurante
const getDistanceToRestaurant = (restaurant) => {
  // Coordenadas do usuário
  const userLat = Number(latitude);
  const userLng = Number(longitude);
  
  // Coordenadas do restaurante (supõe-se que o restaurante tenha lat/lng)
  const restaurantLat = Number(restaurant.latitude);
  const restaurantLng = Number(restaurant.longitude);
  
  // Calcula a distância em km
  const distance = calculateDistance(userLat, userLng, restaurantLat, restaurantLng);
  
  // Formata a distância para exibição
  return distance < 1 
    ? `${Math.round(distance * 1000)} m`
    : `${distance.toFixed(1)} km`;
};
```
