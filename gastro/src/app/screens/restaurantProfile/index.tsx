import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import Accordion from '@/src/components/Accordion';
import { FontAwesome, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';

const RestaurantProfile: React.FC = () => {
  const { getRestaurant, data: restaurant, loading, error } = useRestaurantApi();

  useEffect(() => {
    getRestaurant("1");
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
  carda: {
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  precoMedio: {
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
  },
  infos: {
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 15,
    textAlign: 'center',
  },
  infoGrid: {
    marginLeft: 50,
    marginRight: 50,    
  }
});

export default RestaurantProfile;
