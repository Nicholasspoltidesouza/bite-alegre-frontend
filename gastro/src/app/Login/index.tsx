import Colors from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuthApi } from "@/src/hooks/useAuthApi";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();
    const { login, loading } = useAuthApi();

    const handleLogin = async () => {
        let hasError = false;
        if (!email) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }
        if (!password) {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }
        if (hasError) {
            Alert.alert("Erro", "Preencha email e senha.");
            return;
        }
        const result = await login({
            email, password,
            name: "",
            nickname: "",
            phone: "",
            gender: null,
            userType: ""
        });
        if (result === null) {
            Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
            return;
        }
        Alert.alert("Sucesso", "Login realizado!");
        router.push("/Feed");
    };

    return (
        <LinearGradient
            colors={[Colors.orange.orangeStandard, Colors.orange.orangeStandard, Colors.orange.orangeLight, Colors.white]}
            locations={[0, 0.6, 1, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <Image
                    source={require("../../../assets/images/logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />

                <View style={styles.formWrapper}>
                    <View style={styles.formContainer}>
                        <Text style={styles.welcome}> Bem-vindo de volta! </Text>

                        <TextInput
                            placeholder="Email"
                            style={[
                                styles.textField,
                                emailError && { borderColor: Colors.redError, borderWidth: 2 }
                            ]}
                            placeholderTextColor={Colors.orange.orangeStandard}
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Senha"
                            style={[
                                styles.textField,
                                passwordError && { borderColor: Colors.redError, borderWidth: 2 }
                            ]}
                            secureTextEntry
                            placeholderTextColor={Colors.orange.orangeStandard}
                            value={password}
                            onChangeText={text => {
                                setPassword(text);
                                setPasswordError(false);
                            }}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity 
                                style={styles.outlinedButton}
                                onPress={() => router.push('/SignupUser')}
                            >
                                <Text style={styles.outlinedText}>Cadastre-se</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.filledButton}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                <Text style={styles.filledText}>{loading ? "Entrando..." : "Entrar"}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/SignupRestaurant')}>
                            <Text style={styles.linkText}>
                                Cadastre seu restaurante <Text style={{ fontWeight: "bold" }}>aqui!</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'space-between',
    },

    logo: {
        width: 389,
        height: 219,
        marginTop: Platform.OS === 'ios' ? 100 : 80,
        alignSelf: "center",
    },

    formWrapper: {
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: Platform.OS === 'ios' ? 32 : 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300,
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