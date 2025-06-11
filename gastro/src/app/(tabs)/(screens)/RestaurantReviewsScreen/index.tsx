import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RestaurantDTO } from '../../../../@types/DTO';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

interface UIDisplayReview {
  id?: string | number;
  userName: string;
  stars: number; 
  reviewDate: string;
  feedback?: string;
}

const RestaurantReviewsScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentRestaurant, setCurrentRestaurant] = useState<RestaurantDTO>();

  useEffect(() => {
    try {
      if (typeof params.restaurant === 'string') {
        const parsedRestaurant = JSON.parse(params.restaurant) as RestaurantDTO;
        setCurrentRestaurant(parsedRestaurant);
        console.log('currentRestaurant:', parsedRestaurant);
        console.log('SUCESSO')
      }
      console.log('PHOTO', currentRestaurant?.profilePhoto);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('FALHA')
      console.error("Erro ao parsear parâmetros da rota para RestaurantReviewsScreen:", error);
    }    
  }, [params.restaurant]);
  
  if (loading || !currentRestaurant) {
    console.log(loading );
    if (!currentRestaurant) {
      console.log('currentRestaurant is undefined');
    }
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

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({ pathname: '/' });
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              router.back()
            }
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={35}
              color={Colors.orange.orangeStandard}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {currentRestaurant.name}
            </Text>
            <View style={styles.photo}>
            {currentRestaurant!.profilePhoto ? (
              <Image
                source={{ uri: currentRestaurant.profilePhoto }}
                style={{ width: 65, height: 65, borderRadius: 50 }} // Adicione largura e altura
                onError={(error) => console.error('Erro ao carregar imagem:', error)} // Log de erro
              />
            ) : (
              <MaterialIcons name="person" size={60} color="#fcd5b5" />
            )}
          </View>

          </View>

      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    alignItems: 'center',
  }, 
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    paddingRight: '5%',
  },
  backButton: {
    position: 'absolute',
    top: '20%',
    zIndex: 10,
  },
  photo: {
    backgroundColor: Colors.orange.orangeMedium,
    borderRadius: 50,
    height: 65,
    width: 65,
    alignItems: 'center',
    marginRight: '5%',
  },
});

export default RestaurantReviewsScreen;