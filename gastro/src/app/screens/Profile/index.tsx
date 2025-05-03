import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { CheckinDTO, RestaurantDTO, ReviewDTO } from '@/src/@types/DTO';

export default function Profile() {
  const { getUserById, loading, error, data: userData } = useCreateUser();
  const [visitedRestaurants, setVisitedRestaurants] = useState<RestaurantDTO[]>([]);

  useEffect(() => {
    getUserById("user-1");
  }, []);
  
  useEffect(() => {
    if (userData) {
      console.log(userData)
      setVisited();
    }
  }, [userData]);

  function setVisited() {
    const visitedFromReviews: RestaurantDTO[] = userData!.reviews?.map(mapRestaurantToReview) ?? [];
    const visitedFromCheckins: RestaurantDTO[] = userData!.checkinsWithoutReview?.map(mapCheckinToRestaurant) ?? [];

    const combinedVisited = [...visitedFromReviews, ...visitedFromCheckins];
    console.log('combinado', combinedVisited)

    const uniqueVisited = Array.from(new Map(
      combinedVisited.map(item => [item.id, item])
    ).values());

    if (uniqueVisited.length > 0) {
      setVisitedRestaurants(uniqueVisited);
      console.log('visitados', uniqueVisited)
    }    
  }

  function mapCheckinToRestaurant(checkin: CheckinDTO): RestaurantDTO {
    return {
      id: checkin.restaurant_id ?? "",
      profilePhoto: checkin.restaurantProfilePhoto,
      address: '',
      name: checkin.restaurantName,
      description: '',
      email: '',
      password: '',
      averagePrice: 0,
      phone: '',
      userType: ''
    };
  }

  function mapRestaurantToReview(review: ReviewDTO): RestaurantDTO {
    console.log('REVIEW', review)
    return {
      id: review.restaurant_id ?? "",
      stars: review.stars ?? 0,
      profilePhoto: review.restaurantProfilePhoto,     
      address: '',
      name: review.restaurantName,
      description: '',
      email: '',
      password: '',
      averagePrice: 0,
      phone: '',
      userType: ''
    };
  }

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
      <View style={styles.container}>
    <ScrollView>
      
      <Header isProfile={true} name={userData?.name ?? '-'} nickName={userData?.nickname ?? '-' } />       

      <View style={styles.titleRow}>
        <Text style={styles.title}>Visitados</Text>
        <TouchableOpacity>
          <Text style={styles.mostrarMais}>Mostrar mais</Text>
        </TouchableOpacity>            
      </View>          

        <UserCarouselRestaurant variant={'visited'} carouselProfileRestaurant={true} restaurantsExternal={visitedRestaurants ?? []}/>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Salvos</Text>
          <TouchableOpacity>
            <Text style={styles.mostrarMais}>Mostrar mais</Text>
          </TouchableOpacity>
        </View>
        <UserCarouselRestaurant variant={'visited'} restaurantsExternal={[]}/>


    </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    
  },
  titleRow: {
    marginTop: 24,
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
  },
  mostrarMais: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.orange.orangeStandard,
  },
});