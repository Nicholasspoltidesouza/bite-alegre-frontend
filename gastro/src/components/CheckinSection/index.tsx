import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Colors from '@/src/constants/Colors';
import { CheckinDTO } from '@/src/@types/DTO';

interface Props {
  checkins: CheckinDTO[];
}

export default function CheckinSection({ checkins }: Props) {
  return (
    <FlatList
      data={checkins}
      keyExtractor={(item) => item.restaurant_id}
      contentContainerStyle={{ paddingBottom: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Image source={{ uri: item.restaurantProfilePhoto }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.restaurantName}</Text>
            <Text style={styles.date}>Data não disponível</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffe7d8',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.orange.orangeStandard,
  },
  date: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.black,
    marginTop: 2,
  },
});