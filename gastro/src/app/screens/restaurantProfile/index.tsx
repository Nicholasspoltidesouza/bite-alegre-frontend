import HeaderPerfilRestaurante from '@/src/components/HeaderPerfilRestaurante';
import RestaurantInformation from '@/src/components/RestaurantInformation';
import { View, StyleSheet } from 'react-native';


import React from 'react';
import PhotoDish from '@/src/components/PhotoDish';


const restaurantProfile: React.FC = () =>{

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

    
  });

  
  return (
    

    <div>  
    <HeaderPerfilRestaurante
      urlFotoBanner={'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/5a/28/0e/salao-principal.jpg?w=600&h=-1&s=1'}
      urlFotoPerfil={''}
    ></HeaderPerfilRestaurante>

    <div>
      <RestaurantInformation
        
      ></RestaurantInformation>


    </div>

    <div>
      <PhotoDish
      urlFotoPrato={'https://http2.mlstatic.com/D_NQ_NP_727308-MLB75452901548_042024-O-adesivo-prato-comida-brasileira-restaurante-prato-feito.webp'}
      ></PhotoDish>
    </div>

        <div>
            <p style={styles.carda}>
            Cardápio 
             </p>


          <p style={styles.precoMedio}>
          Preço médio: R$ 50,00
          </p>
           </div>
                    <div>
                      <p style={styles.carda}>
                      Influencers que já visitaram
                     </p>
                    </div>


           <div>



           </div>

    </div>

    
  );

  
}

export default restaurantProfile;
