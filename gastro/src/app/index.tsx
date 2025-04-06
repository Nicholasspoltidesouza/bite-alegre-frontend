import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  TextInputExample: undefined;
  RestaurantProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TextInputExample'>;

const TextInputExample: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToRestaurantProfile = () => {
    navigation.navigate('RestaurantProfile');
  };

  return (
    <Text>Ola</Text>
  );
};


const styles = StyleSheet.create({
  customInput: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default TextInputExample;