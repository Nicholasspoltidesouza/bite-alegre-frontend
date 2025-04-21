
import Header from '@/src/components/Header';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>

      <Header
        isProfile={true}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    gap: 16,
  }
});
