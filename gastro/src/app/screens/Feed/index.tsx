import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import TextField from '@/src/components/TextFieldCadastroUsuario';
import Colors from '@/src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/src/components/Header';


export default function TextFieldWithFilter() {
  return (
    <View style={styles.container}>
    <Header/>

        <View >
            <TextField value={'Pesquisar'} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } placeholder={''}       
      />
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="options" size={24}/>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconButton: {
    marginLeft: 10,
  },
});