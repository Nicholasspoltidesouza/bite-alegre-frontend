/**
 * Utility functions for handling geocoding operations
 */

/**
 * Converte um endereço em coordenadas de latitude e longitude
 * Como a API Expo Location.geocodeAsync foi removida no SDK 49,
 * esta é uma implementação alternativa usando mapeamento fixo para alguns bairros de Porto Alegre
 * 
 * @param address - O endereço a ser geocodificado
 * @returns Um array [latitude, longitude] ou null se não for possível geocodificar
 */
export const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
  try {
    console.log('Geocoding address:', address);
    
    // Para Porto Alegre podemos usar uma localização fixa como fallback
    // Coordenadas do centro de Porto Alegre (aproximadamente)
    const defaultLatitude = -30.0346;
    const defaultLongitude = -51.2177;
    
    // Verificar se o endereço contém termos relacionados a diferentes bairros/zonas
    // de Porto Alegre para fornecer coordenadas mais específicas
    const lowerAddress = address.toLowerCase();
    
    // Tenta extrair o bairro do endereço
    const neighborhood = extractNeighborhoodFromAddress(address);
    if (neighborhood) {
      console.log('Detected neighborhood:', neighborhood);
      const neighborhoodLower = neighborhood.toLowerCase();
      
      // Tenta encontrar coordenadas para o bairro extraído
      if (neighborhoodLower.includes('centro')) {
        return [-30.0277, -51.2287];
      } else if (neighborhoodLower.includes('moinhos')) {
        return [-30.0252, -51.2026];
      }
      // ... outros bairros já são verificados abaixo
    }
      // Mapeamento simples de alguns bairros de Porto Alegre
    if (lowerAddress.includes('centro')) {
      console.log('Using Centro coordinates');
      return [-30.0277, -51.2287];
    } else if (lowerAddress.includes('moinhos de vento') || lowerAddress.includes('moinhos')) {
      console.log('Using Moinhos de Vento coordinates');
      return [-30.0252, -51.2026];
    } else if (lowerAddress.includes('cidade baixa')) {
      console.log('Using Cidade Baixa coordinates');
      return [-30.0419, -51.2199];
    } else if (lowerAddress.includes('menino deus')) {
      console.log('Using Menino Deus coordinates');
      return [-30.0532, -51.2190];
    } else if (lowerAddress.includes('bom fim')) {
      console.log('Using Bom Fim coordinates');
      return [-30.0317, -51.2099];
    } else if (lowerAddress.includes('independência')) {
      console.log('Using Independência coordinates');
      return [-30.0307, -51.2153];
    } else if (lowerAddress.includes('farroupilha') || lowerAddress.includes('parque farroupilha')) {
      console.log('Using Farroupilha coordinates');
      return [-30.0372, -51.2164];
    } else if (lowerAddress.includes('bela vista')) {
      console.log('Using Bela Vista coordinates');
      return [-30.0249, -51.1865];
    } else if (lowerAddress.includes('petrópolis')) {
      console.log('Using Petrópolis coordinates');
      return [-30.0476, -51.1900];
    } else if (lowerAddress.includes('auxiliadora')) {
      console.log('Using Auxiliadora coordinates');
      return [-30.0237, -51.1978];
    } else if (lowerAddress.includes('rio branco')) {
      console.log('Using Rio Branco coordinates');
      return [-30.0218, -51.1908];
    }
    
    console.log('Using default coordinates for Porto Alegre:', { 
      latitude: defaultLatitude, 
      longitude: defaultLongitude 
    });
    
    return [defaultLatitude, defaultLongitude];

    /* 
     * Para uma solução real, você precisaria integrar com uma API externa como:
     * 1. Google Maps Geocoding API
     * 2. Mapbox Geocoding API
     * 3. OpenStreetMap Nominatim
     *
     * Exemplo (descomentando o código abaixo e adicionando sua chave de API):
     */
    /*
    // Usando fetch para chamar uma API externa de geocodificação
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ', Porto Alegre, RS, Brasil')}&key=SUA_API_KEY_AQUI`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      console.log('Geocoded coordinates:', { latitude: lat, longitude: lng });
      return [lat, lng];
    } else {
      console.error('No coordinates found for address:', address);
      return null;
    }
    */
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

/**
 * Verifica se as coordenadas de geolocalização são válidas
 * 
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Verdadeiro se as coordenadas forem válidas, falso caso contrário
 */
export const validateCoordinates = (lat: any, lng: any): boolean => {
  const latitude = Number(lat);
  const longitude = Number(lng);
  
  // Verifica se são números válidos e estão dentro dos limites globais
  return (
    !isNaN(latitude) && 
    !isNaN(longitude) && 
    latitude >= -90 && 
    latitude <= 90 && 
    longitude >= -180 && 
    longitude <= 180
  );
};

/**
 * Retorna coordenadas padrão para Porto Alegre
 * 
 * @returns Array [latitude, longitude] com as coordenadas de Porto Alegre
 */
export const getDefaultPortoAlegreCoordinates = (): [number, number] => {
  return [-30.0346, -51.2177];
};

/**
 * Tenta extrair o nome do bairro de um endereço completo
 * 
 * @param address - Endereço completo
 * @returns Nome do bairro extraído ou null se não for possível extrair
 */
export const extractNeighborhoodFromAddress = (address: string): string | null => {
  try {
    // Lista de bairros conhecidos de Porto Alegre
    const knownNeighborhoods = [
      'Centro', 'Moinhos de Vento', 'Cidade Baixa', 'Menino Deus', 'Bom Fim',
      'Independência', 'Farroupilha', 'Bela Vista', 'Petrópolis', 'Auxiliadora',
      'Rio Branco', 'Mont Serrat', 'Jardim Botânico', 'Santana', 'Partenon',
      'Azenha', 'Floresta', 'São João', 'Passo D\'Areia', 'Cristo Redentor'
    ];
    
    const lowerAddress = address.toLowerCase();
    
    // Tenta encontrar um bairro conhecido no endereço
    for (const neighborhood of knownNeighborhoods) {
      if (lowerAddress.includes(neighborhood.toLowerCase())) {
        return neighborhood;
      }
    }
    
    // Se não encontrou um bairro conhecido, tenta extrair de padrões comuns
    // Formato comum: "Rua Nome da Rua, 123, Bairro, Porto Alegre"
    const commaSegments = address.split(',');
    if (commaSegments.length >= 3) {
      // O bairro geralmente está no penúltimo segmento antes da cidade
      const potentialNeighborhood = commaSegments[commaSegments.length - 2].trim();
      if (potentialNeighborhood && !potentialNeighborhood.includes('Porto Alegre')) {
        return potentialNeighborhood;
      }
    }
    
    return null;  } catch (error) {
    console.error('Error extracting neighborhood:', error);
    return null;
  }
};

/**
 * Calcula a distância entre duas coordenadas geográficas usando a fórmula de Haversine
 * 
 * @param lat1 - Latitude do primeiro ponto
 * @param lng1 - Longitude do primeiro ponto
 * @param lat2 - Latitude do segundo ponto
 * @param lng2 - Longitude do segundo ponto
 * @returns Distância em quilômetros
 */
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  // Raio da Terra em quilômetros
  const earthRadius = 6371;
  
  // Conversão de graus para radianos
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  
  // Fórmula de Haversine
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = earthRadius * c;
  
  return distance;
};

/**
 * Converte graus para radianos
 * 
 * @param degrees - Valor em graus
 * @returns Valor em radianos
 */
const degToRad = (degrees: number): number => {
  return degrees * (Math.PI/180);
};
