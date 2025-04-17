import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = 200 ;
const CARD_MARGIN = 12;

const restaurantes = [
  {
    id: '1',
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww'
  },
  {
    id: '2',
    imagem: 'https://servircomrequinte.francobachot.com.br/wp-content/uploads/2020/08/post_thumbnail-5119340b39b314917440ed22562078eb.jpg'
  },
  {
    id: '3',
    imagem: 'https://img.freepik.com/fotos-gratis/interior-do-restaurante_1127-3392.jpg?semt=ais_hybrid&w=740'
  },
  {
    id: '4',
    imagem: 'https://media.istockphoto.com/id/1178591496/pt/foto/view-through-the-window-of-staff-and-customers-inside-buns-and-buns-restaurant-in-covent.jpg?s=612x612&w=0&k=20&c=aJ_GQBnmCkIj8auWSV3kQSrOG9JsH0bX8gwAvr2VbQA='
  }
];

export default function RestauranteVisualCards() {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={restaurantes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 20,
    backgroundColor: '#f1f1f1', 
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: CARD_MARGIN,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});