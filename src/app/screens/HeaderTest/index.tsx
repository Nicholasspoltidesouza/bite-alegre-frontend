import Header from "@/src/components/Header";
import Colors from "@/src/constants/Colors";
import { StyleSheet, View } from "react-native";
import React from 'react';
import BaseModal from "@/src/components/BaseModal";
import HeaderPerfilRestaurante from "@/src/components/HeaderPerfilRestaurante";
;

export default function HeaderTest() {
  return (
    
        <View style={styles.container}>

            <HeaderPerfilRestaurante isProfile = {true}/>
            <BaseModal visible={false} onClose={() => {}}/>
f
            </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});