import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import InfluencerPageSession from '@/src/components/InfluencerPageSession';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthContext } from '@/src/contexts/authContext';

export default function InfluencerProfile() {
  const { user } = useAuthContext(); 
  const [ sameUser, setSameUser] = useState(false);
  const [ isLoading, setIsLoading] = useState(true);
  const { userId, isInfluencer } = useLocalSearchParams();

  const handleAddPress = () => {
    router.push({ pathname: '/screens/AddMedia' });
  };

  useEffect(() => {
    //user-1 vai ser user!.id que vem do AuthContext
    console.log(userId)
    if(userId == 'user-1') setSameUser(true);
    console.log(sameUser)
    setIsLoading(false);
  }, [userId]);

   if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors.orange.orangeStandard}
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }




  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          isProfile={true}
          name={'Manu'}
          nickName={'manu'}
          userView={false}
        />

        <InfluencerPageSession userView={!sameUser} />
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