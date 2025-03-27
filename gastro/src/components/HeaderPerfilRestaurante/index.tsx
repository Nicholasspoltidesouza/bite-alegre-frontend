import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface HeaderPerfilRestauranteProps {
  urlFotoBanner: string;
  urlFotoPerfil: string;
}

const HeaderPerfilRestaurante: React.FC<HeaderPerfilRestauranteProps> = ({ urlFotoBanner, urlFotoPerfil }) => {
  return (
    <View style={styles.container_banner}>
      <ImageBackground source={{ uri: urlFotoBanner }} style={styles.container} imageStyle={styles.imageBackground}>
        <TouchableOpacity style={styles.pinButton}>
          <AntDesign name="pushpin" size={24} color="#FF770040" style={styles.icon} />
        </TouchableOpacity>
      </ImageBackground>
      
      <View style={styles.profileContainer}>
        {urlFotoPerfil ? (
          <Image source={{ uri: urlFotoPerfil }} style={styles.profileImage} />
        ) : (
          <FontAwesome6 name="user-large" size={40} color="#FFF" style={styles.profileIcon} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_banner: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 15,
    backgroundColor: '#FF914B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageBackground: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  pinButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    transform: [{ rotate: '90deg' }], 
  },
  profileContainer: {
    width: 90,
    height: 90,
    borderRadius: 40,
    backgroundColor: '#FFB370',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -40,
    borderColor: '#FFB370',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  profileIcon: {
    alignSelf: 'center',
  },
});

export default HeaderPerfilRestaurante;

// import React from 'react';
// import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// interface HeaderPerfilRestauranteProps {
//   urlFotoBanner: string;
//   urlFotoPerfil: string;
// }

// const HeaderPerfilRestaurante: React.FC<HeaderPerfilRestauranteProps> = ({ urlFotoBanner, urlFotoPerfil }) => {
//   return (
//     <div style={styles.container_banner}>
//       <ImageBackground source={{ uri: urlFotoBanner }} style={styles.container} imageStyle={styles.imageBackground}>
//         <TouchableOpacity style={styles.bola}>
//           <AntDesign name="pushpin" size={24} color="#FF770040" style={styles.icon} />
//         </TouchableOpacity>
//       </ImageBackground>

//       <div style={styles.bola_perfil}>
//         <FontAwesome6 name="user-large" size={24} color="#FFFDFC" style={styles.perfil} />
//       </div>

//     </div>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: 200,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//     padding: 10,
//     backgroundColor: '#FF914B',
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25
//   },
//   imageBackground: {
//     overflow: 'hidden',
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25
//   },
//   bola: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
    
//   },
//   icon: {
//     transform: [{ rotate: '90deg' }], 
//   },
//   bola_perfil: {
//     backgroundColor: "black",
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     display: 'flex',
//     alignContent: 'center',
//     position: 'absolute'
//   },
//   perfil: {
//     alignItems: 'center'
//   },
//   container_banner: {
//     display: 'flex'
//   }
// });

// export default HeaderPerfilRestaurante;