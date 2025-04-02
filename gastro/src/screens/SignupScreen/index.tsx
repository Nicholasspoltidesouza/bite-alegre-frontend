import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  // TouchableOpacity, // No longer needed for submit
  Text,
  Alert,
} from "react-native";
import CustomTextInput from "../../components/TextFieldCadastroUsuario";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button"; // Import your custom Button
import { UserDTO } from "@/src/@types/DTO";
import { createUser } from "@/src/hooks/useUserApi";

const SignupScreen: React.FC = ({ navigation }: any) => {
  // --- State (remains the same) ---
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [userType, setUserType] = useState<string | null>(null); // Still seems unused in submit
  const [gender, setGender] = useState<string | null>(null);

  // --- Validation Functions (remain the same) ---
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
    const phoneRegex = /^\d{10,15}$/;
    if (!text) return "Telefone é obrigatório";
    if (!phoneRegex.test(text)) return "Formato de telefone inválido";
    return null;
  };

  const validateBirthDate = (text: string): string | null => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!text) return "Data de nascimento é obrigatória";
    if (!dateRegex.test(text)) return "Formato deve ser DD/MM/AAAA";
    // Optional: Add date validity check
    return null;
  };

  // --- Input Handlers (remain the same) ---
  const handleBirthDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = "";
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, Math.min(2, cleaned.length));
      if (cleaned.length > 2) {
        formatted += "/" + cleaned.substring(2, Math.min(4, cleaned.length));
        if (cleaned.length > 4) {
          formatted += "/" + cleaned.substring(4, Math.min(8, cleaned.length));
        }
      }
    }
    setBirthDate(formatted);
  };

  // --- Conditional Validation Helpers (remain the same) ---
  const conditionalValidateName = (text: string): string | null => {
    return text.length > 0 ? validateName(text) : null;
  };
  const conditionalValidateNickname = (text: string): string | null => {
    return text.length > 0 ? validateNickname(text) : null;
  };
  const conditionalValidateEmail = (text: string): string | null => {
    return text.length > 0 ? validateEmail(text) : null;
  };
  const conditionalValidatePassword = (text: string): string | null => {
    return text.length > 0 ? validatePassword(text) : null;
  };
  const conditionalValidatePhone = (text: string): string | null => {
    return text.length > 0 ? validatePhone(text) : null;
  };
  const conditionalValidateBirthDate = (text: string): string | null => {
    return text.length > 0 ? validateBirthDate(text) : null;
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !nickname ||
      !email ||
      !password ||
      !phone ||
      !birthDate ||
      !gender
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

    try {
      const userData: UserDTO = {
        name,
        nickname,
        email,
        password,
        phone,
        gender,
        birthDate,
        // profilePhoto is optional in DTO, not collected here yet
      };

      await createUser(userData); // Assuming createUser doesn't handle photo yet
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      // Maybe navigate or clear form
      // navigation.navigate('NextScreen');
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert(
        "Erro",
        error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
      );
    }
  };

  // --- JSX ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Input Fields */}
        <CustomTextInput
          value={name}
          onChangeText={setName}
          placeholder="Nome"
          style={styles.input}
          validation={conditionalValidateName}
        />
        <CustomTextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder="Apelido"
          style={styles.input}
          validation={conditionalValidateNickname}
        />
        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          validation={conditionalValidateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          style={styles.input}
          validation={conditionalValidatePassword}
          secureTextEntry
        />
        <CustomTextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Telefone"
          style={styles.input}
          validation={conditionalValidatePhone}
          keyboardType="phone-pad"
          maxLength={15}
        />

        {/* Dropdown for User Type (still seems unused) */}
        <Dropdown
          label="Tipo de Cadastro"
          selected={userType}
          placeholder="Tipo de cadastro"
          options={["Cadastro de Usuário", "Cadastro de Restaurante"]}
          onSelect={setUserType}
          iconColor="#FFFFFF"
          textColor="#FFFFFF"
          backgroundColor="#FF914B"
          // Add style if needed, e.g., style={styles.dropdownFullWidth}
        />

        {/* Row for Gender and Birth Date */}
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <Dropdown
              label="Gênero"
              selected={gender}
              placeholder="Gênero"
              options={[
                "Masculino",
                "Feminino",
                "Outro",
                "Prefiro não informar",
              ]}
              onSelect={setGender}
              width={155}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomTextInput
              value={birthDate}
              onChangeText={handleBirthDateChange}
              placeholder="Nascimento"
              style={styles.birthDateInput} // Keep specific style if needed
              validation={conditionalValidateBirthDate}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

        {/* Use the custom Button component */}
        <Button
          title="Avançar"
          onPress={handleSubmit} // Calls the user creation logic
          type="orange"
          style={styles.submitButton} // Apply custom width and margin
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    // justifyContent: 'center', // Remove if content might exceed screen height
    alignItems: "center",
    padding: 16,
    paddingBottom: 32, // Ensure space at the bottom
  },
  input: {
    width: 327, // Consider using percentages or screen width for responsiveness
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#FF914B",
    fontFamily: "Poppins-Regular", // Ensure font is linked
    fontSize: 16,
    marginBottom: 20,
  },
  // Optional: Style for the full-width dropdown if needed
  // dropdownFullWidth: {
  //   width: 327,
  //   marginBottom: 20,
  // },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 327, // Match input width
    marginBottom: 20,
  },
  halfWidth: {
    width: "48%", // Creates a small gap between items
  },
  birthDateInput: {
    // Removed fixed width, relies on parent halfWidth
    height: 50,
    width: 155,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#FF914B",
    fontFamily: "Poppins-Regular", // Ensure font is linked
    fontSize: 16,
  },
  // Style for the custom Button component
  submitButton: {
    width: 327, // Override default width from Button component
    marginTop: 20, // Add margin top
    // Height, borderRadius, alignment etc. are handled by the Button component itself
  },
  // submitButtonText style is no longer needed as Button handles its text style
});

export default SignupScreen;
