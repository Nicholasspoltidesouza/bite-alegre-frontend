import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import InfluencerPageSession from '@/src/components/InfluencerPageSession';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthContext } from '@/src/contexts/authContext';
import { Publications } from '@/src/components/Publications';
import {PublicationDTO, ReviewDTO } from '@/src/@types/DTO';
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckinSection from '@/src/components/CheckinSection';
import { CardReview } from '@/src/components/ReviewCard';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { usePublicationApi } from '@/src/hooks/usePublicationApi';


export default function InfluencerProfile() {
  const { getUserById, loading, error, data: userData } = useCreateUser();
  const { getPublicationbyUserId, loading : loadingPublication, error : errorPublication} = usePublicationApi();
  const { user } = useAuthContext();
  const [sameUser, setSameUser] = useState(false);
  const [userDataPublication, setUserDataPublication] = useState<PublicationDTO[]>([]);
  const { userId } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<
    'grid' | 'reviews' | 'checkins' | 'user'
  >('grid');


  const {} = useCreateUser();
  const handleAddPress = () => router.push({ pathname: '/screens/AddMedia' });
  const filterAddPress = () => router.push({ pathname: '/screens/AddMedia' });

  useEffect(() => {
    //user-1 vai ser user!.id que vem do AuthContext
    setSameUser(userId === 'user-2');
    getUserById(userId.toString());
    getPublicationbyUserId(userId.toString()).then((data) => {
      if (data) {
        setUserDataPublication(data);
      }
    });
  }, [userId]);

  if (loading || loadingPublication ) {
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
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  function renderComponent() {
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
          <ScrollView>
            <Publications images={userDataPublication!} />
          </ScrollView>
        );
      case 'reviews':
        return <CardReview reviews={userData!.reviews!} />;
      case 'checkins':
        return (
          <View>
            <CheckinSection checkins={userData!.checkinsWithoutReview!} />;
          </View>
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
              restaurantsExternal={[]}
            />

            <View style={styles.titleRow}>
              <Text style={styles.title}>Salvos</Text>
              <TouchableOpacity>
                <Text style={styles.mostrarMais}>Mostrar mais</Text>
              </TouchableOpacity>
            </View>
            <UserCarouselRestaurant
              variant={'saved'}
              restaurantsExternal={[]}
            />
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          isProfile={true}
          name={'Manu'}
          nickName={'manu'}
          userView={!sameUser}
        />

        <InfluencerPageSession
          userView={!sameUser}
          onTabSelect={setSelectedTab}
          selectedTab={selectedTab}
        />
        {renderComponent()}
      </ScrollView>

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