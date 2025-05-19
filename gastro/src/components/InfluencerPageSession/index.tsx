import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function InfluencerPageSession() {
  const router = useRouter();
  const handlePress = () => {
    router.push('/');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="grid" size={24} color={Colors.orange.orangeStandard} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="reviews" size={24} color={Colors.gray.grayLight} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome6 name="house-circle-check" size={24} color={Colors.gray.grayLight} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome5 name="user-alt" size={24} color={Colors.gray.grayLight} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    padding: 10,
  },
});
