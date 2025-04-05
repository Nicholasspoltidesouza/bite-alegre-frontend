import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import RestaurantInformation from '@/src/components/RestaurantInformation';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const restaurantProfile: React.FC = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    carda: {
      color: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    precoMedio: {
      color: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,

    },
    infos: {
      marginTop: 30,
    }

  });

  return (
    <View>
      <HeaderPerfilRestaurante
        urlFotoBanner={'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/5a/28/0e/salao-principal.jpg?w=600&h=-1&s=1'}
        urlFotoPerfil={'https://static.vecteezy.com/ti/vetor-gratis/p1/11874816-ilustracao-em-chef-logotipo-design-logotipo-do-restaurante-vetor.jpg'}
      ></HeaderPerfilRestaurante>

      <View style={styles.infos}>
        <RestaurantInformation
        name={'Restaurante 01'}
        starCont={'4.6'}
        contReview={'102'}
        ></RestaurantInformation>
      </View>
    </View>
  );
}

export default restaurantProfile;
