import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";



interface PhotoDishProps {
    urlFotoPrato: string;
}


const PhotoDish: React.FC<PhotoDishProps> = ({ urlFotoPrato }) => {

    const styles = StyleSheet.create({
        

    });



    return (
        <ImageBackground
            source={{ uri: urlFotoPrato }}
        >
        </ImageBackground>
    );
};

export default PhotoDish;