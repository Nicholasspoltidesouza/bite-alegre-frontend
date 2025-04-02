import React from "react";
import { View, Text } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const RestaurantInformation = () => {
  return (
    <View className="p-4">
    
      <h1 className="text-xl font-bold text-gray-900">Nome Restaurante</h1>

      <View className="flex-row items-center mt-1">
        <Foundation name="star" size={24} color="#FF914B" />
        <Text className="text-gray-700 ml-1">4.7 (57 avaliações)</Text>
      </View>

      <View className="mt-2">
  
        <View className="flex-row items-center mt-1">
        <Ionicons name="document-text-outline" size={24} color="FF914B" />
          <Text className="text-gray-600">Descrição</Text>
        </View>


        <View className="flex-row items-center mt-1">
        <FontAwesome6 name="location-dot" size={24} color="FF914B" />
          <Text className="ml-2 text-gray-700">Endereço do Restaurante</Text>
        </View>

        <View className="flex-row items-center mt-1">
        <FontAwesome name="cutlery" size={24} color="FF914B" />
          <Text className="ml-2 text-green-600">Aberto agora</Text>
        </View>

        <View className="flex-row items-center mt-1">
        <MaterialCommunityIcons name="calendar-start" size={24} color="FF914B" />
          <Text className="ml-2 text-blue-600">Estive Aqui</Text>
        </View>
      </View>
    </View>
  );


};
export default RestaurantInformation;