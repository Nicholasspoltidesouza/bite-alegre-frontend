import React, { useState } from 'react';
import {View,Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PhotoDish from '@/src/components/PhotoDish';

const CARD_WIDTH = 153;
const CARD_HEIGHT = 156;
const CARD_MARGIN = 12;

interface Restaurante {
  id: string;
  nome: string;
  nota: number | null;
  avaliacoes: number | null;
  imagem: string;
  visitado?: boolean;
  favorito?: boolean;
}

interface Props {
  variant: 'visited' | 'saved' | 'menu' | 'influencers';
  carouselProfileRestaurant?: boolean;
  restaurantsExternal: Restaurante[];
}

export default function UserCarouselRestaurant({ variant, carouselProfileRestaurant = false, restaurantsExternal }: Props) {
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const data = useMemo(() => {
    let baseData = [...restaurantsExternal];

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

    if (variant === 'menu') {
      return (
        <PhotoDish
          urlFotoPrato={item.imagem}
          descricao={item.nome}
          showStar={item.favorito}
        />
      );
    }

    return (
      <View style={styles.card}>
        
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imagem }} style={styles.image} />
          {['visited', 'saved'].includes(variant) && (
            <TouchableOpacity style={styles.pinButton} onPress={() => togglePin(item.id)}>
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

        {variant === 'saved' && item.nota !== null && (
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
