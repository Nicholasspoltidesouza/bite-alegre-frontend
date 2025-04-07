import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import { router } from 'expo-router';

const TextInputExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button title="Perfil Restaurante" onPress={() => router.push({pathname: '/screens/restaurantProfile'})} type={'orange'} />
    </View>
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