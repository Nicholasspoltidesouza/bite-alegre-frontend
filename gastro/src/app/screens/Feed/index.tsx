import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/src/components/Header';

export default function TextFieldWithFilter() {
  return (
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

    </View>
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
});