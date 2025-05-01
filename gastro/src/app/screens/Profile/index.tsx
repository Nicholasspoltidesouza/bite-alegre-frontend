import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';

export default function Profile() {
  return (
      <View style={styles.container}>
    <ScrollView>
      
      <Header isProfile={true}/>
  
        
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Visitados</Text>
            <TouchableOpacity>
              <Text style={styles.mostrarMais}>Mostrar mais</Text>
            </TouchableOpacity>
          </View>
          <UserCarouselRestaurant variant="visited"/>
          
        </View>

        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Salvos</Text>
            <TouchableOpacity>
              <Text style={styles.mostrarMais}>Mostrar mais</Text>
            </TouchableOpacity>
          </View>
          <UserCarouselRestaurant variant="saved"  />
        </View>

    </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    
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
    paddingLeft: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
  },
  mostrarMais: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.orange.orangeStandard,
  },
});