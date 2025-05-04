import React, { useEffect } from 'react';
import { View, StyleSheet,TouchableOpacity, ScrollView, Image,Text, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import Header from '@/src/components/Header';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import SearchInput from '@/src/components/SearchInput';
import { router } from 'expo-router';
import useLocation from '@/src/hooks/useLocation';
import { useFeedApi } from '@/src/hooks/useFeedApi';
import { RestaurantDTO } from '@/src/@types/DTO';

export default function Feed() {
  const mockRestaurants: RestaurantDTO[] = [
    {
      id: '1',
      profilePhoto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60',
      address: '123 Rua das Flores, São Paulo, SP',
      name: 'Sabor Brasileiro',
      description: 'Comida típica brasileira com um toque caseiro.',
      email: 'contato@saborbrasileiro.com',
      password: 'hashed_password_1',
      averagePrice: 45.00,
      averageScore: 4.5,
      phone: '',
      userType: '',
      stars: 5,
    },
    {
      id: '2',
      profilePhoto: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
      address: '456 Avenida Paulista, São Paulo, SP',
      name: 'Sushi Zen',
      description: '',
      email: 'contato@sushizen.com',
      password: 'hashed_password_2',
      averagePrice: 80.00,
      averageScore: 4.8,
      phone: '',
      userType: '',
      stars: 5,
    },
    {
      id: '3',
      profilePhoto: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
      address: '789 Rua do Café, Campinas, SP',
      name: 'Café & Cia',
      description: '',
      email: '',
      password: '',
      averagePrice: 30.00,
      averageScore: 4.2,
      phone: '',
      userType: '',
      stars: 4,
    },
    {
      id: '4',
      profilePhoto: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
      address: '',
      name: 'Pizzaria Napoli',
      description: '',
      email: '',
      password: '',
      averagePrice: 60.00,
      averageScore: 4.6,
      phone: '',
      userType: '',
      stars: 5,
    },
    {
      id: '5',
      profilePhoto: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
      address: '654 Rua Gourmet, Belo Horizonte, MG',
      name: 'Veggie Delícia',
      description: '',
      email: '',
      password: '',
      averagePrice: 50.00,
      averageScore: 4.4,
      phone: '',
      userType: '',
      stars: 4,
    },
  ];

  const { latitude, longitude } = useLocation();
  const { getFeed, data: loading, error } = useFeedApi();

  // useEffect(() => {
  //   getFeed("user-1", latitude, longitude, 15);
  // }, []);

  if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#FF914B" style={{ marginTop: 50 }} />
        </SafeAreaView>
      );
    }
  
    if (error) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>{error}</Text>
        </SafeAreaView>
      );
    }

    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
          <Header name={'Isabella'} nickName={''} />
            <View style={{ marginHorizontal: '3%' }}>              
              <Pressable  onPress={() => router.push({ pathname: "/screens/Search" })}>
                <SearchInput   
                  value={''}
                  editable={false}
                  onChangeText={() => {}}/>
              </Pressable >
            </View>

          {/*Banner*/}
          <View style={[styles.rouletteCardContainer]}>
            <TouchableOpacity onPress={() => console.log('Card pressionado')}>
              <Image
                source={require('@/assets/images/card-roulette.png')}
                style={styles.rouletteCard}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>Restaurantes perto de você</Text>
          <UserCarouselRestaurant variant="closeToYou" restaurantsExternal={mockRestaurants} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1E6',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 50
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.orange.orangeBold,
    fontFamily: 'Poppins-Medium',
    height: 50
  },
  iconButton: {
    marginLeft: -50,
  },
  rouletteCardContainer: {
    marginTop: 20,
    marginHorizontal: '3%'
  },
  rouletteCard: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 10,
  },  
  title: {
    fontFamily:'Poppins-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
