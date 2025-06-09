import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { useLocalSearchParams } from 'expo-router'; 
import { useAuthContext } from '@/src/contexts/authContext';
import { CarouselItem, mapCheckinToCarouselItem, mapReviewToCarouselItem } from '@/src/utils/carouselMappers';

export default function UserProfile() {
  const { getUserById, loading, error, data: userData } = useCreateUser();
  const [visitedRestaurants, setVisitedRestaurants] = useState<CarouselItem[]>(
    [],
  );
  const { userId } = useLocalSearchParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const id = typeof userId === 'string' ? userId : user!.id;
    getUserById(id);
  }, [userId]);

  useEffect(() => {
    if (userData) {
      setVisited();
    }
  }, [userData]);

  function setVisited() {
    const visitedFromReviews: CarouselItem[] =
      userData!.reviews?.map(mapReviewToCarouselItem) ?? [];
    const visitedFromCheckins: CarouselItem[] =
      userData!.checkinsWithoutReview?.map(mapCheckinToCarouselItem) ?? [];

    const combinedVisited = [...visitedFromReviews, ...visitedFromCheckins];   

    const uniqueVisited = Array.from(
      new Map(combinedVisited.map((item) => [item.id, item])).values(),
    );

    if (uniqueVisited.length > 0) {
      return setVisitedRestaurants(uniqueVisited);
    }
    setVisitedRestaurants([]);
  }

  if (loading) {
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
    <View style={styles.container}>
      <ScrollView>
        <Header
          isProfile={true}
          name={userData?.name ?? '-'}
          nickName={userData?.nickname ?? '-'}
          userView={false}
        />

        <View style={styles.titleRow}>
          <Text style={styles.title}>Visitados</Text>
          <TouchableOpacity>
            <Text style={styles.mostrarMais}>Mostrar mais</Text>
          </TouchableOpacity>
        </View>

        <UserCarouselRestaurant
          variant={'visited'}
          carouselProfileRestaurant={true}
          items={visitedRestaurants ?? []}
          onError={(message) => Alert.alert('Erro', message)}
        />

        <View style={styles.titleRow}>
          <Text style={styles.title}>Salvos</Text>
          <TouchableOpacity>
            <Text style={styles.mostrarMais}>Mostrar mais</Text>
          </TouchableOpacity>
        </View>
        <UserCarouselRestaurant 
          variant={'saved'} 
          items={[]}   
          onError={(message) => Alert.alert('Erro', message)} />
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
