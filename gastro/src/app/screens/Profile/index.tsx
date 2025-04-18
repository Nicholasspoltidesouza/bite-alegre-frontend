import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>

      <View style={styles.titleRow}>
        <Text style={styles.title}>Visitados</Text>
        <TouchableOpacity>
          <Text style={styles.mostrarMais}>Mostrar mais</Text>
        </TouchableOpacity>
      </View>
      <UserCarouselRestaurant mostrarVisitados />

      <Text style={[styles.title, { marginTop: 24 }]}>Salvos</Text>
      <UserCarouselRestaurant mostrarVisitados = {false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
