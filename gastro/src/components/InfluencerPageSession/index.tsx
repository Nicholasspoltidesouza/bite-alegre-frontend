import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/src/constants/Colors';
import { useRouter } from 'expo-router';

interface Props {
  userView?: boolean;
}

export default function InfluencerPageSession({ userView = false }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <View style={styles.iconWithIndicator}>
          <Feather name="grid" size={24} color={Colors.orange.orangeStandard} />
          <View style={styles.indicator} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <MaterialIcons name="reviews" size={24} color={Colors.gray.grayLight} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <FontAwesome6 name="house-circle-check" size={24} color={Colors.gray.grayLight} />
      </TouchableOpacity>

      {!userView && (
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <FontAwesome5 name="user-alt" size={22} color={Colors.gray.grayLight} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 1,
    backgroundColor: Colors.white,
    marginTop: -6,
  },
  button: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  iconWithIndicator: {
    alignItems: 'center',
  },
  indicator: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.orange.orangeStandard,
    marginTop: 6,
  },
});