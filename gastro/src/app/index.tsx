import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import RestaurantProfilePatch from './screens/RestaurantProfilePatch';

const App: React.FC = () => {
  return (
    <RestaurantProfilePatch />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttons: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    gap: 16,
  },
});

export default App;