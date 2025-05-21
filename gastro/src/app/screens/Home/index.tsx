import Colors from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

export default function Home() {
    return (
        <LinearGradient
            colors={[Colors.orange.orangeStandard, Colors.orange.orangeStandard, Colors.orange.orangeLight, Colors.white]}
            locations={[0, 0.6, 1, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <View style={styles.content}>
                <Image
                    source={require("../../../../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Primeira vez aqui?{" "}
                        <TouchableOpacity onPress={() => router.push({ pathname: "/screens/Register" })}>
                            <Text style={styles.bold}>
                                Cadastre-se
                            </Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.text}>
                        Cadastre seu restaurante{" "}
                        <TouchableOpacity onPress={() => console.log("Entrar pressionado")}>
                            <Text style={styles.bold}>aqui!</Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.text}>
                        Já possui uma conta?{" "}
                        <TouchableOpacity onPress={() => router.push({ pathname: "/screens/Login" })}>
                            <Text style={styles.bold}>Entrar</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 389,
        height: 219,
        marginTop: 218,
        marginBottom: 20,
    },
    textContainer: {
        paddingTop: 70,
        alignItems: "center",
        gap: 12,
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        color: Colors.white,
        textAlign: "center",
    },
    bold: {
        fontFamily: "Poppins-ExtraBold",
        fontSize: 20,
        fontWeight: "bold",
    },
});
