import PhotoDish from '@/src/components/PhotoDish';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import React from 'react';
import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF914B', marginBottom: 10 }}>
      
      </Text>
      <UserCarouselRestaurant />
    </View>
  );
}