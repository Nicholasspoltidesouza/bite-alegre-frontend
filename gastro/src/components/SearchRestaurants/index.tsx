import React from "react"
import { Image ,View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";


interface SearchRestaurantsProps {
    name : string;
    averagePrice : number;
    note : number;
    location : string;
    profilePhoto? : string
    restaurantId: string
}

const SearchRestaurants: React.FC<SearchRestaurantsProps> = ({name, averagePrice, note, location, profilePhoto, restaurantId}) => {
    const iconSize = 24;
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => {router.push({
            pathname: "/screens/restaurantProfile",
            params: {
              restaurantId: restaurantId,
            },
          })}} >
            <View style={styles.imageContainer}>
                {profilePhoto ? (
                    <Image source={{ uri: profilePhoto }} style={styles.image} />
                ): 
                (
                    <View style={styles.placeholderPhoto}>
                        <MaterialIcons name="image" size={32} color="#888" />
                        </View>
            )}
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>R$ {averagePrice}</Text>
                <View style={styles.detailsContainer}>
                <MaterialIcons name="star" size={iconSize} color="#FF914B" />
                <Text style={styles.detailsText}> {note} | {location}</Text>
                </View>
            </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 12,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        marginVertical: 6,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
      },
      imageContainer: {
        width: 86,
        height: 86,
        borderRadius: 20,
        backgroundColor: "#EDEDED",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
      },
      image: {
        width: 86,
        height: 86,
        borderRadius: 20,
      },
      placeholderPhoto: {
        width: 86,
        height: 86,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        alignItems: "center",
        justifyContent: "center",
      },
      textContainer: {
        flex: 1,
        justifyContent: "center",
      },
      name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF914B",
        marginBottom: 4,
      },
      price: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 4,
      },
      detailsContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      detailsText: {
        fontSize: 13,
        color: "#FF914B",
        marginLeft: 4,
      },
});
export default SearchRestaurants