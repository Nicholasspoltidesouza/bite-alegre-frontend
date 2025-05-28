import Colors from '@/src/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

export default function Profile() {
  const { role, user} = useAuthContext();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log('Navigating to profile based on role:', role);
      switch (role) {
        case 'INFLUENCER':
          router.push('/InfluencerProfile');
        break;
        case 'USER':
          router.push('/UserProfile');
        break;
        case 'RESTAURANT':
          router.push({
            pathname: '/restaurantProfile',
            params: {
              restaurantId: user!.id,
            },
          });
        break;
      }
    }, [])
  );


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});