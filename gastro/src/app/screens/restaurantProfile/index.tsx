import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import Accordion from '@/src/components/Accordion';
import { FontAwesome, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface RestaurantProfileProps {
  name: String;
}

const RestaurantProfile: React.FC<RestaurantProfileProps> = ({name = "Nome do Restaurante"}) => {

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
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 8,
      marginTop: 15,
      textAlign: 'center',
    },
    infoGrid: {
      marginTop: 10,
      marginLeft: 50,
      marginRight: 50,
    }
  });

  return (
    <View>
      <HeaderPerfilRestaurante
        urlFotoBanner={'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/5a/28/0e/salao-principal.jpg?w=600&h=-1&s=1'}
        urlFotoPerfil={'https://static.vecteezy.com/ti/vetor-gratis/p1/11874816-ilustracao-em-chef-logotipo-design-logotipo-do-restaurante-vetor.jpg'}
      ></HeaderPerfilRestaurante>

      <View style={styles.infos}>

        <Text style={styles.title}>{name}</Text>

        <View style={styles.infoGrid}>
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
    </View>
  );
}

export default RestaurantProfile;
