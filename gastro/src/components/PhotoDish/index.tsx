import React, { useRef } from "react";
import { View, StyleSheet, Text, Image, Animated, TouchableOpacity } from "react-native";
import { Foundation } from '@expo/vector-icons';

interface PhotoDishProps {
  urlFotoPrato: string;
  descricao: string;
  size?: number;
  showStar?: boolean;
}

const CARD_WIDTH = 153;
const CARD_HEIGHT = 156;
const CARD_MARGIN = 12;

const PhotoDish: React.FC<PhotoDishProps> = ({
  urlFotoPrato,
  descricao,
  size = CARD_WIDTH,
  showStar = false,
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isFlippedRef = useRef(false);

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: isFlippedRef.current ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      isFlippedRef.current = !isFlippedRef.current;
    });
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={flipCard}>
      <View style={styles.card}>
        {showStar && (
          <View style={styles.starIcon}>
            <Foundation name="star" size={24} color="#FF914B" />
          </View>
        )}
        
        <Animated.View style={[styles.imageWrapper, frontAnimatedStyle]}>
          <Image 
            source={{ uri: urlFotoPrato }}
            style={styles.image}
          />
        </Animated.View>

        <Animated.View style={[styles.imageWrapper, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.descriptionText}>{descricao}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: CARD_MARGIN,
    alignItems: 'flex-start',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  backCard: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#f8f8f8',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#1F2937',
    fontWeight: '500',
  },
  starIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
});

export default PhotoDish;