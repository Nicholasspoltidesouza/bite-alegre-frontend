import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Image } from 'react-native';



interface PhotoDishProps {
    urlFotoPrato: string;
    size?: number;
}


const PhotoDish: React.FC<PhotoDishProps> = ({ urlFotoPrato, size = 200 }) => {

    const styles = StyleSheet.create({
        container: {
          borderRadius: 20, // Bordas arredondadas
          overflow: 'hidden',
          shadowColor: '#000', // Cor da sombra
          shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
          shadowOpacity: 0.3, // Opacidade da sombra
          shadowRadius: 5, // Raio da sombra
          elevation: 5, // Sombra no Android
        },
        image: {
          borderRadius: 20, // Mantém o arredondamento
          resizeMode: 'cover', // Mantém a imagem ajustada
        },
      });



    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Image  source={{ uri: urlFotoPrato }} style={[styles.image, { width: size, height: size }]} />
        </View>
        
    );
};

export default PhotoDish;