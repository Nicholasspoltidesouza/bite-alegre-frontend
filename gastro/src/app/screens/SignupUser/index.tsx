import { UserDTO } from "@/src/@types/DTO";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import SignupHeader from "@/src/components/SignupHeader";
import CustomTextInput from "@/src/components/TextFieldCadastroUsuario";
import { useCreateUser } from "@/src/hooks/useUserApi";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignupUser = () => {
  const router = useRouter();
  const { userData } = useLocalSearchParams();

  const [name, setName] = useState<string>(
    userData ? JSON.parse(userData as string).name : ""
  );
  const [nickname, setNickname] = useState<string>(
    userData ? JSON.parse(userData as string).nickname : ""
  );
  const [email, setEmail] = useState<string>(
    userData ? JSON.parse(userData as string).email : ""
  );
  const [password, setPassword] = useState<string>(
    userData ? JSON.parse(userData as string).password : ""
  );
  const [phone, setPhone] = useState<string>(
    userData ? JSON.parse(userData as string).phone : ""
  );
  const [gender, setGender] = useState<string | null>(
    userData ? JSON.parse(userData as string).gender : null
  );
  const [birthDate, setBirthDate] = useState<string>(
    userData ? JSON.parse(userData as string).birthDate : ""
  );
  const [userType, setUserType] = useState<string | null>(
    userData ? JSON.parse(userData as string).userType : "Cadastro de Usuário"
  );

  const [birthDateTouched, setBirthDateTouched] = useState<boolean>(false);

  const { createUser } = useCreateUser();

  const insets = useSafeAreaInsets();

  const validateName = (text: string): string | null => {
    if (text.length < 2) return "Nome deve ter no mínimo 2 caracteres";
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(text)) return "Nome deve conter apenas letras";
    if (text.length > 50) return "Nome deve ter no máximo 50 caracteres";
    return null;
  };

  const validateNickname = (text: string): string | null => {
    if (text.length < 2) return "Apelido deve ter no mínimo 2 caracteres";
    if (text.length > 30) return "Apelido deve ter no máximo 30 caracteres";
    return null;
  };

  const validateEmail = (text: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) return "Email é obrigatório";
    if (!emailRegex.test(text)) return "Formato de email inválido";
    if (text.length > 100) return "Email deve ter no máximo 100 caracteres";
    return null;
  };

  const validatePassword = (text: string): string | null => {
    if (text.length < 6) return "Senha deve ter no mínimo 6 caracteres";
    if (text.length > 50) return "Senha deve ter no máximo 50 caracteres";
    return null;
  };

  const validatePhone = (text: string): string | null => {
    const cleaned = text.replace(/\D/g, "");
    if (!cleaned) return "Telefone é obrigatório";
    if (!/^\d{10,11}$/.test(cleaned)) return "Formato de telefone inválido";
    return null;
  };

  const validateBirthDate = (text: string): string | null => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!text) return "Data de nascimento é obrigatória";
    if (!dateRegex.test(text)) return "Formato deve ser DD/MM/AAAA";
    const [day, month, year] = text.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    )
      return "Data inválida";
    return null;
  };

  const isFormValid =
    name &&
    nickname &&
    email &&
    password &&
    phone &&
    birthDate &&
    gender &&
    userType &&
    !validateName(name) &&
    !validateNickname(nickname) &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    !validatePhone(phone) &&
    !validateBirthDate(birthDate);

  const handleSubmit = () => {
    if (
      !name ||
      !nickname ||
      !email ||
      !password ||
      !phone ||
      !birthDate ||
      !gender ||
      !userType
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const errors = [
      validateName(name),
      validateNickname(nickname),
      validateEmail(email),
      validatePassword(password),
      validatePhone(phone),
      validateBirthDate(birthDate),
    ].filter((error) => error !== null);

    if (errors.length > 0) {
      Alert.alert("Erro de Validação", errors.join("\n"));
      return;
    }

    const [day, month, year] = birthDate.split("/");
    const isoBirthDate = `${year}-${month}-${day}T00:00:00Z`;
    const formattedGender =
      gender === "PREFIRO NÃO INFORMAR" ? "NAO_QUERO_INFORMAR" : gender;
    const formattedUserType =
      userType === "Cadastro de Restaurante" ? "RESTAURANTE" : "USUARIO";

    const userData = {
      name,
      nickname,
      email,
      password,
      phone,
      gender: formattedGender,
      birthDate: isoBirthDate,
      userType: formattedUserType,
    };

    router.push({
      pathname: "/screens/SignupInterestsScreen",
      params: {
        userData: JSON.stringify(userData),
        screenTitle: "Conte-nos seus interesses",
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          { paddingTop: 0 },
          Platform.OS === "ios" && { marginTop: -insets.top },
        ]}
      >
        <SignupHeader
          userType={userType}
          setUserType={setUserType}
          onBack={() => router.back()}
          profileIcon={"person"}
        />
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={name}
              onChangeText={setName}
              placeholder="Nome"
              style={styles.input}
              validation={validateName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="Apelido"
              style={styles.input}
              validation={validateNickname}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
              validation={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              style={styles.input}
              validation={validatePassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={phone}
              onChangeText={(text) => {
                const formatted = text
                  .replace(/\D/g, "")
                  .replace(/^(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .slice(0, 15);
                setPhone(formatted);
              }}
              placeholder="Telefone"
              style={styles.input}
              validation={validatePhone}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.halfInputWrapper}>
              <Dropdown
                label="Gênero"
                selected={gender}
                placeholder="Gênero"
                options={[
                  "MASCULINO",
                  "FEMININO",
                  "OUTRO",
                  "PREFIRO NÃO INFORMAR",
                ]}
                onSelect={setGender}
                width="50%"
                paddingLeft={24}
                textColor={gender ? "#000000" : "#FF914B"}
              />
            </View>
            <View style={styles.halfInputWrapper}>
              <CustomTextInput
                value={birthDate}
                onChangeText={(text) => {
                  const formatted = text
                    .replace(/\D/g, "")
                    .replace(/^(\d{2})(\d)/, "$1/$2")
                    .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2")
                    .slice(0, 10);
                  setBirthDate(formatted);
                  if (!birthDateTouched) setBirthDateTouched(true);
                }}
                placeholder="Nascimento"
                style={[
                  styles.birthDateInput,
                  birthDateTouched &&
                    validateBirthDate(birthDate) && {
                      borderWidth: 2,
                      borderColor: "red",
                    },
                ]}
                validation={undefined}
                keyboardType="numeric"
                width="50%"
              />
              {birthDateTouched && validateBirthDate(birthDate) && (
                <Text style={styles.errorText}>
                  {validateBirthDate(birthDate)}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Avançar"
              type="orange"
              onPress={handleSubmit}
              disabled={!isFormValid}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    alignItems: "center",
    padding: "4%",
    paddingBottom: "8%",
    width: "100%",
  },
  inputWrapper: {
    width: "90%",
    marginBottom: "5%",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#000000",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: "5%",
  },
  halfInputWrapper: {
    width: "48%",
  },
  birthDateInput: {
    height: 50,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#000000",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 24,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    marginTop: "2%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default SignupUser;
