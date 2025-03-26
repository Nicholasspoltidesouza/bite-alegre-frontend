import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from '../../components/TextFieldCadastroUsuario'; // Ajuste o caminho conforme sua estrutura

const CadastroUsuario: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

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
    const phoneRegex = /^\d{10,15}$/; // Aceita números com 10 a 15 dígitos
    if (!text) return 'Telefone é obrigatório';
    if (!phoneRegex.test(text)) return 'Formato de telefone inválido';
    return null;
  };

  return (
    <View style={styles.container}>
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
      />
      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        style={styles.input}
        validation={validatePassword}
        secureTextEntry // Campo de senha
      />
      <CustomTextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Telefone"
        style={styles.input}
        validation={validatePhone}
        keyboardType="phone-pad" // Teclado numérico
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#FFFFFF',
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
    letterSpacing: 0,
    marginBottom: 20, // Espaçamento entre os campos
  },
});

export default CadastroUsuario;
