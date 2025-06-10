import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Adicionar imports do React Native
import { ChevronLeft } from 'lucide-react-native'; // Corrigido import
import { useRouter, useLocalSearchParams } from 'expo-router'; // Corrigido import
import UserIconPlaceholder from '../../../../components/UserIconPlaceholder';
import StarRating from '../../../../components/StarRating';
import RatingBars from '../../../../components/RatingBars';
import ReviewItem from '../../../../components/ReviewItem';
import { RestaurantDTO } from '../../../../@types/DTO'; // Ajuste o caminho se necessário

// Interface para os dados de review que a UI espera
// (Conforme discutido, esta estrutura é o que se espera receber via params)
interface UIDisplayReview {
  id?: string | number;
  userName: string; // Nome do usuário, conforme enviado por restaurantProfile
  stars: number;    // Avaliação em estrelas, para RatingBars e ReviewItem
  reviewDate: string; // Data da avaliação, conforme enviado por restaurantProfile
  feedback?: string;  // Comentário, opcional
  // userProfilePhoto?: string; // Opcional: se for exibir a foto do usuário
}

const RestaurantReviewsScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  let currentRestaurant: RestaurantDTO | undefined;
  let currentReviews: UIDisplayReview[] = []; // Espera a estrutura UIDisplayReview

  try {
    if (typeof params.restaurant === 'string') {
      currentRestaurant = JSON.parse(params.restaurant) as RestaurantDTO;
    }
    if (typeof params.reviews === 'string') {
      currentReviews = JSON.parse(params.reviews) as UIDisplayReview[];
    }
  } catch (error) {
    console.error("Erro ao parsear parâmetros da rota para RestaurantReviewsScreen:", error);
    // Implementar tratamento de erro mais robusto ou redirecionamento se o parsing falhar
  }

  // Fallback se os dados não forem carregados/parseados com sucesso
  if (!currentRestaurant) {
    currentRestaurant = {
      name: "Restaurante não encontrado",
      averageScore: 0,
      // Preencher outros campos obrigatórios de RestaurantDTO com valores padrão
      address: "",
      cnpj: "",
      description: "Informações não disponíveis.",
      email: "",
      password: "", // Não deve estar no DTO para exibição
      averagePrice: 0, // Certifique-se que averagePrice existe no RestaurantDTO ou ajuste
      phone: "",
      userType: "restaurant",
      id: "fallback-restaurant-id" // Garanta que o DTO tenha um campo id ou o torne opcional
    };
  }

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Navegação de fallback se não houver histórico (ex: deep link)
      router.push({ pathname: '/' }); // Ajuste para sua rota principal/home
    }
  };
 
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeft
          size={24}
          color={styles.headerIcon.color}
          style={styles.headerIcon}
          onPress={handleGoBack}
        />
        <Text style={styles.headerTitle}>
          {currentRestaurant.name}
        </Text>
        <UserIconPlaceholder />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {/* Rating Summary */}
        <View style={styles.ratingSummaryContainer}>
          <View style={styles.ratingSummaryContent}>
            {/* Overall Rating */}
            <View style={styles.overallRating}>
              <Text style={styles.averageScoreText}>
                {currentRestaurant.averageScore != null ? currentRestaurant.averageScore.toFixed(1) : 'N/A'}
              </Text>
              <View style={styles.starRatingWrapper}>
                <StarRating rating={currentRestaurant.averageScore != null ? Math.floor(currentRestaurant.averageScore) : 0} />
              </View>
              <Text style={styles.reviewsCountText}>
                {currentReviews.length} avaliações
              </Text>
            </View>

            {/* Rating Distribution */}
            {currentReviews && currentReviews.length > 0 ? (
              <RatingBars reviews={currentReviews} />
            ) : (
              <View style={styles.noDistributionContainer}>
                <Text style={styles.noDistributionText}>Sem dados de distribuição.</Text>
              </View>
            )}
          </View>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsListContainer}>
          {currentReviews && currentReviews.length > 0 ? (
            currentReviews.map((displayReview) => (
              <ReviewItem
                key={displayReview.id || `${displayReview.userName}-${displayReview.stars}`}
                review={{
                  user: displayReview.userName,
                  rating: displayReview.stars,
                  timeAgo: displayReview.reviewDate,
                  comment: displayReview.feedback || '',
                }}
              />
            ))
          ) : (
            <View style={styles.noReviewsContainer}>
              <Text style={styles.noReviewsText}>Este restaurante ainda não possui avaliações.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation (Placeholder - assumindo que este é um elemento fixo ou tratado pelo layout) */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          {/* Ícones de placeholder - substitua pelos itens de navegação reais */}
          <View style={styles.navIconPlaceholder} />
          <View style={styles.navIconPlaceholder} />
          <View style={styles.navIconPlaceholder} />
          <View style={styles.navIconPlaceholder} />
          <View style={styles.navIconPlaceholder} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // bg-gray-50
  },
  header: {
    backgroundColor: 'white', // bg-white
    paddingHorizontal: 16,    // px-4
    paddingVertical: 12,      // py-3
    flexDirection: 'row',     // flex
    alignItems: 'center',     // items-center
    shadowColor: '#000',      // shadow-sm (aproximado)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,             // Para Android
  },
  headerIcon: {
    marginRight: 12,          // mr-3
    color: '#4B5563',         // text-gray-600
  },
  headerTitle: {
    fontSize: 18,             // text-lg
    fontWeight: '600',        // font-semibold
    color: '#1F2937',         // text-gray-800
    flex: 1,                  // flex-1
  },
  scrollContentContainer: {
    paddingBottom: 80, // Para dar espaço para o bottomNav se for fixo
  },
  ratingSummaryContainer: {
    backgroundColor: 'white', // bg-white
    padding: 16,              // p-4
    marginHorizontal: 16,     // mx-4
    marginTop: 16,            // mt-4
    borderRadius: 8,          // rounded-lg
    shadowColor: '#000',      // shadow-sm (aproximado)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingSummaryContent: {
    flexDirection: 'row',     // flex
    alignItems: 'flex-start', // items-start
    gap: 16,                  // gap-4
  },
  overallRating: {
    flexDirection: 'column',  // flex flex-col
    alignItems: 'center',     // items-center
  },
  averageScoreText: {
    fontSize: 28,             // text-3xl (aproximado)
    fontWeight: 'bold',       // font-bold
    color: '#1F2937',         // text-gray-800
  },
  starRatingWrapper: {
    flexDirection: 'row',     // flex
    marginBottom: 4,          // mb-1
  },
  reviewsCountText: {
    fontSize: 14,             // text-sm
    color: '#6B7280',         // text-gray-500
  },
  noDistributionContainer: {
    flex: 1,                  // flex-1
  },
  noDistributionText: {
    fontSize: 14,             // text-sm
    color: '#6B7280',         // text-gray-500
  },
  reviewsListContainer: {
    paddingHorizontal: 16,    // px-4
    // space-y-4 é geralmente aplicado pelo marginBottom no ReviewItem
    paddingBottom: 20,        // pb-20
  },
  noReviewsContainer: {
    backgroundColor: 'white', // bg-white
    padding: 16,              // p-4
    borderRadius: 8,          // rounded-lg
    shadowColor: '#000',      // shadow-sm (aproximado)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',     // text-center (para o conteúdo)
    marginTop: 16,            // Para simular o space-y se for o único item
  },
  noReviewsText: {
    color: '#4B5563',         // text-gray-600
  },
  bottomNav: {
    // position: 'absolute', // Descomente se quiser fixo no rodapé
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'white', // bg-white
    borderTopWidth: 1,        // border-t
    borderTopColor: '#E5E7EB',// border-gray-200
    paddingHorizontal: 16,    // px-4
    paddingVertical: 8,       // py-2 (aproximado)
  },
  bottomNavContent: {
    flexDirection: 'row',     // flex
    justifyContent: 'space-around', // justify-around
    alignItems: 'center',     // items-center
  },
  navIconPlaceholder: {       // Estilo para os placeholders dos ícones
    width: 24,                // w-6
    height: 24,               // h-6
    backgroundColor: '#CBD5E1', // Cor de placeholder
    borderRadius: 4,          // rounded (exemplo)
    margin: 8,                // p-2 (aproximado)
  },
});

export default RestaurantReviewsScreen;