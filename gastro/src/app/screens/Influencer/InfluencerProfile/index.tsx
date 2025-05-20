import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import InfluencerPageSession from '@/src/components/InfluencerPageSession';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Profile() {
  const handleAddPress = () => {
    router.push({ pathname: '/screens/AddMedia' });

  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          isProfile={true}
          name={'Manu'}
          nickName={'manu'}
          userView={false}
        />

        <InfluencerPageSession userView={false} />
      </ScrollView>

     
      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.orange.orangeStandard,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});