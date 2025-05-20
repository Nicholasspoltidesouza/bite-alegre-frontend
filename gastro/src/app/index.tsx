import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { useAuthApi } from '../hooks/useAuthApi';
import { ReviewDTO, UserDTO } from '../@types/DTO';
import { CardReview } from '../components/ReviewCard';

const App: React.FC = () => {
  const { login } = useAuthApi();
  const review = {
    stars: 4,
    feedback: "sdaksjhdjkashdkasjdhjkashdkjashdkjahskdjhask dhaskjdhkajshdkjas ajshdkasjhdjashkdjha jahdskjdhaksjdhka askjdhaksjdhaksjd",
    restaurantName: "Pedrinho Lanches",
    restaurantProfilePhoto:""
  } as ReviewDTO


  function handle() {
    const user = {
      email: 'user1@bite.io',
      password: 'user1'
    } as UserDTO
    login(user);
  }

  return (
    <View style={styles.container}>
      <Header name={'Manu'} nickName={'manu'} />
      <CardReview review={review}/>
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
