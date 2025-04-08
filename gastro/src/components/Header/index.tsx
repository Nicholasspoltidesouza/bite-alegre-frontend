import useLocation from "@/src/hooks/useLocation";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, StatusBar, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from 'expo-font';

const Header: React.FC = () => {
    const { subregion, refreshLocation } = useLocation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
      Font.loadAsync({
        'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
      }).then(() => setFontsLoaded(true));
    }, []);
  
    if (!fontsLoaded) return null;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF914B" translucent={false} />        
            <LinearGradient
                colors={['#FF914B', 'rgb(255, 255, 255)']}
                locations={[0.45, 0.95]} 
                style={styles.container}>
                     <View style={styles.content}>
                        <View style={styles.photo}>
                            <MaterialIcons name="person" size={60} color="#fcd5b5" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.greeting}>Olá, <Text style={styles.bold}>manu!</Text> Bora jantar?</Text>
                            <TouchableOpacity onPress={refreshLocation}>
                                <View style={styles.locationRow}>
                                    <MaterialIcons name="location-on" size={13} color="#FFFFFF" style={styles.locationIcon}/>
                                    <Text style={styles.locationText}>{subregion ?? "Localização"}</Text>
                                    <MaterialIcons name="expand-more" size={16} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>                   
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200,
        borderBottomEndRadius: 20
    },
    locationText: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        color: "white"
    },
    content: {
        paddingTop: 40,
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
    locationIcon: {
        marginBottom: 2,
      },
});

export default Header;