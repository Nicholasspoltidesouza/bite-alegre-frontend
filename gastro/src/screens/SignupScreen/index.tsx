import Button from '@/src/components/Button';
import Dropdown from '@/src/components/Dropdown';
import SignupHeader from '@/src/components/SignupHeader';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

const SignupScreen = () => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState('');

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
    const cleaned = text.replace(/\D/g, ''); // remove parênteses, espaços, hífens

    if (!cleaned) return 'Telefone é obrigatório';
    if (!/^\d{10,11}$/.test(cleaned)) return 'Formato de telefone inválido';

    return null;
  };


  const validateBirthDate = (text: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text))
      return 'Formato inválido. Use DD/MM/AAAA';

    const [day, month, year] = text.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    )
      return 'Data inválida';
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
      <SignupHeader />
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
          onChangeText={(text) => {
            const formatted = text
              .replace(/\D/g, '') // remove tudo que não é dígito
              .replace(/^(\d{2})(\d)/g, '($1) $2') // formata DDD
              .replace(/(\d{5})(\d)/, '$1-$2') // formata número com hífen
              .slice(0, 15); // limita o tamanho (ex: (99) 99999-9999)

            setPhone(formatted);
          }}
          placeholder="Telefone"
          style={styles.input}
          validation={conditionalValidatePhone}
          keyboardType="phone-pad"
          maxLength={15}
        />
        <View style={styles.rowContainer}>

          <View style={{ flex: 1, marginRight: 8 }}>
            <Dropdown
              label="Gênero"
              selected={gender}
              placeholder="Gênero"
              options={["Masculino", "Feminino", "Outro", "Prefiro não informar"]}
              onSelect={setGender}
              width={156}
            />
          </View>

          <View style={{ flex: 1 }}>
            <CustomTextInput
              value={birthDate}
              onChangeText={(text) => {
                const formatted = text
                  .replace(/\D/g, '') // remove tudo que não é dígito
                  .replace(/^(\d{2})(\d)/, '$1/$2') // adiciona '/' após o dia
                  .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2') // adiciona '/' após o mês
                  .slice(0, 10); // limita a 10 caracteres (DD/MM/AAAA)
                setBirthDate(formatted);
              }}
              placeholder="Nascimento"
              validation={validateBirthDate}
              keyboardType="numeric"
              width={156}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Avançar"
            type="orange"
            onPress={() => {
              console.log('Botão Avançar pressionado');
            }}
          />
        </View>
      </ScrollView >
    </SafeAreaView >
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
  buttonContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    width: 327,
    marginBottom: 20,
  },
});

export default SignupScreen;
