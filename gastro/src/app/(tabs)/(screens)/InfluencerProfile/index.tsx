import { CheckinDTO, PublicationDTO, RestaurantDTO, ReviewDTO, UserDTO } from '@/src/@types/DTO';
import CheckinSection from '@/src/components/CheckinSection';
import Header from '@/src/components/Header';
import InfluencerPageSession from '@/src/components/InfluencerPageSession';
import { Publications } from '@/src/components/Publications';
import { CardReview } from '@/src/components/ReviewCard';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import { usePublicationApi } from '@/src/hooks/usePublicationApi';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { CarouselItem, mapCheckinToCarouselItem, mapReviewToCarouselItem } from '@/src/utils/carouselMappers';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


export default function InfluencerProfile() {
  const { getUserById, loading, error, data: userData } = useCreateUser();
  const { getPublicationByUserId, loading: loadingPublication, error: errorPublication } = usePublicationApi();
  const { user } = useAuthContext();
  const [sameUser, setSameUser] = useState(false);
  const [userData, setUserData] = useState<UserDTO>();
  const [userDataPublication, setUserDataPublication] = useState<PublicationDTO[] | null>([]);
  const { userId } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<
    'grid' | 'reviews' | 'checkins' | 'user'
  >('grid');
  const [visitedRestaurants, setVisitedRestaurants] = useState<CarouselItem[]>([],);

  const handleAddPress = () => router.push({ pathname: '/AddMedia' });

  const filterAddPress = () => {
    const id = typeof userId === 'string' ? userId : user?.id;
    if (id) {
      router.push({
        pathname: '/FilterPostScreen',
        params: { userId: id },
      });
    } else {
      console.error('❌ Não foi possível navegar: userId inválido.');
    }
  };


  useEffect(() => {
    const id = typeof userId === 'string' ? userId : user!.id;
    setSameUser(id === user!.id);
    getUserById(id.toString()).then((data) => {
      console.log('Dados do usuário:', data);
      if (data) {
        setUserData(data);
      }
    });
    getPublicationByUserId(id.toString()).then((data) => {
      if (data) {
        console.log('Publicações do usuário:', data);
        setUserDataPublication(data);
      }
    });
  }, [userId]);

  useEffect(() => {
    if (userData) {
      setVisited();
    }
  }, [userData]);

  function setVisited() {
    console.log('userData', userData);
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

  if (loading || loadingPublication) {
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
  if (error || errorPublication) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>
          'Erro ao carregar os dados do usuário.'</Text>
      </SafeAreaView>
    );
  }

  function renderComponent() {
    if (!userData) return null;
    switch (selectedTab) {
      case 'grid':
        if (!userDataPublication) {
          return (
            <View style={{ marginTop: 20 }}>
              <Text style={{ textAlign: 'center' }}>
                Nenhuma publicação encontrada.
              </Text>
            </View>
          );
        }
        return (
          <Publications images={userDataPublication!} />
        );
      case 'reviews':        
        return <CardReview reviews={userData!.reviews!} />;
      case 'checkins':
        return (
          <CheckinSection checkins={userData!.checkinsWithoutReview!} />
        );
      case 'user':
        return (
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Visitados</Text>
              <TouchableOpacity>
                <Text style={styles.mostrarMais}>Mostrar mais</Text>
              </TouchableOpacity>
            </View>

            <UserCarouselRestaurant
              variant={'visited'}
              carouselProfileRestaurant={true}
              items={visitedRestaurants}
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
            />
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <Header
        isProfile={true}
        name={userData?.name!}
        nickName={userData?.nickname!}
        userView={!sameUser}
      />

      <InfluencerPageSession
        userView={!sameUser}
        onTabSelect={setSelectedTab}
        selectedTab={selectedTab}
      />
      {renderComponent()}
      {selectedTab === 'grid' && sameUser && (
        <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
          <AntDesign name="plus" size={28} color="white" />
        </TouchableOpacity>
      )}

      {selectedTab === 'grid' && !sameUser && (
        <TouchableOpacity style={styles.fab} onPress={filterAddPress}>
          <Ionicons name="options" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.orange.orangeStandard,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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