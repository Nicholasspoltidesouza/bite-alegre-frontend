import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import RestaurantInformation from '@/src/components/RestaurantInformation';
import { View } from 'lucide-react-native';

import React from 'react';


const restaurantProfile: React.FC = () =>{
  
  return (
      
    <View>  
    <HeaderPerfilRestaurante
      urlFotoBanner={'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/5a/28/0e/salao-principal.jpg?w=600&h=-1&s=1'}
      urlFotoPerfil={''}
    ></HeaderPerfilRestaurante>

    
    <RestaurantInformation

    ></RestaurantInformation>


    </View>
  );


}

export default restaurantProfile;
