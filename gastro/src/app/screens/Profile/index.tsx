
import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.light.padrao ,fontSize: 40 }}>
        Tela de profile
      </Text>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundCustom,
    alignItems: 'center',
    justifyContent: 'center',
  },
});