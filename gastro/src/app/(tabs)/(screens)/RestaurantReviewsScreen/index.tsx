
 import React from 'react';
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
  id?: string | number;    // Pode vir de ReviewDTO['id'] ou ser gerado
  userName: string;        // Nome do usuário para exibição (assumido como pré-processado)
  stars: number;           // Avaliação em estrelas (de ReviewDTO.stars)
  timeAgo: string;         // "Há X horas/dias" (assumido como pré-processado)
  feedback?: string;      // Comentário (de ReviewDTO.feedback)
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
      // Para React Native, use <ScrollView> ou <View> com estilização apropriada.
      // Se usar NativeWind, className funcionará nesses componentes.
 <div className="min-h-screen bg-gray-50"> {/* Use View ou ScrollView em React Native */}
       {/* Header */}
       <div className="bg-white px-4 py-3 flex items-center shadow-sm">
         <ChevronLeft
            size={24}
            color="#4B5563" // Equivalente a text-gray-600
            style={{ marginRight: 12 }} // Tailwind mr-3
            onPress={handleGoBack}
          />
          {/* Para RN: <Text className="text-lg font-semibold text-gray-800 flex-1">{currentRestaurant.name}</Text> */} {/* Use Text em React Native */}
         <h1 className="text-lg font-semibold text-gray-800 flex-1">
            {currentRestaurant.name}
          </h1>
         <UserIconPlaceholder />
       </div>
 
       {/* Rating Summary */}
       <div className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
         <div className="flex items-start gap-4">
           {/* Overall Rating */}
           <div className="flex flex-col items-center">
             {/* Para RN: <Text className="text-3xl font-bold text-gray-800">...</Text> */}
             <div className="text-3xl font-bold text-gray-800"> {/* Use Text em React Native */}
                {currentRestaurant.averageScore != null ? currentRestaurant.averageScore.toFixed(1) : 'N/A'}
              </div>
             <div className="flex mb-1">
               <StarRating rating={currentRestaurant.averageScore != null ? Math.floor(currentRestaurant.averageScore) : 0} /> {/* Use o componente StarRating */}
             </div>
             {/* Para RN: <Text className="text-sm text-gray-500">...</Text> */}
             <div className="text-sm text-gray-500">
                {currentReviews.length} avaliações
              </div>
           </div>
 
           {/* Rating Distribution */}
           {currentReviews && currentReviews.length > 0 ? (
             <RatingBars reviews={currentReviews} /> // RatingBars espera { stars: number }[]
           ) : (
             // Para RN: <View className="flex-1"><Text className="text-sm text-gray-500">Sem dados de distribuição.</Text></View>
             <div className="flex-1"><p className="text-sm text-gray-500">Sem dados de distribuição.</p></div> /* Use View e Text em React Native */
           )}
         </div>
       </div>
 
       {/* Reviews List */}
       <div className="px-4 space-y-4 pb-20"> {/* Adicionado padding-bottom para visibilidade da rolagem */}
         {currentReviews && currentReviews.length > 0 ? (
           currentReviews.map((review) => (
            // Garanta que review.id seja único e presente, ou use outro identificador único.
            // Se review.id puder ser indefinido, forneça um fallback ou garanta que esteja sempre definido.
             <ReviewItem key={review.id || review.userName + review.stars} review={review} />
           ))
         ) : (
           // Para RN: <View className="bg-white p-4 rounded-lg shadow-sm text-center"><Text className="text-gray-600">...</Text></View> {/* Use View e Text em React Native */}
           <div className="bg-white p-4 rounded-lg shadow-sm text-center">
             <p className="text-gray-600">Este restaurante ainda não possui avaliações.</p>
           </div>
         )}
 </div>
 
       {/* Bottom Navigation (Placeholder - assumindo que este é um elemento fixo ou tratado pelo layout) */}
       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2"> {/* Use View em React Native */}
         <div className="flex justify-around items-center">
           {/* Ícones de placeholder - substitua pelos itens de navegação reais */}
           <div className="p-2"><div className="w-6 h-6 bg-orange-400 rounded"></div></div>
           <div className="p-2"><div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div></div>
           <div className="p-2"><div className="w-8 h-8 bg-teal-400 rounded-full"></div></div>
           <div className="p-2"><div className="w-6 h-6 bg-orange-300 rounded-full"></div></div>
           <div className="p-2"><div className="w-6 h-6 bg-orange-300 rounded-full"></div></div>
         </div>
       </div>

      {/* Padding para navegação inferior - não necessário se usar ScrollView e navegação inferior fixa */}
      {/* <div className="h-16"></div> */}
    </div>
 );
};

export default RestaurantReviewsScreen;
