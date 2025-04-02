import React from "react";
import { View, Text } from "react-native";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react-native";

const RestaurantInformation = () => {
  return (
    <View className="p-4">
    
      <Text className="text-xl font-bold text-gray-900">Nome Restaurante</Text>

      <View className="flex-row items-center mt-1">
        <Star size={18} color="#FFA500" />
        <Text className="text-gray-700 ml-1">4.7 (57 avaliações)</Text>
      </View>

      <View className="mt-2">
  
        <View className="flex-row items-center mt-1">
          <Text className="text-gray-600">📜 Descrição</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <MapPin size={18} color="#FF5733" />
          <Text className="ml-2 text-gray-700">Endereço do Restaurante</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <Clock size={18} color="#28A745" />
          <Text className="ml-2 text-green-600">Aberto agora</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <CheckCircle size={18} color="#007BFF" />
          <Text className="ml-2 text-blue-600">Estive Aqui</Text>
        </View>
      </View>
    </View>
  );


};
export default RestaurantInformation;