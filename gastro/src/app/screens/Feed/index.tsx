import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/src/components/Header';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';

export default function TextFieldWithFilter() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Header />

      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor="#FF914B"
            style={styles.input}
          />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="options" size={20} color="#FF914B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rouletteCardContainer}>
        <TouchableOpacity onPress={() => console.log('Card pressionado')}>
          <Image
            source={require('@/assets/images/card-roulette.png')}
            style={styles.rouletteCard}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Em alta com nossos influencers</Text>

      <UserCarouselRestaurant variant="influencers" />

      <Text style={styles.sectionTitle}>Restaurantes perto de você</Text>

      <UserCarouselRestaurant variant="saved" />

    </View>
    </ScrollView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1E6', 
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#FF914B',
    fontFamily: 'Poppins-Regular',
  },
  iconButton: {
    marginLeft: -50,
  },
  rouletteCardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  rouletteCard: {
    width: 400,
    height: 200,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FF914B',
    marginTop: 8,
    marginLeft: 20,
  },
});