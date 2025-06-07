import Header from '@/src/components/Header';
import SearchInput from '@/src/components/SearchInput';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import { useFeedApi } from '@/src/hooks/useFeedApi';
import useLocation from '@/src/hooks/useLocation';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { CarouselItem, mapRestaurantToCarouselItem } from '@/src/utils/carouselMappers';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Feed() {
  const { latitude, longitude, loadingLocation } = useLocation();
  const { getFeed, data: restaurantData, loading, error } = useFeedApi();
  const { getUserById, data: userData } = useCreateUser();
  const { user } = useAuthContext();
  const [carouselItem, setCasouselItem] = useState<CarouselItem[]>([]);

  useEffect(() => {
    getUserById(user!.id);
  }, [user]);

  useEffect(() => {
    if (latitude && longitude) {
      getFeed(latitude, longitude);
      if (restaurantData) {
        setCasouselItem(restaurantData.map(mapRestaurantToCarouselItem))
      }
    }
  }, [latitude, longitude]);

  if (loading || loadingLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors.orange.orangeStandard}
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          name={userData?.name ?? ' - '}
          nickName={userData?.nickname ?? ' - '}
        />
        <View style={{ marginHorizontal: '3%' }}>
          <Pressable
            onPress={() => router.push({ pathname: '/Search' })}
          >
            <SearchInput value={''} editable={false} onChangeText={() => { }} />
          </Pressable>
        </View>

        {/*Banner*/}
        <View style={[styles.rouletteCardContainer]}>
          <TouchableOpacity onPress={() => router.push('/Roulette')}>
            <Image
              source={require('@/assets/images/card-roulette.png')}
              style={styles.rouletteCard}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Restaurantes perto de você</Text>
        <UserCarouselRestaurant
          variant="closeToYou"
          items={carouselItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.orange.orangeBold,
    fontFamily: 'Poppins-Medium',
    height: 50,
  },
  iconButton: {
    marginLeft: -50,
  },
  rouletteCardContainer: {
    marginTop: 20,
    marginHorizontal: '3%',
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
    fontFamily: 'Poppins-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
    marginTop: 20,
    paddingHorizontal: '3%',
  },
});
