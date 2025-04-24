import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Accordion from '@/src/components/Accordion';

import { View, StyleSheet, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { FontAwesome, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PhotoDish from '@/src/components/PhotoDish';

const { width: screenWidth } = Dimensions.get('window'); 

const RestaurantProfile: React.FC = () => {
  const restaurant = {
    bannerPhoto: 'https://via.placeholder.com/600x200',
    profilePhoto: 'https://via.placeholder.com/150',
    name: 'Nome do Restaurante',
    description: 'Uma descrição incrível sobre o restaurante.',
    address: 'Rua Exemplo, 123 - Bairro Legal',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderPerfilRestaurante
          urlFotoBanner={restaurant.bannerPhoto}
          urlFotoPerfil={restaurant.profilePhoto}
        />

        <View style={styles.infos}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <View style={styles.infoGrid}>
            <Accordion 
              title={'4,5'}
              description={'(50 avaliações)'}
              content={``} 
              staticArrow={true} 
              children={<FontAwesome name="star" size={24} color="#FF914B" />}
            />
            <Accordion
              title={'Descrição'}
              description={''}
              content={restaurant.description} 
              staticArrow={false} 
              children={<Ionicons name="document-text-outline" size={24} color="#FF914B" />}
            />
            <Accordion 
              title={'Endereço do Restaurante'}
              description={''}
              content={restaurant.address} 
              staticArrow={false} 
              children={<FontAwesome6 name="location-dot" size={24} color="#FF914B" />}
            />
            <Accordion 
              title={'Aberto'}
              description={''}
              content={
                `Segunda-Feira       18:30 às 23:00\n` +
                `Terça-Feira         18:30 às 23:00\n` +
                `Quarta-Feira        18:30 às 23:00\n` +
                `Quinta-Feira        18:30 às 23:00\n` +
                `Sexta-Feira         18:30 às 00:00\n` +
                `Sábado              12:00 às 00:00\n` +
                `Domingo             12:00 às 22:00`
              } 
              staticArrow={false} 
              children={<Foundation name="clock" size={24} color="#FF914B" />}
            />
            <Accordion 
              title={'Estive Aqui'}
              description={''}
              content={''} 
              staticArrow={true} 
              children={<MaterialCommunityIcons name="calendar-start" size={24} color="#FF914B" />}
            />
          </View>
        </View>
        <View style={styles.carouselSection}>
          <Text style={styles.carouselTitle}>Cardápio</Text>
          <UserCarouselRestaurant variant="cardapio" />
        </View>
        <View style={styles.carouselSection}>
          <Text style={styles.carouselTitle}>Influenciadores Que Já Visitaram</Text>
          <UserCarouselRestaurant variant="influenciadores" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  carouselSection: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  carouselTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00000',
    
  },
});

export default RestaurantProfile;