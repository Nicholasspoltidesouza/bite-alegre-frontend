import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CARD_WIDTH = 180;
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

const mockRestaurantes: Restaurante[] = [
  {
    id: '1',
    nome: 'OutBack',
    nota: 5,
    avaliacoes: 5,
    imagem: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60',
    visitado: true,
  },
  {
    id: '2',
    nome: 'Petiskeira',
    nota: null,
    avaliacoes: null,
    imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
    visitado: true,
  },
  {
    id: '3',
    nome: 'Biskaia',
    nota: 5,
    avaliacoes: 43,
    imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
    visitado: false,
  },
  {
    id: '4',
    nome: 'Gelson Lanches',
    nota: 3.0,
    avaliacoes: 32,
    imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/1b/92/50/ambiente-de-l-unico.jpg?w=600&h=-1&s=1',
    visitado: false,
  },
  {
    id: '5',
    nome: 'Bistrô do Sol',
    nota: 3.0,
    avaliacoes: null,
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60',
    visitado: true,
  },
  {
    id: '2',
    nome: 'Petiskeira',
    nota: null,
    avaliacoes: null,
    imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
    visitado: true,
  },
  {
    id: '2',
    nome: 'Petiskeira',
    nota: null,
    avaliacoes: null,
    imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
    visitado: false,
  },
  {
    id: '2',
    nome: 'Petiskeira',
    nota: null,
    avaliacoes: null,
    imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
    visitado: false,
  },
  {
    id: '2',
    nome: 'Petiskeira',
    nota: null,
    avaliacoes: null,
    imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
    visitado: false,
  },
];

export default function UserCarouselRestaurant({
  mostrarVisitados = false,
  restaurantesExternos,
}: Props) {
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const restaurantes = restaurantesExternos || mockRestaurantes;
  const data = restaurantes.filter((r) =>
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
          item.nota ? (
            <Text style={styles.avalieAqui}>
              Você avaliou com{' '}
              {'★'.repeat(Math.floor(item.nota)) + '☆'.repeat(5 - Math.floor(item.nota))}
            </Text>
          ) : (
            <TouchableOpacity
              style={styles.botaoAvaliar} onPress={() => console.log('Avaliar restaurante', item.nome)}
            >
              <Text style={styles.botaoAvaliarTexto}> Avalie aqui!</Text>
            </TouchableOpacity>
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
