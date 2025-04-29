import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PhotoDish from '@/src/components/PhotoDish';

const CARD_WIDTH = 153;
const CARD_HEIGHT = 156;
const CARD_MARGIN = 12;

interface Restaurante {
  id: string;
  nome: string | null;
  nota: number | null;
  avaliacoes: number | null;
  imagem: string;
  visitado?: boolean;
  favorito?: boolean;
}

interface Props {
  variant: 'visited' | 'saved' | 'menu' | 'influencers' | 'closeToYou';
  carouselProfileRestaurant?: boolean;
  restaurantsExternal?: Restaurante[];
}

const mockData: Record<'visited' | 'saved' | 'menu' | 'influencers' | 'closeToYou', Restaurante[]> = {
  visited: [
    {
      id: '1',
      nome: 'Biskaia',
      nota: null,
      avaliacoes: null,
      imagem: 'https://esa-cdn.cardapio.menu/storage/media/company_gallery/52529901/conversions/contribution_gallery.jpg',
      visitado: true,
    },
    {
      id: '2',
      nome: 'Gelson Lanches',
      nota: 3,
      avaliacoes: 12,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD4dJ6EDJ7UQzZ9KFDmon5aHLRm5KIBHinxQ&s',
      visitado: true,
    },
  {
      id: '3',
      nome: 'OutBack',
      nota: null,
      avaliacoes: null,
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/43/de/6d/outback-steakhouse.jpg?w=900&h=500&s=1',
      visitado: true,
    },
  {
      id: '4',
      nome: 'Hamburgueria do Bairro',
      nota: null,
      avaliacoes: null,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYj3Xx7aJ7q1s8n8f2b0Gm5uGg0N1h2g6z6A&s',
      visitado: true,
    },

  ],
  closeToYou: [
    {
      id: '3',
      nome: 'OutBack',
      nota: 4.7,
      avaliacoes: 57,
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/43/de/6d/outback-steakhouse.jpg?w=900&h=500&s=1',
      visitado: false,
    },
    {
      id: '4',
      nome: 'Hamburgueria do Bairro',
      nota: 4.5,
      avaliacoes: 25,
      imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
      visitado: false,
    },
  {
      id: '5',
      nome: 'Pizzaria do Bairro',
      nota: 4.2,
      avaliacoes: 15,
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/1b/92/50/ambiente-de-l-unico.jpg?w=600&h=-1&s=1',
      visitado: false,
    },
  {
      id: '6',
      nome: 'Sushi do Bairro',
      nota: 4.8,
      avaliacoes: 30,
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/75/8a/f4/mesas-sob-a-figueira.jpg?w=600&h=-1&s=1',
      visitado: false,
    },
  {
      id: '7',
      nome: 'Churrascaria do Bairro',
      nota: 4.6,
      avaliacoes: 20,
      imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60',
      visitado: false,
    },
  {
      id: '8',
      nome: 'Cozinha do Bairro',
      nota: 4.3,
      avaliacoes: 18,
      imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
      visitado: false,
    },
  {
      id: '9',
      nome: 'Sorveteria do Bairro',
      nota: 4.1,
      avaliacoes: 10,
      imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
      visitado: false,
    },
  {
      id: '10',
      nome: 'Doceria do Bairro',
      nota: 0,
      avaliacoes: 0,
      imagem: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D',
      visitado: false,
    },

  ],
  menu: [
    {
      id: '4',
      nome: 'Hambúrguer',
      nota: null,
      avaliacoes: null,
      imagem: 'https://www.estadao.com.br/resizer/v2/77XTHHCCLBEXLC2Y5RK4PN37CE.jpg?quality=80&width=720&height=503',
      favorito: true,
    },
  ],
  influencers: [
    {
      id: '5',
      nome: 'Mustacha',
      nota: null,
      avaliacoes: null,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvPy-dEH8DVe1RUAf5Tl2e2kF89IATkpPaw&s',
    },
    {
      id: '6',
      nome: 'Gastro',
      nota: null,
      avaliacoes: null,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFmep4l3APAJdWuT3wx14qcfOUIGq0ni13w&s',
    },
    {
      id: '7',
      nome: 'Chef do Bairro',
      nota: null,
      avaliacoes: null,
      imagem: 'https://uploads.metroimg.com/wp-content/uploads/2021/09/01163754/Chef-Cadu-Moura.jpg',
    },
    {
      id: '8',
      nome: 'Cozinheiro do Bairro',
      nota: null,
      avaliacoes: null,
      imagem: 'https://influency.me/wp-content/uploads/2023/10/FGC_125725-1-edited.jpg',
    },
    {
      id: '9',
      nome: null,
      nota: null,
      avaliacoes: null,
      imagem: 'https://influency.me/wp-content/uploads/2023/10/FGC_125725-1-edited.jpg',
    },
    {
      id: '10',
      nome: 'Sorveteiro do Bairro',
      nota: null,
      avaliacoes: null,
      imagem: 'https://influency.me/wp-content/uploads/2023/10/FGC_125725-1-edited.jpg',
    },
  ],
  saved: [
    {
      id: '11',
      nome: 'Restaurante do Bairro',
      nota: 4.5,
      avaliacoes: 20,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYj3Xx7aJ7q1s8n8f2b0Gm5uGg0N1h2g6z6A&s',
    },
    {
      id: '12',
      nome: 'Pizzaria do Bairro',
      nota: 4.2,
      avaliacoes: 15,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYj3Xx7aJ7q1s8n8f2b0Gm5uGg0N1h2g6z6A&s',
    },
  ],
};

