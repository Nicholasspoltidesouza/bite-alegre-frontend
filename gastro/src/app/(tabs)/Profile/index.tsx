import Colors from '@/src/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

export default function Profile() {
  const { role, user } = useAuthContext();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!role || !user || isNavigating) return;

      setIsNavigating(true);

      switch (role) {
        case 'INFLUENCER':
          router.replace('/(tabs)/(screens)/InfluencerProfile');
          break;
        case 'USER':
          router.replace('/(tabs)/(screens)/UserProfile');
          break;
        case 'RESTAURANT':
          router.replace({
            pathname: '/(tabs)/(screens)/restaurantProfile',
            params: {
              restaurantId: user.id,
            },
          });
          break;
        default:
          console.warn('Role não reconhecido:', role);
          setIsNavigating(false);
          break;
      }
    }, [role, user, isNavigating]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsNavigating(false);
      };
    }, []),
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
