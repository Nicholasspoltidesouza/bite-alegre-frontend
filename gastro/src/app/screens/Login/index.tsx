import Colors from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from "react-native";

export default function Login() {
    return (
        <LinearGradient
            colors={[Colors.orange.orangeStandard, Colors.orange.orangeStandard, Colors.orange.orangeLight, Colors.white]}
            locations={[0, 0.6, 1, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <Image
                source={require("../../../../assets/images/logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />

            <View style={styles.formWrapper}>
                <View style={styles.formContainer}>
                    <Text style={styles.welcome}> Bem-vindo de volta! </Text>

                    <TextInput
                        placeholder="Email"
                        style={styles.textField}
                        placeholderTextColor={Colors.orange.orangeStandard}
                    />
                    <TextInput
                        placeholder="Senha"
                        style={styles.textField}
                        secureTextEntry
                        placeholderTextColor={Colors.orange.orangeStandard}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.outlinedButton}>
                            <Text style={styles.outlinedText}>Cadastre-se</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.filledButton}>
                            <Text style={styles.filledText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.linkText}>
                            Cadastre seu restaurante <Text style={{ fontWeight: "bold" }}>aqui!</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        width: 389,
        height: 219,
        marginTop: 218,
        alignSelf: "center",
    },

    formWrapper: {
        position: "absolute",
        bottom: 0, 
        width: "100%",
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    
    formContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    welcome: {
        fontSize: 18,
        fontFamily: "Poppins-Medium",
        color: Colors.orange.orangeWelcome,
        marginBottom: 20,
    },

    textField: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.textField.lightResearch,
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        fontSize: 16,
        color: Colors.black, 
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 16,
        gap: 12,
        width: "100%",
    },

    outlinedButton: {
        flex: 1,
        marginRight: 8,
        borderColor: Colors.orange.orangeStandard,
        borderWidth: 2,
        borderRadius: 24,
        paddingVertical: 10,
        alignItems: "center",
    },

    outlinedText: {
        color: Colors.orange.orangeStandard,
        fontWeight: "bold",
    },

    filledButton: {
        flex: 1,
        backgroundColor: Colors.orange.orangeStandard,
        borderRadius: 24,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    filledText: {
        color: Colors.white,
        fontWeight: "bold",
    },
    linkText: {
        fontSize: 14,
        color: Colors.orange.orangeStandard,
    },
});