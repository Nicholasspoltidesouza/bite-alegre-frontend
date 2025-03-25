import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from '../components/TextFieldCadastroUsuario'; 

const TextInputExample: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const validateName = (text: string) => {
    if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(text)) return 'Nome deve conter apenas letras';
    if (text.length > 50) return 'Nome deve ter no máximo 50 caracteres';
    return null;
  };

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) return 'Email é obrigatório';
    if (!emailRegex.test(text)) return 'Formato de email inválido';
    if (text.length > 100) return 'Email deve ter no máximo 100 caracteres';
    return null;
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        style={styles.customInput}
        validation={validateName}
      />
      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.customInput}
        validation={validateEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    padding: 16,
  },
  customInput: {
    marginBottom: 16,
  },
});

export default TextInputExample;