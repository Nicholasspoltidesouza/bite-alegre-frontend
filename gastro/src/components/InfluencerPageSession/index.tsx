import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/src/constants/Colors';
import { useRouter } from 'expo-router';

interface Props {
  userView?: boolean;
  onTabSelect: (tab: 'grid' | 'reviews' | 'checkins' | 'user') => void;
  selectedTab: 'grid' | 'reviews' | 'checkins' | 'user';
}

export default function InfluencerPageSession({ userView = false, onTabSelect, selectedTab }: Props) {

  return (
    <View style={styles.container}>
      
    <TouchableOpacity onPress={() => onTabSelect('grid')} style={styles.button}>
      <View style={styles.iconWithIndicator}>
        <Feather
          name="grid"
          size={24}
          color={selectedTab === 'grid' ? Colors.orange.orangeStandard : Colors.gray.grayLight}
        />
        {selectedTab === 'grid' && <View style={styles.indicator} />}
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => onTabSelect('reviews')} style={styles.button}>
      <View style={styles.iconWithIndicator}>
        <MaterialIcons
          name="reviews"
          size={24}
          color={selectedTab === 'reviews' ? Colors.orange.orangeStandard : Colors.gray.grayLight}
        />
        {selectedTab === 'reviews' && <View style={styles.indicator} />}
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => onTabSelect('checkins')} style={styles.button}>
      <View style={styles.iconWithIndicator}>
        <FontAwesome6
          name="house-circle-check"
          size={24}
          color={selectedTab === 'checkins' ? Colors.orange.orangeStandard : Colors.gray.grayLight}
        />
        {selectedTab === 'checkins' && <View style={styles.indicator} />}
      </View>
    </TouchableOpacity>

    {!userView && (
      <TouchableOpacity onPress={() => onTabSelect('user')} style={styles.button}>
        <View style={styles.iconWithIndicator}>
          <FontAwesome5
            name="user-alt"
            size={22}
            color={selectedTab === 'user' ? Colors.orange.orangeStandard : Colors.gray.grayLight}
          />
          {selectedTab === 'user' && <View style={styles.indicator} />}
        </View>
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