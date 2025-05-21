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

interface Checkin {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  date: string; 
}

const mockCheckins: Checkin[] = [
  {
    id: '1',
    restaurantName: 'Araujo`s',
    restaurantImage:
      'https://files.menudino.com/cardapios/67052/logo.png',
    date: '17/03/2025',
  },
  {
    id: '2',
    restaurantName: 'Mamamia',
    restaurantImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVD67Bl2NkphlMJZg2xKv0qwXX2L_MOcSsw&s',
    date: '05/03/2025',
  },
  {
    id: '3',
    restaurantName: 'Marques Pizzaria',
    restaurantImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHziDArbpect3kgH--Ytr-W5hXyfw6W7IXRQ&s',
    date: '28/02/2025',
  },
];

export default function CheckinSection() {
  return (
    <FlatList
      data={mockCheckins}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Image source={{ uri: item.restaurantImage }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.restaurantName}</Text>
            <Text style={styles.date}>{item.date}</Text>
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