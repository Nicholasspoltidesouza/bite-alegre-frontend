import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import CustomTextInput from '../../components/TextFieldCadastroUsuario';
import Dropdown from '../../components/Dropdown';

// Import the user service
interface UserDTO {
  profilePhoto?: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  gender: string | null;
  birthDate?: string;
}

const API_URL = 'http://localhost:3000/api/users'; // Substitua pelo URL correto do seu back-end

const createUser = async (userData: UserDTO): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User created:', data);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha ao criar usuário.');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const SignupScreen: React.FC = ({ navigation }: any) => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');

  const [userType, setUserType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const validateName = (text: string): string | null => {
    if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(text)) return 'Nome deve conter apenas letras';
    if (text.length > 50) return 'Nome deve ter no máximo 50 caracteres';
    return null;
  };

  const validateNickname = (text: string): string | null => {
    if (text.length < 2) return 'Apelido deve ter no mínimo 2 caracteres';
    if (text.length > 30) return 'Apelido deve ter no máximo 30 caracteres';
    return null;
  };

  const validateEmail = (text: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) return 'Email é obrigatório';
    if (!emailRegex.test(text)) return 'Formato de email inválido';
    if (text.length > 100) return 'Email deve ter no máximo 100 caracteres';
    return null;
  };

  const validatePassword = (text: string): string | null => {
    if (text.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
    if (text.length > 50) return 'Senha deve ter no máximo 50 caracteres';
    return null;
  };

  const validatePhone = (text: string): string | null => {
    const phoneRegex = /^\d{10,15}$/;
    if (!text) return 'Telefone é obrigatório';
    if (!phoneRegex.test(text)) return 'Formato de telefone inválido';
    return null;
  };

  const validateBirthDate = (text: string): string | null => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!text) return 'Data de nascimento é obrigatória';
    if (!dateRegex.test(text)) return 'Formato deve ser DD/MM/AAAA';
    return null;
  };

  // Function to format birth date with automatic slashes
  const handleBirthDateChange = (text: string) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Add slashes automatically
    let formatted = '';
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, Math.min(2, cleaned.length));
      
      if (cleaned.length > 2) {
        formatted += '/' + cleaned.substring(2, Math.min(4, cleaned.length));
        
        if (cleaned.length > 4) {
          formatted += '/' + cleaned.substring(4, Math.min(8, cleaned.length));
        }
      }
    }
    
    setBirthDate(formatted);
  };

  // Helper functions to conditionally apply validation only when content exists
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

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const userData: UserDTO = {
        name,
        nickname,
        email,
        password,
        phone,
        gender,
        birthDate
      };
      
      await createUser(userData);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Ocorreu um erro ao cadastrar o usuário.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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
        />

        <Dropdown
          label="Tipo de Cadastro"
          selected={userType}
          placeholder="Tipo de cadastro"
          options={["Cadastro de Usuário", "Cadastro de Restaurante"]}
          onSelect={setUserType}
          iconColor='#FFFFFF'
          textColor='#FFFFFF'
          backgroundColor='#FF914B'
        />

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <Dropdown
              label="Gênero"
              selected={gender}
              placeholder="Gênero"
              options={["Masculino", "Feminino", "Outro", "Prefiro não informar"]}
              onSelect={setGender}
              width={155}
            />
          </View>
          
          <View style={styles.halfWidth}>
            <CustomTextInput
              value={birthDate}
              onChangeText={handleBirthDateChange}
              placeholder="Nascimento"
              style={styles.birthDateInput}
              validation={conditionalValidateBirthDate}
              keyboardType="numeric"
              maxLength={10} // DD/MM/YYYY = 10 characters
            />
          </View>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: 327,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    paddingLeft: 24,
    paddingRight: 16,
    color: '#FF914B',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 327,
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%', // Slightly less than 50% to account for spacing
  },
  birthDateInput: {
    width: 155,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    paddingLeft: 24,
    paddingRight: 16,
    color: '#FF914B',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  submitButton: {
    width: 327,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#FF914B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  }
});

export default SignupScreen;
