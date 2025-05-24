import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
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
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Accordion from '@/src/components/Accordion';

import {
  FontAwesome,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import Button from '@/src/components/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckinDTO, RestaurantDTO, OperatingHoursDto } from '@/src/@types/DTO';
import { Weekday, mapFromWeekday } from '@/src/utils/weekdayUtils'; 
import Colors from '@/src/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

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
  const params = useLocalSearchParams<{ restaurantId: string }>();
  const currentRestaurantId = params.restaurantId;

  useEffect(() => {
    if (currentRestaurantId) {
        getRestaurantById(currentRestaurantId);
    }
  }, [currentRestaurantId, refresh]);

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
      setRefresh(prev => prev + 1);
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert(
        'Erro',
        err instanceof Error ? err.message : 'Ocorreu um erro inesperado',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderPerfilRestaurante
        urlFotoBanner={restaurant?.bannerPhoto}
        urlFotoPerfil={restaurant?.profilePhoto}
      ></HeaderPerfilRestaurante>

      <View style={styles.infos}>
        <Text style={styles.title}>{restaurant?.name}</Text>
        <View style={styles.infoGrid}>
          <Accordion
            title={`${restaurant?.averageScore ?? '-'}`}
            description={`(${restaurant?.reviews?.length ?? 0} avaliações)`}
            content={''}
            staticArrow={true}
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
                          pathname: '/screens/CreateReview',
                          params: {
                            restaurantId: currentRestaurantId, // Pass the validated string ID
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
      </View>
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
});

export default RestaurantProfile;
