import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import RestaurantInformation from '@/src/components/RestaurantInformation';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import Accordion from '@/src/components/Accordion';
import { FontAwesome, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
        <Accordion 
        title={'4.7'}
        description={'(100 avalições)'}
        content={''} 
        staticArrow={true} 
        children={<Foundation name="star" size={24} color="#FF914B" />}>
        </Accordion>

        <Accordion 
        title={'Descrição'}
        description={''}
        content={'Descrição'} 
        staticArrow={false} 
        children={<Ionicons name="document-text-outline" size={24} color="#FF914B" />}>
        </Accordion>

        <Accordion 
        title={'Endereço do Restaurante'}
        description={''}
        content={'Endereço do Restaurante'} 
        staticArrow={false} 
        children={<FontAwesome6 name="location-dot" size={24} color="#FF914B" />}>
        </Accordion>

        <Accordion 
        title={'Aberto agora'}
        description={''}
        content={'Horario'} 
        staticArrow={false} 
        children={<FontAwesome name="cutlery" size={24} color="#FF914B" />}>
        </Accordion>

        <Accordion 
        title={'Estive Aqui'}
        description={''}
        content={''} 
        staticArrow={true} 
        children={<MaterialCommunityIcons name="calendar-start" size={24} color="#FF914B" />}>
        </Accordion>

      </View>
    </View>
  );
}

export default restaurantProfile;
