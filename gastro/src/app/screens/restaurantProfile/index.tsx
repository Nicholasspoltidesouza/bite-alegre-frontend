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
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { CheckinDTO, RestaurantDTO } from '@/src/@types/DTO';
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
  const [refresh, setRefresh] = useState(0);
  const { restaurantId } = useLocalSearchParams();

  useEffect(() => {
    if (typeof restaurantId === 'string')
      getRestaurantById(restaurantId.toString());
  }, [restaurantId, refresh]);

  function isRestaurantDTO(obj: any): obj is RestaurantDTO {
    return (
      obj &&
      typeof obj === 'object' &&
      'bannerPhoto' in obj &&
      'profilePhoto' in obj &&
      'name' in obj &&
      'description' in obj &&
      'address' in obj
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
          {error ?? 'Erro ao buscar restaurante.'}
        </Text>
      </SafeAreaView>
    );
  }

  const handleCheckin = async () => {
    try {
      const checkinData: CheckinDTO = {
        restaurant_id: restaurantId.toString(),
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
            content={
              `Segunda-Feira            18:30 às 23:00\n` +
              `Terça-Feira                  18:30 às 23:00\n` +
              `Quarta-Feira               18:30 às 23:00\n` +
              `Quinta-Feira               18:30 às 23:00\n` +
              `Sexta-Feira                 18:30 às 00:00\n` +
              `Sábado                        12:00 às 00:00\n` +
              `Domingo                    12:00 às 22:00`
            }
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
                        router.push({
                          pathname: '/screens/CreateReview',
                          params: {
                            restaurantId: restaurantId,
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
