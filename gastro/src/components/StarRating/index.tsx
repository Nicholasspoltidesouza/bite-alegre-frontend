import React from 'react';
import { Star } from 'lucide-react-native'; // Para React Native/Expo

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  starSize?: number;
  activeColor?: string;   // Cor para estrelas ativas (ex: "#FF9529")
  inactiveColor?: string; // Cor para estrelas inativas (ex: "#D1D5DB")
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  starSize = 14,
  activeColor = "#FF9529", // Laranja padrão
  inactiveColor = "#E0E0E0", // Cinza claro padrão
}) => {
  return (
    // Em React Native: <View style={{ flexDirection: 'row' }}> ou <View className="flex-row">
    <div className="flex flex-row">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          size={starSize}
          fill={index < rating ? activeColor : "transparent"} // Preenche se ativa
          color={index < rating ? activeColor : inactiveColor}  // Cor da borda/estrela
        />
      ))}
    </div>
  );
};

export default StarRating;