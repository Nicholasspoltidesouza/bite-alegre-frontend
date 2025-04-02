import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";



interface PhotoDishProps {
    urlFotoPrato?: string;
}


const PhotoDish: React.FC<PhotoDishProps> = ({ urlFotoPrato }) => {

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
        mageBackground: {
            width: '100%',
            height: '100%',
        }

    });



    return (
        <View>
            <ImageBackground
                source={{ uri: urlFotoPrato }}
                style={styles.mageBackground}
            >
            </ImageBackground>
        </View>
    );
};

export default PhotoDish;