import React, { useRef } from 'react';
import {View,StyleSheet,TextInput,TouchableOpacity,ScrollView,Image,Text,Animated,NativeSyntheticEvent,NativeScrollEvent} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/src/components/Header';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';

export default function TextFieldWithFilter() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isHidden = useRef(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (yOffset > 50 && !isHidden.current) {
      // fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      isHidden.current = true;
    } else if (yOffset <= 50 && isHidden.current) {
      // fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      isHidden.current = false;
    }
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <View style={styles.container}>
        <Header />
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Pesquisar"
              placeholderTextColor="#FF914B"
              style={styles.input}
            />
            <Image
            source={require('@/assets/images/icon-roleta.png')}
            style={styles.roulleteIcon}
            />
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="options" size={20} color="#FF914B" />
            </TouchableOpacity>
          </View>
        </View>

        {/*Banner*/}
        <Animated.View style={[styles.rouletteCardContainer, { opacity: fadeAnim },{height:fadeAnim.interpolate({inputRange:[0,1],outputRange:[0,200]})}]}>
          <TouchableOpacity onPress={() => console.log('Card pressionado')}>
            <Image
              source={require('@/assets/images/card-roulette.png')}
              style={styles.rouletteCard}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.title}>Em alta com nossos influencers</Text>
        <UserCarouselRestaurant variant="influencers" />

        <Text style={styles.title}>Restaurantes perto de você</Text>
        <UserCarouselRestaurant variant="closeToYou" />
        <Text style={styles.title}>Em alta com nossos influencers</Text>
        <UserCarouselRestaurant variant="influencers" />

        <Text style={styles.title}>Restaurantes perto de você</Text>
        <UserCarouselRestaurant variant="closeToYou" />
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1E6',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.orange.orangeBold,
    fontFamily: 'Poppins-Medium',
  },
  iconButton: {
    marginLeft: -50,
  },
  rouletteCardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  rouletteCard: {
    width: 400,
    height: 200,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  roulleteIcon: {
    width: 30,
    height: 30,
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
