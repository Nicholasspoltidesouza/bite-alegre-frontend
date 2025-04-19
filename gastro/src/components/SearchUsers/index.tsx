import { MaterialIcons } from "@expo/vector-icons";
import React from "react"
import { Image, View, Text, StyleSheet } from "react-native";

interface SearchUsersProps {
    name : string;
    nickname : string;
    profilePhoto : string;
}

const SearchUsers: React.FC<SearchUsersProps> = ({name,nickname,profilePhoto}) => {
    return (
    <View style={styles.container}>    
        <View style={styles.imageContainer}>
            {profilePhoto ? (
                <Image source={{ uri: profilePhoto}} style={styles.image}/>
            ):
            (
                <View style={styles.placeholderPhoto}>
                    <MaterialIcons name="image" size={32} color='#888'/>
                </View>
            )}
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.nickname}>@{nickname}</Text>
        </View>

    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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
        borderRadius: 65,
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
      nickname: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 4,
      },
});

export default SearchUsers