import Header from '@/src/components/Header';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import { useCreateUser } from '@/src/hooks/useUserApi';
import {
  CarouselItem,
  mapCheckinToCarouselItem,
  mapReviewToCarouselItem,
} from '@/src/utils/carouselMappers';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function UserProfile() {
  const {
    getUserById,
    loading: userApiLoading,
    error,
    data: userData,
  } = useCreateUser();
  const [visitedRestaurants, setVisitedRestaurants] = useState<CarouselItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const { userId } = useLocalSearchParams();
  const { user } = useAuthContext();

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;

      const id = typeof userId === 'string' ? userId : user.id;
      getUserById(id).catch((err) => {
        console.error('Erro ao buscar dados do usuário:', err);
      });
    }, [userId, user?.id]),
  );

  useEffect(() => {
    if (userData) {
      setVisited();
      setLoading(false); 
    }
  }, [userData]);

  useEffect(() => {
    if (userData && visitedRestaurants.length >= 0) {
      setIsSelected();
    }
  }, [visitedRestaurants, userData]);

  function setVisited() {
    if (!userData) {
      setVisitedRestaurants([]);
      return;
    }

    const visitedFromReviews: CarouselItem[] =
      userData.reviews?.map(mapReviewToCarouselItem) ?? [];
    const visitedFromCheckins: CarouselItem[] =
      userData.checkinsWithoutReview?.map(mapCheckinToCarouselItem) ?? [];

    const combinedVisited = [...visitedFromReviews, ...visitedFromCheckins];
    setVisitedRestaurants(combinedVisited);
  }

  function setIsSelected() {
    if (!userData || !userData.savedRestaurants) return;

    visitedRestaurants.forEach((restaurant) => {
      if (restaurant) {
        const isSaved = userData.savedRestaurants!.some(
          (saved) => saved.restaurantId === restaurant.id,
        );
        restaurant.isSaved = isSaved;
      }
    });
  }

  if (userApiLoading || loading || !userData) {
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
          onError={(message) => Alert.alert('Erro', message)}
        />
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
