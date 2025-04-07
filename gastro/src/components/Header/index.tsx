import useLocation from "@/src/hooks/useLocation";
import React from "react";
import { View, StyleSheet, Text, Platform, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const Header: React.FC = () => {
    const { subregion } = useLocation();
    return (
        <View style={styles.container}>            
            <LinearGradient
                colors={['#FF914B', 'transparent']}
                style={styles.container}>
                     <View style={styles.content}>
                        <View style={styles.photo}>
                            <MaterialIcons name="person" size={60} color="#fcd5b5" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.greeting}>Olá, <Text style={styles.bold}>manu!</Text> Bora jantar?</Text>
                            <View style={styles.locationRow}>
                                <MaterialIcons name="location-on" size={15} color="#FFFFFF"/>
                                <Text style={styles.locationText}>Localização</Text>
                                <MaterialIcons name="expand-more" size={16} color="#fff" />
                            </View>
                        </View>
                    </View>                   
            </LinearGradient>          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 220,
    },
    locationText: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: "white"
    },
    content: {
        paddingTop: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    photo: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        padding: 10,
        marginRight: 15,
    },
        textContainer: {
        flex: 1,
    },
    greeting: {
        fontFamily: "Poppins-Regular",
        color: '#fff',
        fontSize: 22,
    },
    bold: {
        fontWeight: 'bold',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Header;