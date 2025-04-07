import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import { router } from 'expo-router';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button title="Perfil Restaurante" onPress={() => router.push({pathname: '/screens/restaurantProfile'})} type={'orange'} />
      <Button title="Cadastro Usuário" onPress={() => router.push({pathname: '/screens/SignupScreen'})} type={'orange'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
