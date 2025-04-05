import React, { useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import { useCreateRestaurant } from '@/src/hooks/useRestaurantApi';
import { RestaurantDTO } from '@/src/@types/DTO';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';


const SignupRestaurant: React.FC = ({ navigation }: any) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');
  const [restaurantType, setRestaurantType] = useState<string | null>(null);
  const [userType, setUserType] = useState<string>('');

  const { createRestaurant } = useCreateRestaurant();

  const validateNameRestaurant = (text: string): string | null => {
    if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(text)) return 'Nome deve conter apenas letras';
    if (text.length > 50) return 'Nome deve ter no máximo 50 caracteres';
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
    const cleaned = text.replace(/\D/g, '');
    if (!cleaned) return 'Telefone é obrigatório';
    if (!/^\d{10,11}$/.test(cleaned)) return 'Formato de telefone inválido';
    return null;
  };

  const handleSubmit = async () => {
    if (!restaurantName || !email || !password || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const errors = [
      validateNameRestaurant(restaurantName),
      validateEmail(email),
      validatePassword(password),
      validatePhone(phone),
    ].filter((error) => error != null);

    if (errors.length > 0) {
      Alert.alert('Erro de Validação', errors.join('\n'));
      return;
    }

    try {
      const restaurantData: RestaurantDTO = {
        restaurantName,
        address,
        email,
        password,
        averagePrice,
        phone,
        restaurantType: restaurantType ?? '',
      };

      await createRestaurant(restaurantData);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert('Erro', err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomTextInput
          value={restaurantName}
          onChangeText={setRestaurantName}
          placeholder="Nome Restaurante"
          style={styles.input}
          validation={validateNameRestaurant}
        />
        <CustomTextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Endereço"
          style={styles.input}
          //validation={}
          keyboardType="email-address"
          autoCapitalize="none"
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
         //alterar o value e o onChange
          value={email}
          onChangeText={setEmail}
          placeholder="Preço Médio"
          style={styles.input}
          validation={validateEmail}
          keyboardType="number-pad"
          autoCapitalize="none"
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
        <Dropdown
          label="Tipo de Cadastro"
          selected={userType}
          placeholder="Tipo de cadastro"
          options={['Cadastro de Usuário', 'Cadastro de Restaurante']}
          onSelect={setUserType}
          iconColor="#FFFFFF"
          textColor="#FFFFFF"
          backgroundColor="#FF914B"
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Avançar" type="orange" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    width: 327,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    paddingLeft: 24,
    paddingRight: 16,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120,
  },
});

export default SignupRestaurant;