export default function UserCarouselRestaurant({
  variant,
  carouselProfileRestaurant = false,
  restaurantsExternal,
}: Props) {
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const data = useMemo(() => {
    let baseData = [...(restaurantsExternal ?? mockData[variant])];

    if (variant === 'visited' && carouselProfileRestaurant) {
      baseData.sort((a, b) => {
        const aPressed = selectedPins.includes(a.id) ? 0 : 1;
        const bPressed = selectedPins.includes(b.id) ? 0 : 1;
        return aPressed - bPressed;
      });
    }

    if (variant === 'menu') {
      baseData.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
    }

    return baseData;
  }, [variant, carouselProfileRestaurant, selectedPins, restaurantsExternal]);

  const renderItem = ({ item }: { item: Restaurante }) => {
    const isSelected = selectedPins.includes(item.id);

    
    if (variant === 'influencers') {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log(`Clicou em ${item.nome}`)}
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
          </View>
          <Text style={styles.nome}>{item.nome}</Text>
        </TouchableOpacity>
      );
    }

    if (variant === 'menu') {
      return (
        <PhotoDish
          urlFotoPrato={item.imagem}
          descricao={item.nome ?? ''}
          showStar={item.favorito}
        />
      );
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log(`Clicou em ${item.nome}`)}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imagem }} style={styles.image} />
          {['visited', 'saved', 'closeToYou'].includes(variant) && (
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
          )}
        </View>

        <Text style={styles.nome}>{item.nome}</Text>

        {variant === 'visited' && item.nota === null && (
          <TouchableOpacity style={styles.botaoAvaliar}>
            {Array.from({ length: 5 }, (_, i) => (
              <AntDesign
                key={i}
                name="star"
                size={12}
                color="#FF914B40"
                style={{ marginRight: 2 }}
              />
            ))}
            <Text style={styles.botaoAvaliarTexto}>Avalie aqui!</Text>
          </TouchableOpacity>
        )}

        {variant === 'visited' && item.nota !== null && (
          <View style={styles.avalieAqui}>
            {Array.from({ length: 5 }, (_, i) => (
              <AntDesign
                key={i}
                name="star"
                size={12}
                color={i < item.nota! ? '#FF914B' : '#FF914B40'}
              />
            ))}
          </View>
        )}

        {['saved', 'closeToYou'].includes(variant) && item.nota !== null && (
          <View style={styles.avaliacaoRow}>
            <AntDesign name="star" size={12} color="#FF914B" />
            <Text style={styles.nota}> {item.nota?.toFixed(1)}</Text>
            <Text style={styles.avaliacoes}> ({item.avaliacoes ?? 0} avaliações)</Text>
          </View>
        )}
      </TouchableOpacity>
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
        paddingBottom: 30,
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
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