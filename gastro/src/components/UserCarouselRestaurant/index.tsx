import React, { useState } from 'react';
import {View,Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CARD_WIDTH = 170;
const CARD_MARGIN = 12;

interface Restaurante {
  id: string;
  nome: string;
  nota: number;
  avaliacoes: number;
  imagem: string;
  visitado: boolean;
}

interface Props {
  mostrarVisitados?: boolean;
  restaurantesExternos?: Restaurante[];
}

export default function UserCarouselRestaurant({
  mostrarVisitados = false,
  restaurantesExternos = [],
}: Props) {
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const data = restaurantesExternos.filter((r) =>
    mostrarVisitados ? r.visitado : !r.visitado
  );

  const renderItem = ({ item }: { item: Restaurante }) => {
    const isSelected = selectedPins.includes(item.id);

    return (
      <View style={styles.card}>
        
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imagem }} style={styles.image} />
          {!item.visitado && (
            <TouchableOpacity
                style={styles.pinButton} onPress={() => togglePin(item.id)}
            >
              <AntDesign name="pushpin" size={16} style={{ transform: [{ rotate: '90deg' }], color: isSelected ? '#FF7700' : '#FF770040',
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.nome}>{item.nome}</Text>



        {item.visitado ? (
          item.nota === null ? (
          <TouchableOpacity
            style={styles.botaoAvaliar} onPress={() => console.log('Avaliar restaurante', item.nome)}
           >
            <   Text style={styles.botaoAvaliarTexto}> Avalie aqui!</Text>
            </TouchableOpacity>
            ) : (
            <><TouchableOpacity 
                style={styles.pinButton} onPress={() => togglePin(item.id)} >
                <AntDesign name="pushpin" size={16} style={{
                  transform: [{ rotate: '90deg' }], color: isSelected ? '#FF7700' : '#FF770040',
                }} />

              </TouchableOpacity><Text style={styles.avalieAqui}>
                  Você avaliou com{' '}
                  {'★'.repeat(Math.floor(item.nota)) + '☆'.repeat(5 - Math.floor(item.nota))}
                </Text></>
  )
) : (
  <View style={styles.avaliacaoRow}>
    <AntDesign name="star" size={12} color="#FF914B" />
    <Text style={styles.nota}> {item.nota?.toFixed(1)}</Text>
    <Text style={styles.avaliacoes}> ({item.avaliacoes ?? 0} avaliações)</Text>
  </View>
)}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: CARD_MARGIN,
        paddingRight: CARD_MARGIN,
        paddingTop: 20,
      }}
    />
  );
}

const styles = StyleSheet.create({
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
  avalieAqui: {
    fontSize: 12,
    color: '#FF914B',
    marginTop: 2,
  },
  botaoAvaliar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  botaoAvaliarTexto: {
    fontSize: 12,
    color: '#FF914B',
    fontWeight: 'bold',
  },
});
