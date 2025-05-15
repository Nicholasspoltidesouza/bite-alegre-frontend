import {StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import React from 'react';
import Colors from '@/src/constants/Colors';
import BaseModal from '@/src/components/BaseModal';

interface HeaderPerfilRestauranteProps {
  urlFotoBanner?: string;
  urlFotoPerfil?: string;
  isSelected?: boolean;
  isProfile?: boolean;
}

const HeaderPerfilRestaurante: React.FC<HeaderPerfilRestauranteProps> = ({
  urlFotoBanner,
  urlFotoPerfil,
  isSelected = false,
  isProfile = false,
}) => {
  const [selected, setSelected] = useState(isSelected);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handlePress = () => {
    if (isProfile) {
      setModalVisible(true);
    } else {
      setSelected(!selected);
    }
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
      backgroundColor: Colors.orange.orangeStandard,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    imageBackground: {
      width: '100%',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    pinButton: {
      margin: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gearButton: {
      margin: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      transform: [{ rotate: '90deg' }],
      color: selected ? Colors.orange.orangeBold : '#FF770040',
    },
    profileContainer: {
      width: 90,
      height: 90,
      borderRadius: 50,
      backgroundColor: Colors.orange.orangeMedium,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -40,
      borderColor: Colors.orange.orangeMedium,
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
    <SafeAreaView style={styles.container_banner}>
      <ImageBackground
        source={{ uri: urlFotoBanner }}
        style={styles.container}
        imageStyle={styles.imageBackground}
      >
        <TouchableOpacity
          style={isProfile ? styles.gearButton : styles.pinButton}
          onPress={handlePress}
        >
          {isProfile ? (
            <FontAwesome6 name="gear" size={24} color={Colors.white} />
          ) : (
            <AntDesign name="pushpin" size={24} style={styles.icon} />
          )}
        </TouchableOpacity>
      </ImageBackground>

      <SafeAreaView style={styles.profileContainer}>
        {urlFotoPerfil ? (
          <Image source={{ uri: urlFotoPerfil }} style={styles.profileImage} />
        ) : (
          <FontAwesome6
            name="user-large"
            size={40}
            color={Colors.white}
            style={styles.profileIcon}
          />
        )}
      </SafeAreaView>

      <BaseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HeaderPerfilRestaurante;
