import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator, Dimensions, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Accordion from '@/src/components/Accordion';

import { FontAwesome, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import Button from '@/src/components/Button';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { CheckinDTO } from '@/src/@types/DTO';

const { width: screenWidth } = Dimensions.get('window'); 

const RestaurantProfile: React.FC = () => {
  const { getRestaurantById, createCheckin, data: restaurant, loading, error } = useRestaurantApi();
  const [modalVisible, setModalVisible] = useState(false);
  const { restaurantId } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      console.log("ID RESTAURANTE NA TELA DE RESTAURANTE => ", restaurantId);
      getRestaurantById(restaurantId.toString());
    }, [restaurantId])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF914B" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  const handleCheckin = async () =>  {
    try {      
      const checkinData: CheckinDTO = {
        user_id: '1',
        restaurant_id: '1',
      };

      await createCheckin(checkinData);
      Alert.alert('Sucesso', 'Checkin feito feito com sucesso!');
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert('Erro', err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    }    
  }

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
            title={'4,5'}
            description={'(50 avaliação)'}
            content={``} 
            staticArrow={true} 
            children={<FontAwesome name="star" size={24} color="#FF914B" />}>
          </Accordion>

          <Accordion
            title={'Descrição'}
            description={''}
            content={restaurant?.description ?? ""} 
            staticArrow={false} 
            children={<Ionicons name="document-text-outline" size={24} color="#FF914B" />}>
          </Accordion>

          <Accordion 
            title={'Endereço do Restaurante'}
            description={''}
            content={restaurant?.address ?? ""} 
            staticArrow={false} 
            children={<FontAwesome6 name="location-dot" size={24} color="#FF914B" />}>
          </Accordion>
          
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
            children={<Foundation name="clock" size={24} color="#FF914B" />}>
          </Accordion>

          <Accordion 
            title={'Estive Aqui'}
            description={''}
            content={''} 
            staticArrow={true} 
            onPressAction={() => setModalVisible(true)}
            children={<MaterialCommunityIcons name="calendar-start" size={24} color="#FF914B" />}>            
          </Accordion>

          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Deseja avaliar o restaurante?</Text>
                  <View style={styles.modalButtons}>
                    <Button
                      title="Sim"
                      onPress={() => {
                        setModalVisible(!modalVisible)
                        router.push({ pathname: '/screens/CreateReview' })
                      }} 
                      type={'orange'}
                      style={{ marginRight: 10 }} />
                     <Button
                      title="Nao"
                      onPress={() => { 
                        setModalVisible(!modalVisible)
                        handleCheckin();
                      }}
                      type={'white'} />
                  </View>                   
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
      

    </SafeAreaView>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  infos: {
    marginTop: 30,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: screenWidth < 360 ? 18 : 20, 
    fontWeight: 'bold',
    fontFamily: "Poppins-Medium",
    color: '#1F2937',
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
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontFamily:'Poppins-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF914B',
    marginBottom: 20
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',    
  }
});

export default RestaurantProfile;
