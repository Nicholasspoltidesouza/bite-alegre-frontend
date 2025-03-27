import React from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface HeaderPerfilRestauranteProps {
  urlFotoBanner: string;
}

const HeaderPerfilRestaurante: React.FC<HeaderPerfilRestauranteProps> = ({ urlFotoBanner }) => {
  return (
    <ImageBackground source={{ uri: urlFotoBanner }} style={styles.container} imageStyle={styles.imageBackground}>
      <TouchableOpacity style={styles.bola}>
        <AntDesign name="pushpin" size={24} color="#FF770040" style={styles.icon} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#FF914B',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  imageBackground: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  bola: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    transform: [{ rotate: '90deg' }],
  },
});

export default HeaderPerfilRestaurante;