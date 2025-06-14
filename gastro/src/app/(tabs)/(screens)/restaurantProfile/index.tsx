import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Accordion from '@/src/components/Accordion';

import {
  FontAwesome,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import Button from '@/src/components/Button'; // Assuming Button is correctly imported
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { CheckinDTO, RestaurantDTO, OperatingHoursDto, ReviewDTO as OriginalReviewDTO } from '@/src/@types/DTO';
import { Weekday, mapFromWeekday } from '@/src/utils/weekdayUtils'; 
import Colors from '@/src/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import { CarouselItem, mapMenuItemToCarouselItem, mapPublicationToCarouselItem } from '@/src/utils/carouselMappers';
import { HeaderPerfilRestaurante } from '@/src/components/HeaderPerfilRestaurante';

const { width: screenWidth } = Dimensions.get('window');

// Interface para os dados de review que a RestaurantReviewsScreen espera
interface UIDisplayReview {
  id?: string | number;
  userName: string;
  stars: number;
  reviewDate: string; // Alterado de timeAgo para reviewDate
  feedback?: string;
}

// Ajuste esta interface para corresponder à sua ReviewDTO original, se necessário
interface ReviewDTO extends OriginalReviewDTO { // Use OriginalReviewDTO as base 
  // A re-declaração de 'id' como 'string | number' era incompatível com
  // OriginalReviewDTO.id (que é 'string | undefined' conforme o erro TypeScript).
  // Removendo a re-declaração de 'id', ele será herdado de OriginalReviewDTO.
  user?: { name?: string }; // Mantido, assumindo que é compatível ou uma adição intencional.
  created_at?: string; // Mantido, assumindo que é compatível ou uma adição intencional.
}

const RestaurantProfile: React.FC = () => {
  const {
    getRestaurantById,
    createCheckin,
    data: restaurant,
    loading,
    error,
  } = useRestaurantApi();
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh ]= useState(0);
  const [isProfile, setIsProfile] = useState(false);
  const [publications, setPublications] = useState<CarouselItem[]>([]);
  const [menu, setMenu] = useState<CarouselItem[]>([]);
  const params = useLocalSearchParams<{ restaurantId: string }>();
  
  const currentRestaurantId = params.restaurantId;
  const { user } = useAuthContext();

  useFocusEffect(
  useCallback(() => {
    const id = currentRestaurantId !== null ? currentRestaurantId : user!.id;
    getRestaurantById(id).then((restaurantData) => {
      setPublications(restaurantData.publications!.map(mapPublicationToCarouselItem));
      setMenu(restaurantData.menuItems!.map(mapMenuItemToCarouselItem));
    });
    setIsProfile(user?.id === id)
  }, [currentRestaurantId, refresh])
);

  // Função para formatar a data da avaliação (DD/MM/YYYY)
  const formatReviewDate = (dataISO?: string): string => {
    if (!dataISO) return 'Data desconhecida';
    try {
      const data = new Date(dataISO);
      // Assegura que dia e mês tenham dois dígitos
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexed
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    } catch (e) {
      console.error("Erro ao formatar data da avaliação:", e);
      return "Data inválida";
    }
  };
  function isRestaurantDTO(obj: any): obj is RestaurantDTO {
    return (
      obj != null &&
      typeof obj === 'object' &&
      (typeof obj.bannerPhoto === 'string' || obj.bannerPhoto === null) && // Permitir null
      (typeof obj.profilePhoto === 'string' || obj.profilePhoto === null) && // Permitir null
      typeof obj.name === 'string' &&
      typeof obj.description === 'string' &&
      typeof obj.address === 'string' &&
      (obj.openingPeriods === undefined || 
      obj.openingPeriods === null ||
      (Array.isArray(obj.openingPeriods) &&
        obj.openingPeriods.every(
          (period: any) =>
            period != null &&
            typeof period === 'object' &&
            typeof period.weekday === 'string' && 
            typeof period.opensAt === 'string' &&
            typeof period.closesAt === 'string'
        )))
    );
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

  if (error || (restaurant && !isRestaurantDTO(restaurant))) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>
          {error ?? 'Erro ao carregar dados do restaurante ou formato inválido.'}
        </Text>
      </SafeAreaView>
    );
  }

  const formatOpeningPeriodsForDisplay = (
    openingPeriods: OperatingHoursDto[] | undefined,
  ): string => {
    if (!openingPeriods || openingPeriods.length === 0) {
      return 'Horários de funcionamento não disponíveis.';
    }

    const groupedPeriods: Record<string, string[]> = {};
    const dayOrder: Weekday[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const dayDisplayNames: { [key in Weekday]?: string } = {};
    
    openingPeriods.forEach(period => {
      const validWeekday = period.weekday as Weekday;
      const dayName = mapFromWeekday(validWeekday);
      if (!dayName) {
        return;
      }
      dayDisplayNames[validWeekday] = dayName;
      if (!groupedPeriods[period.weekday]) {
        groupedPeriods[period.weekday] = [];
      }
      groupedPeriods[period.weekday].push(`${period.opensAt} - ${period.closesAt}`);
    });

    // Sort periods within each day (e.g., "09:00 - 12:00", "14:00 - 18:00")
    for (const weekdayKey in groupedPeriods) {
      groupedPeriods[weekdayKey].sort(); 
    }

    let formattedString = '';
    dayOrder.forEach(weekday => {
      if (groupedPeriods[weekday] && dayDisplayNames[weekday]) {
        formattedString += `${dayDisplayNames[weekday]}:\n  ${groupedPeriods[weekday].join('\n  ')}\n\n`;
      }
    });

    return formattedString.trim() || 'Horários de funcionamento não disponíveis.';
  };

  const handleCheckin = async () => {
    try {
      if (!currentRestaurantId) {
        Alert.alert("Erro", "ID do restaurante não encontrado para fazer check-in.");
        return;
      }
      const checkinData: CheckinDTO = {
        restaurant_id: currentRestaurantId,
      };
      await createCheckin(checkinData);
      Alert.alert('Sucesso', 'Checkin feito com sucesso!');
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert(
        'Erro',
        err instanceof Error ? err.message : 'Ocorreu um erro inesperado',
      );
    }
  };

  const handleNavigateToReviews = () => {
    router.push({
      pathname: '/RestaurantReviewsScreen',
      params: {
        restaurant: JSON.stringify(restaurant)
      },
    });
  };

  return (    
    <SafeAreaView style={styles.container}>      
        <HeaderPerfilRestaurante
          isProfile={isProfile}
          restaurantId={currentRestaurantId}
          urlFotoBanner={restaurant?.bannerPhoto}
          urlFotoPerfil={restaurant?.profilePhoto}
          onError={(message) => Alert.alert('Erro', message)}
          isSelected={restaurant?.isFavorite ?? false}
        ></HeaderPerfilRestaurante>

        <ScrollView>
          <View style={styles.infos}>
            <Text style={styles.title}>{restaurant?.name}</Text>
            <View style={styles.infoGrid}>
              <Accordion
                title={`${restaurant?.averageScore ?? ' - '}`}
                description={`(${restaurant?.reviews?.length ?? 0} avaliações)`}
                content={''}
                staticArrow={true}
                onPressAction={handleNavigateToReviews}
                children={
                  <FontAwesome
                    name="star"
                    size={24}
                    color={Colors.orange.orangeStandard}
                  />
                }
              ></Accordion>

              <Accordion
                title={'Descrição'}
                description={''}
                content={restaurant?.description ?? ''}
                staticArrow={false}
                children={
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color={Colors.orange.orangeStandard}
                  />
                }
              ></Accordion>

              <Accordion
                title={'Endereço do Restaurante'}
                description={''}
                content={restaurant?.address ?? ''}
                staticArrow={false}
                children={
                  <FontAwesome6
                    name="location-dot"
                    size={24}
                    color={Colors.orange.orangeStandard}
                  />
                }
              ></Accordion>

              <Accordion
                title={'Aberto'}
                description={''}
                content={formatOpeningPeriodsForDisplay(restaurant?.openingPeriods)}
                staticArrow={false}
                children={
                  <Foundation
                    name="clock"
                    size={24}
                    color={Colors.orange.orangeStandard}
                  />
                }
              ></Accordion>

              <Accordion
                title={'Estive Aqui'}
                description={''}
                content={''}
                staticArrow={true}
                onPressAction={() => setModalVisible(true)}
                children={
                  <MaterialCommunityIcons
                    name="calendar-start"
                    size={24}
                    color={Colors.orange.orangeStandard}
                  />
                }
              ></Accordion>          

              <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Deseja avaliar o restaurante?
                      </Text>
                      <View style={styles.modalButtons}>
                        <Button
                          title="Sim"
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            if (!currentRestaurantId) {
                              Alert.alert("Erro", "ID do restaurante não encontrado para avaliação.");
                              return;
                            }
                            router.push({
                              pathname: '/CreateReview',
                              params: {
                                restaurantId: currentRestaurantId,
                              },
                            });
                          }}
                          type={'orange'}
                          style={{ marginRight: 10 }}
                        />
                        <Button
                          title="Nao"
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            handleCheckin();
                          }}
                          type={'white'}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>        
            <View style={styles.carouselContainer}>
              <View style={styles.menuAndAveragePriceContainer}>
                <Text style={styles.carouselTitle}>Cardápio</Text>
                <Text style={styles.averagePriceText}>Preço médio: {restaurant?.averagePrice ?? ' - '}</Text>
              </View>
                <UserCarouselRestaurant
                  variant="menu"
                  items={menu}
                />
            </View>
            <View style={styles.carouselContainer}>
              <Text style={styles.carouselTitle}>Influenciadores que já visitaram</Text>
              <UserCarouselRestaurant
                variant="restaurantPublications"
                items={publications}
              />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  infos: {
    marginTop: 30,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: screenWidth < 360 ? 18 : 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: Colors.navyBlue,
    marginBottom: 8,
    marginTop: 15,
    textAlign: 'center',
  },
  carouselTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.black,
    paddingHorizontal: '3%',
  },
  infoGrid: {
    marginTop: 20,
    paddingHorizontal: '5%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.orange.orangeStandard,
    marginBottom: 20,
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  carouselContainer: {
    marginLeft: '3%',
    marginBottom: -10,
  },
  menuAndAveragePriceContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  averagePriceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'gray',
    marginLeft: 120,
    marginTop: '1%',
  },
});

export default RestaurantProfile;
