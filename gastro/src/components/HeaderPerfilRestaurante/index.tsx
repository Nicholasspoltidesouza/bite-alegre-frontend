import React from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const HeaderPerfilRestaurante = ({ }) => {
  return (
    <div style={styles.container}>
      <button style={styles.bola}>
        <AntDesign name="pushpin" size={24} color="#FF770040" style={styles.icon} />
      </button>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  bola: {
    width: 50,            
    height: 50,           
    borderRadius: 25,     
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderWidth: 0
  },
  icon: {
    alignItems: 'center'
  }
});

export default HeaderPerfilRestaurante;
