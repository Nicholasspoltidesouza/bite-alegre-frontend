import React, { useState } from 'react';
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CARD_WIDTH = 180;
const CARD_MARGIN = 12;

const restaurantes = [
  {
    id: '1',
    nome: 'OutBack',
    nota: 4.7,
    avaliacoes: 57,
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60',
  },
  {
    id: '2',
    nome: 'Biskaia',
    nota: 4.2,
    avaliacoes: 43,
    imagem:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
  },
  {
    id: '3',
    nome: 'Pizzaria',
    nota: 4.5,
    avaliacoes: 120,
    imagem:
      'https://img.freepik.com/fotos-gratis/interior-do-restaurante_1127-3392.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: '4',
    nome: 'Sushi House',
    nota: 4.8,
    avaliacoes: 89,
    imagem:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/ef/49/4e/welcome-to-larimarwe.jpg',
  },
  {
    id: '5',
    nome: 'Burger King',
    nota: 4.1,
    avaliacoes: 65,
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqQdH2FkuQ4wvi23l1tE0npTwBGhHwRbMnjQ&s',
  },
];

export default function RestauranteVisualCards() {

  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };


  const renderItem = ({ item }: any) => {
    const isSelected = selectedPins.includes(item.id);

    return (
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imagem }} style={styles.image} />
          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => togglePin(item.id)}
          >
            <AntDesign
              name="pushpin"
              size={16}
              style={{
                transform: [{ rotate: '90deg' }],
                color: isSelected ? '#FF7700' : '#FF770040',
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.avaliacaoRow}>
          <AntDesign name="star" size={12} color="#FF914B" />
          <Text style={styles.nota}> {item.nota.toFixed(1)}</Text>
          <Text style={styles.avaliacoes}> ({item.avaliacoes} avaliações)</Text>
        </View>
      </View>
    );
  };

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
    },
    card: {
      width: CARD_WIDTH,
      marginRight: CARD_MARGIN,
      alignItems: 'flex-start',
    },
    imageWrapper: {
      width: '100%',
      height: 120,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#fff',
      elevation: 4,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    pinButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
    },

    nome: {
      marginTop: 8,
      fontWeight: 'bold',
      fontSize: 14,
      color: '#1F2937',
    },
    avaliacaoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    nota: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    avaliacoes: {
      fontSize: 11,
      color: '#555',
    },
    
  });