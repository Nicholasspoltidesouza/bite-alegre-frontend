import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { router } from 'expo-router';
import PhotoDish from '../PhotoDish';

const CARD_WIDTH = 153;
const CARD_HEIGHT = 156;
const CARD_MARGIN = 10;

interface CarouselItem {
  id: string;
  stars?: number;
  photo?: string;
  name?: string;
  averagePrice?: number;
}

interface Props {
  variant: 'visited' | 'saved' | 'menu' | 'influencers' | 'closeToYou' | 'restaurantPublications';
  carouselProfileRestaurant?: boolean;
  items: CarouselItem[];
}

const variantMessages: Record<string, string> = {
  visited: 'Você ainda não visitou nenhum restaurante. Que tal começar agora?',
  saved:
    'Nenhum restaurante nos seus Salvos. Explore e salve lugares que você quer conhecer!',
  menu: 'Nenhum cardápio encontrado.',
  influencers: 'Nenhuma recomendação de influenciadores por aqui ainda.',
  closeToYou: 'Não encontramos restaurantes próximos a você no momento.',
  restaurantPublications: 'Nenhuma publicação do restaurante encontrada.',
};

export default function UserCarouselRestaurant({
  variant,
  carouselProfileRestaurant = false,
  items,
}: Props) {
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const data = useMemo(() => {
    if (variant === 'visited' && carouselProfileRestaurant) {
      items.sort((a, b) => {
        const aPressed = selectedPins.includes(a.id) ? 0 : 1;
        const bPressed = selectedPins.includes(b.id) ? 0 : 1;
        return aPressed - bPressed;
      });
    }
    return items;
  }, [variant, carouselProfileRestaurant, selectedPins, items]);

  function handleInfluencerCardPress(id: string){
    if (variant === 'restaurantPublications') {
      return router.push({
        pathname: '/PublicationInfluencer',
        params: {
          restaurantId: id,
        },
      });
    }
    return router.push({
      pathname: '/InfluencerProfile',
      params: {
        restaurantId: id,
      },
    });
  }

  if (
    ['visited', 'saved', 'menu', 'influencers', 'closeToYou', 'restaurantPublications'].includes(
      variant,
    ) &&
    data.length === 0
  ) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={styles.avisoTexto}>{variantMessages[variant]}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CarouselItem }) => {
    const isSelected = selectedPins.includes(item.id);

    if (variant === 'influencers' || variant === 'restaurantPublications') {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleInfluencerCardPress(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
          <Text style={styles.nome}>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    if (variant === 'menu') {
      return (
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
          <Text style={styles.nome}>{item.name}</Text>
        </View>
    );
  }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push({
            pathname: '/restaurantProfile',
            params: {
              restaurantId: item.id,
            },
          })}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.photo }} style={styles.image} />
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
                  color: isSelected ? Colors.orange.orangeBold : '#FF770040',
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.nome}>{item.name}</Text>

        {variant === 'visited' && !item.stars && (
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

        {variant === 'visited' && item.stars && (
          <View style={styles.avalieAqui}>
            {Array.from({ length: 5 }, (_, i) => (
              <AntDesign
                key={i}
                name="star"
                size={12}
                color={
                  i < (item.stars ?? 0) ? Colors.orange.orangeStandard : '#FF914B40'
                }
              />
            ))}
          </View>
        )}

        {['saved'].includes(variant) && item.averagePrice && (
          <View style={styles.avaliacaoRow}>
            <AntDesign
              name="star"
              size={12}
              color={Colors.orange.orangeStandard}
            />
            <Text style={styles.nota}> {item.averagePrice.toFixed(1)}</Text>
            <Text style={styles.avaliacoes}> (0 avaliações)</Text>
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
        paddingBottom: 20,
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
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  nome: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.navyBlue,
  },
  avaliacaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  nota: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.navyBlue,
  },
  avaliacoes: {
    fontSize: 11,
    color: Colors.gray.grayMedium,
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
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.orange.orangeStandard,
    fontWeight: 'bold',
  },
  avisoTexto: {
    fontFamily: 'Poppins-Regular',
    paddingLeft: 1,
    textAlign: 'left',
    fontSize: 14,
    color: Colors.black,
    paddingHorizontal: 16,
    marginTop: 8,
  },
});
