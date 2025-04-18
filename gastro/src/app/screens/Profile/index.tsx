import UserProfileHeader from '@/src/components/UserProfileHeader';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}  >
    <UserProfileHeader />
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