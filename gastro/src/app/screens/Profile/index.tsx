import UserCarousel from '@/src/components/UserCarouselRestaurant';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Profile() {
  return (
  <ScrollView>
      <View style={styles.container}>
      
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Visitados</Text>
            <TouchableOpacity>
              <Text style={styles.mostrarMais}>Mostrar mais</Text>
            </TouchableOpacity>
          </View>
          <UserCarouselRestaurant variant="visitados"/>
        </View>
  
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Salvos</Text>
            <TouchableOpacity>
              <Text style={styles.mostrarMais}>Mostrar mais</Text>
            </TouchableOpacity>
          </View>
          <UserCarouselRestaurant variant="salvos"/>
        </View>
      </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFC',
    paddingTop: 200,
  },
  section: {
    marginTop: 24, 
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF914B',
  },
  mostrarMais: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF914B',
  },
});