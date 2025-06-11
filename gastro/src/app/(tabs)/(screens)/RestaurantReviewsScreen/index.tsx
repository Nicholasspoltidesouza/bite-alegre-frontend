import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RestaurantDTO, ReviewDTO } from '../../../../@types/DTO';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import RatingSummaryCard from '../../../../components/RatingSummaryCard'; // Importar o componente
import ReviewItem from '../../../../components/ReviewItem'; // Importar o componente de item de review

const RestaurantReviewsScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentRestaurant, setCurrentRestaurant] = useState<RestaurantDTO>();
  // Usar o tipo estendido para currentRestaurant se você espera dados de avaliação
  // const [currentRestaurant, setCurrentRestaurant] = useState<RestaurantWithReviewsDTO>();

  useEffect(() => {
    try {
      if (typeof params.restaurant === 'string') {
        const parsedRestaurant = JSON.parse(params.restaurant) as RestaurantDTO; // Usar o tipo estendido
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
  
  // Função para calcular a distribuição de avaliações para o RatingSummaryCard
  const calculateRatingDistribution = (reviews?: ReviewDTO[]): number[] => {
    if (!reviews || reviews.length === 0) {
      // Retorna a distribuição esperada pelo RatingSummaryCard (5 estrelas, 4, 3, 2, 1)
      return [0, 0, 0, 0, 0]; 
    }

    const starCounts = [0, 0, 0, 0, 0]; // Índice 0 para 5 estrelas, 1 para 4 estrelas, ..., 4 para 1 estrela
    reviews.forEach(review => {
      const rating = Math.round(review.stars); // Arredondar para garantir que seja um inteiro entre 1-5
      if (rating >= 1 && rating <= 5) {
        starCounts[5 - rating]++; // 5 estrelas -> índice 0, 1 estrela -> índice 4
      }
    });

    const totalReviews = reviews.length;
    return starCounts.map(count => (count / totalReviews) * 100);
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

        {/* Adicionar o RatingSummaryCard aqui */}
        <RatingSummaryCard
          score={currentRestaurant.averageScore ?? 0} // Use 0 como fallback se averageScore não estiver definido
          reviewCount={currentRestaurant.reviews?.length ?? 0} // Use 0 como fallback
          distribution={calculateRatingDistribution(currentRestaurant.reviews)}
        />

        {/* Lista de Reviews */}
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
            <Text style={styles.emptyListText}>Nenhuma avaliação ainda.</Text>
          }
          // Se esta FlatList estiver dentro de uma ScrollView e ambas rolarem verticalmente,
          // considere usar ListHeaderComponent na FlatList para o conteúdo acima dela,
          // ou desabilitar a rolagem da FlatList se a ScrollView principal deve controlar tudo.
        />
      </ScrollView>
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

  },
  listContent: {
    paddingVertical: 10, // Espaçamento vertical para a lista
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.text.black, // Usando uma cor do seu tema se disponível
  },
});

export default RestaurantReviewsScreen;