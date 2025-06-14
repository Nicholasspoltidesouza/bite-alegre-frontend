import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RestaurantDTO, ReviewDTO } from '../../../../@types/DTO';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import RatingSummaryCard from '../../../../components/RatingSummaryCard';
import ReviewItem from '../../../../components/ReviewItem';

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
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('FALHA')
      console.error("Erro ao parsear parâmetros da rota para RestaurantReviewsScreen:", error);
    }    
  }, [params.restaurant]);
  
  if (loading || !currentRestaurant) {
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
  
  const calculateRatingDistribution = (reviews?: ReviewDTO[]): number[] => {
    if (!reviews || reviews.length === 0) {
      return [0, 0, 0, 0, 0]; 
    }

    const starCounts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      const rating = Math.round(review.stars);
      if (rating >= 1 && rating <= 5) {
        starCounts[5 - rating]++;
      }
    });

    const totalReviews = reviews.length;
    return starCounts.map(count => (count / totalReviews) * 100);
  };
 
  return (
    <SafeAreaView style={styles.container}>
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
              style={{ width: 75, height: 75, borderRadius: 50 }} 
              onError={(error) => console.error('Erro ao carregar imagem:', error)}
            />
          ) : (
            <MaterialIcons name="person" size={60} color="#fcd5b5" />
          )}
        </View>
      </View>

      <RatingSummaryCard
        score={currentRestaurant.averageScore ?? 0}
        reviewCount={currentRestaurant.reviews?.length ?? 0}
        distribution={calculateRatingDistribution(currentRestaurant.reviews)}
      />

      <FlatList
        data={currentRestaurant.reviews || []}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Esse restaurante ainda não possui avaliações.</Text>
        }
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '10%',
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  }, 
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: '5%',
  },
  backButton: {
    position: 'absolute',
    marginLeft: '5%',
    top: '5%',
    zIndex: 10,
  },
  photo: {
    backgroundColor: Colors.orange.orangeMedium,
    borderRadius: 50,
    height: 75,
    width: 75,
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.text.black,
  },
});

export default RestaurantReviewsScreen;