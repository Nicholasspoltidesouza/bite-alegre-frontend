import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import Accordion from '@/src/components/Accordion';

import { FontAwesome, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';

const { width: screenWidth } = Dimensions.get('window'); 

const RestaurantProfile: React.FC = () => {
  const { getRestaurant, data: restaurant, loading, error } = useRestaurantApi();

  useEffect(() => {
    getRestaurant("027d5268-b28c-47d2-aab3-45ca140cdb73");
  }, []);

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
            children={<MaterialCommunityIcons name="calendar-start" size={24} color="#FF914B" />}>
          </Accordion>
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
});

export default RestaurantProfile;
