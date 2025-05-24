import React from 'react';
import Roulette from '../Roulette';
import RouletteRestaurantModal from '@/src/components/RouletteRestaurantModal';


const ModalRestaurant: React.FC = () => {

  return (
    RouletteRestaurantModal({
      visible: true,
      onClose: () => {},
      onVibeRequest: () => {},
      imageUrl: 'https://www.viajali.com.br/wp-content/uploads/2018/08/restaurante-em-porto-alegre-001.png',
      nomeDoRestaurante: 'Restaurante Exemplo',
    })
  );
};

export default ModalRestaurant;
