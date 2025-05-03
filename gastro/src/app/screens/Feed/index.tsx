import React from 'react';
import { View, StyleSheet,TouchableOpacity, ScrollView, Image,Text, SafeAreaView, Pressable } from 'react-native';
import Header from '@/src/components/Header';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import SearchInput from '@/src/components/SearchInput';
import { router } from 'expo-router';

export default function TextFieldWithFilter() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
          <Header name={'Isabella'} nickName={''} />
            <View style={{ marginHorizontal: '3%' }}>              
              <Pressable  onPress={() => router.push({ pathname: "/screens/Search" })}>
                <SearchInput   
                  value={''}
                  editable={false}
                  onChangeText={() => {}}/>
              </Pressable >
            </View>

          {/*Banner*/}
          <View style={[styles.rouletteCardContainer]}>
            <TouchableOpacity onPress={() => console.log('Card pressionado')}>
              <Image
                source={require('@/assets/images/card-roulette.png')}
                style={styles.rouletteCard}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Em alta com nossos influencers</Text>
          <UserCarouselRestaurant variant="influencers" />

          <Text style={styles.title}>Restaurantes perto de você</Text>
          <UserCarouselRestaurant variant="closeToYou" />
          <Text style={styles.title}>Em alta com nossos influencers</Text>
          <UserCarouselRestaurant variant="influencers" />

          <Text style={styles.title}>Restaurantes perto de você</Text>
          <UserCarouselRestaurant variant="closeToYou" />
      </ScrollView>
    </SafeAreaView>
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
    height: 50
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.orange.orangeBold,
    fontFamily: 'Poppins-Medium',
    height: 50
  },
  iconButton: {
    marginLeft: -50,
  },
  rouletteCardContainer: {
    marginTop: 20,
    marginHorizontal: '3%'
  },
  rouletteCard: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 10,
  },  
  title: {
    fontFamily:'Poppins-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
