import { RestaurantDTO } from '@/src/@types/DTO';
import { OperatingHoursDto } from '@/src/@types/OperatingHoursDto';
import Button from '@/src/components/Button';
import HoursSection from '@/src/components/HoursSection';
import SignupHeader from '@/src/components/SignupHeader';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignupRestaurant = () => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [averagePrice, setAveragePrice] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(
    'Cadastro de Restaurante',
  );

  const [operatingHours, setOperatingHours] = useState<OperatingHoursDto[]>([
    { day: 'Segunda', time: '11:00 – 14:00' },
    { day: 'Feriados', time: '18:30 – 23:30' },
  ]);

  const { getRestaurantById } = useRestaurantApi();
  const { createRestaurant } = useRestaurantApi();
  const router = useRouter();

  const handleAddOperatingHour = () => {
    setOperatingHours((prev: any) => [
      ...prev,
      { day: 'Quarta', startTime: '12:00', endTime: '15:00' },
    ]);
  };

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return 'Descrição não pode ter mais de 200 caracteres';
    return null;
  };

  const validateNameRestaurant = (text: string): string | null => {
    if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(text)) return 'Nome deve conter apenas letras';
    if (text.length > 50) return 'Nome deve ter no máximo 50 caracteres';
    return null;
  };

  const validateCnpj = (text: string): string | null => {
    const cleaned = text.replace(/\D/g, '');
    if (!cleaned) return 'CNPJ é obrigatório';
    if (!/^\d{14}$/.test(cleaned)) return 'Formato de CNPJ inválido';
    return null;
  };

  const validateAddress = (text: string): string | null => {
    if (!text.trim()) return 'Endereço é obrigatório';
    if (text.length < 5) return 'Endereço deve ter no mínimo 5 caracteres';
    if (text.length > 100) return 'Endereço deve ter no máximo 100 caracteres';
    if (!/^[\wÀ-ÿ\s.,ºª\-]+$/i.test(text))
      return 'Endereço contém caracteres inválidos';
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

  const validateAveregePrice = (text: string): string | null => {
    if (!text) return 'Preço médio é obrigatório';

    const number = parseFloat(text.replace(',', '.'));
    if (isNaN(number)) return 'Preço deve ser um número válido';
    if (number <= 0) return 'Preço deve ser maior que zero';

    return null;
  };

  const isFormValid =
    name &&
    email &&
    address &&
    averagePrice &&
    password &&
    phone &&
    description &&
    userType &&
    cnpj &&
    !validateNameRestaurant(name) &&
    !validateAddress(address) &&
    !validateEmail(email) &&
    !validateAveregePrice(averagePrice.toString()) &&
    !validatePassword(password) &&
    !validatePhone(phone) &&
    !validateDescription(description) &&
    !validateCnpj(cnpj);

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !averagePrice ||
      !userType ||
      !description
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const errors = [
      validateNameRestaurant(name),
      validateAddress(address),
      validateEmail(email),
      validatePassword(password),
      validatePhone(phone),
      validateAveregePrice(averagePrice.toString()),
      validateDescription(description),
      validateCnpj(cnpj),
    ].filter((error) => error != null);

    if (errors.length > 0) {
      Alert.alert('Erro de Validação', errors.join('\n'));
      return;
    }

    try {
      const formatedUserType =
        userType === 'Cadastro de Restaurante' ? 'RESTAURANTE' : 'USUARIO';

      const restaurantData: RestaurantDTO = {
        name,
        cnpj,
        description,
        address,
        email,
        password,
        averagePrice: parseFloat(averagePrice.replace(',', '.')),
        phone,
        userType: formatedUserType,
      };

      router.push({
        pathname: '/screens/SignupInterestsScreen',
        params: {
          screenTitle: 'Selecione as categorias do seu restaurante',
          restaurantData: JSON.stringify(restaurantData),
        },
      });
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert(
        'Erro',
        err instanceof Error ? err.message : 'Ocorreu um erro inesperado',
      );
    }
  };

  const handleEditOperatingHour = (item: OperatingHoursDto, index: number) => {
    Alert.alert('Editar Horário', `Você clicou em ${item.day} - ${item.time}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          { paddingTop: 0 },
          Platform.OS === 'ios' && { marginTop: -insets.top },
        ]}
      >
        <SignupHeader
          userType={userType}
          setUserType={setUserType}
          profileIcon={'store'}
          onBack={() => router.back()}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={name}
              onChangeText={setName}
              placeholder="Nome Restaurante"
              style={styles.input}
              validation={validateNameRestaurant}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={cnpj}
              onChangeText={(text: string) => {
                const cleaned = text.replace(/\D/g, '').slice(0, 14);
                const formatted = cleaned
                  .replace(/^(\d{2})(\d)/, '$1.$2')
                  .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                  .replace(/\.(\d{3})(\d)/, '.$1/$2')
                  .replace(/(\d{4})(\d)/, '$1-$2');
                setCnpj(formatted);
              }}
              placeholder="CNPJ"
              style={styles.input}
              validation={validateCnpj}
              keyboardType="number-pad"
              autoCapitalize="none"
              maxLength={18}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição, link cardápio, redes sociais"
              style={[styles.input, { height: 150 }]}
              validation={validateDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Endereço"
              style={styles.input}
              validation={validateAddress}
              autoCapitalize="none"
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
              value={averagePrice}
              onChangeText={setAveragePrice}
              placeholder="Preço Médio"
              style={styles.input}
              validation={validateAveregePrice}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={phone}
              onChangeText={(text: string) => {
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
          </View>

          <View style={styles.inputWrapper}>
            <HoursSection
              hours={operatingHours}
              onAdd={handleAddOperatingHour}
              onPressItem={handleEditOperatingHour}
            />
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
    padding: '4%',
    paddingBottom: '8%',
    width: '100%',
  },
  inputWrapper: {
    width: '90%',
    marginBottom: '5%',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    paddingLeft: 24,
    paddingRight: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: '2%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default SignupRestaurant;
