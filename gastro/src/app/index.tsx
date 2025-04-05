import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TextInputExample: React.FC = () => {
  // const [name, setName] = useState<string>('');
  // const [email, setEmail] = useState<string>('');

  // const validateName = (text: string) => {
  //   if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
  //   if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(text)) return 'Nome deve conter apenas letras';
  //   if (text.length > 50) return 'Nome deve ter no máximo 50 caracteres';
  //   return null;
  // };

  // const validateEmail = (text: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!text) return 'Email é obrigatório';
  //   if (!emailRegex.test(text)) return 'Formato de email inválido';
  //   if (text.length > 100) return 'Email deve ter no máximo 100 caracteres';
  //   return null;
  // };
  // const navigation = useNavigation();

  // const goToRestaurantProfile = () => {
  //   navigation.navigate('restaurantProfile');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mude a sua página!</Text>
      {/* <TouchableOpacity onPress={goToRestaurantProfile}> */}
        <Text style={styles.linkText}>Ir para Perfil de Restaurante</Text>
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  customInput: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default TextInputExample;