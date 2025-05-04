import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PhotoDish from '@/src/components/PhotoDish';
import Colors from '@/src/constants/Colors';
import { RestaurantDTO } from '@/src/@types/DTO';
import { router } from 'expo-router';

const CARD_WIDTH = 153;
const CARD_HEIGHT = 156;
const CARD_MARGIN = '3%';

interface Props {
  variant: 'visited' | 'saved' | 'menu' | 'influencers' | 'closeToYou';
  carouselProfileRestaurant?: boolean;
  restaurantsExternal: RestaurantDTO[];
}

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
    if (variant === 'visited' && carouselProfileRestaurant) {
      restaurantsExternal!.sort((a, b) => {
        const aPressed = selectedPins.includes(a.id!) ? 0 : 1;
        const bPressed = selectedPins.includes(b.id!) ? 0 : 1;
        return aPressed - bPressed;
      });
    }

    // if (variant === 'menu') {
    //   baseData.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
    // }

    return restaurantsExternal!;
     }, [variant, carouselProfileRestaurant, selectedPins, restaurantsExternal]);

    if ((variant === 'visited' || variant === 'saved') && data.length === 0) {
      return (
        <View style={{ padding: 16 }}>
          <Text style={styles.avisoTexto}>
            {variant === 'visited'
              ? 'Você ainda não visitou nenhum restaurante. Que tal começar agora?'
              : 'Nenhum restaurante nos seus Salvos. Explore e salve lugares que você quer conhecer!'}
          </Text>
        </View>
    );
  }


  const renderItem = ({ item }: { item: RestaurantDTO }) => {
    const isSelected = selectedPins.includes(item.id!);
    const tela = '/screens/restaurantProfile?restaurantId=' + item.id!

    if (variant === 'influencers') {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log(`Clicou em ${item.name}`)}
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>            
            <Image source={{ uri: item.profilePhoto }} style={styles.image} />
          </View>
          <Text style={styles.nome}>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    // if (variant === 'menu') {
    //   return (
    //     <PhotoDish
    //       urlFotoPrato={item.profilePhoto}
    //       descricao={item.name ?? ''}
    //       showStar={item.favorito}
    //     />
    //   );
    // }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push({ pathname: tela as any})}//TALVEZ TENHA QUE MUDAR !
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.profilePhoto }} style={styles.image} />
          {['visited', 'saved', 'closeToYou'].includes(variant) && (
            <TouchableOpacity
              style={styles.pinButton}
              onPress={() => togglePin(item.id!)}
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
                color={i < item.stars! ? '#FF914B' : '#FF914B40'}
              />
            ))}
          </View>
        )}

        {['saved', 'closeToYou'].includes(variant) && item.averagePrice !== null && (
          <View style={styles.avaliacaoRow}>
            <AntDesign name="star" size={12} color="#FF914B" />
            <Text style={styles.nota}> {item.averagePrice?.toFixed(1)}</Text>
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
      keyExtractor={(item) => item.id!}
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
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FF914B',
    fontWeight: 'bold',
  },
  avisoTexto: {
    fontFamily: 'Poppins-Regular',
    paddingLeft: 1,
    textAlign: 'left',
    fontSize: 14,
    color : Colors.black,    
    paddingHorizontal: 16,
    marginTop: 8,
  },
});