import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface HeaderPerfilRestauranteProps {
  urlFotoBanner?: string;
  urlFotoPerfil?: string;
  isSelected?: boolean;
}

const HeaderPerfilRestaurante: React.FC<HeaderPerfilRestauranteProps> = ({ urlFotoBanner, urlFotoPerfil, isSelected = false }) => {
  
  const [selected, setSelected] = useState(isSelected);
  
    useEffect(() => {
      setSelected(isSelected);
    }, [isSelected]);
  
    const handlePress = () => {
      setSelected(!selected);
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
        color: selected ? '#FF7700' : '#FF770040', 
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

  return (
    <View style={styles.container_banner}>
      <ImageBackground source={{ uri: urlFotoBanner }} style={styles.container} imageStyle={styles.imageBackground} >
        <TouchableOpacity style={styles.pinButton} onPress={handlePress} >
          <AntDesign name="pushpin" size={24}  style={styles.icon}  />
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



export default HeaderPerfilRestaurante;