import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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

export default function Roullete() {
  const rotation = useRef(new Animated.Value(0)).current;
  const totalRotation = useRef(0); // controle de rotação acumulada
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  const spinRoullete = () => {
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
    }).start(() => {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
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

          <View style={styles.roulleteWrapper}>
            <Animated.View
              style={[
                styles.spinContainer,
                { transform: [{ rotate: rotateInterpolation }] },
              ]}
            >
              <Image
                style={styles.spinImage}
                source={require('../../../../assets/images/roullete.png')}
              />
            </Animated.View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={spinRoullete}>
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
  roulleteWrapper: {
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
});
