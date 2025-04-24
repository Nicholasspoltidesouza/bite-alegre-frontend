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
  variant: 'visitados' | 'salvos' | 'cardapio' | 'influenciadores';
  carroselProfileRestaurante?: boolean;
}

const mockData: Record<Props['variant'], Restaurante[]> = {
  visitados: [
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
      id: '10',
      nome: 'McDonalds',
      nota: 3,
      avaliacoes: 12,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTbylgvqdhCRDePMOoCw0NDYawGSvcbZtTkZeGI0m9njOLAAo0RMI3LzByKSlfrdrSdOY&usqp=CAU',
      visitado: true,
    },
    {
      id: '20',
      nome: 'BK',
      nota: 3,
      avaliacoes: 12,
      imagem: 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2020/11/06/2d538d67-7546-44a6-b322-fccd43f7bbeb.png',
      visitado: true,
    },
  ],
  salvos: [
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
      nome: 'Petiskeira',
      nota: 4.6,
      avaliacoes: 105,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqDv3W4Jq3MMQJpmjx9O-NP1azs14vd8uHDg&s',
      visitado: false,
    },
    {
      id: '5',
      nome: 'Marques',
      nota: 4.6,
      avaliacoes: 105,
      imagem: '',
      visitado: false,
    },
    {
      id: '6',
      nome: 'Cia Do Sabor',
      nota: 4.6,
      avaliacoes: 105,
      imagem: '',
      visitado: false,
    },
    {
      id: '7',
      nome: 'Mamamia',
      nota: 4.6,
      avaliacoes: 105,
      imagem: '',
      visitado: false,
    },
    {
      id: '8',
      nome: 'Subway',
      nota: 4.6,
      avaliacoes: 105,
      imagem: '',
      visitado: false,
    },
  ],
  cardapio: [
    {
      id: '9',
      nome: 'Hambúrguer',
      nota: null,
      avaliacoes: null,
      imagem: 'https://www.estadao.com.br/resizer/v2/77XTHHCCLBEXLC2Y5RK4PN37CE.jpg?quality=80&auth=a86d285f74ec7c08de7ba6ec10d557a463d905ffec2e56009d737687ac6054a1&width=720&height=503&focal=553,494',
      favorito: true,
    },
    {
      id: '10',
      nome: 'Batata Frita',
      nota: null,
      avaliacoes: null,
      imagem: 'https://static.itdg.com.br/images/1200-630/150ba2d5d2874bed8561dd8edbdc1323/164773-original.jpg',
      favorito: false,
    },
  ],
  influenciadores: [
    {
      id: '11',
      nome: 'Mustacha',
      nota: null,
      avaliacoes: null,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvPy-dEH8DVe1RUAf5Tl2e2kF89IATkpPaw&s',
    },
    {
      id: '12',
      nome: 'Comilao',
      nota: null,
      avaliacoes: null,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpIlMYxMPWsMsTIXong5Dsrq1IKfAAXusWyA&s',
    },
  ],
};

export default function UserCarouselRestaurant({ variant, carroselProfileRestaurante = false }: Props) {
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const togglePin = (id: string) => {
    setSelectedPins((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const data = useMemo(() => {
    let baseData = [...mockData[variant]];

    if (variant === 'visitados' && carroselProfileRestaurante) {
      baseData.sort((a, b) => {
        const aPressed = selectedPins.includes(a.id) ? 0 : 1;
        const bPressed = selectedPins.includes(b.id) ? 0 : 1;
        return aPressed - bPressed;
      });
    }

    if (variant === 'cardapio') {
      baseData.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
    }

    return baseData;
  }, [variant, carroselProfileRestaurante, selectedPins]);

  const renderItem = ({ item }: { item: Restaurante }) => {
    const isSelected = selectedPins.includes(item.id);

    if (variant === 'cardapio') {
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
          {['visitados', 'salvos'].includes(variant) && (
            <TouchableOpacity style={styles.pinButton} onPress={() => togglePin(item.id)}>
              <AntDesign name="pushpin" size={16}  style={{
                  transform: [{ rotate: '90deg' }],
                  color: isSelected ? '#FF7700' : '#FF770040',
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.nome}>{item.nome}</Text>

        {variant === 'visitados' && item.nota === null && (
         <TouchableOpacity style={styles.botaoAvaliar}>
        {Array.from({ length: 5 }, (_, i) => (
            <AntDesign
              key={i} name="star"size={12} color="#FF914B40" style={{ marginRight: 2 }}
      />
    ))}
    <Text style={styles.botaoAvaliarTexto}>Avalie aqui!</Text>
  </TouchableOpacity>
)}

        {variant === 'visitados' && item.nota !== null && (
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

        {variant === 'salvos' && item.nota !== null && (
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