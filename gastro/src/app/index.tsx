import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';

const App: React.FC = () => {

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.buttons}>
        <Button title="Feed" onPress={() => router.push({ pathname: '/screens/Profile' })} type={'orange'} />
        <Button title="Perfil Restaurante" onPress={() => router.push({ pathname: '/screens/restaurantProfile' })} type={'orange'} />
        <Button title="Cadastro Usuário" onPress={() => router.push({ pathname: '/screens/SignupUser' })} type={'orange'} />
        <Button title="Cadastro Restaurante" onPress={() => router.push({ pathname: '/screens/SignupRestaurant' })} type={'orange'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    gap: 16,
  }
});

export default App;
