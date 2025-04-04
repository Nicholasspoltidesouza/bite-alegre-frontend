import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import RestaurantInformation from '@/src/components/RestaurantInformation';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import PhotoDish from '@/src/components/PhotoDish';


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
        ></RestaurantInformation>
      </View>

      <View>
        <p style={styles.carda}>
          Cardápio
        </p>


        <p style={styles.precoMedio}>
          Preço médio: R$ 50,00
        </p>
      </View>

      <View>
        <PhotoDish
          urlFotoPrato={'https://img.freepik.com/fotos-premium/prato-de-comida-brasileira-em-fundo-fotografico_496782-1085.jpg?w=740'}
          descricao='Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem.' 
          showStar={true}
        ></PhotoDish>

        <PhotoDish
          urlFotoPrato={'https://img.freepik.com/fotos-premium/prato-de-comida-brasileira-em-fundo-fotografico_496782-1085.jpg?w=740'}
          descricao='Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem.' 
          showStar={false}
        ></PhotoDish>
      </View>
      
      <View>
        < p style={styles.carda}>
          Influencers que já visitaram
        </p>
      </View>


      <View>



      </View>

    </View>


  );


}

export default restaurantProfile;
