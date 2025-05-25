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
import { MaterialIcons } from '@expo/vector-icons';

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
          {item.restaurantProfilePhoto ? (
            <Image
            source={{ uri: item.restaurantProfilePhoto }}
            style={styles.image}
            />
                ) : (
            <MaterialIcons name="store" size={40} color="#fcd5b5" style={{padding: '2%'}} />
          )}
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
   backgroundColor: '#fff3ec',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.standard,
  },
  date: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.black,
    marginTop: 2,
  },
});