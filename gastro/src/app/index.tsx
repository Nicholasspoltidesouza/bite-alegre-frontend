import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { useAuthApi } from '../hooks/useAuthApi';
import { UserDTO } from '../@types/DTO';

const App: React.FC = () => {
  const { login } = useAuthApi();
  function handle() {
    const user = {
      email: 'user1@bite.io',
      password: 'user1',
    } as UserDTO;
    login(user);
  }

  return (
    <View style={styles.container}>
      <Header name={'Manu'} nickName={'manu'} />
      <View style={styles.buttons}>
        <Button
          title="Profile"
          onPress={() => router.push({ pathname: '/screens/Profile' })}
          type={'orange'}
        />
        <Button
          title="Perfil Restaurante"
          onPress={() =>
            router.push({ pathname: '/screens/restaurantProfile' })
          }
          type={'orange'}
        />
        <Button
          title="Cadastro Usuário"
          onPress={() => router.push({ pathname: '/screens/SignupUser' })}
          type={'orange'}
        />
        <Button
          title="Cadastro Restaurante"
          onPress={() => router.push({ pathname: '/screens/SignupRestaurant' })}
          type={'orange'}
        />
        <Button
          title="Feed"
          onPress={() => router.push({ pathname: '/screens/Feed' })}
          type={'orange'}
        />
        <Button
          title="Adicionar Mídia"
          onPress={() => router.push({ pathname: '/screens/AddMedia' })}
          type={'orange'}
        />
        <Button title="Login" onPress={() => handle()} type={'orange'} />
      </View>
    </View>
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
