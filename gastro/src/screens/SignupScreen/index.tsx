import { UserDTO } from '@/src/@types/DTO';
import Button from '@/src/components/Button';
import Dropdown from '@/src/components/Dropdown';
import SignupHeader from '@/src/components/SignupHeader';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { useCreateUser } from '@/src/hooks/useUserApi';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

const SignupScreen = () => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState('');

  const { createUser, loading, error } = useCreateUser();

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
    const cleaned = text.replace(/\D/g, ''); 

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
      const [day, month, year] = birthDate.split("/");
      const isoBirthDate = `${year}-${month}-${day}T00:00:00Z`;

      const userData: UserDTO = {
        name,
        nickname,
        email,
        password,
        phone,
        gender,
        birthDate: isoBirthDate,
      };

      await createUser(userData);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error("Submit Error:", err);
      Alert.alert(
        "Erro",
        err instanceof Error ? err.message : "Ocorreu um erro inesperado."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SignupHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomTextInput
          value={name}
          onChangeText={setName}
          placeholder="Nome"
          style={styles.input}
          validation={validateName}
        />
        <CustomTextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder="Apelido"
          style={styles.input}
          validation={validateNickname}
        />
        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          validation={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          style={styles.input}
          validation={validatePassword}
          secureTextEntry
        />
        <CustomTextInput
          value={phone}
          onChangeText={(text) => {
            const formatted = text
              .replace(/\D/g, '') 
              .replace(/^(\d{2})(\d)/g, '($1) $2')
              .replace(/(\d{5})(\d)/, '$1-$2') 
              .slice(0, 15); 

            setPhone(formatted);
          }}
          placeholder="Telefone"
          style={styles.input}
          validation={validatePhone}
          keyboardType="phone-pad"
          maxLength={15}
        />
        <View style={styles.rowContainer}>

          <View style={{ flex: 1, marginRight: 8 }}>
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
              width={155}
            />
          </View>

          <View style={{ flex: 1 }}>
            <CustomTextInput
              value={birthDate}
              onChangeText={(text) => {
                const formatted = text
                  .replace(/\D/g, '') 
                  .replace(/^(\d{2})(\d)/, '$1/$2') 
                  .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2') 
                  .slice(0, 10); 
                setBirthDate(formatted);
              }}
              placeholder="Nascimento"
              style={styles.birthDateInput}
              validation={validateBirthDate}
              keyboardType="numeric"
              width={155}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    alignItems: "center",
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    width: 327,
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#FF914B",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 327,
    marginBottom: 20,
  },
  halfWidth: {
    width: "48%",
  },
  birthDateInput: {
    height: 50,
    width: 155,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#FF914B",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  submitButton: {
    width: 327,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 30,
  },
});

export default SignupScreen;
