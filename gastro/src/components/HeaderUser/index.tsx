import useLocation from "@/src/hooks/useLocation";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from "@expo/vector-icons";

const HeaderUser: React.FC = () => {
    const { latitude, longitude, subregion, errorMsg } = useLocation();
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF914B', 'transparent']}
                style={styles.container}>
                    <View  style={styles.location}>
                        <FontAwesome6 name="location-dot" size={11} color="#FFFFFF" style={styles.icon}/>
                        <Text style={styles.locationText} >{subregion ?? "Localização"}</Text>
                    </View>                
            </LinearGradient>          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 220
    },
    location: {
        flexDirection: "row",
        alignItems: "center",       
    },
    locationText: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: "white"
    },
    icon: {
        marginRight: 5
    }
});

export default HeaderUser;