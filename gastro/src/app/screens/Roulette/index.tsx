import { RestaurantDTO } from '@/src/@types/DTO';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Roulette() {
  const rotation = useRef(new Animated.Value(0)).current;
  const totalRotation = useRef(0);
  const router = useRouter();

  const { vibe, budget } = useLocalSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantDTO | null>(null);

  const { getRandomRestaurant, loading, error } = useRestaurantApi();

  const fetchRestaurant = async () => {
    if (!vibe || !budget) return;
    const result = await getRandomRestaurant(String(vibe), Number(budget));
    if (result) {
      setRestaurant(result);
    }
  };

  const spinRoulette = () => {
    setShowConfetti(false);

    const fullSpins = 360 * 5;
    const randomOffset = Math.floor(Math.random() * 360);
    const spinValue = fullSpins + randomOffset;

    totalRotation.current += spinValue;

    Animated.timing(rotation, {
      toValue: totalRotation.current,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start(async () => {
      setShowConfetti(true);
      await fetchRestaurant();
      setShowResult(true);

      setTimeout(() => {
        setShowConfetti(false);
        setShowResult(false);
      }, 3500);
    });
  };

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1 }}>
      {showConfetti && (
        <Image
          source={require('../../../../assets/images/confetti.gif')}
          style={styles.confettiFullScreen}
        />
      )}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#FFB370', '#FF914B']}
          locations={[0.5, 0.95]}
          style={styles.gradient}
        />
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.description}>
          A indecisão acabou! Com um toque, sugerimos o restaurante perfeito para você, baseado nos seus gostos e experiências.
        </Text>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={styles.pointerImage}
            source={require('../../../../assets/images/pointer.png')}
          />

          <View style={styles.rouletteWrapper}>
            <Animated.View
              style={[
                styles.spinContainer,
                { transform: [{ rotate: rotateInterpolation }] },
              ]}
            >
              <Image
                style={styles.spinImage}
                source={require('../../../../assets/images/roulette.png')}
              />
            </Animated.View>
            {showResult && restaurant && (
              <View style={styles.resultContainer}>
                <Image
                  source={{ uri: restaurant.profilePhoto }}
                  style={styles.resultImage}
                />
                <Text style={styles.resultName}>{restaurant.name}</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={spinRoulette} disabled={loading}>
          <Text style={styles.buttonText}>Sortear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  description: {
    marginTop: 60,
    textAlign: 'justify',
    fontSize: 20,
    marginBottom: 80,
    maxWidth: 280,
    color: 'white',
  },
  rouletteWrapper: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 55,
  },
  spinContainer: {
    width: 350,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinImage: {
    width: 420,
    height: 420,
    resizeMode: 'contain',
    position: 'absolute',
  },
  confettiFullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#06C1B1',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 57,
    left: 30,
    backgroundColor: '#FF770090',
    borderRadius: 100,
    padding: 10,
  },
  gradient: {
    flex: 1,
  },
  pointerImage: {
    position: 'absolute',
    top: '-3%',
    zIndex: 2,
    width: 60,
    resizeMode: 'contain',
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '30%',
    zIndex: 11,
  },
  resultImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  resultName: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
});
