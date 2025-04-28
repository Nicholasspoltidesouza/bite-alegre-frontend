
import Colors from '@/src/constants/Colors';
import Header from '@/src/components/Header';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function Profile() {
  return (

    <View style={styles.container}>
      <Text style={{ color: Colors.icon ,fontSize: 40 }}>
        Tela de profile
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundCustom,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
