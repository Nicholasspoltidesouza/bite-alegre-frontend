import React from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const HeaderPerfilRestaurante = ({ }) => {
  return (
    <div style={styles.container}>
      <div style={styles.bola}>
        <AntDesign name="pushpin" size={24} color="#FF770025" style={styles.icon} />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Cor de fundo da tela
  },
  bola: {
    width: 50,            // Largura da bola (pequena)
    height: 50,           // Altura da bola (pequena)
    borderRadius: 25,     // Para tornar o "View" redondo
    backgroundColor: 'white', // Cor branca
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
  }
});

export default HeaderPerfilRestaurante;




// import { View, Text, StyleSheet } from 'react-native';

// const HeaderPerfilRestaurante = ({ mensagem }) => {
//   return (
//     // <View style={styles.container}>
//     //   <Text style={styles.texto}>{mensagem}</Text>
//     // </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     margin: 8,
//   },
//   texto: {
//     fontSize: 16,
//     color: '#333',
//   },
// });
