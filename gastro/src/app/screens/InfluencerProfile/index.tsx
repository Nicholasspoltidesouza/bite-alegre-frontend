import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';

import InfluencerPageSession from '@/src/components/InfluencerPageSession';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header isProfile={true} name={'Manu'} nickName={'manu'} />

        <InfluencerPageSession />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
